<?php

namespace App\Http\Controllers;
use App\Models\Atelier;
use Illuminate\Http\Request;
class AtelierController extends Controller
{
 
    public function index()
    {
        return Atelier::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date|after_or_equal:today',
            'heure' => 'nullable|date_format:H:i',
            'places' => 'required|integer|min:1',
            'lieu' => 'nullable|string|max:255',
            'prix' => 'required|numeric|min:0',
        ]);

        return response()->json(Atelier::create($data), 201);
    }

    public function show($id)
    {
        return Atelier::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $atelier = Atelier::findOrFail($id);
        $data = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'date' => 'sometimes|required|date|after_or_equal:today',
            'heure' => 'sometimes|nullable|date_format:H:i',
            'places' => 'sometimes|required|integer|min:1',
            'lieu' => 'sometimes|nullable|string|max:255',
            'prix' => 'sometimes|required|numeric|min:0',
        ]);

        $atelier->update($data);
        return response()->json($atelier);
    }

    public function destroy($id)
    {
        Atelier::findOrFail($id)->delete();
        return response()->json(['message' => 'Atelier deleted']);
    }
}

