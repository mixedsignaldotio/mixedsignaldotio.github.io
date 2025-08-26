// Authors page JavaScript - Auto-generate article lists

// Author-Article mapping
const authorArticles = {
    'sarah-chen': [
        {
            title: 'Advanced Techniques in Mixed-Signal Circuit Design',
            url: '../digital/mixed-signal-design-techniques.html',
            category: 'Mixed Signal',
            excerpt: 'Exploring the intricate balance between precision analog circuits and high-speed digital systems in modern semiconductor design, including power management and signal integrity challenges.',
            date: 'Jan. 26, 2025',
            readTime: '12 min read'
        },
        {
            title: 'Clock Domain Crossing in Mixed-Signal Systems',
            url: '#',
            category: 'Mixed Signal',
            excerpt: 'Best practices for managing multiple clock domains in mixed-signal designs, focusing on metastability prevention and synchronization techniques.',
            date: 'Jan. 15, 2025',
            readTime: '10 min read'
        },
        {
            title: 'Noise Coupling Mitigation in SoC Design',
            url: '#',
            category: 'Mixed Signal',
            excerpt: 'Strategies for reducing substrate and power supply noise coupling between analog and digital blocks in system-on-chip implementations.',
            date: 'Jan. 5, 2025',
            readTime: '14 min read'
        }
    ],
    'michael-zhang': [
        {
            title: 'Next-Generation GaN Power Converters Achieve 99.2% Efficiency',
            url: '#',
            category: 'Power',
            excerpt: 'Revolutionary gallium nitride technology breakthrough in DC-DC conversion promises to transform power management in portable electronics and automotive applications.',
            date: 'Jan. 24, 2025',
            readTime: '8 min read'
        },
        {
            title: 'Thermal Management in High-Power Density Converters',
            url: '#',
            category: 'Power',
            excerpt: 'Innovative cooling strategies for next-generation power converters operating at extreme power densities above 100W/cm³.',
            date: 'Jan. 10, 2025',
            readTime: '11 min read'
        }
    ],
    'lisa-wang': [
        {
            title: '5G mmWave Transceivers: Overcoming Design Challenges',
            url: '#',
            category: 'RF',
            excerpt: 'Path loss and phase noise mitigation strategies in millimeter-wave communication systems for next-generation wireless infrastructure.',
            date: 'Jan. 22, 2025',
            readTime: '10 min read'
        }
    ],
    'james-chen': [
        {
            title: 'FPGA-Based Signal Processing: Minimizing Latency in High-Throughput Systems',
            url: '#',
            category: 'Digital',
            excerpt: 'Implementation strategies for DSP algorithms on field-programmable gate arrays, focusing on parallel processing and pipeline optimization techniques.',
            date: 'Jan. 20, 2025',
            readTime: '15 min read'
        }
    ],
    'elena-rodriguez': [
        {
            title: 'Ultra-Low Noise Amplifiers for Biomedical Sensor Applications',
            url: '#',
            category: 'Analog',
            excerpt: 'Achieving nanovolt-level noise floors in portable medical devices through innovative circuit topologies and careful component selection.',
            date: 'Jan. 18, 2025',
            readTime: '9 min read'
        }
    ],
    'editorial-team': [
        {
            title: 'Template-Based Article Creation System',
            url: '../analog/example-analog-article.html',
            category: 'Tutorials',
            excerpt: 'A comprehensive guide to creating new articles using our streamlined template system for consistent formatting and functionality.',
            date: 'Feb. 1, 2025',
            readTime: '6 min read'
        },
        {
            title: 'How to Design a Low-Noise Op-Amp',
            url: '#',
            category: 'Tutorials',
            excerpt: 'Step-by-step guide to designing ultra-low noise operational amplifiers for precision measurement applications.',
            date: 'Jan. 15, 2025',
            readTime: '8 min read'
        },
        {
            title: 'SPICE Simulation for Beginners',
            url: '#',
            category: 'Tutorials',
            excerpt: 'Basic tutorial on circuit simulation using SPICE, covering fundamental concepts and practical examples.',
            date: 'Jan. 10, 2025',
            readTime: '12 min read'
        },
        {
            title: 'PCB Layout Best Practices',
            url: '#',
            category: 'Tutorials',
            excerpt: 'Design guide for printed circuit board layout with focus on signal integrity and electromagnetic compatibility.',
            date: 'Jan. 5, 2025',
            readTime: '14 min read'
        }
    ]
};

