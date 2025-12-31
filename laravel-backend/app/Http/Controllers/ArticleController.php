<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ArticleController extends Controller
{
    /**
     * Display a listing of articles.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Article::query();

        // Filter by original or updated articles
        if ($request->has('type')) {
            if ($request->type === 'original') {
                $query->whereNull('parent_article_id');
            } elseif ($request->type === 'updated') {
                $query->whereNotNull('parent_article_id');
            }
        }

        $articles = $query->orderBy('created_at', 'desc')->paginate(20);

        return response()->json($articles);
    }

    /**
     * Store a newly created article.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'url' => 'nullable|url',
            'parent_article_id' => 'nullable|exists:articles,id',
            'reference_urls' => 'nullable|array',
        ]);

        $article = Article::create($validated);

        return response()->json($article, 201);
    }

    /**
     * Display the specified article.
     */
    public function show(Article $article): JsonResponse
    {
        $article->load('parentArticle', 'updatedVersions');
        return response()->json($article);
    }

    /**
     * Update the specified article.
     */
    public function update(Request $request, Article $article): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'url' => 'nullable|url',
            'reference_urls' => 'nullable|array',
        ]);

        $article->update($validated);

        return response()->json($article);
    }

    /**
     * Remove the specified article.
     */
    public function destroy(Article $article): JsonResponse
    {
        $article->delete();

        return response()->json(['message' => 'Article deleted successfully']);
    }

    /**
     * Get updated versions of an article.
     */
    public function updatedVersions(Article $article): JsonResponse
    {
        $updatedVersions = $article->updatedVersions()->orderBy('created_at', 'desc')->get();
        return response()->json($updatedVersions);
    }
}




