# BeyondChats Article Management System

This project implements a complete article management system with three phases:

## Phase 1: Laravel Backend (Moderate Difficulty)
- Scrapes articles from BeyondChats blog's last page
- Stores articles in database
- Provides CRUD APIs for articles

## Phase 2: Node.js Article Enhancement Script (Very Difficult)
- Fetches articles from Phase 1 API
- Searches Google for similar articles
- Scrapes top 2 results
- Uses LLM API to enhance articles
- Publishes updated articles via API

## Phase 3: React Frontend (Very Easy)
- Responsive UI to display articles
- Shows both original and updated versions

## ⚡ Quick Demo (No PHP Required!)

**Want to see it working RIGHT NOW?** Check out [QUICK_DEMO.md](QUICK_DEMO.md)

The mock API server lets you test the React frontend immediately without installing PHP/Laravel!

## Quick Start

**For detailed setup instructions, see [SETUP.md](SETUP.md)**

### Prerequisites
- PHP 8.1+ with Composer
- Node.js 16+ and npm
- MySQL/MariaDB database
- LLM API key (OpenAI or compatible) for Phase 2

### Phase 1: Laravel Backend
The `laravel-backend` directory contains Laravel-specific files that need to be integrated into a Laravel project:
- Controllers, Models, Migrations, Routes, and Commands
- See SETUP.md for detailed integration instructions

### Phase 2: Node.js Enhancement Script
A standalone Node.js script that enhances articles using LLM APIs.

### Phase 3: React Frontend
A complete React application for viewing articles.

## Project Structure

```
beyondchats-task/
├── laravel-backend/          # Laravel backend files
│   ├── app/
│   │   ├── Console/Commands/
│   │   ├── Http/Controllers/
│   │   └── Models/
│   ├── database/migrations/
│   └── routes/
├── mock-api-server/          # Mock API (for quick testing)
│   ├── server.js
│   └── package.json
├── nodejs-script/            # Node.js enhancement script
│   ├── index.js
│   └── package.json
├── react-frontend/           # React frontend
│   ├── src/
│   └── public/
├── start-all.bat             # Quick start script (Windows)
├── start-mock-api.bat        # Start mock API only
├── start-frontend.bat        # Start frontend only
├── README.md
├── QUICK_DEMO.md            # Quick demo guide
└── SETUP.md
```

