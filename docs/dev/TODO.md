# TODO List - Static Site Generator Project

**Project:** Personal Developer Portfolio & Blog Static Site Generator  
**Last Updated:** November 11, 2025  
**Status:** Planning Phase

---

## 📋 Project Overview

This TODO list tracks all tasks required to build a Node.js-based static site generator for freelance developer portfolios with blogging capabilities.

---

## 🚀 Phase 0: Quick Prototype & Preview (Day 1-2)

**Goal:** Get a working preview as fast as possible to validate the concept and design.

### Minimal Setup
- [ ] Initialize Node.js project with `npm init -y`
- [ ] Create basic folder structure (`/content/posts`, `/content/pages`, `/template`, `/public`)
- [ ] Install only essential dependencies: `npm install marked gray-matter fs-extra`
- [ ] Install Tailwind CSS: `npm install -D tailwindcss`
- [ ] Initialize Tailwind: `npx tailwindcss init`
- [ ] Create `.gitignore` file (ignore `/public`, `node_modules`)

### Create Sample Content
- [ ] Create 3-5 sample blog posts in `/content/posts/`
  - [ ] `2025-11-10-getting-started.md` (intro/welcome post)
  - [ ] `2025-11-08-my-first-project.md` (portfolio showcase)
  - [ ] `2025-11-05-learning-nodejs.md` (technical post)
  - [ ] `2025-11-01-draft-post.md` (draft example)
- [ ] Create 2-3 sample pages in `/content/pages/`
  - [ ] `about.md` (about/bio page)
  - [ ] `contact.md` (contact info)
  - [ ] `projects.md` (portfolio/work showcase)
- [ ] Include complete frontmatter in all content files
- [ ] Add realistic content (150-300 words per post)

### Create Sample Template Design
- [ ] Create `template/main.html` with basic structure
  - [ ] HTML5 boilerplate
  - [ ] Link to Tailwind CSS
  - [ ] Include dark mode toggle script
  - [ ] Placeholder for navigation and footer includes
  - [ ] {{ main_content }} placeholder
- [ ] Create `template/navigation.html`
  - [ ] Logo/site name
  - [ ] Nav links (Home, Blog, About, Projects, Contact)
  - [ ] Dark mode toggle button
  - [ ] Mobile-responsive hamburger menu
- [ ] Create `template/footer.html`
  - [ ] Copyright info
  - [ ] Social links (GitHub, LinkedIn, Twitter)
  - [ ] Simple, clean design
- [ ] Create `template/blog-index.html` for blog listing
  - [ ] Loop through posts with card layout
  - [ ] Show title, date, description/excerpt
  - [ ] Link to full article
- [ ] Apply Tailwind CSS classes for basic styling
  - [ ] Typography (readable fonts, sizes)
  - [ ] Spacing and layout
  - [ ] Colors (light and dark mode)
  - [ ] Responsive design

### Generate HTML & CSS (Minimal Builder)
- [ ] Create simple build script `src/build.js`
  - [ ] Read markdown files from `/content`
  - [ ] Parse frontmatter with gray-matter
  - [ ] Convert markdown to HTML with marked
  - [ ] Basic template engine (replace {{ main_content }} only)
  - [ ] Simple {{ include:filename }} support
  - [ ] Replace page variables ({{ page.title }}, {{ page.date }})
  - [ ] Write HTML files to `/public`
- [ ] Generate blog index manually or with simple loop
- [ ] Build Tailwind CSS: `npx tailwindcss -i ./template/styles.css -o ./public/assets/css/styles.css`
- [ ] Copy any assets (images, fonts) to `/public/assets`
- [ ] Add build script to package.json: `"build": "node src/build.js"`

### Preview the Website
- [ ] Install local server: `npm install -D live-server`
- [ ] Add preview script to package.json: `"preview": "live-server public"`
- [ ] Run build: `npm run build`
- [ ] Start server: `npm run preview`
- [ ] Open browser and review generated site
- [ ] Test navigation between pages
- [ ] Test dark mode toggle
- [ ] Test responsive design (resize browser)
- [ ] Review on mobile device if possible

