<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('rewards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('championship_id')->constrained(); // Link to championship
            $table->decimal('amount_mc', 10, 2); // Amount in MambaCoins
            $table->string('status')->default('pending'); // pending, processed, rejected
            $table->string('description');
            $table->timestamp('processed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('rewards');
    }
};