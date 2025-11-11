# The 18 Somethings Project Website

A beautiful, responsive website for The 18 Somethings Project - a virtual writing adventure. This site is built with React and styled to match the aesthetic of Scrappy Literary.

## 🎨 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **React Router Navigation**: Smooth multi-page experience with no page reloads
- **Beautiful Styling**: Warm earth tone color palette inspired by Scrappy Literary
- **Decorative Elements**: Custom SVG animations and illustrations
- **Accessible**: Semantic HTML and ARIA labels throughout
- **Performance Optimized**: Minified assets, optimized images, and efficient CSS

## 📄 Pages

1. **Home** - Welcome section, current edition (Cocoon), philosophy, testimonials, and FAQs
2. **Writing Process** - Details about the 18-day structure, daily prompts, and writing insights
3. **Resources** - Curated list of writing books and online courses
4. **Past Editions** - Historical editions from 2020, 2013, and 2014 with details and prompts

## 🛠️ Tech Stack

- **React 19** - UI framework
- **React Router 7** - Client-side routing
- **CSS3** - Styling with CSS Grid, Flexbox, and animations
- **Google Fonts** - Lora (headings), Inter (body text), Sohne (accent)
- **SVG** - Custom decorative elements

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd 18-somethings-site

# Install dependencies
npm install

# Start development server
npm start
```

The site will open at `http://localhost:3000`

### Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Test production build locally
npm run build
npm install -g serve
serve -s build
```

## 📁 Project Structure

```
18-somethings-site/
├── public/
│   ├── index.html
│   └── .htaccess (for traditional hosting)
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.css (CSS variables and global styles)
│   └── components/
│       ├── Header.js
│       ├── Footer.js
│       ├── HomePage.js
│       ├── WritingProcess.js
│       ├── Resources.js
│       ├── PastEditions.js
│       ├── Decorations.js (SVG components)
│       ├── SectionDivider.js
│       └── [individual component CSS files]
├── build/ (created after npm run build)
├── DEPLOYMENT_GUIDE.md
├── Dockerfile
├── nginx.conf
├── deploy.sh
└── package.json
```

## 🎨 Color Palette

- **Primary Background**: #ffffff (white)
- **Text Dark**: #2b2b2b
- **Accent Color**: #a98467 (warm brown)
- **Accent Warm**: #b8956a
- **Accent Coral**: #d9a89a
- **Secondary Background**: #e8d0c0
- **Border Color**: #ddd5ce
- **Cream**: #f5ebe3

## 🖼️ Decorative Elements

The site includes custom SVG components for decorations:
- **Scribble** - Hand-drawn wavy lines
- **PaperScrap** - Torn paper shape
- **Circle** - Circle stroke outline
- **Dot** - Small filled circles
- **Leaf** - Botanical leaf shape
- **Star** - 5-point stars
- **Swoosh** - Curved flowing lines
- **Underline** - Wavy text underlines

All decorations are animated with CSS keyframes including float, pulse, sway, and twinkle effects.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

The site uses CSS Grid with `minmax()` for fluid layouts and `clamp()` for responsive typography.

## 🌐 Deployment

The site is ready to deploy to various platforms:

1. **Vercel** (recommended)
2. **Netlify**
3. **Traditional Web Hosting** (cPanel)
4. **AWS S3 + CloudFront**
5. **Docker + Any Container Platform**

See `DEPLOYMENT_GUIDE.md` for detailed instructions for each platform.

### Quick Deploy

```bash
# Use the deployment script
./deploy.sh

# This will:
# 1. Install dependencies if needed
# 2. Build the production bundle
# 3. Show build statistics
# 4. Display next steps
```

## ✨ Key Features

### Responsive Typography
Uses CSS `clamp()` for smooth scaling between mobile and desktop:
```css
font-size: clamp(1rem, 2.5vw, 1.15rem);
```

### CSS Grid Layouts
Responsive grids that adapt to screen size:
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: clamp(1.5rem, 4vw, 2.5rem);
```

### Smooth Animations
SVG decorations include smooth animations:
- Float effect with rotation
- Pulsing opacity
- Gentle sway motion
- Twinkling effect

### Mobile Navigation
Hamburger menu on mobile with dropdown support for "Learn More" submenu

## 🔧 Customization

### Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --accent-color: #a98467;
  --accent-warm: #b8956a;
  /* ... more colors */
}
```

### Typography
Font sizes and families are defined in `src/index.css` and use Google Fonts:
- Headings: Lora (serif)
- Body: Inter (sans-serif)
- Accent: Sohne (sans-serif)

### Content
Edit component files directly to update text, add new sections, or modify layouts:
- Homepage sections in `src/components/*.js`
- Additional pages as new Route components in `src/App.js`

## 🚨 Common Issues

**404 errors on page refresh on traditional hosting?**
- Ensure `.htaccess` file is in your root directory
- Enable mod_rewrite on your server

**Styles not loading?**
- Check that CSS files are imported correctly
- Verify browser cache is cleared
- Check network tab in DevTools

**Fonts not displaying?**
- Confirm Google Fonts are loading (check network tab)
- Verify internet connection is working
- Check for Content Security Policy headers

## 📊 Performance

Current metrics:
- **JavaScript**: 81.11 KB (gzipped)
- **CSS**: 4.56 KB (gzipped)
- **Total**: ~85.67 KB (gzipped)
- **Lighthouse Score**: Optimized for performance

## 🤝 Contributing

To contribute improvements:
1. Create a feature branch
2. Make your changes
3. Test thoroughly (especially on mobile)
4. Submit a pull request

## 📞 Support

For issues, questions, or feature requests:
1. Check the DEPLOYMENT_GUIDE.md
2. Review the inline code comments
3. Check React and React Router documentation
4. Test in development mode first: `npm start`

## 🎯 Future Enhancements

Potential improvements:
- Blog functionality for writing tips
- Email newsletter integration
- User accounts and writing journals
- Search functionality
- Dark mode theme
- Accessibility improvements (WCAG 2.1 AAA)
- Progressive Web App (PWA) capabilities
- Multi-language support

---

Built with ❤️ using React and modern web standards.
