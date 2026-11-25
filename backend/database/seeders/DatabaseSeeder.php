<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ── UTILISATEURS ──────────────────────────────────────────
        DB::table('users')->insert([
            ['name' => 'Admin DuniPretty',  'email' => 'admin@dunipretty.ma', 'phone' => '0522000000', 'password_hash' => Hash::make('Ddunia2005@/'), 'role' => 'admin',     'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Salma Benali',      'email' => 'salma@mail.ma',       'phone' => null,          'password_hash' => Hash::make('password'),      'role' => 'customer', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Yasmine El Fassi',  'email' => 'yasmine@mail.ma',     'phone' => null,          'password_hash' => Hash::make('password'),      'role' => 'customer', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Imane Alaoui',      'email' => 'imane@mail.ma',       'phone' => null,          'password_hash' => Hash::make('password'),      'role' => 'customer', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Nour Chraibi',      'email' => 'nour@mail.ma',        'phone' => null,          'password_hash' => Hash::make('password'),      'role' => 'customer', 'created_at' => now(), 'updated_at' => now()],
        ]);

        // ── ADRESSES ──────────────────────────────────────────────
        DB::table('addresses')->insert([
            ['user_id' => 2, 'label' => 'Domicile', 'full_name' => 'Salma Benali',     'phone' => null, 'address' => 'Adresse à compléter', 'city' => 'Casablanca', 'is_default' => 1],
            ['user_id' => 3, 'label' => 'Domicile', 'full_name' => 'Yasmine El Fassi', 'phone' => null, 'address' => 'Adresse à compléter', 'city' => 'Rabat',       'is_default' => 1],
            ['user_id' => 4, 'label' => 'Domicile', 'full_name' => 'Imane Alaoui',     'phone' => null, 'address' => 'Adresse à compléter', 'city' => 'Marrakech',   'is_default' => 1],
            ['user_id' => 5, 'label' => 'Domicile', 'full_name' => 'Nour Chraibi',     'phone' => null, 'address' => 'Adresse à compléter', 'city' => 'Tanger',      'is_default' => 1],
        ]);

        // ── CATÉGORIES ────────────────────────────────────────────
        DB::table('categories')->insert([
            ['slug' => 'skincare',  'name' => 'Soins visage',  'description' => 'Sérums, crèmes et nettoyants',   'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHV7QIaxnkmy12J9o-mVmdxx9Kx3dnnupUp2221P7Hr-q-PTqUuonfbUbPRRDP3pX106cyIEMDCwuUR15IObcj7_Zl6GFqmNlwMuZvRJ-4GvxFV3OA4hsMRcxoGvUrDq28c5C-QMI3PFpu3V_V_ZRQ-1A8fjohmiZ-EoUPYKV7GxThNVY2dS0P7XoEmggSZP0mBnVOqs1TfHOgTbIBmAnSEz2fKqhlpxopZvRg3AA', 'sort_order' => 1],
            ['slug' => 'makeup',    'name' => 'Maquillage',    'description' => 'Teints et lèvres velours',       'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuBt_I3jhSJ-A9NAak-EYFQqmQSnmicCvapAt_UUyN2Bb66CNd_1B78oGw0mTuWVJPc1QOCmWdlogRofkZx9DT9KNJgRfpAwJNA8IBgXABMyBElbYTv0dk85uNnIn-aqeiVo5-UfcHxqNiCzragSOYkHCuz7PvaFsgsNPWrIDfhDANMupNXH9rBNKZ904qzsR_UBuSqT09o9l1dYFdb33xAUvpHSUWZ6teSB9WjCl_U', 'sort_order' => 2],
            ['slug' => 'haircare',  'name' => 'Cheveux',       'description' => 'Rituels botaniques',             'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR99u7Qo6B6Hy-FhhIM_hI80AyyG3g42zLYoTyouLA3nI3OTJhNIeM_Qm-PU8CpbfPwCv5zsM2-ldorykCXJzh0-Ge_rpZJ4W1vokIGsJKqwKFfOihgC4SG8OfQb2iqdkXCtN75l31zZdpEIUynBtfcUglf6Jwc-M4cyAq0A5YkU1VrDgW-ETS8GDp5RUKTsofvUgmQpsfz7YXfhM0cViBHqarFK1XrfyWHK5wm-M', 'sort_order' => 3],
            ['slug' => 'bodycare',  'name' => 'Corps',         'description' => 'Laits et huiles soyeux',        'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNHlDQXa9IvaOonLkAqJXh4R5Fcis0ahy9ODIvolZ84TSnbeuzGkGjKDPhj4pCfpS2QETdMQIS8shyT_tFJ1z1DXRSUBbHUalmynh5Ti-G7r_Ur0YO4JAgxVevEIuVS6oKWvtMJyZz-bzAHEfJCThpMvHpjsaw2fGYIoSRi8nwhVFWHiUnWud0-5oCxzj1aCUm8YK20bKX8632mw8FFMuRK_PUP9UVIBOK-xdFd0Q', 'sort_order' => 4],
            ['slug' => 'suncare',   'name' => 'Solaire',       'description' => 'Protection minérale SPF 50',    'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdYqoFsYVi0BU_9z5v4dj4cqK7gtluRV60yt5KPEkO5BPDMwylIVXwB3RKzIIO9sPMjujbiv61mD4iEqSWx4TbRMUTEp8gyESY-1pgxGa2V03qVkVtDHUBZwoY5xSYGTiLaIsNpnMymTi_53ZHqe7zYsOdw1r38mZ3BDo-Tr17w1ARdlIeWnAhVS-40g3rfNQVvuBIk-Ki_mfCg-H6W76ZZuz5flTBAsXtj6Bv9ZA', 'sort_order' => 5],
            ['slug' => 'gifts',     'name' => 'Coffrets',      'description' => 'Idées cadeaux',                 'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL6I-gsO5TvzBKCRMZI6hdvWoZ-cIyGBEepVdSSo_LzTjB7qplOSJM_hvl-X4w2dgIPwgWGJKYCnsptwCNs8B8mtX_KxddRaJyP9oypccqc1wI8jtqBdGMVt62K3bmHguH642BLf2zuKxcRZI0bK2e7k_sBfrx4yWJuLHl0_PneBHvYTT-2wzwT4MnsnBocx7pfXjeTljdUoqpU0mC5fLj44yJHmTlaSkCUQ5b_kc', 'sort_order' => 6],
        ]);

        // ── PRODUITS ──────────────────────────────────────────────
        DB::table('products')->insert([
            ['sku' => 'DP-SKI-001', 'slug' => 'serum-niacinamide-10',          'name' => 'Sérum Niacinamide 10%',        'category_id' => 1, 'description' => "Sérum éclat qui affine le grain de peau et unifie le teint, enrichi à l'eau de rose de Damas.",         'ingredients' => 'Aqua, Glycerin, Niacinamide, Rosa Damascena Extract, Squalane, Panthenol, Tocopherol.', 'price' => 249, 'old_price' => 320,  'stock' => 42, 'rating' => 4.8, 'reviews_count' => 200, 'badge' => 'Best-seller', 'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCM8SM6z1Wx6qAeqsulslgrOom5TsGDk3wXEW2OsL2JJfXtfE4iITV4pyvBPkdtMrNPWlpJ3oLs3YUHdVvcqnIDi0ubG19C2k6H0dMhvwbwZKh0fQ-JUYwXG7A2ihxbc_f5K76H5ky0ZAe9dJCc2zw12A2OClw0b4wuAu0uQelVYejWr7QLykTwSHtkUf1HRY0CvcU-u02kpCPMwi5wQ4Ae3nOIWupMq41wb75mtbY', 'is_active' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['sku' => 'DP-SKI-002', 'slug' => 'nettoyant-doux-nuage',          'name' => 'Nettoyant Doux Nuage',         'category_id' => 1, 'description' => 'Mousse amino-acide ultra douce, sans sulfates, pour une peau nette et confortable.',                     'ingredients' => 'Aqua, Glycerin, Niacinamide, Rosa Damascena Extract, Squalane, Panthenol, Tocopherol.', 'price' => 169, 'old_price' => null,  'stock' => 60, 'rating' => 4.7, 'reviews_count' => 125, 'badge' => null,          'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuA744flTOBfTG_n-79cdc4MMS6lCHn3cNn7BtRkN1Pa4K_j7beuvRqbuEDYFTRldI9BR7p3p12PYHnwcOVu1KsDLFrQXLWyWPrPCZytSwmwz2yp301m0I8EluWRwvgXexQjk8djcMPD9xcfWJb1uwOJXm335wSa0NVTwKlQ52fCGYqRW0AbLwmXMRRL6kutbBmYzGJX2AT7MrZUrJgz59hXQzL_iTuYJll0IqqKDk0', 'is_active' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['sku' => 'DP-SKI-003', 'slug' => 'creme-gel-hydra-intense',       'name' => 'Crème Gel Hydra Intense',      'category_id' => 1, 'description' => "Gel-crème aux peptides pour 72 h d'hydratation rebondie, fini satiné.",                               'ingredients' => 'Aqua, Glycerin, Niacinamide, Rosa Damascena Extract, Squalane, Panthenol, Tocopherol.', 'price' => 289, 'old_price' => 349,  'stock' => 8,  'rating' => 4.9, 'reviews_count' => 165, 'badge' => '-17%',        'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKCtPrFAAUm4xCLj-1Fsu7IiL18sHbRnxH1zFurRyMu1aqHgyDJ7gRopal8kXApT65aR3_vxXAcx-SxCcu7geqPBvezc67pmOvM_UpNIFIhgCZMpJvcERbzuTZ1PhA58OTUlybNTWuiv9bxS7g3lOn_OG6knlzclD-ABN0jF6I1NcQ6yir232iCSWvpGeBfDR2mqF9nqJPiIOPQz1CFFhorKNeD-MA9sQXQilzXZk', 'is_active' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['sku' => 'DP-SKI-004', 'slug' => 'huile-botanique-reparatrice',   'name' => 'Huile Botanique Réparatrice',  'category_id' => 1, 'description' => "Huile sèche au squalane d'olive et camomille pour nourrir sans alourdir.",                             'ingredients' => 'Aqua, Glycerin, Niacinamide, Rosa Damascena Extract, Squalane, Panthenol, Tocopherol.', 'price' => 329, 'old_price' => null,  'stock' => 25, 'rating' => 4.6, 'reviews_count' => 74,  'badge' => null,          'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoiejzRBJ3MXCn6zv0kCI89PtMfQRiVoAd71ymZklVuQCMODXb3P7prtZ2c3FlKs1qin8N2ilAfKkZOJ97xAYANguPACRkkLvs4DltCshG8nL9081YPQ_pszXhg7GPaiur214Am1XLpehQ0qNH4pfHEiBIugoZaa7R30Ii1CPEc7atUW6ZUav-WvTZY_gJ2ETywj2BOwOlOFDP9SReXv3L8C76sfit-FDJXvzIF9Y', 'is_active' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['sku' => 'DP-SUN-005', 'slug' => 'creme-solaire-minerale-spf-50', 'name' => 'Crème Solaire Minérale SPF 50', 'category_id' => 5, 'description' => "Filtres minéraux invisibles, résistante à l'eau, idéale pour le climat marocain.",                   'ingredients' => 'Aqua, Glycerin, Niacinamide, Rosa Damascena Extract, Squalane, Panthenol, Tocopherol.', 'price' => 199, 'old_price' => null,  'stock' => 0,  'rating' => 4.5, 'reviews_count' => 98,  'badge' => null,          'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV5jPV2K7XcqZl0RsjQxizC5gDOuTc8OiIWCmcmJyiHQ9nCfvPTvvnC6mVkgnQkFTw_ClHMnQ2Q4b29W4RIgypZdbpLWzRv7QMB08HNzBOb9-t2mP7w07f185H3uv9pgcgAkA-9rgh7YNka01qAMQSpBew_BZ3IZwaGS52I10h9Bg1_Zq-FnXJHkxmaVZAwp8U7Eu3nyc7_EyJUmfnb4c7m9t3X9EBktEE0665R2M', 'is_active' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['sku' => 'DP-MAK-006', 'slug' => 'rouge-velours-mat',             'name' => 'Rouge Velours Mat',           'category_id' => 2, 'description' => 'Rouge à lèvres mat confortable, pigments riches, finition velours.',                                 'ingredients' => 'Aqua, Glycerin, Niacinamide, Rosa Damascena Extract, Squalane, Panthenol, Tocopherol.', 'price' => 149, 'old_price' => null,  'stock' => 33, 'rating' => 4.7, 'reviews_count' => 91,  'badge' => 'Nouveau',     'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUwuIRXcCRuFYoEWwRiFDm0sijL5tv6Km6kBOr9pYV5kZKiisZbv4eE0aC-hWEaD4m974mIeJGgNB0iCr_Lq3rjmiQAPypkvIC_5l5HtIc4KfDRAvFaY4GUDkMwc2w6X5dRFb4rzIluxjJ8vKOZAF_6yBraMcX9O3RdDgKutJALfwt2DWUox1geDguKFh8tWB4iJloUa-kjuMQj4yUIoLfoQTnJgJ4H0zfBjiwdMM', 'is_active' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['sku' => 'DP-SKI-007', 'slug' => 'masque-gelee-rose',             'name' => 'Masque Gelée Rose',           'category_id' => 1, 'description' => 'Masque gelée repulpant à appliquer 10 minutes pour un teint frais et lumineux.',                      'ingredients' => 'Aqua, Glycerin, Niacinamide, Rosa Damascena Extract, Squalane, Panthenol, Tocopherol.', 'price' => 219, 'old_price' => null,  'stock' => 19, 'rating' => 4.4, 'reviews_count' => 56,  'badge' => null,          'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcmnOxQIN0YrXp64BEWDAdSa9reTv5Nt84FfiNYeLnbEI6XsGhsiKqgJnrbbxhH0TSx0B7vQrqEAVEjZCliRXYxhRsMV431pNTLvJug_b_85mHMPovXV4anjv8yVO8R4x93x92HPGTxeOjqeeTGgPweRQaPxBDQH-RHc2VVahwvysKRC6IGS2z54BkDyZVlpVlZy0p7ZsMfvY7L2ksaVxXkPXCMXdyQEECT9Ed9yI', 'is_active' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['sku' => 'DP-SKI-008', 'slug' => 'contour-yeux-roll-on',          'name' => 'Contour Yeux Roll-On',        'category_id' => 1, 'description' => 'Applicateur rollerball rafraîchissant qui défatigue le regard.',                                     'ingredients' => 'Aqua, Glycerin, Niacinamide, Rosa Damascena Extract, Squalane, Panthenol, Tocopherol.', 'price' => 259, 'old_price' => 289,  'stock' => 14, 'rating' => 4.6, 'reviews_count' => 44,  'badge' => null,          'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqn2w_EXi_c9HVdxx-BldD2J_7YsMeIft8DkNWC-xuUXBU3W43WaYXffmKtkoy17jnoYd6IKQ9i10nVUTgNjLOSb0NUAueXKl7jpLwjqBc7CkT7fJV1WVVTTbJKJKmPxtO801yfQq9rwKEv6LB27eYNHEW05Uj1iXfdCbrIvDs5S1g92ge5EhdCNFsZSMCkJMcDvrhfhHiwsHZmNJZrD9G0ap1_5UH4a-tco2RanQ', 'is_active' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['sku' => 'DP-GIF-009', 'slug' => 'gua-sha-quartz-rose',           'name' => 'Gua Sha Quartz Rose',         'category_id' => 6, 'description' => 'Gua sha sculpté dans un vrai quartz rose pour un massage drainant.',                                 'ingredients' => 'Aqua, Glycerin, Niacinamide, Rosa Damascena Extract, Squalane, Panthenol, Tocopherol.', 'price' => 179, 'old_price' => null,  'stock' => 27, 'rating' => 4.9, 'reviews_count' => 210, 'badge' => null,          'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKxxIndDbcEhKyyNr7UDyH5BlD4CLvh2WuPwc9gWq5sjNw32kNVjGdu30elo_h2cXvDVF0dNcQY8ygJoml7ucIHZoJs5q3-AdN8GPbNFgtyWXvByOjjWbI2KVNKXoHm92nvrMqEZpBQvFl2HH2O2wq3Vt_FTEVE6ncVkGhFwsecaGDbWf7eLJq-OZvfY-MdFEYux34n9ecyL9JzvwCJfj-g80VGzL2nyKlaFjJDvY', 'is_active' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['sku' => 'DP-MAK-010', 'slug' => 'teinte-minerale-satin',         'name' => 'Teinte Minérale Satin',       'category_id' => 2, 'description' => 'Teinte légère modulable pour lèvres et joues, effet bonne mine.',                                    'ingredients' => 'Aqua, Glycerin, Niacinamide, Rosa Damascena Extract, Squalane, Panthenol, Tocopherol.', 'price' => 189, 'old_price' => null,  'stock' => 21, 'rating' => 4.5, 'reviews_count' => 63,  'badge' => null,          'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbCD7kgNgudsl1lEQ5nL8LYtaQYpQxjYQVC01AM4adp9La81O1njCgAntmD0VvsG_LgfLFhOeRD5r6i5FQbKCuu65jwVmU2eAl4cqV1ewuvBuLbKzlVjaYkScyVEkxLD2Vqv2pQlnOhRMs8n3zxvHoDo8WSbAClg1GNfH3B_eCtQhmco01EaekAcGq3x2mx2Y4oA', 'is_active' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['sku' => 'DP-BOD-011', 'slug' => 'lait-corps-eclat',              'name' => 'Lait Corps Éclat',            'category_id' => 4, 'description' => 'Lait corps à la vitamine C et au karité pour une peau lumineuse.',                                    'ingredients' => 'Aqua, Glycerin, Niacinamide, Rosa Damascena Extract, Squalane, Panthenol, Tocopherol.', 'price' => 159, 'old_price' => 199,  'stock' => 38, 'rating' => 4.6, 'reviews_count' => 87,  'badge' => null,          'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKST1JuXxC8M2ND4sVYE9nmJg-W9ltr271MiVfe9j-iefEnqRhtXyA6DUt8bOBS89fHoMrgypMUDFXpTCsRJtZrwrfVXwbINWB24Ph9x4-q92s9M_DSG2YqkI7xbFcEZoEhQo6yT3NC8FLEIY6aQAvxTObtdc9uJtlKTi2Z_wUsNvg1Wlv6JNp3EP3AioI0QbtltzIKkG94fmHUQA9-6oM6ZaPekeRMjfvAhnRZ1c', 'is_active' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['sku' => 'DP-GIF-012', 'slug' => 'coffret-decouverte-rose',       'name' => 'Coffret Découverte Rose',     'category_id' => 6, 'description' => 'Coffret de 5 miniatures best-sellers dans un écrin blush.',                                         'ingredients' => 'Aqua, Glycerin, Niacinamide, Rosa Damascena Extract, Squalane, Panthenol, Tocopherol.', 'price' => 449, 'old_price' => 560,  'stock' => 12, 'rating' => 4.9, 'reviews_count' => 132, 'badge' => 'Coffret',     'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL6I-gsO5TvzBKCRMZI6hdvWoZ-cIyGBEepVdSSo_LzTjB7qplOSJM_hvl-X4w2dgIPwgWGJKYCnsptwCNs8B8mtX_KxddRaJyP9oypccqc1wI8jtqBdGMVt62K3bmHguH642BLf2zuKxcRZI0bK2e7k_sBfrx4yWJuLHl0_PneBHvYTT-2wzwT4MnsnBocx7pfXjeTljdUoqpU0mC5fLj44yJHmTlaSkCUQ5b_kc', 'is_active' => 1, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // ── VARIANTES ─────────────────────────────────────────────
        DB::table('product_variants')->insert([
            ['product_id' => 1,  'label' => '30 ml',       'sort_order' => 0],
            ['product_id' => 1,  'label' => '50 ml',       'sort_order' => 1],
            ['product_id' => 2,  'label' => '100 ml',      'sort_order' => 0],
            ['product_id' => 2,  'label' => '200 ml',      'sort_order' => 1],
            ['product_id' => 3,  'label' => '50 ml',       'sort_order' => 0],
            ['product_id' => 4,  'label' => '30 ml',       'sort_order' => 0],
            ['product_id' => 5,  'label' => '50 ml',       'sort_order' => 0],
            ['product_id' => 5,  'label' => '100 ml',      'sort_order' => 1],
            ['product_id' => 6,  'label' => 'Dahlia 04',   'sort_order' => 0],
            ['product_id' => 6,  'label' => 'Rose Poudré', 'sort_order' => 1],
            ['product_id' => 6,  'label' => 'Baie Intense','sort_order' => 2],
            ['product_id' => 7,  'label' => '75 ml',       'sort_order' => 0],
            ['product_id' => 8,  'label' => '15 ml',       'sort_order' => 0],
            ['product_id' => 9,  'label' => 'Cœur',        'sort_order' => 0],
            ['product_id' => 9,  'label' => 'Classique',   'sort_order' => 1],
            ['product_id' => 10, 'label' => 'Dahlia 04',   'sort_order' => 0],
            ['product_id' => 10, 'label' => 'Pivoine 02',  'sort_order' => 1],
            ['product_id' => 11, 'label' => '250 ml',      'sort_order' => 0],
            ['product_id' => 11, 'label' => '400 ml',      'sort_order' => 1],
            ['product_id' => 12, 'label' => 'Unique',      'sort_order' => 0],
        ]);

        // ── COUPONS ───────────────────────────────────────────────
        DB::table('coupons')->insert([
            ['code' => 'GLOW15', 'discount_percent' => 15, 'is_active' => 1, 'uses_count' => 128, 'expires_at' => null],
            ['code' => 'DUNI10', 'discount_percent' => 10, 'is_active' => 1, 'uses_count' => 64,  'expires_at' => null],
        ]);

        // ── COMMANDES ─────────────────────────────────────────────
        DB::table('orders')->insert([
            ['order_number' => 'DP-10482', 'user_id' => 2, 'customer_name' => 'Salma Benali',     'email' => 'salma@mail.ma',   'phone' => null, 'address' => 'Adresse à compléter', 'city' => 'Casablanca', 'subtotal' => 537, 'discount' => 0, 'shipping' => 0,  'total' => 537, 'coupon_id' => null, 'payment_method' => 'cod', 'payment_status' => 'paid',    'status' => 'delivered', 'created_at' => '2026-11-08 14:30:00', 'updated_at' => '2026-11-08 14:30:00'],
            ['order_number' => 'DP-10475', 'user_id' => 3, 'customer_name' => 'Yasmine El Fassi', 'email' => 'yasmine@mail.ma', 'phone' => null, 'address' => 'Adresse à compléter', 'city' => 'Rabat',       'subtotal' => 249, 'discount' => 0, 'shipping' => 35, 'total' => 284, 'coupon_id' => null, 'payment_method' => 'cod', 'payment_status' => 'pending', 'status' => 'shipped',   'created_at' => '2026-11-06 14:30:00', 'updated_at' => '2026-11-06 14:30:00'],
            ['order_number' => 'DP-10461', 'user_id' => 4, 'customer_name' => 'Imane Alaoui',     'email' => 'imane@mail.ma',   'phone' => null, 'address' => 'Adresse à compléter', 'city' => 'Marrakech',   'subtotal' => 726, 'discount' => 0, 'shipping' => 0,  'total' => 726, 'coupon_id' => null, 'payment_method' => 'cod', 'payment_status' => 'pending', 'status' => 'preparing', 'created_at' => '2026-11-04 14:30:00', 'updated_at' => '2026-11-04 14:30:00'],
            ['order_number' => 'DP-10450', 'user_id' => 5, 'customer_name' => 'Nour Chraibi',     'email' => 'nour@mail.ma',    'phone' => null, 'address' => 'Adresse à compléter', 'city' => 'Tanger',      'subtotal' => 149, 'discount' => 0, 'shipping' => 35, 'total' => 184, 'coupon_id' => null, 'payment_method' => 'cod', 'payment_status' => 'pending', 'status' => 'cancelled', 'created_at' => '2026-11-02 14:30:00', 'updated_at' => '2026-11-02 14:30:00'],
            ['order_number' => 'DP-10441', 'user_id' => 2, 'customer_name' => 'Salma Benali',     'email' => 'salma@mail.ma',   'phone' => null, 'address' => 'Adresse à compléter', 'city' => 'Casablanca', 'subtotal' => 418, 'discount' => 0, 'shipping' => 35, 'total' => 453, 'coupon_id' => null, 'payment_method' => 'cod', 'payment_status' => 'paid',    'status' => 'delivered', 'created_at' => '2026-10-28 14:30:00', 'updated_at' => '2026-10-28 14:30:00'],
        ]);

        // ── LIGNES DE COMMANDE ────────────────────────────────────
        DB::table('order_items')->insert([
            ['order_id' => 1, 'product_id' => 2,  'product_name' => 'Nettoyant Doux Nuage',    'variant_label' => '100 ml',   'unit_price' => 169, 'quantity' => 1],
            ['order_id' => 1, 'product_id' => 6,  'product_name' => 'Rouge Velours Mat',       'variant_label' => 'Dahlia 04','unit_price' => 149, 'quantity' => 1],
            ['order_id' => 1, 'product_id' => 7,  'product_name' => 'Masque Gelée Rose',       'variant_label' => '75 ml',    'unit_price' => 219, 'quantity' => 1],
            ['order_id' => 2, 'product_id' => 1,  'product_name' => 'Sérum Niacinamide 10%',  'variant_label' => '30 ml',    'unit_price' => 249, 'quantity' => 1],
            ['order_id' => 3, 'product_id' => 1,  'product_name' => 'Sérum Niacinamide 10%',  'variant_label' => '30 ml',    'unit_price' => 249, 'quantity' => 1],
            ['order_id' => 3, 'product_id' => 2,  'product_name' => 'Nettoyant Doux Nuage',   'variant_label' => '100 ml',   'unit_price' => 169, 'quantity' => 1],
            ['order_id' => 3, 'product_id' => 6,  'product_name' => 'Rouge Velours Mat',      'variant_label' => 'Dahlia 04','unit_price' => 149, 'quantity' => 1],
            ['order_id' => 3, 'product_id' => 11, 'product_name' => 'Lait Corps Éclat',       'variant_label' => '250 ml',   'unit_price' => 159, 'quantity' => 1],
            ['order_id' => 4, 'product_id' => 6,  'product_name' => 'Rouge Velours Mat',      'variant_label' => 'Dahlia 04','unit_price' => 149, 'quantity' => 1],
            ['order_id' => 5, 'product_id' => 1,  'product_name' => 'Sérum Niacinamide 10%', 'variant_label' => '30 ml',    'unit_price' => 249, 'quantity' => 1],
            ['order_id' => 5, 'product_id' => 2,  'product_name' => 'Nettoyant Doux Nuage',  'variant_label' => '100 ml',   'unit_price' => 169, 'quantity' => 1],
        ]);

        // ── AVIS ──────────────────────────────────────────────────
        DB::table('reviews')->insert([
            ['product_id' => 1, 'user_id' => 2, 'author' => 'Salma B.',  'rating' => 5, 'comment' => 'Ma peau est transformée, texture divine.',  'status' => 'published', 'created_at' => now()],
            ['product_id' => 3, 'user_id' => 4, 'author' => 'Imane A.', 'rating' => 4, 'comment' => "Très hydratante, j'adore le pot.",            'status' => 'pending',   'created_at' => now()],
            ['product_id' => 6, 'user_id' => 5, 'author' => 'Nour C.',  'rating' => 3, 'comment' => 'Belle couleur mais tenue moyenne.',           'status' => 'pending',   'created_at' => now()],
        ]);

        // ── FAVORIS ───────────────────────────────────────────────
        DB::table('wishlists')->insert([
            ['user_id' => 2, 'product_id' => 1, 'created_at' => now()],
            ['user_id' => 2, 'product_id' => 9, 'created_at' => now()],
            ['user_id' => 3, 'product_id' => 3, 'created_at' => now()],
        ]);

        // ── MOUVEMENTS DE STOCK ───────────────────────────────────
        $stockMovements = [];
        foreach (range(1, 12) as $productId) {
            $product = DB::table('products')->where('id', $productId)->first();
            $stockMovements[] = ['product_id' => $productId, 'delta' => $product->stock, 'reason' => 'purchase', 'order_id' => null, 'created_at' => now()];
        }
        DB::table('inventory_movements')->insert($stockMovements);

        // ── BLOG ──────────────────────────────────────────────────
        DB::table('posts')->insert([
            ['slug' => 'le-rituel-de-la-rose-de-damas',              'title' => 'Le rituel de la rose de Damas',              'tag' => 'Ingrédients', 'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuAie35cpEVEzlo9QI5FsWL6_lHU6AKQyvjp5lyNFoWsc-LC3d1-AwIcy6bxt2zkPWvHkK7rrsHPMsli_JD9k6RHL-e_sxNU_-c8SAeh-l8j7hK-gvxSpYsxREh0xQgOZSQfztCR-JTNAprqerasFL6IlUfICiAHgk6Rt7xK1Kk0lHTToGOxBjqLOHq8SpYQOzGsVbU1mR7NG_Yo9IskScA00GzML8JkEQG-FhWfuqg', 'content' => "Cueillie à l'aube, la rose de Damas concentre des polyphénols apaisants. Découvrez comment nous la distillons à froid pour préserver son parfum et ses bienfaits.", 'published_at' => '2026-10-20 09:00:00'],
            ['slug' => 'routine-matin-soir-le-rythme-circadien',     'title' => 'Routine matin & soir : le rythme circadien', 'tag' => 'Routines',    'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCklrMClTBfnxqwiBy72OvuHB2khbzEImCpQQn5XD04w17LPl-ivjL8LpOuRbiVNAmW99LSzWqrwMFwRSzmS48Q-kV6RQe6R-Uc7QFpTueplUH1kJMV0qAVGEYXJyLkyZkCQLtF1K_qXkXgceU09I7HOCnFQBYIEAApm0DS5E2sKKfrgJnhJ6De3b3egylyJx1V8yRm8qXaaooMEZalvk8xeiYEV9HzYhU-PV8xmxM', 'content' => 'Le matin protège, le soir répare. Voici comment construire une routine en 4 étapes adaptée au climat marocain.', 'published_at' => '2026-10-17 09:00:00'],
            ['slug' => 'tremella-vs-acide-hyaluronique',             'title' => 'Tremella vs acide hyaluronique',             'tag' => 'Science',     'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYICXMgAyyRzCYTdp-lI2tHGG1INU08glxhcLiW-CBO9KxLFkO_2swUFFj5eekvd0UqHsSw6s4jsxMndO5wh3mnVAIEprYmzrCXhgDg_L0I0e85dq5HneQWKf8WmWP9PYURy3nH1M6Sf7ikif3L8KG3Bk1AcJIvAAHDi4pwSZJXYUFBVRT7hf0d2unVXmn5vvagGR4SIX_wnjEvfv3Z57neyG7Eop1Pqri7MJAD2s', 'content' => "Deux humectants, deux textures. Nous comparons leur capacité de rétention d'eau et leurs usages idéaux.", 'published_at' => '2026-10-14 09:00:00'],
            ['slug' => 'recolte-durable-dans-les-alpes-maritimes',   'title' => 'Récolte durable dans les Alpes maritimes',   'tag' => 'Engagements', 'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcK2Kld2cZT_B4AlNZ19NywnwF-B1XeifnBeI8BTo31-a-gKLLprENwDpfsvCfkwBJw6VEyb3ydttFh89LDlLKKgHfaiiEvY0vADAIFS6LoETfY6eezCwoeBqmPfJabtTTWSZI4iV1oj8wWN7JM-I_WdBPcSN5PonIqNutch7O8Ct1cMgM48xB1QCNjHoBnfLq6YBn9ADjbpEo6i1SR7IUOVAq_nwcB9zQNo_2gK0', 'content' => 'Notre charte de cueillette respectueuse préserve la biodiversité et soutient les producteurs locaux.', 'published_at' => '2026-10-11 09:00:00'],
        ]);

        // ── FAQ ───────────────────────────────────────────────────
        DB::table('faqs')->insert([
            ['question' => 'Quels sont les délais de livraison au Maroc ?',  'answer' => 'Casablanca et Rabat : 24 à 48 h. Autres villes : 2 à 4 jours ouvrés. Livraison offerte dès 500 DH.', 'sort_order' => 1],
            ['question' => 'Puis-je payer à la livraison ?',                'answer' => 'Oui, le paiement à la livraison est disponible partout au Maroc, ainsi que le paiement par carte.',  'sort_order' => 2],
            ['question' => 'Comment retourner un produit ?',                'answer' => 'Vous disposez de 15 jours pour retourner un produit non ouvert. Contactez-nous pour une étiquette de retour.', 'sort_order' => 3],
            ['question' => 'Vos produits sont-ils testés sur les animaux ?', 'answer' => 'Jamais. DuniPretty est 100 % cruelty-free et propose des formules propres et dermatologiquement testées.', 'sort_order' => 4],
            ['question' => 'Comment utiliser un code promo ?',              'answer' => 'Saisissez votre code (ex. GLOW15) dans le panier ou à l\'étape de paiement.', 'sort_order' => 5],
        ]);

        // ── PARAMÈTRES ────────────────────────────────────────────
        DB::table('settings')->insert([
            ['key' => 'shop_name',              'value' => 'DuniPretty'],
            ['key' => 'contact_email',          'value' => 'contact@dunipretty.ma'],
            ['key' => 'shipping_fee',           'value' => '35'],
            ['key' => 'free_shipping_threshold','value' => '500'],
            ['key' => 'currency',               'value' => 'MAD'],
        ]);
    }
}
