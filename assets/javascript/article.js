// Article page JavaScript with citation system

function initializeAll() {
    // Initialize citation system
    initializeCitations();
    
    // Initialize sidebar toggle
    initializeSidebarToggle();
    
    // Initialize subscribe modal
    initializeSubscribeModal();
    
    // Initialize social sharing
    initializeSocialSharing();
    
    // Initialize AdSense monitoring
    initializeAdSense();
    
    // Header logo shrinking on scroll
    const header = document.querySelector('.main-header');
    const logo = document.querySelector('.article-logo-png');
    let isScrolled = false;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100 && !isScrolled) {
            // Scrolled down - shrink logo
            header.classList.add('scrolled');
            isScrolled = true;
        } else if (scrollTop <= 100 && isScrolled) {
            // Back to top - restore logo size
            header.classList.remove('scrolled');
            isScrolled = false;
        }
    });
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Progress indicator based on scroll
    let progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #c41230, #ff6b6b);
        transition: width 0.3s ease;
        z-index: 1001;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize when DOM is ready or immediately if already ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll);
} else {
    initializeAll();
}

// Citation system implementation
function initializeCitations() {
    const citations = document.querySelectorAll('cite[data-ref]');
    const referencesSection = document.getElementById('references');
    const referencesList = document.querySelector('.references-list');
    
    if (citations.length === 0) return;
    
    // Collect unique references
    const referencesMap = new Map();
    let citationNumber = 1;
    
    citations.forEach(cite => {
        const ref = cite.getAttribute('data-ref');
        const fullText = cite.textContent;
        
        if (!referencesMap.has(ref)) {
            referencesMap.set(ref, {
                number: citationNumber++,
                text: fullText
            });
        }
        
        const refData = referencesMap.get(ref);
        
        // Replace citation text with number
        cite.innerHTML = refData.number;
        cite.setAttribute('data-citation-number', refData.number);
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'citation-tooltip';
        tooltip.textContent = refData.text;
        document.body.appendChild(tooltip);
        
        // Add hover functionality
        let tooltipTimeout;
        
        cite.addEventListener('mouseenter', function(e) {
            clearTimeout(tooltipTimeout);
            const rect = cite.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10 + window.scrollY) + 'px';
            
            // Ensure tooltip stays within viewport
            const tooltipRect = tooltip.getBoundingClientRect();
            if (tooltipRect.left < 10) {
                tooltip.style.left = '10px';
            } else if (tooltipRect.right > window.innerWidth - 10) {
                tooltip.style.left = (window.innerWidth - tooltipRect.width - 10) + 'px';
            }
            
            if (tooltipRect.top < 10) {
                tooltip.style.top = (rect.bottom + 10 + window.scrollY) + 'px';
            }
            
            tooltip.classList.add('visible');
        });
        
        cite.addEventListener('mouseleave', function() {
            tooltipTimeout = setTimeout(() => {
                tooltip.classList.remove('visible');
            }, 200);
        });
        
        // Add click to scroll functionality
        cite.addEventListener('click', function(e) {
            e.preventDefault();
            const refItem = document.getElementById('ref-' + ref);
            if (refItem) {
                refItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Highlight the reference
                refItem.classList.add('highlight');
                setTimeout(() => {
                    refItem.classList.remove('highlight');
                }, 2000);
            }
        });
        
        // Keep tooltip visible when hovering over it
        tooltip.addEventListener('mouseenter', function() {
            clearTimeout(tooltipTimeout);
        });
        
        tooltip.addEventListener('mouseleave', function() {
            tooltip.classList.remove('visible');
        });
    });
    
    // Generate references section
    if (referencesMap.size > 0 && referencesSection && referencesList) {
        referencesSection.style.display = 'block';
        
        // Sort references by number
        const sortedRefs = Array.from(referencesMap.entries()).sort((a, b) => 
            a[1].number - b[1].number
        );
        
        sortedRefs.forEach(([ref, data]) => {
            const li = document.createElement('li');
            li.id = 'ref-' + ref;
            li.innerHTML = `<span class="ref-text">${data.text}</span>`;
            referencesList.appendChild(li);
        });
    }
    
    // Add MathJax reprocessing after citations are set up
    function tryMathJaxTypeset() {
        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise().catch((e) => console.log('MathJax error:', e));
        } else if (window.MathJax && window.MathJax.Hub) {
            // MathJax 2.x fallback
            window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
        } else {
            // MathJax not ready yet, try again
            setTimeout(tryMathJaxTypeset, 200);
        }
    }
    
    // Wait for MathJax to be ready
    if (window.MathJax) {
        tryMathJaxTypeset();
    } else {
        // Wait for MathJax to load
        const checkMathJax = () => {
            if (window.MathJax) {
                tryMathJaxTypeset();
            } else {
                setTimeout(checkMathJax, 100);
            }
        };
        checkMathJax();
    }
}

