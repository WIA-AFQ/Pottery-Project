<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('commande_détails') && !Schema::hasTable('commande_details')) {
            Schema::rename('commande_détails', 'commande_details');
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('commande_details') && !Schema::hasTable('commande_détails')) {
            Schema::rename('commande_details', 'commande_détails');
        }
    }
};
