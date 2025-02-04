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
         Schema::create('championship_participants', function (Blueprint $table) {
             $table->id();
             $table->foreignId('championship_id')->constrained()->onDelete('cascade');
             $table->foreignId('user_id')->constrained()->onDelete('cascade');
             $table->string('team_name')->nullable(); // For duo/squad games
             $table->integer('placement')->nullable(); // Final position in championship
             $table->boolean('is_paid')->default(false);
             $table->timestamps();
         });
     }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('championship_participants');
    }
};