// Author information database
const authorInfo = {
    'sarah-chen': {
        name: 'Dr. Sarah Chen',
        position: 'Mixed-Signal Design Specialist',
        bio: `Dr. Sarah Chen is a leading expert in mixed-signal circuit design with over 15 years of experience in the semiconductor industry. She specializes in the intricate balance between precision analog circuits and high-speed digital systems, focusing on power management and signal integrity challenges in modern electronic systems.

She holds a Ph.D. in Electrical Engineering from Stanford University and has published over 40 research papers in top-tier journals. Her work has been instrumental in advancing mixed-signal design techniques for automotive, industrial, and consumer electronics applications.`,
        social: {
            linkedin: 'https://linkedin.com/in/sarahchen-ee',
            scholar: 'https://scholar.google.com/citations?user=sarahchen',
            website: 'https://sarahchen.ee'
        },
        initials: 'SC'
    },
    'michael-zhang': {
        name: 'Dr. Michael Zhang',
        position: 'Power Electronics Engineer',
        bio: `Dr. Michael Zhang is a leading researcher in gallium nitride (GaN) power converters and high-efficiency DC-DC conversion systems. With over 12 years of experience in power electronics, he has been instrumental in developing next-generation power management solutions for automotive and industrial applications.

He earned his Ph.D. from MIT and has worked with major semiconductor companies to bring cutting-edge power conversion technology from research to production. His expertise includes wide-bandgap semiconductors, power system optimization, and thermal management.`,
        social: {
            linkedin: 'https://linkedin.com/in/michael-zhang-power',
            scholar: 'https://scholar.google.com/citations?user=mzhang',
            twitter: 'https://twitter.com/mzhang_power'
        },
        initials: 'MZ'
    },
    'lisa-wang': {
        name: 'Prof. Lisa Wang',
        position: 'RF & Wireless Communication',
        bio: `Professor Lisa Wang is a renowned expert in RF and wireless communication systems, specializing in 5G mmWave transceivers and next-generation wireless infrastructure. She is currently a Professor of Electrical Engineering at UC Berkeley and has over 20 years of experience in wireless system design.

Her research focuses on advanced antenna systems, beamforming techniques, and signal processing for high-frequency wireless communications. She has published over 100 papers and holds 15 patents in wireless technology.`,
        social: {
            linkedin: 'https://linkedin.com/in/prof-lisa-wang',
            scholar: 'https://scholar.google.com/citations?user=lwang',
            website: 'https://eecs.berkeley.edu/~lwang'
        },
        initials: 'LW'
    },
    'james-chen': {
        name: 'Dr. James Chen',
        position: 'FPGA & DSP Expert',
        bio: `Dr. James Chen specializes in FPGA-based digital signal processing and high-throughput system design. With expertise in parallel processing architectures and real-time systems, he has developed innovative solutions for telecommunications, radar, and medical imaging applications.

He holds a Ph.D. in Computer Engineering and has over 10 years of experience in FPGA development and optimization. His work focuses on minimizing latency while maximizing throughput in complex digital systems.`,
        social: {
            linkedin: 'https://linkedin.com/in/james-chen-fpga',
            scholar: 'https://scholar.google.com/citations?user=jchen',
            github: 'https://github.com/jchen-fpga'
        },
        initials: 'JC'
    },
    'elena-rodriguez': {
        name: 'Dr. Elena Rodriguez',
        position: 'Biomedical Circuit Designer',
        bio: `Dr. Elena Rodriguez is an expert in ultra-low noise analog circuit design for biomedical applications. She specializes in developing amplifiers and sensor interfaces that achieve nanovolt-level noise performance for portable medical devices and precision measurement systems.

With a Ph.D. in Biomedical Engineering and 8 years of industry experience, she has contributed to numerous FDA-approved medical devices and holds several patents in biomedical circuit design.`,
        social: {
            linkedin: 'https://linkedin.com/in/elena-rodriguez-biomed',
            scholar: 'https://scholar.google.com/citations?user=erodriguez',
            website: 'https://erodriguez.bio'
        },
        initials: 'ER'
    },
    'editorial-team': {
        name: 'Editorial Team',
        position: 'Mixed Signal Editorial',
        bio: `Our editorial team consists of experienced engineers and technical writers who are passionate about making complex mixed-signal design concepts accessible to engineers at all levels. We create comprehensive tutorials, practical guides, and curated content to help engineers excel in their work.

The team combines decades of industry experience with a deep understanding of educational content creation, ensuring that our tutorials and guides are both technically accurate and easy to follow.`,
        social: {
            website: 'https://mixedsignal.design/about'
        },
        initials: 'ET'
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Get current page author from URL
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    
    // Update author count in index page
    if (currentPage === 'index' || currentPage === '') {
        updateAuthorCounts();
    } else if (authorArticles[currentPage]) {
        // Generate article list for individual author page
        generateAuthorArticleList(currentPage);
    }
});