### Quick Validation Checklist
- [ ] All sample pages render correctly
- [ ] All blog posts display properly
- [ ] Blog index lists all posts
- [ ] Navigation works (all links functional)
- [ ] Dark mode toggle works
- [ ] Site is readable on mobile
- [ ] Tailwind styles are applied
- [ ] No broken links or 404 errors

### Iteration & Feedback
- [ ] Document any issues or improvements needed
- [ ] Take screenshots of design for reference
- [ ] Get feedback from stakeholders (if applicable)
- [ ] Make quick design adjustments if needed
- [ ] Decide on next priorities based on prototype

---

## 🎯 Phase 1: Core Generator (Week 1-2)

**Note:** Many tasks from Phase 0 will be completed. Focus on improving and solidifying the implementation.

### Setup & Configuration
- [x] Initialize Node.js project *(completed in Phase 0)*
- [x] Set up project folder structure *(completed in Phase 0)*
- [x] Install core dependencies *(completed in Phase 0)*
- [x] Create `.gitignore` file *(completed in Phase 0)*
- [ ] Set up ESM or CommonJS module system (refactor if needed)
- [ ] Configure all package.json scripts (build, dev, etc.)

### Markdown Parsing
- [x] Implement markdown file reader *(completed in Phase 0)*
- [x] Integrate gray-matter for frontmatter parsing *(completed in Phase 0)*
- [ ] Validate required frontmatter fields (title, date, status)
- [ ] Parse optional frontmatter fields (description, author, slug, lastModified)
- [x] Implement markdown-to-HTML conversion *(completed in Phase 0)*
- [x] Test with sample markdown files *(completed in Phase 0)*

### Content Processing
- [ ] Create content discovery function (scan `/content/posts` and `/content/pages`)
- [ ] Implement status filtering (draft vs published)
- [ ] Generate slug from title if not provided in frontmatter
- [ ] Sort posts by date (newest first)
- [ ] Handle missing or malformed frontmatter gracefully
- [ ] Create error handling for invalid markdown files

### File Generation
- [x] Implement static file generator core logic *(basic version in Phase 0)*
- [x] Create output directory structure in `/public` *(completed in Phase 0)*
- [ ] Generate clean URLs (`/folder/index.html` structure)
- [x] Write HTML files to `/public` folder *(completed in Phase 0)*
- [ ] Preserve content folder structure in output
- [x] Test file generation with multiple content files *(completed in Phase 0)*

### CLI - Build Command
- [x] Create basic CLI interface *(basic version in Phase 0)*
- [x] Implement `npm run build` command *(completed in Phase 0)*
- [ ] Add production build logic (published content only)
- [ ] Display build summary (files generated, time taken)
- [ ] Add error reporting for build failures
- [ ] Test build command with various content scenarios

---

## 🔧 Phase 2: Templating & Features (Week 3)

### Template Engine - Basic
- [x] Create template file reader *(completed in Phase 0)*
- [x] Implement `{{ main_content }}` directive *(completed in Phase 0)*
- [x] Parse and render template variables *(basic version in Phase 0)*
- [x] Test basic template rendering *(completed in Phase 0)*

### Template Engine - Includes
- [x] Implement `{{ include:filename }}` directive *(basic version in Phase 0)*
- [x] Handle template file resolution *(completed in Phase 0)*
- [ ] Add recursive include detection (prevent infinite loops)
- [x] Test nested includes (main.html → navigation.html + footer.html) *(completed in Phase 0)*

### Template Engine - Variables
- [ ] Implement page variable interpolation ({{ page.title }}, {{ page.date }}, etc.)
- [ ] Add site-level variables ({{ site.name }}, {{ site.url }})
- [ ] Create variable scope management
- [ ] Format dates properly (e.g., "November 11, 2025")
- [ ] Handle missing variables gracefully

### Template Engine - Conditionals
- [ ] Implement `{{ if condition }}` directive
- [ ] Implement `{{ endif }}` directive
- [ ] Support common conditions (checking if variable exists)
- [ ] Test conditional rendering with various scenarios

