<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminQueueController;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

// Route untuk pasien mengambil nomor antrian
Route::get('/take-queue', function () {
    return Inertia::render('TakeQueue');
})->name('take-queue');

// Route untuk menampilkan semua antrian poli dalam 1 TV screen
Route::get('/queue-screen', function () {
    return Inertia::render('QueueScreen');
});

// Admin Dashboard Routes
Route::prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminQueueController::class, 'index'])->name('admin.dashboard');
    Route::post('/queue/{queue}/call', [AdminQueueController::class, 'call'])->name('admin.queue.call');
    Route::post('/queue/{queue}/skip', [AdminQueueController::class, 'skip'])->name('admin.queue.skip');
    Route::post('/queue/{queue}/done', [AdminQueueController::class, 'done'])->name('admin.queue.done');
    Route::post('/queue/{queue}/reset', [AdminQueueController::class, 'reset'])->name('admin.queue.reset');
});