function updateAuthorCounts() {
    const authorCards = document.querySelectorAll('.author-card');
    
    authorCards.forEach(card => {
        const authorLink = card.querySelector('h3 a');
        if (authorLink) {
            const authorSlug = authorLink.getAttribute('href').replace('.html', '');
            const articles = authorArticles[authorSlug];
            if (articles) {
                const countElement = card.querySelector('.article-count');
                if (countElement) {
                    const count = articles.length;
                    countElement.textContent = `${count} article${count !== 1 ? 's' : ''}`;
                }
            }
        }
    });
}

function generateAuthorArticleList(authorSlug) {
    const articles = authorArticles[authorSlug];
    if (!articles || articles.length === 0) return;
    
    const articleListContainer = document.querySelector('.article-list');
    if (!articleListContainer) return;
    
    // Clear existing content
    articleListContainer.innerHTML = '';
    
    // Generate article items
    articles.forEach(article => {
        const articleElement = createArticleElement(article);
        articleListContainer.appendChild(articleElement);
    });
    
    // Update section title with count
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle && authorInfo[authorSlug]) {
        const count = articles.length;
        sectionTitle.textContent = `Articles by ${authorInfo[authorSlug].name} (${count})`;
    }
}

function createArticleElement(article) {
    const articleDiv = document.createElement('article');
    articleDiv.className = 'article-item';
    
    articleDiv.innerHTML = `
        <span class="article-category">${article.category}</span>
        <h3><a href="${article.url}">${article.title}</a></h3>
        <p class="article-excerpt">${article.excerpt}</p>
        <div class="article-meta">
            <span class="article-date">${article.date}</span>
        </div>
    `;
    
    return articleDiv;
}

