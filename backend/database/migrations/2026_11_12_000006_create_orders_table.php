<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number', 20)->unique();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('customer_name', 120);
            $table->string('email', 190);
            $table->string('phone', 20)->nullable();
            $table->string('address', 255);
            $table->string('city', 80);
            $table->decimal('subtotal', 10, 2);
            $table->decimal('discount', 10, 2)->default(0);
            $table->decimal('shipping', 10, 2)->default(0);
            $table->decimal('total', 10, 2);
            $table->foreignId('coupon_id')->nullable()->constrained()->nullOnDelete();
            $table->enum('payment_method', ['cod', 'card'])->default('cod');
            $table->enum('payment_status', ['pending', 'paid', 'refunded'])->default('pending');
            $table->enum('status', ['preparing', 'shipped', 'delivered', 'cancelled'])->default('preparing');
            $table->timestamps();

            $table->index('status', 'idx_ord_status');
            $table->index('created_at', 'idx_ord_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};

