# 🚀 Quick Demo - See It Working Now!

Want to see everything working **right now** without installing PHP/Laravel? Use the Mock API Server!

## ⚡ Super Quick Start (Windows)

### Option 1: Start Everything at Once
1. **Double-click `start-all.bat`**
   - This will start both the Mock API server and React frontend
   - Mock API runs on `http://localhost:8000`
   - Frontend runs on `http://localhost:3000`

### Option 2: Start Separately

**Terminal 1 - Start Mock API:**
```bash
# Double-click start-mock-api.bat
# OR run manually:
cd mock-api-server
npm start
```

**Terminal 2 - Start React Frontend:**
```bash
# Double-click start-frontend.bat
# OR run manually:
cd react-frontend
npm start
```

## 📋 What You'll See

1. **Mock API Server** - Provides sample articles (3 original + 2 enhanced versions)
2. **React Frontend** - Beautiful UI to view and filter articles
3. **All Features Working:**
   - View all articles
   - Filter by type (All, Original, Updated)
   - Click articles to see full content
   - View references and links

## 🎯 Test the Features

1. Open `http://localhost:3000` in your browser
2. Click "All Articles" to see everything
3. Click "Original Articles" to see only originals
4. Click "Updated Articles" to see enhanced versions
5. Click any article card to open the full article modal
6. Check out the references in the enhanced articles!

## 📝 Sample Data Included

The mock API includes:
- 3 original articles (web dev, API design, machine learning)
- 2 enhanced versions (improved content with references)

## 🔄 Next Steps

Once you've seen it working:
1. Install PHP/Composer for the real Laravel backend (see `INSTALL_PHP.md`)
2. Set up the real scraper to fetch articles from BeyondChats
3. Configure the Node.js enhancement script with your LLM API key

## 🛑 To Stop

Press `Ctrl+C` in each terminal window, or just close the terminal windows.

---

**That's it! You can see everything working in under 2 minutes! 🎉**




