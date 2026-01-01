<?php

use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});

Route::view('/queue-screen', 'queue-screen');

use Inertia\Inertia;

Route::get('/screen/antrian/{poliId}', function ($poliId) {
    return Inertia::render('Screen/Antrian', [
        'poliId' => (int) $poliId
    ]);
});