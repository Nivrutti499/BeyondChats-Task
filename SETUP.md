# Setup Instructions

## Prerequisites

- PHP 8.1+ with Composer
- Node.js 16+ and npm
- MySQL/MariaDB database
- (For Phase 2) LLM API key (OpenAI or compatible API)

## Phase 1: Laravel Backend Setup

### Option A: Full Laravel Installation (Recommended)

1. **Install Laravel** (if not already installed):
   ```bash
   composer create-project laravel/laravel laravel-backend
   cd laravel-backend
   ```

2. **Copy the provided files** to your Laravel project:
   - Copy `app/Http/Controllers/ArticleController.php`
   - Copy `app/Models/Article.php`
   - Copy `app/Console/Commands/ScrapeArticles.php`
   - Copy `database/migrations/2024_01_01_000001_create_articles_table.php`
   - Copy `routes/api.php` (merge with existing routes)

3. **Install required packages**:
   ```bash
   composer require symfony/dom-crawler symfony/css-selector guzzlehttp/guzzle
   ```

4. **Configure database** in `.env`:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=beyondchats_articles
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```

5. **Run migrations**:
   ```bash
   php artisan migrate
   ```

6. **Scrape articles**:
   ```bash
   php artisan scrape:articles
   ```

7. **Start the server**:
   ```bash
   php artisan serve
   ```

The API will be available at `http://localhost:8000/api/articles`

### Option B: Standalone PHP API (Simpler Alternative)

If you prefer a simpler setup without full Laravel, I can provide a standalone PHP API script.

## Phase 2: Node.js Script Setup

1. **Navigate to the script directory**:
   ```bash
   cd nodejs-script
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add:
   ```env
   API_BASE_URL=http://localhost:8000/api
   LLM_API_KEY=your-openai-api-key-here
   LLM_API_URL=https://api.openai.com/v1/chat/completions
   ```

4. **Run the script**:
   ```bash
   npm start
   # or
   node index.js
   ```

The script will:
- Fetch articles from the API
- Search Google for similar articles
- Scrape the top 2 results
- Enhance articles using LLM API
- Publish updated articles via API

## Phase 3: React Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd react-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure API URL** (optional):
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` if your API runs on a different port:
   ```env
   REACT_APP_API_URL=http://localhost:8000/api
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

The frontend will open at `http://localhost:3000`

## API Endpoints

### Articles API

- `GET /api/articles` - Get all articles (supports `?type=original` or `?type=updated`)
- `GET /api/articles/{id}` - Get a specific article
- `POST /api/articles` - Create a new article
- `PUT /api/articles/{id}` - Update an article
- `DELETE /api/articles/{id}` - Delete an article
- `GET /api/articles/{id}/updated-versions` - Get updated versions of an article

### Request Body for POST/PUT

```json
{
  "title": "Article Title",
  "content": "Article content...",
  "url": "https://example.com/article",
  "parent_article_id": 1,  // Optional, for updated versions
  "reference_urls": ["https://ref1.com", "https://ref2.com"]  // Optional
}
```

## Troubleshooting

### Laravel Issues
- Make sure your database is created before running migrations
- Check that all required PHP extensions are installed (pdo_mysql, mbstring, etc.)
- If CORS issues occur, install `fruitcake/laravel-cors` package

### Node.js Script Issues
- Ensure the Laravel API is running before executing the script
- Check your LLM API key is valid
- Google scraping may fail if Google blocks requests - consider using a proxy or alternative search API

### React Frontend Issues
- Ensure the Laravel API is running
- Check CORS settings if you get network errors
- Verify the API URL in `.env` matches your backend




