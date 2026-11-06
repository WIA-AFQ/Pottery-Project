<?php

namespace Database\Seeders;
use App\Models\{User, Category, Product, Atelier};
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
  

public function run(): void
{
    User::updateOrCreate(['email' => 'admin@test.com'],
        ['name' => 'Admin', 'password' => 'admin123', 'role' => 'admin']);

    $cuisine = Category::updateOrCreate(['name' => 'Cuisine']);
    $deco    = Category::updateOrCreate(['name' => 'Décoration']);

    $rows = [
        ['Tajine', 250, 'tajin1.jpg', 'Plat traditionnel en terre cuite marocain.', $cuisine],
        ['Vase', 180, 'vase1.jpg', 'Objet décoratif pour fleurs et intérieur.', $deco],
        ['Bol', 120, 'bol1.jpg', 'Bol artisanal en céramique.', $cuisine],
        ['Assiettes', 120, 'Assiettes3.jpg', 'Assiettes en poterie pour servir les repas.', $cuisine],
        ['Coupes', 100, 'Tasses4.jpg', 'Coupes en céramique pour boissons.', $cuisine],
        ['Tasses', 100, 'Tasses5.jpg', 'Tasses artisanales pour thé et café.', $cuisine],
        ['Tasses Traditionnelles', 100, 'Tasses3.jpg', 'Tasses traditionnelles pour thé et café.', $cuisine],
        ['Petits bols traditionnels', 40, 'zlaif2.jpg', 'Petits bols traditionnels marocains utilisés pour servir les plats.', $cuisine],
        ['Décoration', 40, 'deco.jpg', 'Objets décoratifs artisanaux en céramique.', $deco],
        ['Pot à épices', 90, 'ffr.jpeg', 'Petit récipient artisanal pour conserver les épices.', $cuisine],
        ['Théière en céramique', 220, 'fr.jpeg', 'Théière traditionnelle marocaine faite à la main.', $cuisine],
    ];
    foreach ($rows as [$name, $prix, $image, $desc, $cat]) {
        Product::updateOrCreate(['name' => $name], ['prix' => $prix, 'image' => $image,
            'description' => $desc, 'stock' => 20, 'category_id' => $cat->id]);
    }

    Atelier::updateOrCreate(['title' => 'Atelier de poterie'], [
        'title' => 'Atelier de poterie', 'description' => 'Initiation au modelage et à la décoration.',
        'date' => now()->addMonth()->toDateString(), 'heure' => '10:00',
        'places' => 10, 'lieu' => 'Centre Artistique, Rabat', 'prix' => 150,
    ]);
}
}
