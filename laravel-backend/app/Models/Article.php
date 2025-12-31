<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Article extends Model
{
    protected $fillable = [
        'title',
        'content',
        'url',
        'parent_article_id',
        'reference_urls',
        'scraped_at',
    ];

    protected $casts = [
        'reference_urls' => 'array',
        'scraped_at' => 'datetime',
    ];

    /**
     * Get the parent article (for updated versions).
     */
    public function parentArticle(): BelongsTo
    {
        return $this->belongsTo(Article::class, 'parent_article_id');
    }

    /**
     * Get updated versions of this article.
     */
    public function updatedVersions(): HasMany
    {
        return $this->hasMany(Article::class, 'parent_article_id');
    }
}




