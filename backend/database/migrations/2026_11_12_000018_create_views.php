<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement('DROP VIEW IF EXISTS v_customer_stats');
        DB::statement('DROP VIEW IF EXISTS v_low_stock');
        DB::statement('DROP VIEW IF EXISTS v_daily_sales');

        DB::statement("
            CREATE VIEW v_customer_stats AS
            SELECT u.id, u.name, u.email,
                   COUNT(o.id) AS orders_count,
                   COALESCE(SUM(CASE WHEN o.status <> 'cancelled' THEN o.total END), 0) AS total_spent
            FROM users u
            LEFT JOIN orders o ON o.user_id = u.id
            WHERE u.role = 'customer'
            GROUP BY u.id, u.name, u.email
        ");

        DB::statement("
            CREATE VIEW v_low_stock AS
            SELECT id, sku, name, stock
            FROM products
            WHERE stock < 10 AND is_active = 1
            ORDER BY stock
        ");

        DB::statement("
            CREATE VIEW v_daily_sales AS
            SELECT DATE(created_at) AS day,
                   COUNT(*) AS orders_count,
                   SUM(total) AS revenue
            FROM orders
            WHERE status <> 'cancelled'
            GROUP BY DATE(created_at)
            ORDER BY day
        ");
    }

    public function down(): void
    {
        DB::statement('DROP VIEW IF EXISTS v_customer_stats');
        DB::statement('DROP VIEW IF EXISTS v_low_stock');
        DB::statement('DROP VIEW IF EXISTS v_daily_sales');
    }
};

