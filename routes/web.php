<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return view('welcome');
});

// Route untuk menampilkan semua antrian poli dalam 1 TV screen
Route::get('/queue-screen', function () {
    return Inertia::render('QueueScreen');
});
