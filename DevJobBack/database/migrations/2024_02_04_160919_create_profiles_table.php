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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->costrained('users')->onDelete('cascade');
            $table->date('fecha_nacimiento')->nullable();
            $table->text('telefono')->nullable();
            $table->text('linkedin')->nullable();
            $table->text('facebook')->nullable();
            $table->text('github')->nullable();
            $table->text('presentacion')->nullable();
            $table->string('direccion')->nullable();
            $table->string('nacionalidad')->nullable();
            $table->text('dni')->nullable();
            $table->text('email')->nullable();
            $table->string('foto')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
