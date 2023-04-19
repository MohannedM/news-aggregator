<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\NewsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected Routes
Route::group(['middleware' => ['auth:sanctum', 'check.auth.handler']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/get-user-data', [AuthController::class, 'getUserData']);
    Route::get('/get-search-params', [NewsController::class, 'getSearchParams']);
    Route::get('/get-news-feed', [NewsController::class, 'getNewsFeed']);
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
