<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HistoreController;

use Illuminate\Http\Request;

// авторизация
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

// история
Route::post('/histore_save', [HistoreController::class, 'histore_save']);
Route::post('/histore_load', [HistoreController::class, 'histore_load']);

// профиль
Route::post('/edit_profile', [AuthController::class, 'edit_profile']);
Route::post('/update_profile', [AuthController::class, 'update_profile']);
