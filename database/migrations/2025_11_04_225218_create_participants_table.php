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
        Schema::create('participants', function (Blueprint $table) {
            $table->id();
            
            // Información general
            $table->string('email')->unique();
            $table->string('category');

            // Información del participante o representante
            $table->string('name');
            $table->string('role')->nullable();
            $table->string('organization')->nullable();
            $table->string('city_country')->nullable();
            $table->string('secondary_email')->nullable();
            $table->string('phone')->nullable();
            $table->string('linkedin')->nullable();

            // Descripción del proyecto
            $table->string('project_title');
            $table->text('project_description')->nullable();
            $table->text('project_results')->nullable();
            $table->text('project_uniqueness')->nullable();

            // Material de apoyo
            $table->json('support_links')->nullable();
            $table->json('complementary_files')->nullable();
            $table->json('photos')->nullable();

            // Referencia o contacto
            $table->string('reference_name')->nullable();
            $table->string('reference_role')->nullable();
            $table->string('reference_organization')->nullable();
            $table->string('reference_email')->nullable(); 

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('participants');
    }
};
