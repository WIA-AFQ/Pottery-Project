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
     Schema::create('products', function (Blueprint $table) {
      $table->id();
    $table->string('name')->nullable();
    $table->text('description')->nullable();
    $table->decimal('prix', 10, 2)->nullable();
    $table->integer('stock')->default(0);
    $table->string('image')->nullable();
    $table->foreignId('category_id')
      ->nullable()
      ->constrained()
      ->onDelete('set null');
    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