// Handle text selection for sharing
document.addEventListener('mouseup', function(e) {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    
    if (selectedText && selectedText.length > 10) {
        // Remove existing tooltip if any
        const existingTooltip = document.querySelector('.selection-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
        
        // Don't create tooltip for citation tooltips
        if (e.target.closest('.citation-tooltip')) return;
        
        // Create tooltip for sharing selected text
        const tooltip = document.createElement('div');
        tooltip.className = 'selection-tooltip';
        tooltip.innerHTML = `
            <button class="tooltip-btn" data-action="copy">Copy</button>
            <button class="tooltip-btn" data-action="highlight">Highlight</button>
        `;
        tooltip.style.cssText = `
            position: absolute;
            background: #000;
            color: white;
            padding: 0.5rem;
            border-radius: 4px;
            display: flex;
            gap: 0.5rem;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        
        // Position tooltip near selection
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        tooltip.style.left = `${rect.left + (rect.width / 2) - 50}px`;
        tooltip.style.top = `${rect.top + window.scrollY - 40}px`;
        
        document.body.appendChild(tooltip);
        
        // Handle tooltip actions
        tooltip.addEventListener('click', function(e) {
            if (e.target.dataset.action === 'copy') {
                navigator.clipboard.writeText(selectedText);
                e.target.textContent = 'Copied!';
            } else if (e.target.dataset.action === 'highlight') {
                const span = document.createElement('span');
                span.style.backgroundColor = '#ffeb3b';
                span.style.padding = '2px 0';
                try {
                    range.surroundContents(span);
                } catch(err) {
                    console.log('Cannot highlight across multiple elements');
                }
            }
            setTimeout(() => tooltip.remove(), 1000);
        });
    }
});

// Remove tooltip when clicking elsewhere
document.addEventListener('click', function(e) {
    if (!e.target.closest('.selection-tooltip') && !e.target.closest('cite')) {
        const tooltip = document.querySelector('.selection-tooltip');
        if (tooltip) tooltip.remove();
    }
});

// Add CSS for tooltip buttons and mobile nav
const style = document.createElement('style');
style.textContent = `
    .tooltip-btn {
        background: transparent;
        border: 1px solid white;
        color: white;
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
        cursor: pointer;
        border-radius: 2px;
        font-family: 'Inter', sans-serif;
    }
    .tooltip-btn:hover {
        background: white;
        color: black;
    }
`;
document.head.appendChild(style);

// Sidebar toggle functionality
function initializeSidebarToggle() {
    const sidebar = document.getElementById('article-sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle');
    const toggleText = toggleBtn.querySelector('.toggle-text');
    
    if (!sidebar || !toggleBtn) return;
    
    toggleBtn.addEventListener('click', function() {
        const isHidden = sidebar.classList.contains('hidden');
        
        if (isHidden) {
            // Show sidebar
            sidebar.classList.remove('hidden');
            toggleText.textContent = 'Hide Discussion';
        } else {
            // Hide sidebar
            sidebar.classList.add('hidden');
            toggleText.textContent = 'Show Discussion';
        }
    });
}

// Subscribe modal functionality
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

// Social sharing functionality
function initializeSocialSharing() {
    const shareIcons = document.querySelectorAll('.share-icon');
    
    shareIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.dataset.platform;
            const articleTitle = document.querySelector('.article-title').textContent;
            const articleUrl = window.location.href;
            
            let shareUrl = '';
            
            switch(platform) {
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
                    break;
                case 'x':
                    shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(articleTitle)}&url=${encodeURIComponent(articleUrl)}`;
                    break;
                case 'email':
                    const emailSubject = encodeURIComponent(articleTitle);
                    const emailBody = encodeURIComponent(`I thought you might find this article interesting:\n\n${articleTitle}\n\n${articleUrl}`);
                    shareUrl = `mailto:?subject=${emailSubject}&body=${emailBody}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, 'share-dialog', 'width=600,height=400');
            }
        });
    });
}

// AdSense management functionality
function initializeAdSense() {
    // Function to check if an ad has loaded successfully
    function checkAdLoaded(adContainer, adSection) {
        // Check if the ad container has content (real ads)
        const hasContent = adContainer.children.length > 0 && 
                          adContainer.innerHTML.trim() !== '' &&
                          !adContainer.innerHTML.includes('placeholder');
        
        // Check for AdSense specific indicators
        const hasAdSenseContent = adContainer.querySelector('ins[class*="adsbygoogle"]') !== null;
        const hasIframe = adContainer.querySelector('iframe') !== null;
        
        if (hasContent && (hasAdSenseContent || hasIframe)) {
            adSection.style.display = 'block';
            return true;
        }
        return false;
    }
    
    // Monitor for ad loading
    function monitorAdLoading() {
        const adSection = document.getElementById('ad-section');
        const adContainer = document.getElementById('adsense-container');
        const adSectionSmall = document.getElementById('ad-section-small');
        const adContainerSmall = document.getElementById('adsense-container-small');
        
        if (adSection && adContainer) {
            // Check every 500ms for ad content
            const checkInterval = setInterval(() => {
                if (checkAdLoaded(adContainer, adSection)) {
                    clearInterval(checkInterval);
                }
            }, 500);
            
            // Stop checking after 10 seconds
            setTimeout(() => {
                clearInterval(checkInterval);
            }, 10000);
        }
        
        if (adSectionSmall && adContainerSmall) {
            // Check every 500ms for small ad content
            const checkIntervalSmall = setInterval(() => {
                if (checkAdLoaded(adContainerSmall, adSectionSmall)) {
                    clearInterval(checkIntervalSmall);
                }
            }, 500);
            
            // Stop checking after 10 seconds
            setTimeout(() => {
                clearInterval(checkIntervalSmall);
            }, 10000);
        }
    }
    
    // Start monitoring when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', monitorAdLoading);
    } else {
        monitorAdLoading();
    }
    
    // Also monitor when Google AdSense script loads
    window.addEventListener('load', () => {
        setTimeout(monitorAdLoading, 1000);
    });
}