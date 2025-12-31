<?php

namespace App\Console\Commands;

use App\Models\Article;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;

class ScrapeArticles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'scrape:articles';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Scrape the 5 oldest articles from BeyondChats blog';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('Starting to scrape articles from BeyondChats...');

        $baseUrl = 'https://beyondchats.com/blogs/';
        $articles = [];

        try {
            // First, try to get the last page
            $lastPage = $this->getLastPage($baseUrl);
            
            if ($lastPage) {
                $this->info("Found last page: {$lastPage}");
                $articles = $this->scrapePage($lastPage);
            } else {
                // Fallback: try to find articles by pagination
                $articles = $this->scrapeAllPages($baseUrl);
            }

            // Get the 5 oldest articles
            $oldestArticles = array_slice($articles, -5);

            $this->info('Found ' . count($oldestArticles) . ' articles to store');

            foreach ($oldestArticles as $articleData) {
                // Check if article already exists
                $existing = Article::where('url', $articleData['url'])->first();
                
                if (!$existing) {
                    Article::create([
                        'title' => $articleData['title'],
                        'content' => $articleData['content'],
                        'url' => $articleData['url'],
                        'scraped_at' => now(),
                    ]);
                    $this->info("Stored: {$articleData['title']}");
                } else {
                    $this->warn("Already exists: {$articleData['title']}");
                }
            }

            $this->info('Scraping completed successfully!');
            return Command::SUCCESS;
        } catch (\Exception $e) {
            $this->error('Error scraping articles: ' . $e->getMessage());
            return Command::FAILURE;
        }
    }

    /**
     * Get the last page number.
     */
    private function getLastPage(string $baseUrl): ?int
    {
        try {
            $response = Http::timeout(30)->get($baseUrl);
            
            if (!$response->successful()) {
                return null;
            }

            $html = $response->body();
            $crawler = new Crawler($html);

            // Try to find pagination links
            $paginationLinks = $crawler->filter('.pagination a, .page-numbers a, [class*="pagination"] a')->links();
            
            $maxPage = 1;
            foreach ($paginationLinks as $link) {
                $href = $link->getUri();
                if (preg_match('/page[=\/](\d+)/', $href, $matches)) {
                    $pageNum = (int)$matches[1];
                    if ($pageNum > $maxPage) {
                        $maxPage = $pageNum;
                    }
                }
            }

            return $maxPage > 1 ? $maxPage : null;
        } catch (\Exception $e) {
            $this->warn('Could not determine last page: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Scrape a specific page.
     */
    private function scrapePage(int $pageNumber): array
    {
        $url = "https://beyondchats.com/blogs/page/{$pageNumber}/";
        $articles = [];

        try {
            $response = Http::timeout(30)->get($url);
            
            if (!$response->successful()) {
                return $articles;
            }

            $html = $response->body();
            $crawler = new Crawler($html);

            // Try multiple selectors for article links
            $selectors = [
                'article a',
                '.blog-post a',
                '.post a',
                '[class*="article"] a',
                '[class*="post"] a',
                'h2 a',
                'h3 a',
            ];

            $articleLinks = [];
            foreach ($selectors as $selector) {
                try {
                    $links = $crawler->filter($selector)->each(function (Crawler $node) {
                        $href = $node->attr('href');
                        if ($href && strpos($href, '/blogs/') !== false) {
                            return $href;
                        }
                        return null;
                    });
                    $articleLinks = array_merge($articleLinks, array_filter($links));
                } catch (\Exception $e) {
                    continue;
                }
            }

            $articleLinks = array_unique($articleLinks);

            foreach ($articleLinks as $articleUrl) {
                $articleData = $this->scrapeArticleContent($articleUrl);
                if ($articleData) {
                    $articles[] = $articleData;
                }
            }
        } catch (\Exception $e) {
            $this->warn("Error scraping page {$pageNumber}: " . $e->getMessage());
        }

        return $articles;
    }

    /**
     * Scrape all pages to find oldest articles.
     */
    private function scrapeAllPages(string $baseUrl): array
    {
        $allArticles = [];
        $page = 1;
        $maxPages = 50; // Safety limit

        while ($page <= $maxPages) {
            $url = $page === 1 ? $baseUrl : "{$baseUrl}page/{$page}/";
            
            try {
                $response = Http::timeout(30)->get($url);
                
                if (!$response->successful()) {
                    break;
                }

                $html = $response->body();
                
                // Check if page has articles
                if (strpos($html, '404') !== false || strpos($html, 'No posts found') !== false) {
                    break;
                }

                $articles = $this->scrapePage($page);
                
                if (empty($articles)) {
                    break;
                }

                $allArticles = array_merge($allArticles, $articles);
                $page++;
                
                // Small delay to be respectful
                usleep(500000); // 0.5 seconds
            } catch (\Exception $e) {
                $this->warn("Error on page {$page}: " . $e->getMessage());
                break;
            }
        }

        return $allArticles;
    }

    /**
     * Scrape content from a single article URL.
     */
    private function scrapeArticleContent(string $url): ?array
    {
        try {
            $response = Http::timeout(30)->get($url);
            
            if (!$response->successful()) {
                return null;
            }

            $html = $response->body();
            $crawler = new Crawler($html);

            // Extract title
            $title = null;
            $titleSelectors = ['h1', '.entry-title', '.post-title', '[class*="title"]', 'title'];
            foreach ($titleSelectors as $selector) {
                try {
                    $titleNode = $crawler->filter($selector)->first();
                    if ($titleNode->count() > 0) {
                        $title = trim($titleNode->text());
                        break;
                    }
                } catch (\Exception $e) {
                    continue;
                }
            }

            if (!$title) {
                $title = 'Untitled Article';
            }

            // Extract content
            $content = null;
            $contentSelectors = [
                '.entry-content',
                '.post-content',
                '.article-content',
                'article',
                '.content',
                '[class*="content"]',
                'main',
            ];

            foreach ($contentSelectors as $selector) {
                try {
                    $contentNode = $crawler->filter($selector)->first();
                    if ($contentNode->count() > 0) {
                        $content = trim($contentNode->text());
                        if (strlen($content) > 100) { // Make sure we have substantial content
                            break;
                        }
                    }
                } catch (\Exception $e) {
                    continue;
                }
            }

            if (!$content || strlen($content) < 50) {
                // Fallback: get all paragraphs
                try {
                    $paragraphs = $crawler->filter('p')->each(function (Crawler $node) {
                        return trim($node->text());
                    });
                    $content = implode("\n\n", array_filter($paragraphs));
                } catch (\Exception $e) {
                    $content = 'Content could not be extracted';
                }
            }

            return [
                'title' => $title,
                'content' => $content,
                'url' => $url,
            ];
        } catch (\Exception $e) {
            $this->warn("Error scraping article {$url}: " . $e->getMessage());
            return null;
        }
    }
}




