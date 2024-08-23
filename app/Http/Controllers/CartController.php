<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    // Add a product to the cart (unchanged)
    public function addProduct(Request $request)
    {
        // Validate the request input
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        // Find the user's cart or create a new one
        $cart = Cart::firstOrCreate(
            ['user_id' => $request->user_id, 'product_id' => $request->product_id],
            ['quantity' => 0] // Set initial quantity to 0 for new entries
        );

        // Update quantity or create a new cart item
        $cart->quantity += $request->quantity;
        $cart->save();

        return response()->json([
            'message' => 'Product added to cart successfully!',
            'cart' => $cart,
        ], 200);
    }

    // Remove a product from the cart (unchanged)
    public function removeProduct(Request $request)
    {
        // Validate the request input
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'product_id' => 'required|exists:products,id',
        ]);

        // Find the user's cart
        $cart = Cart::where('user_id', $request->user_id)
                    ->where('product_id', $request->product_id)
                    ->firstOrFail();

        // Remove the product from the cart
        $cart->delete();

        return response()->json([
            'message' => 'Product removed from cart successfully!',
        ], 200);
    }

    // Get only the product details for items in the cart
    public function getCartProducts(Request $request)
    {
        // Validate the request input
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        // Retrieve the products related to the cart items for the user
        $products = Cart::where('user_id', $request->user_id)
                        ->with('product:id,name,description,price,image') // Retrieve only the relevant fields
                        ->get()
                        ->pluck('product') // Get only the product details
                        ->unique('id'); // Ensure products aren't duplicated

        return response()->json([
            'products' => $products,
        ], 200);
    }
}
