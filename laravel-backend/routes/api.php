<?php

use App\Http\Controllers\ArticleController;
use Illuminate\Support\Facades\Route;

Route::apiResource('articles', ArticleController::class);

// Get updated versions of an article
Route::get('articles/{article}/updated-versions', [ArticleController::class, 'updatedVersions']);




