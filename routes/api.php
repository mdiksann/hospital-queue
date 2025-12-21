<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PolyclinicController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:admin')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware('auth:admin')->group(function () {
    Route::get('/polyclinics', [PolyclinicController::class, 'index']);
    Route::post('/polyclinics', [PolyclinicController::class, 'store']);
    Route::put('/polyclinics/{polyclinic}', [PolyclinicController::class, 'update']);
    Route::delete('/polyclinics/{polyclinic}', [PolyclinicController::class, 'destroy']);
});