<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PolyclinicController;
use App\Http\Controllers\QueueController;
use App\Models\Polyclinic;

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

// Public route untuk mendapatkan daftar poliklinik yang aktif
Route::get('/polyclinics/active', [PolyclinicController::class, 'getActivePolyclinics']);

// Public route untuk pasien membuat antrian
Route::post('/queues', [QueueController::class, 'store']);

Route::middleware('auth:admin')->group(function () {
    Route::post('/queues/{id}/call', [QueueController::class, 'call']);
    Route::post('/queues/{id}/done', [QueueController::class, 'done']);
    Route::post('/queues/{id}/skip', [QueueController::class, 'skip']);
});

Route::get('/queues', [QueueController::class, 'index'])
    ->middleware('auth:admin');

// Public route untuk display screen
Route::get('/display/queues', [QueueController::class, 'displayQueues']);
