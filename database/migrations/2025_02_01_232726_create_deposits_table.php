<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('deposits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->decimal('amount_kz', 10, 2); // Amount in Kwanza
            $table->decimal('amount_mc', 10, 2); // Amount in MambaCoins
            $table->string('payment_hash')->unique(); // Unique code for payment confirmation
            $table->string('status')->default('pending'); // pending, confirmed, rejected
            $table->string('phone_number'); // User's phone number for ME
            $table->text('notes')->nullable();
            $table->timestamp('confirmed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('deposits');
    }
};