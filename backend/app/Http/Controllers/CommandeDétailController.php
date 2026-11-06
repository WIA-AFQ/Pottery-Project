<?php

namespace App\Http\Controllers;
use App\Models\CommandeDétail;
use Illuminate\Http\Request;

class CommandeDétailController extends Controller
{

    public function index()
    {
        return CommandeDétail::with(['commande','product'])->get();
    }

    public function store(Request $request)
    {
        return CommandeDétail::create($request->all());
    }

    public function destroy($id)
    {
        return CommandeDétail::destroy($id);
    }
}

