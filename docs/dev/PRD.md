# Product Requirements Document (PRD)
## Static Site Generator for Personal Developer Portfolio

**Version:** 1.0  
**Date:** November 11, 2025  
**Author:** Development Team  
**Status:** Draft

---

## 1. Executive Summary

This document outlines the requirements for developing a static site generator tailored for freelance developers to build and maintain their personal brand portfolio and blog. The system will convert markdown content into a fully functional static website using a custom templating engine, built with Node.js and styled with Tailwind CSS and Shadcn UI components.

---

## 2. Product Overview

### 2.1 Purpose
Create a lightweight, efficient static site generator that enables freelance developers to showcase their work and share technical insights through a blog, without the overhead of complex CMS systems or JavaScript frameworks.

### 2.2 Target Audience
- **Primary:** Freelance developers building their personal brand
- **User Profile:** Technical users comfortable with markdown, command-line tools, and basic web development concepts

### 2.3 Key Benefits
- Full control over content and design
- Fast, secure static websites
- Simple markdown-based content management
- No database or backend server required
- SEO-friendly output
- Easy deployment to any static hosting service

---

## 3. Core Features & Requirements

### 3.1 Content Management

#### 3.1.1 Content Structure
**Priority:** High

- **Content Root:** All content stored in `/content` folder
- **Blog Posts:** Stored in `/content/posts/` as markdown files
- **Static Pages:** Stored in `/content/pages/` as markdown files
- **Naming Convention:** Date-based for posts (e.g., `2025-11-11-post-title.md`)

#### 3.1.2 Markdown Frontmatter
**Priority:** High

Each markdown file must support YAML frontmatter with the following metadata:

**Required Fields:**
- `title` (string): Page/post title
- `date` (YYYY-MM-DD): Publication date
- `status` (enum): `draft` or `published`

**Optional Fields:**
- `description` (string): Meta description for SEO
- `author` (string): Author name (default: site owner)
- `slug` (string): Custom URL slug (auto-generated from title if not provided)
- `lastModified` (YYYY-MM-DD): Last update date

**Example:**
```yaml
---
title: "Building a Static Site Generator with Node.js"
date: 2025-11-11
status: published
description: "A deep dive into creating custom static site generators"
author: "John Doe"
slug: "building-static-site-generator"
lastModified: 2025-11-11
---
```

#### 3.1.3 Draft/Published Status
**Priority:** High

- Only content with `status: published` should be built and included in the final output
- Draft posts should be ignored during production builds
- CLI should support a `--include-drafts` flag for preview builds

### 3.2 Templating System

#### 3.2.1 Template Structure
**Priority:** High

All templates stored in `/template` folder using HTML format:

**Required Templates:**
- `main.html` - Base layout wrapper for all pages
- `navigation.html` - Site navigation menu
- `footer.html` - Site footer

#### 3.2.2 Template Engine Syntax
**Priority:** High

Custom templating engine supporting:

1. **Include Directive:**
   ```html
   {{ include:navigation.html }}
   {{ include:footer.html }}
   ```
   - Includes content from another template file
   - Recursive includes not supported (to prevent infinite loops)

2. **Content Directive:**
   ```html
   {{ main_content }}
   ```
   - Renders the processed markdown content (converted to HTML)

3. **Variable Interpolation:**
   ```html
   {{ page.title }}
   {{ page.date }}
   {{ page.description }}
   {{ page.author }}
   {{ site.name }}
   {{ site.url }}
   ```

4. **Conditional Rendering:**
   ```html
   {{ if page.description }}
     <meta name="description" content="{{ page.description }}">
   {{ endif }}
   ```

5. **Loop Support (for blog index):**
   ```html
   {{ foreach posts }}
     <article>
       <h2>{{ post.title }}</h2>
       <time>{{ post.date }}</time>
     </article>
   {{ endforeach }}
   ```

### 3.3 Blog Index/Listing Page

#### 3.3.1 Auto-Generation
**Priority:** High

- Automatically generate a blog listing page at `/blog/index.html`
- List all published posts in reverse chronological order (newest first)
- Display post metadata: title, date, description (if available)
- Each post links to its full article

#### 3.3.2 Index Page Template
**Priority:** Medium

- Use a dedicated `blog-index.html` template (if exists) or fallback to `main.html`
- Support for date formatting (e.g., "November 11, 2025")
- Excerpt generation (first 150 characters of content if no description provided)

