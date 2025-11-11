<?php

use App\Http\Controllers\ParticipantController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'participants' => \App\Models\Participant::latest()->paginate(10)
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

// Rutas públicas para registro de participantes
Route::get('/participants/create', [ParticipantController::class, 'create'])->name('participants.create');
Route::post('/participants', [ParticipantController::class, 'store'])->name('participants.store');
Route::get('/participants/{participant}', [ParticipantController::class, 'show'])->name('participants.show');

// Rutas protegidas para gestión de participantes (solo administradores)
Route::middleware('auth')->group(function () {
    Route::get('/participants', [ParticipantController::class, 'index'])->name('participants.index');
    Route::get('/participants/{participant}/edit', [ParticipantController::class, 'edit'])->name('participants.edit');
    Route::patch('/participants/{participant}', [ParticipantController::class, 'update'])->name('participants.update');
    Route::delete('/participants/{participant}', [ParticipantController::class, 'destroy'])->name('participants.destroy');
});

