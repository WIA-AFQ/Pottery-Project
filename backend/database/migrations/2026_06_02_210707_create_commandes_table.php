
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('commandes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->string('nom_client')->nullable();
            $table->string('telephone')->nullable();
            $table->decimal('total_prix', 10, 2)->default(0);

            $table->enum('status', ['en_attente', 'payée', 'expédiée', 'annulée'])->default('en_attente');
            $table->string('payment_method')->nullable();
            $table->text('adresse')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('commandes');
    }
};

