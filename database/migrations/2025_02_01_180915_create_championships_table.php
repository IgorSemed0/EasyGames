<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
     public function up()
     {
         Schema::create('championships', function (Blueprint $table) {
             $table->id();
             $table->string('name');
             $table->text('description');
             $table->string('image_url')->nullable();
             $table->foreignId('game_id')->constrained();
             $table->enum('game_type', ['solo', 'duo', 'squad']);
             $table->integer('player_limit');
             $table->decimal('prize_pool', 10, 2); // In MambaCoins
             $table->dateTime('start_date');
             $table->dateTime('end_date');
             $table->enum('status', ['pending', 'active', 'finished'])->default('pending');
             $table->timestamps();
         });
     }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('championships');
    }
};
