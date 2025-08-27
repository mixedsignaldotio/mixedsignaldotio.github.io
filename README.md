# Development Flow for Mixed Signal Website

## Adding a New Article by an Existing Author

When adding a new article by an existing author:

### 1. Create the Article HTML File
- Place the new article in the appropriate directory (`articles/analog/`, `articles/digital/`, etc.)
- Use the existing article template structure
- Ensure proper relative paths for CSS, JavaScript, and assets

### 2. Update JavaScript Mapping
**File to modify:** `/media/ayadav/NVMe512/mixed-signal/articles/assets/javascript/authors.js`

Add the new article to the existing author's array in the `authorArticles` object:

```javascript
const authorArticles = {
    'sarah-chen': [
        // Existing articles...
        {
            title: 'Your New Article Title',
            url: '../digital/your-new-article.html', // Adjust path as needed
            category: 'Digital Design', // or appropriate category
            excerpt: 'Brief description of the article content...',
            date: 'Mar. 15, 2025' // Current date
        }
    ]
    // Other authors...
};
```

### 3. Update Home Page Articles List
**File to modify:** `/media/ayadav/NVMe512/mixed-signal/index.html`

Add the new article to the articles list in the main content:

```html
<article class="article-item">
    <div class="article-content">
        <span class="article-category">Digital Design</span>
        <h3><a href="articles/digital/your-new-article.html">Your New Article Title</a></h3>
        <p class="article-excerpt">Brief description of the article content...</p>
        <div class="article-meta">
            <span class="author">By <a href="articles/authors/sarah-chen.html">Dr. Sarah Chen</a></span>
            <span class="date">Mar. 15, 2025</span>
        </div>
    </div>
    <div class="article-image">
        <div class="image-placeholder">
            <span>Article Image</span>
        </div>
    </div>
</article>
```

### 4. Automatic Updates
The following will update automatically:
- ✅ Article list on individual author profile pages (via JavaScript)
- ✅ Article count in authors index.html (via JavaScript `updateAuthorCounts()` function)

---

## Adding a New Article by a New Author

When adding an article by a completely new author:

### 1. Create the Article HTML File
- Same as above - place in appropriate directory with proper template structure

### 2. Create Author Profile Image
- Add author image to `/media/ayadav/NVMe512/mixed-signal/articles/authors/images/`
- Recommended format: `author-name.jpg` or `author-name.jpeg`
- Image should be rectangular (height > width) for best display

### 3. Create Individual Author Profile Page
**Create:** `/media/ayadav/NVMe512/mixed-signal/articles/authors/new-author-slug.html`

Copy from existing author template and update:
- Author name, title, bio
- Image path
- Social media links
- URL slug (used for JavaScript mapping)

### 4. Update Authors Index Page
**File to modify:** `/media/ayadav/NVMe512/mixed-signal/articles/authors/index.html`

Add new author to the authors list:

```html
<article class="author-item">
    <div class="author-content">
        <span class="author-specialty">Specialty Area</span>
        <h3><a href="new-author-slug.html">Dr. New Author Name</a></h3>
        <p class="author-position">Author's Professional Title</p>
        <p class="author-excerpt">Brief bio description...</p>
        <div class="author-meta">
            <span class="article-count" data-author="new-author-slug">1 article</span>
        </div>
    </div>
    <div class="author-image">
        <div class="image-placeholder">
            <img src="images/new-author-name.jpg" alt="Dr. New Author Name" class="author-img">
        </div>
    </div>
</article>
```

### 5. Update JavaScript Mapping
**File to modify:** `/media/ayadav/NVMe512/mixed-signal/articles/assets/javascript/authors.js`

Add two entries:

```javascript
// Add to authorArticles object
const authorArticles = {
    // Existing authors...
    'new-author-slug': [
        {
            title: 'New Article Title',
            url: '../digital/article-filename.html',
            category: 'Digital Design',
            excerpt: 'Article description...',
            date: 'Mar. 15, 2025'
        }
    ]
};

// Add to authorMapping in updateAuthorCounts function
function updateAuthorCounts() {
    const authorMapping = {
        // Existing mappings...
        'new-author-slug': 'Dr. New Author Name'
    };
    // Rest of function...
}
```

### 6. Update Home Page
**File to modify:** `/media/ayadav/NVMe512/mixed-signal/index.html`

Add the new article with proper author linking:

```html
<article class="article-item">
    <div class="article-content">
        <span class="article-category">Category</span>
        <h3><a href="articles/digital/new-article.html">Article Title</a></h3>
        <p class="article-excerpt">Article description...</p>
        <div class="article-meta">
            <span class="author">By <a href="articles/authors/new-author-slug.html">Dr. New Author Name</a></span>
            <span class="date">Mar. 15, 2025</span>
        </div>
    </div>
    <div class="article-image">
        <div class="image-placeholder">
            <span>Article Image</span>
        </div>
    </div>
</article>
```

---

## File Update Checklist

### For Existing Author:
- [ ] Create article HTML file
- [ ] Update `authors.js` (add to existing author's array)
- [ ] Update `index.html` (add article to main list)

### For New Author:
- [ ] Create article HTML file
- [ ] Add author image to `/authors/images/`
- [ ] Create individual author profile page
- [ ] Update `authors/index.html` (add author to list)
- [ ] Update `authors.js` (add new author mapping and article)
- [ ] Update main `index.html` (add article with author link)

---

## Important Notes

1. **JavaScript Dependencies:** The automatic article count updates depend on the `authors.js` file being loaded on both the authors index page and individual author pages.

2. **URL Slugs:** Keep author URL slugs consistent between:
   - Individual profile page filename (`sarah-chen.html`)
   - JavaScript object keys (`'sarah-chen'`)
   - Data attributes (`data-author="sarah-chen"`)

3. **Relative Paths:** Always verify relative paths are correct based on the file's location in the directory structure.

4. **Author Linking:** Remember to hyperlink author names in article metadata on the home page to their individual profile pages.

5. **Date Format:** Use consistent date formatting (e.g., "Jan. 26, 2025") across all content.