// Function to create new author pages programmatically
function createAuthorPage(authorSlug) {
    const author = authorInfo[authorSlug];
    if (!author) return null;
    
    const articles = authorArticles[authorSlug] || [];
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${author.name} - Mixed Signal Author</title>
    
    <!-- Reuse existing styles -->
    <link rel="stylesheet" href="../assets/css/styles.css">
    <link rel="stylesheet" href="../assets/css/article.css">
    <link rel="stylesheet" href="../assets/css/authors.css">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Header -->
    <header class="main-header">
        <div class="header-container">
            <div class="header-top">
                <div class="date-weather">
                    <span id="current-date"></span>
                </div>
                <h1 class="site-logo">
                    <a href="../index.html">
                        <img src="../assets/icons/ms-logo.png" alt="Mixed Signal" class="article-logo-png">
                    </a>
                </h1>
                <div class="header-actions">
                    <button class="subscribe-btn">Subscribe</button>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
        <div class="article-container">
            <!-- Author Header -->
            <div class="author-header">
                <div class="author-hero-image">
                    <div class="image-placeholder">${author.initials}</div>
                </div>
                <h1 class="author-name">${author.name}</h1>
                <p class="author-position">${author.position}</p>
                <div class="author-bio">
                    ${author.bio.split('\n\n').map(p => `<p>${p}</p>`).join('')}
                </div>
                
                <!-- Social Links -->
                <div class="social-links">
                    ${generateSocialLinks(author.social)}
                </div>
            </div>

            <!-- Author Articles -->
            <div class="author-articles">
                <h2 class="section-title">Articles by ${author.name}</h2>
                <div class="article-list">
                    <!-- Articles will be populated by JavaScript -->
                </div>
            </div>
        </div>
    </main>

    <!-- Subscribe Modal -->
    <div id="subscribe-modal" class="subscribe-modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Subscribe to Mixed Signal Newsletter</h3>
                <button class="modal-close" id="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <form id="subscribe-form" class="subscribe-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="subscriber-name">Name</label>
                            <input type="text" id="subscriber-name" name="name" maxlength="50" required>
                        </div>
                        <div class="form-group">
                            <label for="subscriber-email">Email</label>
                            <input type="email" id="subscriber-email" name="email" required>
                        </div>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn-cancel" id="btn-cancel">Cancel</button>
                        <button type="submit" class="btn-submit">Subscribe</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- JavaScript -->
    <script src="../assets/javascript/article.js"></script>
    <script src="../assets/javascript/authors.js"></script>
</body>
</html>`;
}

function generateSocialLinks(social) {
    const icons = {
        linkedin: '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>',
        scholar: '<path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>',
        website: '<path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>',
        twitter: '<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>',
        github: '<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>'
    };
    
    const labels = {
        linkedin: 'LinkedIn',
        scholar: 'Google Scholar',
        website: 'Website',
        twitter: 'X',
        github: 'GitHub'
    };
    
    let links = '';
    for (const [platform, url] of Object.entries(social)) {
        if (url) {
            links += `
                <a href="${url}" class="social-link" target="_blank">
                    <svg class="social-icon" viewBox="0 0 24 24">
                        ${icons[platform] || icons.website}
                    </svg>
                    ${labels[platform] || platform}
                </a>
            `;
        }
    }
    return links;
}

// Function to update article counts on authors index page
function updateAuthorCounts() {
    // Map author slugs to their display names for matching
    const authorMapping = {
        'sarah-chen': 'Dr. Sarah Chen',
        'michael-zhang': 'Dr. Michael Zhang',
        'lisa-wang': 'Prof. Lisa Wang',
        'james-chen': 'Dr. James Chen',
        'elena-rodriguez': 'Dr. Elena Rodriguez',
        'editorial-team': 'Editorial Team'
    };
    
    // Update counts for each author
    for (const [slug, displayName] of Object.entries(authorMapping)) {
        const articles = authorArticles[slug] || [];
        const count = articles.length;
        
        // Find the author item by name
        const authorItems = document.querySelectorAll('.author-item');
        authorItems.forEach(item => {
            const nameElement = item.querySelector('h3 a');
            if (nameElement && nameElement.textContent === displayName) {
                const countElement = item.querySelector('.article-count');
                if (countElement) {
                    countElement.textContent = count === 1 ? '1 article' : `${count} articles`;
                }
            }
        });
    }
}

// Export functions for use in other scripts
window.AuthorSystem = {
    authorArticles,
    authorInfo,
    createAuthorPage,
    generateAuthorArticleList,
    updateAuthorCounts
};