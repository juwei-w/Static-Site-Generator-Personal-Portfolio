const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');
const matter = require('gray-matter');

// Paths
const CONTENT_DIR = path.join(__dirname, '../content');
const TEMPLATE_DIR = path.join(__dirname, '../template');
const PUBLIC_DIR = path.join(__dirname, '../public');

// Helper: Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Helper: Generate slug from title
function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

// Helper: Generate excerpt from content
function generateExcerpt(content, length = 150) {
    const text = content.replace(/<[^>]*>/g, '').replace(/\n/g, ' ');
    return text.length > length ? text.substring(0, length) + '...' : text;
}

// Helper: Get relative path prefix based on depth
function getRelativePath(depth) {
    if (depth === 0) return '.';
    return Array(depth).fill('..').join('/');
}

// Read and parse template files
function readTemplate(filename) {
    const templatePath = path.join(TEMPLATE_DIR, filename);
    return fs.readFileSync(templatePath, 'utf8');
}

// Process template includes
function processIncludes(template) {
    const includeRegex = /\{\{\s*include:([^\}]+)\s*\}\}/g;
    return template.replace(includeRegex, (match, filename) => {
        try {
            const includeContent = readTemplate(filename.trim());
            return includeContent;
        } catch (error) {
            console.warn(`Warning: Could not include ${filename}`);
            return '';
        }
    });
}

// Process template variables
function processVariables(template, data) {
    let result = template;

    // Replace page variables
    Object.keys(data.page || {}).forEach(key => {
        const regex = new RegExp(`\\{\\{\\s*page\\.${key}\\s*\\}\\}`, 'g');
        result = result.replace(regex, data.page[key] || '');
    });

    // Replace site variables
    Object.keys(data.site || {}).forEach(key => {
        const regex = new RegExp(`\\{\\{\\s*site\\.${key}\\s*\\}\\}`, 'g');
        result = result.replace(regex, data.site[key] || '');
    });

    // Replace main content
    result = result.replace(/\{\{\s*main_content\s*\}\}/g, data.main_content || '');

    return result;
}

// Simple conditional processing
function processConditionals(template, data) {
    // Process {{ if page.variable }}...{{ endif }}
    const ifRegex = /\{\{\s*if\s+page\.([^\}]+)\s*\}\}([\s\S]*?)\{\{\s*endif\s*\}\}/g;
    return template.replace(ifRegex, (match, variable, content) => {
        return (data.page && data.page[variable.trim()]) ? content : '';
    });
}

// Process content files
function processContent(contentPath, type) {
    const files = fs.readdirSync(contentPath).filter(f => f.endsWith('.md'));
    const posts = [];

    files.forEach(file => {
        const filePath = path.join(contentPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data: frontmatter, content } = matter(fileContent);

        // Skip drafts in production build
        if (frontmatter.status !== 'published') {
            console.log(`Skipping draft: ${file}`);
            return;
        }

        // Generate slug if not provided
        const slug = frontmatter.slug || generateSlug(frontmatter.title);

        // Convert markdown to HTML
        const htmlContent = marked(content);

        // Format date
        const formattedDate = formatDate(frontmatter.date);

        // Get excerpt
        const excerpt = frontmatter.description || generateExcerpt(content);

        posts.push({
            ...frontmatter,
            content: htmlContent,
            slug,
            formattedDate,
            excerpt,
            url: type === 'posts' ? `/blog/${slug}` : `/${slug}`
        });
    });

    return posts;
}

// Build a single page
function buildPage(pageData, template, depth = 0) {
    let html = template;
    const basePath = getRelativePath(depth);

    // Process includes
    html = processIncludes(html);

    // Process conditionals
    html = processConditionals(html, {
        page: {
            title: pageData.title,
            date: pageData.formattedDate,
            description: pageData.description,
            author: pageData.author
        }
    });

    // Process variables
    html = processVariables(html, {
        page: {
            title: pageData.title,
            date: pageData.formattedDate,
            description: pageData.description || '',
            author: pageData.author || 'Your Name'
        },
        site: {
            name: 'YourName.dev',
            url: 'https://yourname.dev',
            base_path: basePath
        },
        main_content: pageData.content
    });

    return html;
}

