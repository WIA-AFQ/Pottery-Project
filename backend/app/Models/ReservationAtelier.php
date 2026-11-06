<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReservationAtelier extends Model
{
   protected $fillable = [
    'user_id',
    'atelier_id',
    'reservation_date',
    'nombre_places',
    'status',
    'name',
    'email',
    'phone',
];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function atelier()
    {
        return $this->belongsTo(Atelier::class);
    }
}
