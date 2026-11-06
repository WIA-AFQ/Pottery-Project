<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\{AuthController, ProductController, CategoryController,
    AtelierController, ReservationAtelierController, CommandeController, ContactMessageController};

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/contact', [ContactMessageController::class, 'store'])->middleware('throttle:5,1');

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::apiResource('categories', CategoryController::class)->only(['index', 'show']);
Route::apiResource('ateliers', AtelierController::class)->only(['index', 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', fn (Request $r) => $r->user());

    Route::get('/commandes', [CommandeController::class, 'index']);
    Route::post('/commandes', [CommandeController::class, 'store']);
    Route::post('/reservations', [ReservationAtelierController::class, 'store']);

    Route::middleware('admin')->group(function () {
        Route::post('/products', [ProductController::class, 'store']);
        Route::put('/products/{id}', [ProductController::class, 'update']);
        Route::delete('/products/{id}', [ProductController::class, 'destroy']);

        Route::apiResource('categories', CategoryController::class)->except(['index', 'show']);
        Route::apiResource('ateliers', AtelierController::class)->except(['index', 'show']);
        Route::apiResource('commandes', CommandeController::class)->only(['show', 'update', 'destroy']);
        Route::apiResource('reservations', ReservationAtelierController::class)->except(['store']);
    });
});
