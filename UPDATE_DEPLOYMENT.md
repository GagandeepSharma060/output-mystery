# 🚀 Update Existing Deployment - Step by Step

Since your frontend is already deployed to Vercel, we just need to:
1. Push today's changes (Monaco Editor, Python execution, etc.)
2. Deploy the new backend
3. Connect them together

---

## ✅ Step 1: Push Today's Changes to GitHub

Since Vercel auto-deploys from GitHub, we just need to push the changes:

```bash
# Navigate to project root
cd /Users/gagan/Code/OutputMystery

# Check what's changed
git status

# Add all changes (including new Monaco Editor, backend, etc.)
git add .

# Commit today's changes
git commit -m "Add Monaco Editor, Python execution backend, and IDE improvements"

# Push to GitHub (this will trigger Vercel auto-deploy)
git push
```

**✅ Checkpoint:** Vercel will automatically detect the push and redeploy your frontend with the new changes!

**⏳ Wait 2-3 minutes** for Vercel to finish deploying.

---

## ✅ Step 2: Deploy Backend to Railway

### 2.1 Sign Up for Railway

1. Go to https://railway.app
2. Click **"Start a New Project"**
3. Choose **"Login with GitHub"**
4. Authorize Railway

### 2.2 Deploy Backend

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your `output-mystery` repository
4. **Important Configuration:**
   - **Root Directory:** Click "Configure" and set to `backend` ⚠️
   - Railway will auto-detect Node.js
   - **Start Command:** `node server.js`
5. Click **"Deploy"**

### 2.3 Add Environment Variables

1. In Railway project, go to **"Variables"** tab
2. Click **"New Variable"**
3. Add:
   ```
   PORT=3001
   NODE_ENV=production
   ```

### 2.4 Get Your Backend URL

1. Go to **"Settings"** → **"Networking"**
2. Click **"Generate Domain"**
3. **Copy the URL** (e.g., `https://output-mystery-backend.railway.app`)
4. **Save this URL!** You'll need it in the next step.

**✅ Checkpoint:** Backend is deployed! Save your Railway URL.

---

## ✅ Step 3: Connect Frontend to Backend

### 3.1 Add Backend URL to Vercel

1. Go to https://vercel.com
2. Select your **Output Mystery** project
3. Go to **"Settings"** → **"Environment Variables"**
4. Add/Update this variable:

```
NEXT_PUBLIC_BACKEND_URL=https://your-railway-url.railway.app/api/execute
```

**⚠️ Replace `your-railway-url.railway.app` with your actual Railway URL!**

### 3.2 Redeploy Frontend

1. Go to **"Deployments"** tab
2. Click **"..."** on the latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete

**✅ Checkpoint:** Frontend is now connected to backend!

---

## ✅ Step 4: Test Everything

### 4.1 Test Frontend

1. Visit your Vercel URL
2. Go to the IDE page (`/ide`)
3. You should see:
   - ✅ Monaco Editor (with syntax highlighting)
   - ✅ JavaScript execution working
   - ✅ HTML/CSS preview working
   - ✅ Python execution working (if backend is connected)

### 4.2 Test Backend API

Open terminal and test:

```bash
curl -X POST https://your-railway-url.railway.app/api/execute \
  -H "Content-Type: application/json" \
  -d '{"language":"python","code":"print(\"Hello from production!\")"}'
```

Should return:
```json
{
  "success": true,
  "output": "Hello from production!\n",
  "error": null
}
```

---

## 🔧 Troubleshooting

### Python Not Working on Railway?

Railway might need Python installed. Here's the fix:

1. In Railway, go to **"Settings"** → **"Build & Deploy"**
2. Add **"Nixpacks"** as the buildpack
3. Create a file `backend/nixpacks.toml` with:
   ```toml
   [phases.setup]
   nixPkgs = ["nodejs-18_x", "python3"]
   ```
4. Redeploy

### CORS Errors?

1. Check backend URL in Vercel environment variables
2. Make sure URL ends with `/api/execute`
3. Check Railway logs for errors

### Frontend Not Updating?

1. Check Vercel deployment logs
2. Make sure you pushed to the correct branch
3. Verify environment variables are set correctly

---

## 📝 Quick Checklist

- [ ] Pushed today's changes to GitHub
- [ ] Vercel auto-deployed frontend
- [ ] Deployed backend to Railway
- [ ] Got Railway backend URL
- [ ] Added `NEXT_PUBLIC_BACKEND_URL` to Vercel
- [ ] Redeployed frontend
- [ ] Tested IDE features
- [ ] Tested Python execution

---

## 🎉 You're Done!

Your updated platform is now live with:
- ✅ Monaco Editor (syntax highlighting, autocomplete)
- ✅ JavaScript execution in browser
- ✅ HTML/CSS live preview
- ✅ Python execution via backend API

**Frontend:** `https://your-vercel-url.vercel.app`
**Backend:** `https://your-railway-url.railway.app`

---

**Need help?** Check the logs in Vercel and Railway dashboards!