### 3.4 Static Site Generator

#### 3.4.1 Build Process
**Priority:** High

The generator script (located in `/src` folder) must:

1. Read all markdown files from `/content` folder
2. Parse frontmatter and markdown content
3. Filter content based on `status` field
4. Convert markdown to HTML
5. Apply templates with variable substitution
6. Generate blog index page
7. Output static HTML files to `/public` folder
8. Copy all assets (images, CSS, JS) to `/public` folder

#### 3.4.2 Output Structure
**Priority:** High

Generated files in `/public` folder:

```
/public
  /index.html (homepage)
  /about/index.html (static pages)
  /blog
    /index.html (blog listing)
    /building-static-site-generator/index.html (individual posts)
  /assets
    /css (stylesheets)
    /images (images)
```

- Clean URLs using `/folder/index.html` structure
- Preserve folder structure from source content where applicable

### 3.5 CLI Commands

#### 3.5.1 Build Commands
**Priority:** High

**Production Build:**
```bash
npm run build
```
- Builds only published content
- Minifies output (optional)
- Generates production-ready static files

**Development Build:**
```bash
npm run build:dev
```
or
```bash
npm run build -- --include-drafts
```
- Includes draft posts for preview
- Non-minified output for debugging

#### 3.5.2 Development Server
**Priority:** Medium

```bash
npm run dev
```
- Starts local development server
- Watches for file changes
- Auto-rebuilds on content/template changes
- Live reload capability

#### 3.5.3 Content Creation
**Priority:** Low (Nice-to-have)

```bash
npm run new:post "Post Title"
npm run new:page "Page Title"
```
- Creates new markdown file with pre-filled frontmatter template
- Auto-generates filename based on date and title

---

## 4. Design & User Interface

### 4.1 Design Framework
**Priority:** High

- **CSS Framework:** Tailwind CSS (latest stable version)
- **Component Library:** Shadcn UI components
- **No JavaScript Frameworks:** Pure HTML/CSS output (no React, Vue, etc.)
- **Minimal JavaScript:** Only for essential interactions (dark mode toggle, mobile menu)

### 4.2 Layout & Components

#### 4.2.1 Unified Template
**Priority:** High

- Single template design used for all pages and posts
- Consistent navigation and footer across site
- Responsive design (mobile-first approach)

#### 4.2.2 Recommended Shadcn Components
**Priority:** Medium

Suggested components for implementation:
- **Card:** For blog post previews on index page
- **Button:** For CTAs and navigation elements
- **Typography:** For consistent text styling
- **Avatar:** For author profile display
- **Separator:** For visual content separation
- **Badge:** For post status indicators (if showing drafts in dev mode)

### 4.3 Dark Mode Support
**Priority:** High

- **Implementation:** Toggle between light and dark themes
- **Persistence:** User preference saved in localStorage
- **Default:** System preference detection
- **Toggle Location:** Accessible in main navigation

**Technical Requirements:**
- Use Tailwind's `dark:` variant classes
- Implement theme switcher with minimal JavaScript
- Ensure all components have proper dark mode styling
- WCAG AA contrast compliance in both modes

### 4.4 Responsive Design
**Priority:** High

**Breakpoints (Tailwind defaults):**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Requirements:**
- Mobile-friendly navigation (hamburger menu)
- Readable typography on all screen sizes
- Optimized images for different viewports
- Touch-friendly interactive elements

### 4.5 Typography & Readability
**Priority:** Medium

- Readable font sizes (16px base minimum)
- Appropriate line height (1.5-1.8 for body text)
- Maximum content width for readability (~70-80 characters per line)
- Proper heading hierarchy (H1-H6)
- Code syntax highlighting for technical content

---

## 5. Technical Specifications

### 5.1 Technology Stack

| Component | Technology |
|-----------|-----------|
| Runtime | Node.js (v18+) |
| Package Manager | npm |
| Markdown Parser | markdown-it or marked |
| Frontmatter Parser | gray-matter |
| CSS Framework | Tailwind CSS |
| UI Components | Shadcn UI |
| Build Tool | Custom Node.js script |

### 5.2 Project Structure