### Template Engine - Loops
- [ ] Implement `{{ foreach collection }}` directive
- [ ] Implement `{{ endforeach }}` directive
- [ ] Support post looping for blog index
- [ ] Access loop variables ({{ post.title }}, {{ post.date }}, etc.)
- [ ] Test loop rendering with multiple posts

### Blog Index Generation
- [ ] Create blog index auto-generation logic
- [ ] Generate `/blog/index.html` with all published posts
- [ ] Sort posts by date (reverse chronological)
- [ ] Create `blog-index.html` template (or use main.html fallback)
- [ ] Display post metadata (title, date, description)
- [ ] Generate excerpt if description not provided (first 150 chars)
- [ ] Link each post to its full article
- [ ] Test blog index with 0, 1, and multiple posts

### Draft/Published Filtering
- [ ] Filter content based on `status` field in frontmatter
- [ ] Implement `--include-drafts` CLI flag
- [ ] Create dev build command (`npm run build:dev`)
- [ ] Add visual indicator for draft content in dev mode
- [ ] Test filtering logic with mixed draft/published content

### Development Server
- [ ] Install development server dependency (live-server or browser-sync)
- [ ] Implement `npm run dev` command
- [ ] Set up file watching with chokidar
- [ ] Auto-rebuild on content changes
- [ ] Auto-rebuild on template changes
- [ ] Implement live reload functionality
- [ ] Test watch mode with file modifications

---

## 🎨 Phase 3: Design & Styling (Week 4)

### Tailwind CSS Setup
- [x] Install Tailwind CSS and dependencies *(completed in Phase 0)*
- [x] Create `tailwind.config.js` configuration file *(completed in Phase 0)*
- [ ] Set up content paths for Tailwind scanning
- [ ] Configure theme colors, fonts, and spacing
- [ ] Set up dark mode configuration (class-based)
- [x] Create CSS input file with Tailwind directives *(completed in Phase 0)*
- [ ] Integrate Tailwind build process with static site generator
- [x] Test Tailwind compilation *(completed in Phase 0)*

### Shadcn UI Integration
- [ ] Install Shadcn UI CLI
- [ ] Initialize Shadcn UI configuration
- [ ] Install Card component (for blog post previews)
- [ ] Install Button component (for CTAs and navigation)
- [ ] Install Typography component (for text styling)
- [ ] Install Avatar component (for author profile)
- [ ] Install Separator component (for content separation)
- [ ] Install Badge component (for status indicators)
- [ ] Test components in templates

### Base Template Design
- [x] Create `main.html` layout structure *(completed in Phase 0)*
- [x] Design responsive header/navigation *(completed in Phase 0)*
- [x] Design footer section *(completed in Phase 0)*
- [x] Implement mobile-friendly navigation (hamburger menu) *(completed in Phase 0)*
- [ ] Add semantic HTML5 elements
- [ ] Ensure proper heading hierarchy
- [x] Test layout responsiveness (mobile, tablet, desktop) *(basic testing in Phase 0)*

### Dark Mode Implementation
- [x] Create dark mode toggle button *(completed in Phase 0)*
- [x] Implement theme switcher JavaScript *(completed in Phase 0)*
- [ ] Add localStorage persistence for theme preference
- [ ] Detect system preference on first load
- [x] Apply dark mode styles using Tailwind `dark:` classes *(basic version in Phase 0)*
- [ ] Style all components for dark mode
- [ ] Test contrast compliance (WCAG AA)
- [x] Test theme toggle functionality *(basic testing in Phase 0)*

### Typography & Content Styling
- [ ] Set readable font sizes (16px base minimum)
- [ ] Configure line height (1.5-1.8 for body)
- [ ] Set maximum content width (~70-80 characters)
- [ ] Style headings (H1-H6) consistently
- [ ] Add code syntax highlighting for technical content
- [ ] Style blockquotes, lists, and other markdown elements
- [ ] Test readability across devices

### Blog Index Page Design
- [x] Design blog listing card layout *(completed in Phase 0)*
- [x] Style post metadata (date, description) *(completed in Phase 0)*
- [ ] Add hover effects for post cards
- [x] Implement responsive grid/stack layout *(completed in Phase 0)*
- [x] Test with various numbers of posts *(completed in Phase 0)*
- [ ] Ensure accessibility (keyboard navigation, focus states)

