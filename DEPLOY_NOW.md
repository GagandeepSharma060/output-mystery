# 🚀 Quick Deployment Steps - Update Existing Vercel

Since your frontend is already on Vercel, here's what to do:

---

## Step 1: Push Today's Changes to GitHub

**If you already have a GitHub repo connected to Vercel:**

```bash
# Navigate to project
cd /Users/gagan/Code/OutputMystery

# Initialize git (if not done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Add Monaco Editor, Python backend, and IDE improvements"

# Add your GitHub repo (REPLACE with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/output-mystery.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**✅ Vercel will automatically redeploy when you push!**

**If you don't know your GitHub repo URL:**
1. Go to https://vercel.com
2. Open your project
3. Go to **Settings** → **Git**
4. You'll see your connected GitHub repository

---

## Step 2: Deploy Backend to Railway

### 2.1 Sign Up & Deploy

1. Go to https://railway.app
2. Click **"Start a New Project"**
3. Login with **GitHub**
4. Click **"New Project"** → **"Deploy from GitHub repo"**
5. Select your `output-mystery` repository
6. **IMPORTANT:** Click **"Configure"** and set:
   - **Root Directory:** `backend`
7. Click **"Deploy"**

### 2.2 Add Environment Variables

In Railway:
1. Go to **"Variables"** tab
2. Add:
   ```
   PORT=3001
   NODE_ENV=production
   ```

### 2.3 Get Backend URL

1. Go to **"Settings"** → **"Networking"**
2. Click **"Generate Domain"**
3. **Copy the URL** (e.g., `https://output-mystery-backend.railway.app`)

---

## Step 3: Connect Frontend to Backend

1. Go to https://vercel.com
2. Open your project
3. Go to **"Settings"** → **"Environment Variables"**
4. Add/Update:
   ```
   NEXT_PUBLIC_BACKEND_URL=https://your-railway-url.railway.app/api/execute
   ```
   (Replace with your actual Railway URL)
5. Go to **"Deployments"** → Click **"..."** → **"Redeploy"**

---

## Step 4: Test

1. Visit your Vercel URL
2. Go to `/ide` page
3. Test Python execution - should work now! 🎉

---

## 🐛 If Python Doesn't Work on Railway

Railway needs Python installed. Quick fix:

1. In Railway, go to **"Settings"** → **"Build & Deploy"**
2. The `nixpacks.toml` file we created should auto-install Python
3. If not, manually set buildpack to **"Nixpacks"**
4. Redeploy

---

## 📝 What Changed Today

- ✅ Monaco Editor (replaced textarea)
- ✅ JavaScript execution in browser
- ✅ HTML/CSS live preview
- ✅ Python execution backend (new!)
- ✅ Better error handling

All these changes will be live after you push to GitHub!

---

**That's it! Your platform will be updated automatically!** 🚀

