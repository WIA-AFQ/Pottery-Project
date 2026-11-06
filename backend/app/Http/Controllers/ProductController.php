<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // 📌 GET ALL PRODUCTS
    public function index()
    {
        return response()->json(Product::all());
    }

    // 📌 CREATE PRODUCT
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'prix' => 'required|numeric',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'stock' => 'nullable|integer',
            'category_id' => 'nullable|integer',
        ]);
        $data['stock'] ??= 20;

        $product = Product::create($data);

        return response()->json([
            'message' => 'Product created successfully',
            'product' => $product
        ]);
    }
    public function show($id)
{
    $product = Product::find($id);

    if (!$product) {
        return response()->json([
            "message" => "Product not found"
        ], 404);
    }

    return response()->json($product);
}

    // 📌 UPDATE PRODUCT
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $data = $request->validate([
            'name' => 'sometimes',
            'prix' => 'sometimes|numeric',
            'description' => 'sometimes',
            'image' => 'sometimes',
            'stock' => 'sometimes|integer',
            'category_id' => 'sometimes|integer',
        ]);

        $product->update($data);

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product
        ]);
    }

    // 📌 DELETE PRODUCT
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully'
        ]);
    }
}
