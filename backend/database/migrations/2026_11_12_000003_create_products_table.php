<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('sku', 40)->unique();
            $table->string('slug', 160)->unique();
            $table->string('name', 190);
            $table->foreignId('category_id')->constrained();
            $table->text('description');
            $table->text('ingredients')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('old_price', 10, 2)->nullable();
            $table->integer('stock')->default(0);
            $table->decimal('rating', 2, 1)->default(0);
            $table->integer('reviews_count')->default(0);
            $table->string('badge', 40)->nullable();
            $table->string('image_url', 600)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index('category_id', 'idx_prod_cat');
            $table->index('price', 'idx_prod_price');
            $table->fullText(['name', 'description'], 'idx_prod_search');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

