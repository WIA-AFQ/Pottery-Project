<?php

use App\Http\Controllers\AdminWebController;
use Illuminate\Support\Facades\Route;

Route::redirect('/login', '/admin/login')->name('login');

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/login', [AdminWebController::class, 'showLogin'])->name('login');
    Route::post('/login', [AdminWebController::class, 'login'])->middleware('throttle:5,1')->name('login.submit');

    Route::middleware(['auth', 'admin'])->group(function () {
        Route::post('/logout', [AdminWebController::class, 'logout'])->name('logout');
        Route::get('/products', [AdminWebController::class, 'products'])->name('products.index');
        Route::post('/products', [AdminWebController::class, 'storeProduct'])->name('products.store');
        Route::put('/products/{product}', [AdminWebController::class, 'updateProduct'])->name('products.update');
        Route::delete('/products/{product}', [AdminWebController::class, 'destroyProduct'])->name('products.destroy');
    });
});
