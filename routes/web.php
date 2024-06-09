<?php

use Illuminate\Support\Facades\Route;

// Rota para a página inicial
Route::get('/', function () {
    return view('welcome');
})->name('welcome');

// Rotas autenticadas
Route::middleware(['auth:sanctum',config('jetstream.auth_session'),'verified',])->group(function () {
    // Rota para o dashboard
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');

    // Rotas para o CRUD de usuários
    Route::prefix('user')->name('admin.user.')->group(function () {
        Route::get('index', 'UserController@index')->name('index');
        Route::get('create', 'UserController@create')->name('create');
        Route::post('store', 'UserController@store')->name('store');
        Route::get('show/{id}', 'UserController@show')->name('show');
        Route::get('edit/{id}', 'UserController@edit')->name('edit');
        Route::put('update/{id}', 'UserController@update')->name('update');
        Route::delete('destroy/{id}', 'UserController@destroy')->name('destroy');
        Route::get('purge/{id}', 'UserController@purge')->name('purge');
    });

    // Rotas para o CRUD de desafios
    Route::prefix('challenge')->name('admin.challenge.')->group(function () {
        Route::get('index', 'ChallengeController@index')->name('index');
        Route::get('create', 'ChallengeController@create')->name('create');
        Route::post('store', 'ChallengeController@store')->name('store');
        Route::get('show/{id}', 'ChallengeController@show')->name('show');
        Route::get('edit/{id}', 'ChallengeController@edit')->name('edit');
        Route::put('update/{id}', 'ChallengeController@update')->name('update');
        Route::delete('destroy/{id}', 'ChallengeController@destroy')->name('destroy');
    });

    // Rotas para o CRUD de produtos
    Route::prefix('product')->name('admin.product.')->group(function () {
        Route::get('index', 'ProductController@index')->name('index');
        Route::get('create', 'ProductController@create')->name('create');
        Route::post('store', 'ProductController@store')->name('store');
        Route::get('show/{id}', 'ProductController@show')->name('show');
        Route::get('edit/{id}', 'ProductController@edit')->name('edit');
        Route::put('update/{id}', 'ProductController@update')->name('update');
        Route::delete('destroy/{id}', 'ProductController@destroy')->name('destroy');
    });

    // Rotas para o CRUD de times
    Route::prefix('team')->name('admin.team.')->group(function () {
        Route::get('index', 'TeamController@index')->name('index');
        Route::get('create', 'TeamController@create')->name('create');
        Route::post('store', 'TeamController@store')->name('store');
        Route::get('show/{id}', 'TeamController@show')->name('show');
        Route::get('edit/{id}', 'TeamController@edit')->name('edit');
        Route::put('update/{id}', 'TeamController@update')->name('update');
        Route::delete('destroy/{id}', 'TeamController@destroy')->name('destroy');
    });

    // Rotas para o CRUD de guildas
    Route::prefix('guild')->name('admin.guild.')->group(function () {
        Route::get('index', 'GuildController@index')->name('index');
        Route::get('create', 'GuildController@create')->name('create');
        Route::post('store', 'GuildController@store')->name('store');
        Route::get('show/{id}', 'GuildController@show')->name('show');
        Route::get('edit/{id}', 'GuildController@edit')->name('edit');
        Route::put('update/{id}', 'GuildController@update')->name('update');
        Route::delete('destroy/{id}', 'GuildController@destroy')->name('destroy');
    });

    // Rotas para o CRUD de pontuações
    Route::prefix('score')->name('admin.score.')->group(function () {
        Route::get('index', 'ScoreController@index')->name('index');
        Route::get('create', 'ScoreController@create')->name('create');
        Route::post('store', 'ScoreController@store')->name('store');
        Route::get('show/{id}', 'ScoreController@show')->name('show');
        Route::get('edit/{id}', 'ScoreController@edit')->name('edit');
        Route::put('update/{id}', 'ScoreController@update')->name('update');
        Route::delete('destroy/{id}', 'ScoreController@destroy')->name('destroy');
    });

    // Rotas para o CRUD de chats
    Route::prefix('chat')->name('admin.chat.')->group(function () {
        Route::get('index', 'ChatController@index')->name('index');
        Route::get('create', 'ChatController@create')->name('create');
        Route::post('store', 'ChatController@store')->name('store');
        Route::get('show/{id}', 'ChatController@show')->name('show');
        Route::get('edit/{id}', 'ChatController@edit')->name('edit');
        Route::put('update/{id}', 'ChatController@update')->name('update');
        Route::delete('destroy/{id}', 'ChatController@destroy')->name('destroy');
    });

    // Rotas para o CRUD de mensagens
    Route::prefix('message')->name('admin.message.')->group(function () {
        Route::get('index', 'MessageController@index')->name('index');
        Route::get('create', 'MessageController@create')->name('create');
        Route::post('store', 'MessageController@store')->name('store');
        Route::get('show/{id}', 'MessageController@show')->name('show');
        Route::get('edit/{id}', 'MessageController@edit')->name('edit');
        Route::put('update/{id}', 'MessageController@update')->name('update');
        Route::delete('destroy/{id}', 'MessageController@destroy')->name('destroy');
    });
});
