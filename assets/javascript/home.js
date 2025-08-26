// Home page JavaScript - Horizontal scrolling and interactive features

document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        dateElement.textContent = today.toLocaleDateString('en-US', options);
    }
    
    // Set current year in footer
    const yearElement = document.getElementById('footer-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Initialize subscribe modal
    initializeSubscribeModal();
    
    // Initialize tag filtering
    initializeTagFiltering();
    
    // Initialize writer modal
    initializeWriterModal();

    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.email-input');
            const submitBtn = this.querySelector('.submit-btn');
            
            if (emailInput.value && emailInput.value.includes('@')) {
                // Save to localStorage for demo
                const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
                subscribers.push({
                    email: emailInput.value,
                    date: new Date().toISOString()
                });
                localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
                
                // Update UI
                submitBtn.textContent = 'Subscribed!';
                submitBtn.style.background = '#4CAF50';
                emailInput.value = '';
                
                setTimeout(() => {
                    submitBtn.textContent = 'Subscribe';
                    submitBtn.style.background = '#000';
                }, 3000);
            }
        });
    }
    
    // Dropdown functionality
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const navItem = this.parentElement;
            const isActive = navItem.classList.contains('active');
            
            // Close all other dropdowns
            document.querySelectorAll('.nav-item.active').forEach(item => {
                if (item !== navItem) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            navItem.classList.toggle('active', !isActive);
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-item')) {
            document.querySelectorAll('.nav-item.active').forEach(item => {
                item.classList.remove('active');
            });
        }
    });
    
    // Close dropdown when clicking a dropdown menu item
    document.querySelectorAll('.dropdown-menu a').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.nav-item.active').forEach(item => {
                item.classList.remove('active');
            });
        });
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all article elements
    const articles = document.querySelectorAll('.list-article, .grid-article, .opinion-piece');
    articles.forEach(article => {
        article.style.opacity = '0';
        article.style.transform = 'translateY(20px)';
        article.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(article);
    });
    
    // Auto-scroll for horizontal section (optional - can be activated on hover)
    let autoScrollInterval;
    const startAutoScroll = () => {
        if (scrollContainer) {
            autoScrollInterval = setInterval(() => {
                scrollContainer.scrollLeft += 1;
                if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
                    scrollContainer.scrollLeft = 0;
                }
            }, 30);
        }
    };
    
    const stopAutoScroll = () => {
        clearInterval(autoScrollInterval);
    };
    
    // Uncomment to enable auto-scroll on page load
    // startAutoScroll();
    
    // Stop auto-scroll on user interaction
    if (scrollContainer) {
        scrollContainer.addEventListener('mouseenter', stopAutoScroll);
        scrollContainer.addEventListener('touchstart', stopAutoScroll);
    }
    
    // Add styles for scroll container
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .scroll-container {
                cursor: grab;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Lazy loading for images (when you add real images)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        // Add this when you have real images
        // document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
    }
});

// Subscribe modal functionality (reuse from article.js)
function initializeSubscribeModal() {
    const subscribeBtn = document.querySelector('.subscribe-btn');
    const modal = document.getElementById('subscribe-modal');
    const modalClose = document.getElementById('modal-close');
    const btnCancel = document.getElementById('btn-cancel');
    const subscribeForm = document.getElementById('subscribe-form');
    
    if (!subscribeBtn || !modal) return;
    
    // Open modal
    subscribeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        const firstInput = modal.querySelector('input');
        setTimeout(() => firstInput && firstInput.focus(), 300);
    });
    
    // Close modal functions
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        subscribeForm.reset();
    }
    
    // Close modal events
    modalClose && modalClose.addEventListener('click', closeModal);
    btnCancel && btnCancel.addEventListener('click', closeModal);
    
    // Close on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Form submission
    subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('subscriber-name').value.trim();
        const email = document.getElementById('subscriber-email').value.trim();
        
        if (!name || !email) return;
        
        // Disable submit button
        const submitBtn = subscribeForm.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Subscribing...';
        
        // Submit to Google Forms
        submitToGoogleForms(name, email)
            .then(() => {
                // Success
                modal.innerHTML = `
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>Thank You!</h3>
                            <button class="modal-close" onclick="document.getElementById('subscribe-modal').classList.remove('active'); document.body.style.overflow = '';">&times;</button>
                        </div>
                        <div class="modal-body">
                            <p>Thank you for subscribing! You'll receive the latest mixed-signal design content in your inbox.</p>
                            <div class="form-actions">
                                <button type="button" class="btn-submit" onclick="document.getElementById('subscribe-modal').classList.remove('active'); document.body.style.overflow = '';">Close</button>
                            </div>
                        </div>
                    </div>
                `;
            })
            .catch(() => {
                // Error
                submitBtn.disabled = false;
                submitBtn.textContent = 'Subscribe';
                alert('There was an error subscribing. Please try again.');
            });
    });
}

