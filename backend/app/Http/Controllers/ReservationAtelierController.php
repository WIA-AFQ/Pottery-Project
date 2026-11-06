<?php

namespace App\Http\Controllers;

use App\Models\Atelier;
use App\Models\ReservationAtelier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ReservationAtelierController extends Controller
{
    public function index()
    {
        return response()->json(ReservationAtelier::with(['user', 'atelier'])->latest()->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'atelier_id' => 'required|integer|exists:ateliers,id',
            'reservation_date' => 'required|date|after_or_equal:today',
            'nombre_places' => 'required|integer|min:1|max:10',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:30',
        ]);

        $reservation = DB::transaction(function () use ($data, $request) {
            $atelier = Atelier::query()->lockForUpdate()->findOrFail($data['atelier_id']);
            $reserved = ReservationAtelier::query()
                ->where('atelier_id', $atelier->id)
                ->whereDate('reservation_date', $data['reservation_date'])
                ->where('status', '!=', 'annulé')
                ->sum('nombre_places');

            if ($reserved + $data['nombre_places'] > $atelier->places) {
                throw ValidationException::withMessages([
                    'nombre_places' => 'Il ne reste pas assez de places pour cette date.',
                ]);
            }

            return ReservationAtelier::create([
                ...$data,
                'user_id' => $request->user()->id,
            ]);
        });

        return response()->json($reservation->load(['user', 'atelier']), 201);
    }

    public function show($id)
    {
        return response()->json(ReservationAtelier::with(['user', 'atelier'])->findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'reservation_date' => 'sometimes|date|after_or_equal:today',
            'nombre_places' => 'sometimes|integer|min:1|max:10',
            'status' => 'sometimes|in:en_attente,confirmé,annulé',
        ]);

        $reservation = ReservationAtelier::findOrFail($id);
        $reservation->update($data);

        return response()->json($reservation->load(['user', 'atelier']));
    }

    public function destroy($id)
    {
        ReservationAtelier::findOrFail($id)->delete();
        return response()->json(['message' => 'Reservation deleted']);
    }
}
