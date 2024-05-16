<?php

use App\Http\Controllers\MpesaSTKPushController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('example', function () {
    Route::post('stk', [MpesaSTKPushController::class, 'stkpush'])->name('stk.simulate');
    Route::post('callback', [MpesaSTKPushController::class, 'callback'])->name('stk.callback');
});