// Submit to Google Forms
async function submitToGoogleForms(name, email) {
    const formData = new FormData();
    
    // Google Form field IDs
    formData.append('entry.1614607270', name); // Name field
    formData.append('entry.55106167', email); // Email field
    
    const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLSfvYxQFdN3lXGgGyw7WuRpRkbfgm75s70WxNzvH7dv2iqAqKg/formResponse', {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
    });
    
    // Since it's no-cors, we can't check response status, assume success
    return Promise.resolve();
}

// Tag filtering functionality
function initializeTagFiltering() {
    const tagFilters = document.querySelectorAll('.tag-filter');
    const articles = document.querySelectorAll('.list-article, .sidebar-article');
    
    // Add active class to "All Articles" by default
    const allArticlesFilter = document.querySelector('.tag-filter[data-tag="all"]');
    if (allArticlesFilter) {
        allArticlesFilter.classList.add('active');
    }
    
    tagFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            
            const selectedTag = this.getAttribute('data-tag');
            
            // Remove active class from all filters
            tagFilters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            // Filter articles
            filterArticles(selectedTag, articles);
            
            // Update URL hash without page scroll
            if (selectedTag !== 'all') {
                history.replaceState(null, null, '#' + selectedTag);
            } else {
                history.replaceState(null, null, '#');
            }
        });
    });
    
    // Check for URL hash on page load
    const urlHash = window.location.hash.substring(1);
    if (urlHash) {
        const targetFilter = document.querySelector(`.tag-filter[data-tag="${urlHash}"]`);
        if (targetFilter) {
            targetFilter.click();
        }
    }
}

function filterArticles(tag, articles) {
    let visibleCount = 0;
    
    articles.forEach(article => {
        const articleTags = article.getAttribute('data-tags') || '';
        
        if (tag === 'all' || articleTags.includes(tag)) {
            article.style.display = '';
            article.style.opacity = '0';
            visibleCount++;
            
            // Animate in with delay
            setTimeout(() => {
                article.style.opacity = '1';
                article.style.transform = 'translateY(0)';
            }, visibleCount * 50);
        } else {
            article.style.opacity = '0';
            article.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                article.style.display = 'none';
            }, 200);
        }
    });
    
    // Hide/show featured article based on tag selection
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
        if (tag === 'all') {
            heroSection.style.display = 'block';
        } else {
            heroSection.style.display = 'none';
        }
    }
    
    // Hide/show sidebar sections based on visible articles
    updateSidebarSections(tag);
    
    // Update counts in navigation if needed
    updateTagCounts(tag);
}

function updateSidebarSections(activeTag) {
    const sidebarSections = document.querySelectorAll('.sidebar-section');
    
    sidebarSections.forEach(section => {
        const sectionArticles = section.querySelectorAll('.sidebar-article');
        let hasVisibleArticles = false;
        let visibleArticles = [];
        
        sectionArticles.forEach(article => {
            const articleTags = article.getAttribute('data-tags') || '';
            if (activeTag === 'all' || articleTags.includes(activeTag)) {
                hasVisibleArticles = true;
                visibleArticles.push(article);
            }
        });
        
        if (hasVisibleArticles) {
            section.style.display = 'block';
            
            // Reset all articles to have borders
            sectionArticles.forEach(article => {
                article.style.borderBottom = '1px solid #f0f0f0';
                article.style.marginBottom = '1rem';
                article.style.paddingBottom = '1rem';
            });
            
            // Remove border from the last visible article
            if (visibleArticles.length > 0) {
                const lastVisible = visibleArticles[visibleArticles.length - 1];
                lastVisible.style.borderBottom = 'none';
                lastVisible.style.marginBottom = '0';
                lastVisible.style.paddingBottom = '0';
            }
        } else {
            section.style.display = 'none';
        }
    });
}

function updateTagCounts(activeTag) {
    const tagFilters = document.querySelectorAll('.tag-filter');
    
    tagFilters.forEach(filter => {
        const tag = filter.getAttribute('data-tag');
        const articles = document.querySelectorAll('.list-article, .sidebar-article');
        let count = 0;
        
        if (tag === 'all') {
            count = articles.length;
        } else {
            articles.forEach(article => {
                const articleTags = article.getAttribute('data-tags') || '';
                if (articleTags.includes(tag)) {
                    count++;
                }
            });
        }
        
        // You can optionally show counts in the navigation
        // filter.textContent = `${filter.textContent.split('(')[0].trim()} (${count})`;
    });
}

// Writer modal functionality
function initializeWriterModal() {
    const writerBtn = document.getElementById('writer-btn');
    const modal = document.getElementById('writer-modal');
    const modalClose = document.getElementById('writer-modal-close');
    const closeBtn = document.getElementById('writer-close-btn');
    
    if (!writerBtn || !modal) return;
    
    // Open modal
    writerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal functions
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Close modal events
    modalClose && modalClose.addEventListener('click', closeModal);
    closeBtn && closeBtn.addEventListener('click', closeModal);
    
    // Close on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}