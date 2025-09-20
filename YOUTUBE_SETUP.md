# 🎥 YouTube API Setup Guide

This guide will help you set up YouTube API integration to automatically fetch your videos.

## Step 1: Get Your YouTube Channel ID

### Method 1: Using YouTube Channel URL
1. Go to your YouTube channel: https://www.youtube.com/@OutputMystery
2. Look at the URL - it might show your channel ID
3. Or go to your channel's "About" section

### Method 2: Using a Tool
1. Go to https://commentpicker.com/youtube-channel-id.php
2. Enter your channel URL: `https://www.youtube.com/@OutputMystery`
3. Copy the Channel ID (starts with UC...)

### Method 3: From YouTube Studio
1. Go to YouTube Studio
2. Go to Settings → Channel
3. Your Channel ID is displayed there

## Step 2: Get YouTube Data API Key

### 1. Go to Google Cloud Console
- Visit: https://console.cloud.google.com/

### 2. Create or Select Project
- Click "Select a project" → "New Project"
- Name: "Output Mystery" (or any name)
- Click "Create"

### 3. Enable YouTube Data API v3
- Go to "APIs & Services" → "Library"
- Search for "YouTube Data API v3"
- Click on it and press "Enable"

### 4. Create API Key
- Go to "APIs & Services" → "Credentials"
- Click "Create Credentials" → "API Key"
- Copy the API key (starts with AIza...)

### 5. Secure Your API Key (Important!)
- Click on your API key to edit it
- Under "Application restrictions", select "HTTP referrers"
- Add your domain: `https://your-vercel-url.vercel.app/*`
- Under "API restrictions", select "Restrict key"
- Choose "YouTube Data API v3"
- Save

## Step 3: Configure Environment Variables

### For Local Development:
1. Copy `env.example` to `.env.local`
2. Add your credentials:
```bash
cp env.example .env.local
```

3. Edit `.env.local`:
```
NEXT_PUBLIC_YOUTUBE_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=your_actual_channel_id_here
```

### For Production (Vercel):
1. Go to your Vercel dashboard
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Add these variables:
   - `NEXT_PUBLIC_YOUTUBE_API_KEY` = your API key
   - `NEXT_PUBLIC_YOUTUBE_CHANNEL_ID` = your channel ID

## Step 4: Test the Integration

1. Restart your development server:
```bash
npm run dev
```

2. Visit your site and check the videos section
3. You should see your actual YouTube videos!

## Troubleshooting

### "Using sample videos" message
- Check that your API key is correct
- Verify your Channel ID is correct
- Make sure YouTube Data API v3 is enabled

### "Failed to load videos" error
- Check browser console for detailed error
- Verify API key has proper permissions
- Check that your channel has public videos

### Videos not showing
- Make sure your channel has uploaded videos
- Check that videos are public
- Verify the API key restrictions allow your domain

## API Quotas

- YouTube Data API has a daily quota of 10,000 units
- Each video fetch costs about 100 units
- This allows fetching ~100 videos per day (more than enough!)

## Need Help?

If you're having trouble:
1. Check the browser console for errors
2. Verify your API key and Channel ID
3. Make sure your YouTube channel is public
4. Contact support if needed

---

**Once set up, your platform will automatically show your latest YouTube videos!** 🎉
