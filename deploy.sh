#!/bin/bash

# 18 Somethings Project - Quick Deployment Script
# This script prepares your site for deployment

echo "🚀 18 Somethings Project - Deployment Preparation"
echo "=================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Run build
echo "🔨 Building production bundle..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build completed successfully!"
    echo ""
    echo "📊 Build Statistics:"
    du -sh build/
    echo ""
    echo "📂 Build output is ready in the 'build' folder"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Choose your hosting platform (Vercel, Netlify, or traditional hosting)"
    echo "2. Upload the 'build' folder contents to your hosting"
    echo "3. Ensure .htaccess is in place if using traditional hosting"
    echo "4. Test all pages and internal links"
    echo ""
    echo "🔗 Deployment Guide: See DEPLOYMENT_GUIDE.md"
    echo ""
    echo "💡 To test locally before deploying:"
    echo "   npm install -g serve"
    echo "   serve -s build"
    echo ""
else
    echo ""
    echo "❌ Build failed. Please fix the errors above and try again."
    exit 1
fi
