<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'price', 'image'];

    // Relationship with Cart using a pivot table
    public function carts()
    {
        return $this->belongsToMany(Cart::class)->withPivot('quantity');
    }
}
