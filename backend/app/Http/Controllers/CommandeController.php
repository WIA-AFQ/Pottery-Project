<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class CommandeController extends Controller
{
    public function index(Request $request)
    {
        $orders = Commande::with('details.product')->latest();

        if ($request->user()->role !== 'admin') {
            $orders->where('user_id', $request->user()->id);
        }

        return response()->json($orders->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nom_client' => 'required|string|max:255',
            'telephone' => 'required|string|max:30',
            'adresse' => 'required|string|max:2000',
            'payment_method' => 'required|in:cash,card',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|integer|distinct|exists:products,id',
            'items.*.quantite' => 'required|integer|min:1|max:99',
        ]);

        $order = DB::transaction(function () use ($data, $request) {
            $order = Commande::create([
                'user_id' => $request->user()->id,
                'nom_client' => $data['nom_client'],
                'telephone' => $data['telephone'],
                'adresse' => $data['adresse'],
                'payment_method' => $data['payment_method'],
                'status' => 'en_attente',
                'total_prix' => 0,
            ]);

            $total = 0;
            foreach ($data['items'] as $item) {
                $product = Product::query()->lockForUpdate()->findOrFail($item['product_id']);
                if ($product->stock < $item['quantite']) {
                    throw ValidationException::withMessages([
                        'items' => "Stock insuffisant pour le produit {$product->name}.",
                    ]);
                }
                $subtotal = $product->prix * $item['quantite'];

                $order->details()->create([
                    'product_id' => $product->id,
                    'quantite' => $item['quantite'],
                    'prix' => $product->prix,
                    'sous_total' => $subtotal,
                ]);
                $product->decrement('stock', $item['quantite']);
                $total += $subtotal;
            }

            $order->update(['total_prix' => $total]);
            return $order;
        });

        return response()->json($order->load('details.product'), 201);
    }

    public function show($id)
    {
        return response()->json(Commande::with('details.product')->findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'status' => 'required|in:en_attente,payée,expédiée,annulée',
        ]);

        $order = Commande::findOrFail($id);
        $order->update($data);

        return response()->json($order->load('details.product'));
    }

    public function destroy($id)
    {
        $order = Commande::findOrFail($id);
        $order->delete();

        return response()->json(['message' => 'Order deleted']);
    }
}
