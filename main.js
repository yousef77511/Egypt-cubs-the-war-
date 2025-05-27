// Mobile menu toggle
document.getElementById('menu-btn')?.addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Highlight current page in navigation
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    const desktopLinks = document.querySelectorAll('nav > div > div.hidden.md\\:flex a');

    function highlightCurrentPage(links) {
        links.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage) {
                link.classList.add('text-blue-400');
                link.classList.remove('hover:text-blue-400');
            }
        });
    }

    highlightCurrentPage(mobileLinks);
    highlightCurrentPage(desktopLinks);

    // Add current year to footer
    document.getElementById('current-year')?.textContent = new Date().getFullYear();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
});

// Contact form handling
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Message Sent';
        submitBtn.classList.remove('bg-gradient-to-r', 'from-blue-500', 'to-purple-600');
        submitBtn.classList.add('bg-green-600');
        
        // Reset form
        this.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            submitBtn.classList.add('bg-gradient-to-r', 'from-blue-500', 'to-purple-600');
            submitBtn.classList.remove('bg-green-600');
        }, 3000);
    }, 1500);
});

// Dark mode toggle (optional)
const darkModeToggle = document.getElementById('dark-mode-toggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
    });
    
    // Check for saved preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.documentElement.classList.add('dark');
    }
}