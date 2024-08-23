<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductsController extends Controller
{
    // Create a new product
    public function create(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'nullable',
            'quantity'=>'nullable',
            'image' => 'nullable',

        ]);

        // Handle image file upload if present
        if ($request->hasFile('image')) {
            // Store the image in a public directory and get the file path
            $imagePath = $request->file('image')->store('images', 'public');
            $validatedData['image'] = $imagePath;
        }

        // Create the product with the validated data
        $product = Product::create($validatedData);

        return response()->json([
            'message' => 'Product created successfully!',
            'product' => $product,
        ], 201);
    }

    // Update an existing product
    public function update(Request $request, $id)
    {
        // Find the product by ID
        $product = Product::findOrFail($id);

        // Validate the incoming request data
        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric|min:0',
            'stock' => 'sometimes|required|integer|min:0',
            'image' => 'nullable',
        ]);

        // Handle image file upload if present
        if ($request->hasFile('image')) {
            // Delete the old image file if it exists
            if ($product->image && Storage::exists('public/' . $product->image)) {
                Storage::delete('public/' . $product->image);
            }

            // Store the new image and update the path
            $imagePath = $request->file('image')->store('images', 'public');
            $validatedData['image'] = $imagePath;
        }

        // Update the product with the validated data
        $product->update($validatedData);

        return response()->json([
            'message' => 'Product updated successfully!',
            'product' => $product,
        ], 200);
    }

    // Get a list of all products
    public function index()
    {
        $products = Product::all();

        return response()->json([
            'products' => $products,
        ], 200);
    }

    // Get details of a specific product
    public function show($id)
    {
        $product = Product::findOrFail($id);

        return response()->json([
            'product' => $product,
        ], 200);
    }

    // Delete a product
    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        // Delete the image file if it exists
        if ($product->image && Storage::exists('public/' . $product->image)) {
            Storage::delete('public/' . $product->image);
        }

        // Delete the product
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully!',
        ], 200);
    }
}
