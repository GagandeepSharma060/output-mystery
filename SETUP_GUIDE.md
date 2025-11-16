# 🚀 Complete Setup Guide - Output Mystery

This guide will help you set up both the frontend and backend for the Output Mystery platform.

## 📋 Prerequisites

- **Node.js** 18+ installed
- **Python 3.x** installed (for backend code execution)
- **npm** or **yarn** package manager

## 🎯 Quick Start

### 1. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on: `http://localhost:3000`

### 2. Backend Setup

```bash
# Navigate to backend directory (in a new terminal)
cd backend

# Install dependencies
npm install

# Start backend server
npm run dev
```

Backend will run on: `http://localhost:3001`

### 3. Configure Frontend to Use Backend

Create a `.env.local` file in the `frontend` directory:

```bash
cd frontend
touch .env.local
```

Add this line to `.env.local`:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001/api/execute
```

**Important:** Restart the frontend dev server after adding the environment variable.

## 🎨 IDE Features

### ✅ What's Working:

1. **Monaco Editor** - Full-featured code editor with:
   - Syntax highlighting
   - Line numbers
   - Auto-completion
   - Code formatting

2. **JavaScript Execution** - Runs in browser:
   - Captures `console.log()` output
   - 5-second timeout
   - Error handling

3. **HTML/CSS Preview** - Live preview:
   - Real-time updates
   - iframe sandboxing
   - Full HTML/CSS support

4. **Python Execution** - Via backend API:
   - Secure code execution
   - Output capture
   - Error handling

## 🔧 Configuration

### Environment Variables

#### Frontend (`.env.local`)
```env
# Backend API URL
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001/api/execute

# YouTube API (optional)
NEXT_PUBLIC_YOUTUBE_API_KEY=your_api_key
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=your_channel_id
```

#### Backend (`.env`)
```env
PORT=3001
```

## 🧪 Testing the Setup

1. **Start both servers:**
   - Frontend: `cd frontend && npm run dev`
   - Backend: `cd backend && npm run dev`

2. **Test JavaScript:**
   - Go to `http://localhost:3000/ide`
   - Select "JavaScript Array Methods" template
   - Click "Run Code"
   - Should see output in the output panel

3. **Test HTML/CSS:**
   - Select "HTML/CSS Example" template
   - Click "Show Preview"
   - Should see live preview

4. **Test Python:**
   - Select "Python List Comprehension" template
   - Click "Run Code"
   - Should see Python output (requires backend running)

## 🐛 Troubleshooting

### Python Not Executing

**Problem:** Python code shows error about backend not running.

**Solution:**
1. Make sure backend server is running on port 3001
2. Check `.env.local` has `NEXT_PUBLIC_BACKEND_URL` set
3. Restart frontend server after adding env variable
4. Check browser console for CORS errors

### CORS Errors

**Problem:** Browser shows CORS errors when calling backend.

**Solution:**
- Backend already has CORS enabled
- Make sure backend is running on the correct port
- Check that `NEXT_PUBLIC_BACKEND_URL` matches backend URL

### Python Not Found

**Problem:** Backend shows "python3: command not found"

**Solution:**
1. Make sure Python 3 is installed: `python3 --version`
2. If Python is installed but not in PATH, update backend `server.js`:
   ```javascript
   // Change this line in server.js
   execAsync(`python3 -c ...`)
   // To use full path or 'python' instead
   ```

### Monaco Editor Not Loading

**Problem:** Editor shows "Loading editor..." forever

**Solution:**
1. Clear browser cache
2. Check browser console for errors
3. Make sure `@monaco-editor/react` is installed: `npm install @monaco-editor/react monaco-editor`

## 📦 Production Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Backend (Railway, Render, or DigitalOcean)

1. Push backend code to GitHub
2. Deploy to your preferred platform
3. Update `NEXT_PUBLIC_BACKEND_URL` in frontend to production URL
4. Make sure Python 3 is available on the server

## 🎯 Next Steps

1. ✅ IDE is fully functional
2. ⏭️ Add more code templates
3. ⏭️ Implement challenge validation
4. ⏭️ Add user authentication
5. ⏭️ Add progress tracking

## 📚 Additional Resources

- [Monaco Editor Docs](https://microsoft.github.io/monaco-editor/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Express.js Docs](https://expressjs.com/)

---

**Need Help?** Check the troubleshooting section or create an issue on GitHub.

