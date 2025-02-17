document.addEventListener('DOMContentLoaded', function() {
    const containers = document.querySelectorAll('.timeline-scroll-container');
    
    containers.forEach(container => {
        const prevBtn = container.parentElement.querySelector('.timeline-nav-button.prev');
        const nextBtn = container.parentElement.querySelector('.timeline-nav-button.next');
        const timelineItems = container.querySelector('ul').children;
        // const isSkillsSection = container.closest('#skillsSection') !== null;
        
        // Hide buttons if less than 4 items or if in skills section
        if (timelineItems.length <= 2) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            container.style.width = '100%';
            container.style.margin = '0';
            // Remove scrollable class immediately
            container.classList.remove('is-scrollable');
            return;
        }


        const scrollStep = 250;
        const wheelScrollMultiplier = 1.5;

        function updateButtonStates() {
            const scrollLeft = container.scrollLeft;
            const maxScroll = container.scrollWidth - container.clientWidth;
            
            prevBtn.style.display = scrollLeft <= 0 ? 'none' : 'flex';
            nextBtn.style.display = scrollLeft >= maxScroll ? 'none' : 'flex';
        }

        // Handle mouse wheel scrolling
        container.addEventListener('wheel', (e) => {
            // e.preventDefault();
            const delta = e.deltaY || e.detail || e.wheelDelta;
            container.scrollBy({
                left: delta * wheelScrollMultiplier,
                behavior: 'smooth'
            });
            updateButtonStates();
        });

        // Handle button clicks
        prevBtn.addEventListener('click', () => {
            container.scrollBy({
                left: -scrollStep,
                behavior: 'smooth'
            });
            updateButtonStates();
        });

        nextBtn.addEventListener('click', () => {
            container.scrollBy({
                left: scrollStep,
                behavior: 'smooth'
            });
            updateButtonStates();
        });

        // Handle drag scrolling
        let isDown = false;
        let startX;
        let scrollLeft;

        // Initial button state
        updateButtonStates();

        // Handle window resize
        window.addEventListener('resize', updateButtonStates);

      

        // Show/hide indicator based on scroll position
        function updateIndicators() {
            const scrollLeft = container.scrollLeft;
            const maxScroll = container.scrollWidth - container.clientWidth;
            
            // Update nav buttons
            if (prevBtn && nextBtn) {
                prevBtn.style.display = scrollLeft <= 0 ? 'none' : 'flex';
                nextBtn.style.display = scrollLeft >= maxScroll ? 'none' : 'flex';
            }
            
            // Update scroll indicator
            indicator.style.opacity = scrollLeft >= maxScroll ? '0' : '0.8';
        }

        // Add smooth scroll behavior
        function smoothScroll(target) {
            container.scrollTo({
                left: target,
                behavior: 'smooth'
            });
        }

        // Enhanced button click handlers
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                const target = container.scrollLeft - container.offsetWidth * 0.8;
                smoothScroll(target);
            });

            nextBtn.addEventListener('click', () => {
                const target = container.scrollLeft + container.offsetWidth * 0.8;
                smoothScroll(target);
            });
        }

        // Update indicators on scroll and resize
        container.addEventListener('scroll', updateIndicators);
        window.addEventListener('resize', updateIndicators);
        
        // Initial update
        updateIndicators();

    });
});



document.addEventListener('DOMContentLoaded', function() {
    const containers = document.querySelectorAll('.timeline-scroll-container');
    
    containers.forEach(container => {
        const timeline = container.closest('.timeline');
        const prevBtn = timeline.querySelector('.timeline-nav-button.prev');
        const nextBtn = timeline.querySelector('.timeline-nav-button.next');
        const itemsList = container.querySelector('ul');
        
        // Enhanced smooth scroll settings
        const scrollSettings = {
            behavior: 'smooth',
            speed: 2, // Multiplier for wheel scrolling
            buttonStep: 400, // Pixels to scroll on button click
            sensitivity: 1.5 // Mouse wheel sensitivity
        };

        // Handle wheel/trackpad scrolling
        container.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY || e.detail || e.wheelDelta;
            container.scrollLeft += (delta * scrollSettings.speed * scrollSettings.sensitivity);
            updateButtonVisibility();
        }, { passive: false });

        // Button click handlers with faster scroll
        prevBtn.addEventListener('click', () => {
            container.scrollBy({
                left: -scrollSettings.buttonStep,
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            container.scrollBy({
                left: scrollSettings.buttonStep,
                behavior: 'smooth'
            });
        });

        // Visibility logic
        function updateButtonVisibility() {
            const items = itemsList.children;
            const isScrollable = container.scrollWidth > container.clientWidth;
            const hasEnoughItems = items.length > 2;
            
            if (!isScrollable || !hasEnoughItems) {
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
                return;
            }

            const atStart = container.scrollLeft <= 0;
            const atEnd = container.scrollLeft >= (container.scrollWidth - container.clientWidth);
            
            prevBtn.style.display = atStart ? 'none' : 'flex';
            nextBtn.style.display = atEnd ? 'none' : 'flex';
        }

        // Update on scroll and resize
        container.addEventListener('scroll', updateButtonVisibility);
        window.addEventListener('resize', updateButtonVisibility);

        // Initial check
        updateButtonVisibility();
    });
});