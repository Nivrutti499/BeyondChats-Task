# 🚀 Running the Project

## Quick Start

Both servers should now be starting! Here's what's happening:

### ✅ Mock API Server
- **Status:** Starting...
- **URL:** http://localhost:8000
- **API Endpoint:** http://localhost:8000/api/articles

### ✅ React Frontend
- **Status:** Starting...
- **URL:** http://localhost:3000
- **Will open automatically in your browser**

---

## 📋 What to Expect

1. **Mock API Server** will start first (port 8000)
   - You'll see: `🚀 Mock API Server running on http://localhost:8000`

2. **React Frontend** will start next (port 3000)
   - Your browser should open automatically
   - If not, manually open: http://localhost:3000

3. **You'll see:**
   - Beautiful gradient header
   - Article cards showing sample articles
   - Filter buttons (All, Original, Updated)
   - Click any article to see full content

---

## 🎯 Testing the Features

1. **View All Articles** - Click "All Articles" button
2. **Filter Articles** - Try "Original Articles" or "Updated Articles"
3. **View Details** - Click any article card to open modal
4. **Check References** - Enhanced articles show reference links

---

## 🛑 To Stop the Servers

Press `Ctrl + C` in each terminal window, or close the terminal windows.

---

## 🔄 If Servers Don't Start

### Check if ports are in use:
```powershell
# Check port 8000
Get-NetTCPConnection -LocalPort 8000

# Check port 3000
Get-NetTCPConnection -LocalPort 3000
```

### Manual Start:

**Terminal 1 - Mock API:**
```bash
cd mock-api-server
npm start
```

**Terminal 2 - React Frontend:**
```bash
cd react-frontend
npm start
```

---

## ✅ Success Indicators

- ✅ Mock API shows: "Mock API Server running on http://localhost:8000"
- ✅ React shows: "webpack compiled successfully"
- ✅ Browser opens to http://localhost:3000
- ✅ You see article cards on the page

**Everything is working! 🎉**




