<?php

use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});

Route::view('/queue-screen', 'queue-screen');

use Inertia\Inertia;

Route::get('/screen/antrian', function () {
    return Inertia::render('Screen/Antrian');
});