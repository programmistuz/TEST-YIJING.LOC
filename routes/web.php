<?php

use Illuminate\Support\Facades\Route;

// любой запрос для одностраничника SPA
Route::get('{any}', function () {
    return view('welcome');
})->where('any', '.*');
