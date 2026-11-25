<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cart_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->string('variant_label', 80)->nullable();
            $table->unsignedTinyInteger('quantity')->default(1);

            $table->unique(['cart_id', 'product_id', 'variant_label'], 'uq_cart_line');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cart_items');
    }
};