### Responsive Design
- [ ] Test mobile layout (< 640px)
- [ ] Test tablet layout (640px - 1024px)
- [ ] Test desktop layout (> 1024px)
- [ ] Optimize touch targets for mobile (44x44px minimum)
- [ ] Test navigation menu on mobile
- [ ] Verify image responsiveness
- [ ] Test dark mode on all breakpoints

---

## 🧪 Phase 4: Testing & Documentation (Week 5)

### Unit Testing
- [ ] Set up testing framework (Jest or Mocha)
- [ ] Write tests for template engine functions
- [ ] Write tests for markdown parsing
- [ ] Write tests for frontmatter extraction
- [ ] Write tests for file generation logic
- [ ] Write tests for slug generation
- [ ] Write tests for date formatting
- [ ] Achieve >80% code coverage

### Integration Testing
- [ ] Test full build process end-to-end
- [ ] Test template includes and nesting
- [ ] Test blog index generation with various scenarios
- [ ] Test asset copying to `/public` folder
- [ ] Test draft/published filtering
- [ ] Test CLI commands and flags
- [ ] Test development server and watch mode

### Manual Testing
- [ ] Visual inspection of generated site
- [ ] Test dark mode toggle in browser
- [ ] Test responsive design on real devices
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile browsers (iOS Safari, Chrome Mobile)
- [ ] Validate all HTML using W3C validator
- [ ] Check for broken links
- [ ] Test keyboard navigation and accessibility

### Performance Testing
- [ ] Measure build time for typical site (should be < 5 seconds)
- [ ] Check generated HTML file sizes (< 100KB per page)
- [ ] Run Lighthouse audit (target: >90 for all metrics)
- [ ] Test First Contentful Paint time
- [ ] Optimize any performance bottlenecks
- [ ] Test build with 50+ posts

### Accessibility Testing
- [ ] Run automated accessibility tests (axe DevTools)
- [ ] Verify WCAG AA compliance
- [ ] Test with screen reader
- [ ] Check color contrast ratios (light and dark modes)
- [ ] Ensure all interactive elements are keyboard accessible
- [ ] Add proper ARIA labels where needed
- [ ] Test focus indicators visibility

### User Documentation
- [ ] Write comprehensive README.md
  - [ ] Project overview and features
  - [ ] Installation instructions
  - [ ] Quick start guide
  - [ ] Basic usage examples
- [ ] Create Installation Guide
- [ ] Create Content Creation Guide
  - [ ] Markdown basics
  - [ ] Frontmatter reference
  - [ ] Draft vs published workflow
- [ ] Create Template Customization Guide
  - [ ] Template engine syntax reference
  - [ ] Available variables and directives
  - [ ] Customization examples
- [ ] Create Deployment Guide
  - [ ] GitHub Pages instructions
  - [ ] Netlify deployment
  - [ ] Vercel deployment
  - [ ] Custom server deployment

### Developer Documentation
- [ ] Add code comments for complex logic
- [ ] Create template engine syntax reference document
- [ ] Create CLI command reference
- [ ] Write architecture overview document
- [ ] Create contributing guidelines
- [ ] Document project structure
- [ ] Add troubleshooting section

### Example Content
- [x] Create example blog posts (5-10 posts) *(completed in Phase 0)*
- [x] Create example static pages (About, Contact, Portfolio) *(completed in Phase 0)*
- [ ] Create example templates with comments
- [ ] Add sample images and assets
- [x] Demonstrate frontmatter variations *(completed in Phase 0)*
- [x] Include draft post examples *(completed in Phase 0)*

---

## ✨ Phase 5: Polish & Launch (Week 6)

### Bug Fixes & Refinements
- [ ] Review and fix all reported bugs
- [ ] Address edge cases discovered during testing
- [ ] Refactor complex or unclear code
- [ ] Optimize performance bottlenecks
- [ ] Improve error messages for better UX
- [ ] Add input validation where needed

