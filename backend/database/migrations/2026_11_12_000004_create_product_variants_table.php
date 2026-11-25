<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->string('label', 80);
            $table->integer('sort_order')->default(0);

            $table->unique(['product_id', 'label'], 'uq_variant');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_variants');
    }
};

