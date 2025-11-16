#!/bin/bash

echo "🚀 Output Mystery Deployment Script"
echo "=================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git not initialized. Run 'git init' first."
    exit 1
fi

# Check if there are uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Adding and committing changes..."
    git add .
    git commit -m "Update: Output Mystery platform improvements"
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "🔗 Please add your GitHub repository as remote origin:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/output-mystery.git"
    echo ""
    echo "Then run this script again."
    exit 1
fi

echo "📤 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🌐 Next steps:"
    echo "1. Go to https://vercel.com"
    echo "2. Import your GitHub repository"
    echo "3. Deploy your Output Mystery platform!"
    echo ""
    echo "📖 See DEPLOYMENT.md for detailed instructions"
else
    echo "❌ Failed to push to GitHub. Check your credentials and try again."
fi
