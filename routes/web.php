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
                Route::get('index', ['as' => 'Admin.User.UserIndex', 'uses' => 'App\Http\Controllers\Admin\UserController@index']);
                Route::post('create', ['as' => 'Admin.User.create', 'uses' => 'App\Http\Controllers\UserController@create']);
                Route::put('update/{id}', ['as' => 'Admin.User.update', 'uses' => 'App\Http\Controllers\UserController@update']);
                Route::get('destroy/{id}', ['as' => 'Admin.User.destroy', 'uses' => 'App\Http\Controllers\UserController@destroy']);
            });
            
            Route::prefix('ecoins')->group(function () {
                Route::get('index', ['as' => 'admin.painel.perguntafrequente.index', 'uses' => 'App\Http\Controllers\admin\publico\PerguntaFrequenteController@index']);
                Route::post('create', ['as' => 'admin.painel.perguntafrequente.create', 'uses' => 'App\Http\Controllers\admin\publico\PerguntaFrequenteController@create']);
                Route::put('update/{id}', ['as' => 'admin.painel.perguntafrequente.update', 'uses' => 'App\Http\Controllers\admin\publico\PerguntaFrequenteController@update']);
                Route::get('destroy/{id}', ['as' => 'admin.painel.perguntafrequente.destroy', 'uses' => 'App\Http\Controllers\admin\publico\PerguntaFrequenteController@destroy']);
            });
            
            Route::prefix('championships')->group(function () {
                Route::get('index', ['as' => 'admin.painel.perguntafrequente.index', 'uses' => 'App\Http\Controllers\admin\publico\PerguntaFrequenteController@index']);
                Route::post('create', ['as' => 'admin.painel.perguntafrequente.create', 'uses' => 'App\Http\Controllers\admin\publico\PerguntaFrequenteController@create']);
                Route::put('update/{id}', ['as' => 'admin.painel.perguntafrequente.update', 'uses' => 'App\Http\Controllers\admin\publico\PerguntaFrequenteController@update']);
                Route::get('destroy/{id}', ['as' => 'admin.painel.perguntafrequente.destroy', 'uses' => 'App\Http\Controllers\admin\publico\PerguntaFrequenteController@destroy']);
            });
            
            Route::prefix('store')->group(function () {
                Route::get('index', ['as' => 'admin.painel.perguntafrequente.index', 'uses' => 'App\Http\Controllers\admin\publico\PerguntaFrequenteController@index']);
                Route::post('create', ['as' => 'admin.painel.perguntafrequente.create', 'uses' => 'App\Http\Controllers\admin\publico\PerguntaFrequenteController@create']);
                Route::put('update/{id}', ['as' => 'admin.painel.perguntafrequente.update', 'uses' => 'App\Http\Controllers\admin\publico\PerguntaFrequenteController@update']);
                Route::get('destroy/{id}', ['as' => 'admin.painel.perguntafrequente.destroy', 'uses' => 'App\Http\Controllers\admin\publico\PerguntaFrequenteController@destroy']);
            });

        Route::get('dashboard', function () {
            return Inertia::render('Admin/AdminDashboard');
        })->name('dashboard');
        });

       
    });

require __DIR__.'/auth.php';
