<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//User Routes
Route::middleware(['auth', 'role:player,admin,monitor,bot,moderator'])->group(function() {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

//Admin Routes
    Route::middleware(['auth', 'role:admin,monitor,bot'])->group(function() {
        // Route::get('/teste', function() {
        //     $role = auth()->user()->role->name;
        //     return 'Hello: ' . $role;
        // });
        
        Route::get('/admin/dashboard', function () {
            return Inertia::render('Admin/AdminDashboard');
        })->name('dashboard');
    });

require __DIR__.'/auth.php';
