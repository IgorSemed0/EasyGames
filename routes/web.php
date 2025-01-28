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
        Route::prefix('admin')->group(function () {
                        
            Route::prefix('users')->group(function () {
                Route::get('index', ['as' => 'admin.user.index', 'uses' => 'App\Http\Controllers\Admin\UserController@index']);
                Route::post('create', ['as' => 'admin.user.create', 'uses' => 'App\Http\Controllers\UserController@create']);
                Route::put('update/{id}', ['as' => 'admin.user.update', 'uses' => 'App\Http\Controllers\UserController@update']);
                Route::get('destroy/{id}', ['as' => 'admin.user.destroy', 'uses' => 'App\Http\Controllers\UserController@destroy']);
            });
            
            Route::prefix('ecoins')->group(function () {
                Route::get('index', ['as' => 'admin.ecoin.index', 'uses' => 'App\Http\Controllers\Admin\ECoinController@index']);
                Route::post('create', ['as' => 'admin.ecoin.create', 'uses' => 'App\Http\Controllers\Admin\ECoinController@create']);
                Route::put('update/{id}', ['as' => 'admin.ecoin.update', 'uses' => 'App\Http\Controllers\Admin\ECoinController@update']);
                Route::get('destroy/{id}', ['as' => 'admin.ecoin.destroy', 'uses' => 'App\Http\Controllers\Admin\ECoinController@destroy']);
            });
            
            Route::prefix('championships')->group(function () {
                Route::get('index', ['as' => 'admin.championships.index', 'uses' => 'App\Http\Controllers\Admin\ChampionshipController@index']);
                Route::post('create', ['as' => 'admin.championships.create', 'uses' => 'App\Http\Controllers\Admin\ChampionshipController@create']);
                Route::put('update/{id}', ['as' => 'admin.championships.update', 'uses' => 'App\Http\Controllers\Admin\ChampionshipController@update']);
                Route::get('destroy/{id}', ['as' => 'admin.championships.destroy', 'uses' => 'App\Http\Controllers\Admin\ChampionshipController@destroy']);
            });
            
            Route::prefix('store')->group(function () {
                Route::get('index', ['as' => 'admin.store.index', 'uses' => 'App\Http\Controllers\admin\publico\StoreController@index']);
                Route::post('create', ['as' => 'admin.store.create', 'uses' => 'App\Http\Controllers\admin\publico\StoreController@create']);
                Route::put('update/{id}', ['as' => 'admin.store.update', 'uses' => 'App\Http\Controllers\admin\publico\StoreController@update']);
                Route::get('destroy/{id}', ['as' => 'admin.store.destroy', 'uses' => 'App\Http\Controllers\admin\publico\StoreController@destroy']);
            });

        Route::get('dashboard', function () {
            return Inertia::render('Admin/AdminDashboard');
        })->name('dashboard');
        });

       
    });

require __DIR__.'/auth.php';
