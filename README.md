# Mixed Signal Articles Directory

This directory contains the article template and resources for creating new articles on the Mixed Signal blog.

## Directory Structure

```
articles/
├── template.html           # Main article template (copy this for new articles)
├── assets/                 # Shared resources for all articles
│   ├── css/
│   │   ├── styles.css     # Global styles
│   │   ├── article.css    # Article-specific styles
│   │   └── home.css       # Home page styles
│   ├── fonts/             # Custom fonts
│   ├── icons/             # Icons and logos
│   └── javascript/
│       ├── article.js     # Article functionality
│       └── home.js        # Home page functionality
├── digital/               # Digital circuit articles
├── analog/                # Analog circuit articles
└── mixed-signal/          # Mixed-signal articles
```

## Creating New Articles

### Quick Start

1. **Copy the template**: Copy `template.html` to your desired category folder
   ```bash
   cp template.html digital/your-article-name.html
   ```

2. **Edit the placeholders**: Replace the following placeholders in your new file:
   - `CATEGORY_HERE` → Your article category (e.g., "Digital Design", "Analog Design")
   - `DATE_HERE` → Publication date (e.g., "January 26, 2025")
   - `READ_TIME_HERE` → Estimated read time in minutes
   - `ARTICLE_TITLE_HERE` → Your article title
   - `ARTICLE_SUBTITLE_HERE` → Article subtitle/description
   - `AUTHOR_NAME_HERE` → Author name
   - `AUTHOR_TITLE_HERE` → Author title/affiliation
   - `FIRST_PARAGRAPH_HERE` → Opening paragraph content

3. **Write your content**: Replace the example content with your article

4. **Update the title tag**: Change the `<title>` in the `<head>` section

### Content Guidelines

#### Text Formatting
- Use `<h2>` for main section headings
- Use `<p>` for regular paragraphs
- Use `<blockquote class="article-quote">` for important quotes

#### Mathematical Equations
- Inline math: `$equation$`
- Display math: `$$equation$$`
- MathJax is automatically loaded and configured

#### Citations
Use the citation system with hover previews:
```html
<cite data-ref="unique-ref-id">Author, A. (Year). Title. Publisher.</cite>
```
- Replace `unique-ref-id` with a unique identifier
- References are automatically numbered and listed at the end

#### Figures
```html
<figure class="article-figure">
    <div class="figure-placeholder">
        <span>Figure 1: Your Description</span>
    </div>
    <figcaption>Detailed caption here.</figcaption>
</figure>
```

#### Drop Cap
The first paragraph automatically gets a drop cap when wrapped in:
```html
<div class="drop-cap">
    <p>Your opening paragraph...</p>
</div>
```

## Features Included

- **Automatic Citation System**: Hover previews and auto-generated references
- **Mathematical Equation Support**: Full MathJax integration
- **Social Sharing**: LinkedIn, X (Twitter), and Email sharing
- **Subscribe Modal**: Google Forms integration
- **AdSense Integration**: Automatic ad display when available
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Print Optimization**: Clean printing with page footers
- **Progress Indicator**: Reading progress bar
- **Sidebar Discussion**: Disqus integration ready

## File Paths

When creating articles in subdirectories, the template uses the correct relative paths:

- CSS/JS: `../assets/css/`, `../assets/javascript/`
- Images: `../assets/icons/`
- Home link: `../index.html`

All paths go up one level (`../`) since articles are in category subdirectories.

## No Configuration Required

The template is completely self-contained. Simply:
1. Copy the template
2. Edit the content
3. Your article is ready with full functionality

All styling, JavaScript functionality, citation system, and responsive design work automatically without any additional setup.