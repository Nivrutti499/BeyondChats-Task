# Quick Start Guide

## Overview
This project implements a 3-phase article management system as specified in the task requirements.

## Phase 1: Laravel Backend ✅

**What's included:**
- Article CRUD API endpoints
- Web scraper command for BeyondChats articles
- Database migration for articles table
- CORS middleware for frontend integration

**Setup Steps:**
1. Create a new Laravel project (if you don't have one):
   ```bash
   composer create-project laravel/laravel my-laravel-app
   cd my-laravel-app
   ```

2. Copy files from `laravel-backend/` to your Laravel project:
   - `app/Http/Controllers/ArticleController.php`
   - `app/Models/Article.php`
   - `app/Console/Commands/ScrapeArticles.php`
   - `app/Http/Middleware/Cors.php`
   - `database/migrations/2024_01_01_000001_create_articles_table.php`
   - Merge `routes/api.php` with your existing routes

3. Install required packages:
   ```bash
   composer require symfony/dom-crawler symfony/css-selector guzzlehttp/guzzle
   ```

4. Configure `.env`:
   ```env
   DB_DATABASE=beyondchats_articles
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```

5. Run migrations and scrape:
   ```bash
   php artisan migrate
   php artisan scrape:articles
   php artisan serve
   ```

**API Endpoints:**
- `GET /api/articles` - List all articles
- `GET /api/articles/{id}` - Get specific article
- `POST /api/articles` - Create article
- `PUT /api/articles/{id}` - Update article
- `DELETE /api/articles/{id}` - Delete article

## Phase 2: Node.js Enhancement Script ✅

**What it does:**
- Fetches original articles from Phase 1 API
- Searches Google for similar articles
- Scrapes content from top 2 blog/article results
- Uses LLM API (OpenAI) to enhance articles
- Publishes enhanced articles via API

**Setup Steps:**
1. Navigate to directory:
   ```bash
   cd nodejs-script
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```env
   API_BASE_URL=http://localhost:8000/api
   LLM_API_KEY=sk-your-openai-api-key
   LLM_API_URL=https://api.openai.com/v1/chat/completions
   ```

4. Run the script:
   ```bash
   npm start
   ```

**Note:** Make sure the Laravel API from Phase 1 is running before executing this script.

## Phase 3: React Frontend ✅

**Features:**
- Responsive, modern UI
- View all articles (original and updated)
- Filter by article type
- Detailed article view modal
- Professional styling

**Setup Steps:**
1. Navigate to directory:
   ```bash
   cd react-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure API URL in `.env`:
   ```env
   REACT_APP_API_URL=http://localhost:8000/api
   ```

4. Start development server:
   ```bash
   npm start
   ```

The app will open at `http://localhost:3000`

## Running All Phases Together

1. **Start Laravel API** (Terminal 1):
   ```bash
   cd laravel-backend  # or your Laravel project directory
   php artisan serve
   ```

2. **Run Enhancement Script** (Terminal 2, optional):
   ```bash
   cd nodejs-script
   npm start
   ```

3. **Start React Frontend** (Terminal 3):
   ```bash
   cd react-frontend
   npm start
   ```

## Important Notes

- **Laravel Backend**: The files provided are meant to be integrated into an existing Laravel project. If you need a standalone solution, you'll need to set up Laravel first.

- **Google Scraping**: The Node.js script uses Puppeteer for Google searches. Google may block automated requests, so you might need to use a proxy or alternative search API in production.

- **LLM API**: The script is configured for OpenAI's API. You can modify it to use other LLM APIs (Anthropic, etc.) by changing the API URL and request format in `nodejs-script/index.js`.

- **Database**: Make sure MySQL/MariaDB is running and the database is created before running migrations.

## Troubleshooting

**CORS Errors:**
- Ensure the CORS middleware is properly configured in Laravel
- Check that the frontend API URL matches your Laravel backend URL

**Scraping Issues:**
- BeyondChats website structure may have changed - you may need to update selectors in `ScrapeArticles.php`
- Google may block requests - consider adding delays or using proxies

**LLM API Errors:**
- Verify your API key is correct
- Check you have sufficient API credits/quota
- Ensure the API URL is correct for your provider