// Build blog index
function buildBlogIndex(posts, template, depth = 1) {
    let html = template;
    const basePath = getRelativePath(depth); // Blog index is at /blog/index.html (depth 1)

    // Process includes
    html = processIncludes(html);

    // Process Variables for base_path in nav/footer
    html = processVariables(html, {
        page: {
            title: 'Blog',
            description: 'My thoughts and writings'
        },
        site: {
            name: 'YourName.dev',
            url: 'https://yourname.dev',
            base_path: basePath
        }
    });

    // Sort posts by date (newest first)
    const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Build post cards HTML
    const postCards = sortedPosts.map(post => `
        <article class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <div class="p-6">
                <time class="text-sm text-gray-600 dark:text-gray-400" datetime="${post.date}">
                    ${post.formattedDate}
                </time>
                <h2 class="text-2xl font-bold mt-2 mb-3">
                    <a href="${basePath}${post.url}" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        ${post.title}
                    </a>
                </h2>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                    ${post.excerpt}
                </p>
                <a href="${basePath}${post.url}" class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">
                    Read more
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </a>
            </div>
        </article>
    `).join('\n');

    // Replace foreach loop
    html = html.replace(/\{\{\s*foreach posts\s*\}\}[\s\S]*?\{\{\s*endforeach\s*\}\}/g, postCards);

    // Handle no posts case
    html = html.replace(/\{\{\s*if no_posts\s*\}\}[\s\S]*?\{\{\s*endif\s*\}\}/g,
        posts.length === 0 ? '<div class="text-center py-16"><p class="text-gray-600 dark:text-gray-400 text-lg">No blog posts yet. Check back soon!</p></div>' : '');

    return html;
}

// Main build function
async function build() {
    console.log('🚀 Starting build...\n');

    // Clean public directory
    await fs.emptyDir(PUBLIC_DIR);
    console.log('✓ Cleaned public directory');

    // Create necessary directories
    await fs.ensureDir(path.join(PUBLIC_DIR, 'blog'));
    await fs.ensureDir(path.join(PUBLIC_DIR, 'assets', 'css'));
    console.log('✓ Created directory structure');

    // Read templates
    const mainTemplate = readTemplate('main.html');
    const blogIndexTemplate = readTemplate('blog-index.html');
    const projectsTemplate = readTemplate('projects.html');
    const aboutTemplate = readTemplate('about.html');
    const contactTemplate = readTemplate('contact.html');
    console.log('✓ Read templates');

    // Process posts
    const postsPath = path.join(CONTENT_DIR, 'posts');
    const posts = processContent(postsPath, 'posts');
    console.log(`✓ Processed ${posts.length} blog posts`);

    // Build individual blog posts
    posts.forEach(post => {
        // Post pages are depth 2 (e.g., /blog/slug/index.html)
        const html = buildPage(post, mainTemplate, 2);
        const outputPath = path.join(PUBLIC_DIR, 'blog', post.slug, 'index.html');
        fs.ensureDirSync(path.dirname(outputPath));
        fs.writeFileSync(outputPath, html);
    });
    console.log(`✓ Built ${posts.length} blog post pages`);

    // Build blog index
    // Blog index is depth 1 (e.g., /blog/index.html)
    const blogIndexHtml = buildBlogIndex(posts, blogIndexTemplate, 1);
    fs.writeFileSync(path.join(PUBLIC_DIR, 'blog', 'index.html'), blogIndexHtml);
    console.log('✓ Built blog index page');

    // Process pages
    const pagesPath = path.join(CONTENT_DIR, 'pages');
    const pages = processContent(pagesPath, 'pages');
    console.log(`✓ Processed ${pages.length} static pages`);

    // Build individual pages
    pages.forEach(page => {
        // Use dedicated templates for specific pages, main.html for others
        let template = mainTemplate;
        if (page.slug === 'projects') {
            template = projectsTemplate;
        } else if (page.slug === 'about') {
            template = aboutTemplate;
        } else if (page.slug === 'contact') {
            template = contactTemplate;
        }

        // Standard pages are depth 1 (e.g., /slug/index.html)
        const html = buildPage(page, template, 1);
        const outputPath = path.join(PUBLIC_DIR, page.slug, 'index.html');
        fs.ensureDirSync(path.dirname(outputPath));
        fs.writeFileSync(outputPath, html);
    });
    console.log(`✓ Built ${pages.length} static pages`);

    // Create homepage using dedicated home.html template
    const homeTemplate = readTemplate('home.html');
    let homeHtml = processIncludes(homeTemplate);
    // Home is depth 0 (e.g., /index.html)
    homeHtml = processVariables(homeHtml, {
        page: {
            title: 'Home',
            description: 'Freelance Developer Portfolio'
        },
        site: {
            name: 'YourName.dev',
            url: 'https://yourname.dev',
            base_path: '.'
        }
    });

    // Fix recent posts links in home
    // We need to inject recent posts manually or via variable replacement if the template supported it.
    // However, the home template currently has hardcoded posts.
    // We should ideally update them to use {{ site.base_path }} which is now '.'

    fs.writeFileSync(path.join(PUBLIC_DIR, 'index.html'), homeHtml);
    console.log('✓ Built homepage with hero template');

    console.log('\n✅ Build complete!');
    console.log(`\nGenerated files in: ${PUBLIC_DIR}`);
    console.log(`Total pages: ${posts.length + pages.length + 2}\n`);
}

// Run build
build().catch(error => {
    console.error('❌ Build failed:', error);
    process.exit(1);
});
