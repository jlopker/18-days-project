# 18 Somethings Project - Deployment Guide

## Overview
Your 18 Somethings website is a React application that has been successfully built for production. The optimized build files are ready to be deployed to any static hosting service.

## Build Information
- **Build Status**: ✅ Successfully compiled with no warnings
- **Build Size**: ~87 KB gzipped (81.11 KB JS + 4.56 KB CSS)
- **Location**: `/build` directory
- **Build Command**: `npm run build`

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)
Vercel is optimized for React apps and provides free hosting with automatic deployments.

**Steps:**
1. Push your project to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up
3. Click "New Project" and import your GitHub repository
4. Vercel will automatically detect it's a React app
5. Click "Deploy" - done!

**Benefits:**
- Free hosting
- Automatic deployments on every push
- Built-in SSL certificates
- Performance optimizations
- Custom domain support

### Option 2: Netlify
Another excellent option for static React apps.

**Steps:**
1. Push your project to GitHub
2. Go to [netlify.com](https://netlify.com) and sign up
3. Click "New site from Git" and connect GitHub
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
5. Click "Deploy" - done!

**Benefits:**
- Free hosting
- Automatic deployments
- Built-in SSL certificates
- Form handling available
- Analytics included

### Option 3: Traditional Web Hosting (cPanel)
If you have traditional web hosting with cPanel:

**Steps:**
1. Build the project: `npm run build`
2. Connect via FTP or File Manager
3. Upload the contents of the `/build` folder to your `public_html` directory
4. Ensure `.htaccess` file is in place for React Router (see below)
5. Test the site

**Note about React Router:**
You need an `.htaccess` file to handle client-side routing. Create this file in your root directory:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Option 4: AWS S3 + CloudFront
For higher traffic and scalability:

**Steps:**
1. Create an S3 bucket
2. Upload the contents of `/build` to the bucket
3. Enable static website hosting
4. Create a CloudFront distribution pointing to your S3 bucket
5. Update DNS to point to CloudFront

### Option 5: Docker + Traditional Hosting
For more control over your environment:

**Create a Dockerfile:**
```dockerfile
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Pre-Deployment Checklist

- [ ] Run `npm run build` to create production build
- [ ] Test the build locally: `npm install -g serve && serve -s build`
- [ ] Verify all links work (especially internal navigation)
- [ ] Test on mobile devices
- [ ] Check that Google Fonts load correctly
- [ ] Verify all images and decorative elements display
- [ ] Test form submissions (if applicable)
- [ ] Ensure HTTPS is enabled on your hosting
- [ ] Set up a custom domain
- [ ] Configure email for contact form (if needed)

## Local Testing Before Deployment

To test your production build locally:

```bash
npm run build
npm install -g serve
serve -s build
```

Then visit `http://localhost:3000` to test the production build.

## Performance Optimization Notes

Your site is already optimized with:
- ✅ Minified JavaScript and CSS
- ✅ SVG decorative elements (scalable, lightweight)
- ✅ Responsive images
- ✅ CSS Grid for efficient layout
- ✅ Smooth scroll and animations
- ✅ Google Fonts optimization

## Custom Domain Setup

After deployment, update your domain's DNS records:
- Point your domain to your hosting service
- Enable SSL/TLS (most hosts provide free certificates)
- Wait 24 hours for DNS propagation

## Maintenance After Deployment

**Regular tasks:**
1. Monitor site performance
2. Update content as needed (rebuild and redeploy)
3. Check for outdated dependencies: `npm outdated`
4. Update dependencies annually: `npm update`
5. Monitor analytics and user feedback

## Troubleshooting

**404 errors on page refresh:**
- Ensure your `.htaccess` file (or equivalent) is properly configured for React Router

**Styles not loading:**
- Verify CSS files are in the build output
- Check network tab in browser DevTools
- Ensure hosting doesn't modify file paths

**Images not showing:**
- Check that image paths are relative (not absolute)
- Verify all SVG components are included in the build

**Fonts not loading:**
- Confirm Google Fonts CDN links are in public/index.html
- Check network tab for font loading

## Environment Variables

If you add environment variables in the future:
1. Create a `.env` file in the project root
2. Variables must start with `REACT_APP_`
3. Rebuild after adding variables
4. Example: `REACT_APP_API_URL=https://api.example.com`

## Questions?

For deployment help:
- Vercel docs: https://vercel.com/docs
- Netlify docs: https://docs.netlify.com
- Create React App deployment: https://create-react-app.dev/deployment/
