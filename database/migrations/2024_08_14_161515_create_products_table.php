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
        Schema::create('products', function (Blueprint $table) {
            $table->id(); // Primary key (product_id)
            $table->string('name'); // Product name
            $table->string('description')->nullable(); // Product description
             $table->string('quantity')->nullable();
            $table->decimal('price'); // Product price
            $table->string('image'); // Product image URL or path
            // Optionally add stock if required:
            // $table->integer('stock')->default(0); // Available stock quantity
            $table->timestamps(); // Created at and updated at timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
