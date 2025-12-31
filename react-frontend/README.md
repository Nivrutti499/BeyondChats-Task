# React Frontend for BeyondChats Articles

A responsive React application for viewing and managing articles.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. (Optional) Configure API URL by creating a `.env` file:
   ```env
   REACT_APP_API_URL=http://localhost:8000/api
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Features

- View all articles (original and updated versions)
- Filter articles by type (All, Original, Updated)
- Click on any article card to view full content in a modal
- Responsive design that works on mobile and desktop
- Clean, modern UI with gradient header

## API Integration

The frontend expects the Laravel API from Phase 1 to be running. Make sure:
- The Laravel backend is running on `http://localhost:8000`
- CORS is properly configured in Laravel
- The API endpoints are accessible




