document.addEventListener('DOMContentLoaded', function() {
    const containers = document.querySelectorAll('.timeline-scroll-container');
    
    containers.forEach(container => {
        const prevBtn = container.parentElement.querySelector('.timeline-nav-button.prev');
        const nextBtn = container.parentElement.querySelector('.timeline-nav-button.next');
        const timelineItems = container.querySelector('ul').children;
        const isSkillsSection = container.closest('#skillsSection') !== null;
        
        // Hide buttons if less than 4 items or if in skills section
        if (timelineItems.length <= 3 || isSkillsSection) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            container.style.width = '100%';
            container.style.margin = '0';
            // Remove scrollable class immediately
            container.classList.remove('is-scrollable');
            return;
        }

        // Hide all content divs initially except for active one
        Array.from(timelineItems).forEach((item, index) => {
            const content = item.querySelector('.content');
            if (content) {
                // Only show content for the first item initially
                content.style.display = index === 0 ? 'block' : 'none';
            }
        });

        // Click handler for timeline items
        Array.from(timelineItems).forEach(item => {
            const point = item.querySelector('.point');
            if (!point) return;
            
            point.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event bubbling
                
                // Remove active class from all items
                Array.from(timelineItems).forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked item
                item.classList.add('active');
                
                // Handle content display
                const content = item.querySelector('.content');
                if (content) {
                    // Hide all other contents
                    container.querySelectorAll('.content').forEach(c => {
                        if (c !== content) {
                            c.style.display = 'none';
                            c.style.visibility = 'hidden';
                            c.style.opacity = '0';
                        }
                    });
                    
                    // Show this content
                    content.style.display = 'block';
                    content.style.visibility = 'visible';
                    requestAnimationFrame(() => {
                        content.style.opacity = '1';
                    });
                }
            });
        });

        // Close content when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.content') && !e.target.closest('.point')) {
                Array.from(timelineItems).forEach(item => {
                    item.classList.remove('active');
                    const content = item.querySelector('.content');
                    if (content) {
                        content.style.display = 'none';
                        content.style.visibility = 'hidden';
                        content.style.opacity = '0';
                    }
                });
            }
        });

        // Activate first item by default
        // if (timelineItems[0]) {
        //     timelineItems[0].classList.add('active');
        //     const firstContent = timelineItems[0].querySelector('.content');
        //     if (firstContent) {
        //         firstContent.style.display = 'block';
        //         firstContent.style.opacity = '1';
        //         firstContent.style.transform = 'translate(-50%, -50%) scale(1)';
        //     }
        // }

        const scrollStep = 200;
        const wheelScrollMultiplier = 1.5;

        function updateButtonStates() {
            const scrollLeft = container.scrollLeft;
            const maxScroll = container.scrollWidth - container.clientWidth;
            
            prevBtn.style.display = scrollLeft <= 0 ? 'none' : 'flex';
            nextBtn.style.display = scrollLeft >= maxScroll ? 'none' : 'flex';
        }

        // Handle mouse wheel scrolling
        container.addEventListener('wheel', (e) => {
            e.preventDefault();
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

        container.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener('mouseleave', () => { isDown = false; });
        container.addEventListener('mouseup', () => { isDown = false; });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
            updateButtonStates();
        });

        // Initial button state
        updateButtonStates();

        // Handle window resize
        window.addEventListener('resize', updateButtonStates);

        // Add scroll indicator
        const indicator = document.createElement('div');
        indicator.className = 'timeline-scroll-indicator';
        indicator.innerHTML = `
            <span class="text">Scroll or use arrows</span>
            <span class="icon">→</span>
        `;
        container.parentElement.appendChild(indicator);

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

        function updateScrollState() {
            const scrollLeft = container.scrollLeft;
            const maxScroll = container.scrollWidth - container.clientWidth;
            
            // Update scroll indicators
            if (maxScroll > 0) {
                container.classList.add('is-scrollable');
                // Show/hide buttons based on scroll position
                prevBtn.style.display = scrollLeft <= 0 ? 'none' : 'flex';
                nextBtn.style.display = scrollLeft >= maxScroll ? 'none' : 'flex';
            } else {
                container.classList.remove('is-scrollable');
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
            }
        }

        // Update on scroll and resize
        container.addEventListener('scroll', updateScrollState);
        window.addEventListener('resize', updateScrollState);
        
        // Initial state
        updateScrollState();
    });
});
