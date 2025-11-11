# Static Site Generator - Personal Portfolio

A custom static site generator built with Node.js for creating a personal developer portfolio and blog.

## 🚀 Quick Start

### Prerequisites
- Node.js v18 or higher
- npm v9 or higher

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Build the site
npm run build

# Preview locally
npm run preview

# Build and preview in one command
npm run dev
```

## 📁 Project Structure

```
├── content/
│   ├── posts/          # Blog posts in markdown
│   └── pages/          # Static pages in markdown
├── template/           # HTML templates
│   ├── main.html       # Main layout
│   ├── navigation.html # Navigation component
│   ├── footer.html     # Footer component
│   ├── blog-index.html # Blog listing template
│   └── styles.css      # Tailwind CSS source
├── src/
│   └── build.js        # Static site generator script
├── public/             # Generated static files (git-ignored)
└── docs/
    ├── dev/            # Development documentation
    └── user/           # User guides

```

## ✍️ Creating Content

### Blog Posts

Create a new markdown file in `content/posts/` with frontmatter:

```markdown
---
title: "Your Post Title"
date: 2025-11-11
status: published  # or "draft"
description: "A brief description for SEO"
author: "Your Name"
slug: "url-friendly-slug"
---

# Your Post Title

Your content here...
```

### Static Pages

Create a new markdown file in `content/pages/`:

```markdown
---
title: "Page Title"
date: 2025-11-11
status: published
description: "Page description"
author: "Your Name"
---

# Page Title

Your content here...
```

## 🎨 Customization

### Styling

- Edit `template/styles.css` for custom CSS
- Modify `tailwind.config.js` for theme customization
- Templates use Tailwind CSS classes

### Templates

- `main.html` - Main page layout
- `navigation.html` - Site navigation
- `footer.html` - Page footer
- `blog-index.html` - Blog listing page

## 📦 Building for Production

```bash
npm run build
```

This generates:
- HTML files in `/public`
- Minified CSS in `/public/assets/css/`
- Clean URLs using `/folder/index.html` structure

## 🌐 Deployment

### Cloudflare Pages

1. **Connect your repository** to Cloudflare Pages
2. **Set build settings**:
   - Build command: `npm run build`
   - Build output directory: `public`
   - Node version: 18 or higher

3. **Deploy**: Push to your repository, and Cloudflare automatically builds and deploys

### Other Platforms

**Netlify:**
- Build command: `npm run build`
- Publish directory: `public`

**Vercel:**
- Build command: `npm run build`
- Output directory: `public`

**GitHub Pages:**
```bash
npm run build
# Copy public/ contents to your gh-pages branch
```

## 🛠️ Available Scripts

- `npm run build` - Build the static site
- `npm run build:css` - Compile Tailwind CSS
- `npm run preview` - Start local development server
- `npm run dev` - Build and preview in one command

## 📝 Features

- ✅ Markdown-based content
- ✅ Custom templating engine
- ✅ Blog with auto-generated index
- ✅ Draft/published status
- ✅ Dark mode support
- ✅ Fully responsive design
- ✅ Clean URLs
- ✅ SEO-friendly
- ✅ No JavaScript frameworks required
- ✅ Fast and lightweight

## 🔧 Configuration Files

- `package.json` - Node.js dependencies and scripts
- `tailwind.config.js` - Tailwind CSS configuration
- `wrangler.toml` - Cloudflare Pages configuration
- `.gitignore` - Git ignore rules

## 📚 Documentation

- Development docs: `/docs/dev/`
- User guides: `/docs/user/`
- PRD: `/docs/dev/PRD.md`
- TODO: `/docs/dev/TODO.md`

## 🤝 Contributing

This is a personal project, but feel free to fork and customize for your own use!

## 📄 License

ISC

## 🙏 Acknowledgments

Built as part of the MyTalent TalentCorp programme, managed by AGMO Academy.
Instructor: Iszuddin Ismail

---

**Built with:** Node.js, Tailwind CSS, Markdown, and ❤️
