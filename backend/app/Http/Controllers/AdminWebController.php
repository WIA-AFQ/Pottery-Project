<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\View\View;

class AdminWebController extends Controller
{
    public function showLogin(): View|RedirectResponse
    {
        if (Auth::check() && Auth::user()->role === 'admin') {
            return redirect()->route('admin.products.index');
        }

        return view('admin.login');
    }

    public function login(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($credentials)) {
            return back()->withErrors(['email' => 'Email ou mot de passe incorrect.'])->onlyInput('email');
        }

        $request->session()->regenerate();

        if (Auth::user()->role !== 'admin') {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return back()->withErrors(['email' => 'Ce compte n’a pas les droits administrateur.'])->onlyInput('email');
        }

        return redirect()->route('admin.products.index');
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    }

    public function products(): View
    {
        $products = Product::query()->latest()->get()->map(function (Product $product) {
            $image = $product->image;
            if ($image && Str::startsWith($image, ['http://', 'https://'])) {
                $product->image_url = $image;
            } elseif ($image && Storage::disk('public')->exists($image)) {
                $product->image_url = Storage::disk('public')->url($image);
            } else {
                $product->image_url = asset('images/products/'.basename($image ?: 'tajin1.jpg'));
            }

            return $product;
        });

        return view('admin.products.index', compact('products'));
    }

    public function storeProduct(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'prix' => 'required|numeric|min:0',
            'description' => 'nullable|string|max:5000',
            'stock' => 'nullable|integer|min:0',
            'image' => 'nullable|image|max:4096',
        ]);

        $data['stock'] ??= 20;
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        Product::create($data);

        return redirect()->route('admin.products.index')->with('success', 'Produit ajouté.');
    }

    public function updateProduct(Request $request, Product $product): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'prix' => 'required|numeric|min:0',
        ]);

        $product->update($data);

        return redirect()->route('admin.products.index')->with('success', 'Produit modifié.');
    }

    public function destroyProduct(Product $product): RedirectResponse
    {
        if ($product->commandeDetails()->exists()) {
            return redirect()->route('admin.products.index')
                ->withErrors(['product' => 'Ce produit figure dans une commande et ne peut pas être supprimé.']);
        }

        if ($product->image && Str::startsWith($product->image, 'products/')) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Produit supprimé.');
    }
}
