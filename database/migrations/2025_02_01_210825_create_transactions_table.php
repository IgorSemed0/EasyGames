<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('transaction_type_id')->constrained('transaction_types');
            $table->decimal('amount', 10, 2);
            $table->string('status')->default('pending'); // pending, processed, rejected
            $table->text('description')->nullable();
            $table->nullableMorphs('transactionable'); // For linking to championships, store items, etc.
            $table->json('metadata')->nullable(); // For additional data
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            //
        });
    }
};
