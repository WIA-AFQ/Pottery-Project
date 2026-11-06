<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class CommandeDétail extends Model
{
    protected $table = 'commande_details';

    protected $fillable = ['commande_id','product_id','quantite','prix','sous_total'];
    public function commande() { return $this->belongsTo(Commande::class); }
    public function product()  { return $this->belongsTo(Product::class); }
}
   // protected $fillable = ['commande_id','product_id','quantite','prix','sous_total'];
// public function commandes()
    //{
        ///return $this->belongsTo(Commande::class);
    //}

    //public function product()
    //{
        //return $this->belongsTo(Product::class);
    //}
//}