```
project-root/
├── content/
│   ├── posts/
│   │   └── 2025-11-11-example-post.md
│   └── pages/
│       └── about.md
├── template/
│   ├── main.html
│   ├── navigation.html
│   ├── footer.html
│   └── blog-index.html (optional)
├── src/
│   ├── index.js (main generator script)
│   ├── parser.js (markdown & frontmatter parsing)
│   ├── templating.js (template engine)
│   └── utils.js (helper functions)
├── public/ (generated, git-ignored)
│   └── [built static files]
├── docs/
│   └── dev/
│       └── PRD.md (this document)
├── package.json
├── tailwind.config.js
└── README.md
```

### 5.3 Dependencies

**Core Dependencies:**
- `markdown-it` or `marked` - Markdown parsing
- `gray-matter` - Frontmatter extraction
- `tailwindcss` - CSS framework
- `fs-extra` - File system operations
- `date-fns` - Date formatting

**Development Dependencies:**
- `live-server` or `browser-sync` - Development server
- `chokidar` - File watching
- `prettier` - Code formatting

### 5.4 Performance Requirements

- **Build Time:** < 5 seconds for sites with up to 100 posts
- **File Size:** Individual HTML pages < 100KB (excluding images)
- **First Contentful Paint:** < 1.5s on 3G connection
- **Lighthouse Score:** > 90 for Performance, Accessibility, Best Practices, SEO

### 5.5 Browser Compatibility

- **Supported Browsers:**
  - Chrome/Edge (last 2 versions)
  - Firefox (last 2 versions)
  - Safari (last 2 versions)
- **Mobile Browsers:**
  - iOS Safari (last 2 versions)
  - Chrome Mobile (last 2 versions)

---

## 6. Use Cases & User Stories

### 6.1 Content Creation

**User Story 1: Publishing a Blog Post**
> As a freelance developer, I want to write a blog post in Markdown and publish it to my website, so that I can share my knowledge with potential clients and peers.

**Acceptance Criteria:**
- User creates a markdown file in `/content/posts/`
- File includes required frontmatter (title, date, status)
- Running build command generates HTML page
- Post appears in blog index with proper metadata
- Post is accessible via clean URL

**User Story 2: Managing Draft Content**
> As a developer, I want to work on draft posts without publishing them, so that I can refine content before making it public.

**Acceptance Criteria:**
- Posts marked as `status: draft` are excluded from production builds
- Draft posts can be previewed using `--include-drafts` flag
- Clear indication when viewing draft content in dev mode

### 6.2 Site Customization

**User Story 3: Customizing Site Design**
> As a developer, I want to customize my site's appearance using Tailwind CSS, so that my portfolio reflects my personal brand.

**Acceptance Criteria:**
- Templates use Tailwind CSS classes
- Easy to modify colors, spacing, typography via Tailwind config
- Dark mode support with toggle functionality
- Changes reflected after rebuild

### 6.3 Deployment

**User Story 4: Deploying to Production**
> As a developer, I want to build my site and deploy it to a static hosting service, so that my portfolio is accessible to potential clients.

**Acceptance Criteria:**
- `npm run build` generates production-ready files in `/public`
- All assets properly linked and functional
- Clean URLs work on static hosts
- No broken links or missing resources

---

## 7. Success Metrics

### 7.1 Key Performance Indicators (KPIs)

1. **Build Performance:**
   - Average build time < 5 seconds (for typical portfolio site)
   - Memory usage < 500MB during build

2. **Code Quality:**
   - All templates valid HTML5
   - Accessible markup (WCAG AA)
   - No console errors in browser

3. **User Experience:**
   - Mobile-friendly (Google Mobile-Friendly Test pass)
   - Fast load times (Lighthouse Performance > 90)
   - Functional dark mode toggle

4. **Developer Experience:**
   - Clear documentation
   - Intuitive CLI commands
   - Helpful error messages

---

## 8. Constraints & Assumptions

### 8.1 Constraints

- **No Backend:** System must work entirely as static files
- **No JavaScript Framework:** Output should not depend on React, Vue, or similar
- **Markdown Only:** Content must be in markdown format
- **Node.js Required:** Users must have Node.js installed

### 8.2 Assumptions

- Users have basic technical knowledge (command line, markdown, HTML/CSS)
- Content volume is reasonable (< 1000 pages)
- Images and assets are manually optimized before adding
- Users handle their own deployment to hosting platforms

---

## 9. Out of Scope

The following features are explicitly **NOT** included in this version:

### 9.1 Excluded Features

