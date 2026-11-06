<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {schema::disableForeignKeyConstraints();
        Schema::create('reservation_ateliers', function (Blueprint $table) {
             $table->id();
             $table->foreignId('user_id')->constrained()->onDelete('cascade');
             $table->foreignId('atelier_id')->constrained()->onDelete('cascade');
             $table->date('reservation_date');
             $table->integer('nombre_places');
             $table->enum('status', ['en_attente', 'confirmé', 'annulé'])->default('en_attente');
             $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservation_ateliers');
    }
};