### Code Quality
- [ ] Run linter (ESLint) and fix issues
- [ ] Format code with Prettier
- [ ] Remove console.logs and debug code
- [ ] Clean up unused dependencies
- [ ] Review and update comments
- [ ] Ensure consistent code style

### Final Testing
- [ ] Complete final round of manual testing
- [ ] Verify all documentation is accurate
- [ ] Test installation process from scratch
- [ ] Verify all CLI commands work as expected
- [ ] Check all links in documentation
- [ ] Final cross-browser compatibility check

### Package Preparation
- [ ] Update package.json metadata (version, description, keywords)
- [ ] Add license file (MIT or appropriate)
- [ ] Create .npmignore file (if publishing to npm)
- [ ] Verify all dependencies are in package.json
- [ ] Update version number to 1.0.0

### Launch Preparation
- [ ] Create project repository on GitHub
- [ ] Write compelling project description
- [ ] Add topics/tags to repository
- [ ] Create GitHub releases with changelog
- [ ] Add demo site link (deployed example)
- [ ] Create project logo/banner (optional)

### Marketing & Community
- [ ] Share on relevant developer communities
- [ ] Write blog post about the project
- [ ] Create demo video or GIF
- [ ] Post on social media (Twitter, LinkedIn)
- [ ] Submit to awesome lists (if applicable)

---

## 🔮 Future Enhancements (Post-Launch)

### Content Features
- [ ] Add pagination for blog index page
- [ ] Implement related posts suggestions
- [ ] Add sitemap.xml generation
- [ ] Generate robots.txt file
- [ ] Add Open Graph meta tags for social sharing
- [ ] Implement JSON-LD structured data for SEO

### Developer Experience
- [ ] Create plugin system for extensibility
- [ ] Add content versioning/history
- [ ] Implement incremental builds (only rebuild changed files)
- [ ] Add content validation warnings
- [ ] Create GUI/admin panel (optional)

### Performance
- [ ] Implement automatic image optimization
- [ ] Add lazy loading for images
- [ ] Generate responsive image srcsets
- [ ] Minify HTML output
- [ ] Bundle and minify CSS

### Advanced Features
- [ ] Add i18n/multi-language support
- [ ] Implement content collections/taxonomies
- [ ] Add RSS feed generation
- [ ] Implement content categories and tags
- [ ] Add search functionality (client-side)
- [ ] Create theme system

---

## 📝 Notes & Decisions

### Technical Decisions
- **Markdown Parser:** [TBD - markdown-it vs marked]
- **Module System:** [TBD - ESM vs CommonJS]
- **Dev Server:** [TBD - live-server vs browser-sync]
- **Testing Framework:** [TBD - Jest vs Mocha]

### Questions to Resolve
- Should we include syntax highlighting by default? (e.g., Prism.js or highlight.js)
- Do we need a config file for site-wide settings? (e.g., `site.config.js`)
- Should asset copying be automatic or manual?
- Do we need a development vs production environment distinction?

### Open Issues
- None yet

---

## ✅ Completion Criteria

The project is considered complete when:
- ✅ All Phase 1-5 tasks are completed
- ✅ All tests pass with >80% coverage
- ✅ Documentation is comprehensive and accurate
- ✅ Example site builds and deploys successfully
- ✅ Performance metrics meet requirements (Lighthouse >90)
- ✅ Accessibility standards met (WCAG AA)
- ✅ Cross-browser compatibility verified
- ✅ Repository is public and well-documented

---

## 📊 Progress Tracking

| Phase | Tasks Completed | Total Tasks | Progress |
|-------|----------------|-------------|----------|
| Phase 0: Quick Prototype | 0 | 43 | 0% |
| Phase 1: Core Generator | 0 | 24 | 0% |
| Phase 2: Templating & Features | 0 | 31 | 0% |
| Phase 3: Design & Styling | 0 | 33 | 0% |
| Phase 4: Testing & Documentation | 0 | 42 | 0% |
| Phase 5: Polish & Launch | 0 | 20 | 0% |
| **TOTAL** | **0** | **193** | **0%** |

---

**Legend:**
- [ ] Not Started
- [x] Completed
- [~] In Progress
- [!] Blocked/Issues

---

*Last updated: November 11, 2025*