- ❌ RSS feed generation
- ❌ Content categories or tags
- ❌ Search functionality
- ❌ Comment system
- ❌ Multi-author support
- ❌ Content API or headless CMS integration
- ❌ Automatic image optimization
- ❌ i18n/multi-language support
- ❌ Analytics integration
- ❌ Form handling
- ❌ Authentication or user management

### 9.2 Future Considerations

These features may be considered for future versions:
- Pagination for blog index page
- Related posts suggestions
- Sitemap generation
- Open Graph meta tags for social sharing
- Content versioning/history
- Plugin system for extensibility

---

## 10. Timeline & Milestones

### 10.1 Proposed Development Phases

**Phase 1: Core Generator (Week 1-2)**
- Markdown parsing with frontmatter
- Basic template engine implementation
- File generation to `/public` folder
- CLI build command

**Phase 2: Templating & Features (Week 3)**
- Complete template engine (includes, variables, conditionals)
- Blog index auto-generation
- Draft/published filtering
- Development server with watch mode

**Phase 3: Design & Styling (Week 4)**
- Tailwind CSS integration
- Shadcn UI component implementation
- Dark mode functionality
- Responsive design

**Phase 4: Testing & Documentation (Week 5)**
- Cross-browser testing
- Performance optimization
- User documentation
- Example content and templates

**Phase 5: Polish & Launch (Week 6)**
- Bug fixes
- Final optimizations
- Deployment guide
- Project README

---

## 11. Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Complex template engine requirements | High | Medium | Start with MVP features, add complexity incrementally |
| Performance issues with many posts | Medium | Low | Implement efficient file parsing and caching |
| Dark mode implementation challenges | Low | Low | Use Tailwind's built-in dark mode utilities |
| Browser compatibility issues | Medium | Low | Test early and often across target browsers |
| Unclear documentation | High | Medium | Write docs alongside development, not after |

---

## 12. Dependencies & Prerequisites

### 12.1 Development Environment

- Node.js v18 or higher
- npm v9 or higher
- Code editor (VS Code recommended)
- Modern web browser for testing

### 12.2 User Environment

- Node.js installed on local machine
- Basic understanding of markdown syntax
- Command-line access
- Text editor for content creation

---

## 13. Quality Assurance

### 13.1 Testing Requirements

**Unit Testing:**
- Template engine functions
- Markdown parsing
- Frontmatter extraction
- File generation logic

**Integration Testing:**
- Full build process
- Template includes and nesting
- Blog index generation
- Asset copying

**Manual Testing:**
- Visual inspection of generated site
- Dark mode toggle functionality
- Responsive design across devices
- Cross-browser compatibility
- Link validation

### 13.2 Acceptance Criteria

The project is considered complete when:
- ✅ All core features implemented and functional
- ✅ Build process generates valid HTML
- ✅ Dark mode works correctly
- ✅ Site is responsive on mobile, tablet, desktop
- ✅ Blog index auto-generates with correct posts
- ✅ Draft/published status filtering works
- ✅ Documentation is complete and clear
- ✅ Example content and templates provided
- ✅ Performance meets specified benchmarks

---

## 14. Documentation Requirements

### 14.1 User Documentation

- **README.md:** Quick start guide and overview
- **Installation Guide:** Setup instructions
- **Content Creation Guide:** How to write posts and pages
- **Template Customization Guide:** Modifying templates
- **Deployment Guide:** Publishing to static hosts

### 14.2 Developer Documentation

- Code comments for complex logic
- Template engine syntax reference
- CLI command reference
- Architecture overview
- Contributing guidelines

---

## 15. Approval & Sign-off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Product Owner | _______________ | _______________ | _______________ |
| Lead Developer | _______________ | _______________ | _______________ |
| Designer | _______________ | _______________ | _______________ |

---

## 16. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-11-11 | Development Team | Initial PRD creation |

---

## Appendix A: Glossary

- **Static Site Generator (SSG):** Tool that generates static HTML files from templates and content
- **Frontmatter:** YAML metadata at the beginning of markdown files
- **Clean URLs:** URLs without file extensions (e.g., `/about/` instead of `/about.html`)
- **Markdown:** Lightweight markup language for formatted text
- **Dark Mode:** Alternative color scheme with dark background and light text
- **Responsive Design:** Design that adapts to different screen sizes

## Appendix B: References

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI Components](https://ui.shadcn.com/)
- [Markdown Specification](https://commonmark.org/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Node.js Documentation](https://nodejs.org/docs/)

---

**End of Document**
