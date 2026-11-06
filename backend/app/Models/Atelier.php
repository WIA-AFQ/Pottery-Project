<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Atelier extends Model
{
     protected $fillable = ['title','description','date','heure','places','lieu','prix'];
    public function reservations()
    {
        return $this->hasMany(ReservationAtelier::class);
    }
}
