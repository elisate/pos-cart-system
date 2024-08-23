<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CartController;


// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::group(['middleware' => 'auth:sanctum'], function() {
    // Cart Routes
Route::post('/cart/add', [CartController::class, 'addProduct']);
Route::delete('/cart/remove', [CartController::class, 'removeProduct']);
Route::get('/cart/products', [CartController::class, 'getCartProducts']);
Route::put('/cart/update-quantity', [CartController::class, 'updateQuantity']);
Route::get('/cart/total-quantity', [CartController::class, 'getTotalQuantity']);



    // Cart Item Routes

});


//products routes
Route::get('/product', [ProductsController::class, 'index']);
    Route::post('/create', [ProductsController::class, 'create']);
    Route::get('/show/{id}', [ProductsController::class, 'show']);
    Route::put('/update/{id}', [ProductsController::class, 'update']);
    Route::delete('/delete/{id}', [ProductsController::class, 'destroy']);


//user routes
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
