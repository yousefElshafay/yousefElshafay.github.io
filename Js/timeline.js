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
            
            // prevBtn.style.display = scrollLeft <= 0 ? 'none' : 'flex';
            // nextBtn.style.display = scrollLeft >= maxScroll ? 'none' : 'flex';
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
            // if (prevBtn && nextBtn) {
            //     prevBtn.style.display = scrollLeft <= 0 ? 'none' : 'flex';
            //     nextBtn.style.display = scrollLeft >= maxScroll ? 'none' : 'flex';
            // }
            
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
        const items = itemsList.querySelectorAll('li');
        
        // Enhanced smooth scroll settings
        const scrollSettings = {
            behavior: 'smooth',
            speed: 2, // Multiplier for wheel scrolling
            buttonStep: 400, // Pixels to scroll on button click
            sensitivity: 1.5 // Mouse wheel sensitivity
        };

        // Track the current active item index
        let currentItemIndex = -1;

        // Find the currently active or closest visible item
        function findCurrentItem() {
            // If an item is already active, return its index
            for (let i = 0; i < items.length; i++) {
                if (items[i].querySelector('.collapsible').classList.contains('active')) {
                    return i;
                }
            }
            
            // Otherwise find the item closest to the center of the viewport
            const containerCenter = container.scrollLeft + (container.clientWidth / 2);
            let closestIndex = 0;
            let closestDistance = Infinity;
            
            items.forEach((item, index) => {
                const rect = item.getBoundingClientRect();
                const itemCenter = rect.left + rect.width / 2;
                const distance = Math.abs(itemCenter - containerCenter);
                
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });
            
            return closestIndex;
        }

        // Activate a specific item
        function activateItem(index) {
            // Ensure index is within bounds
            if (index < 0) index = 0;
            if (index >= items.length) index = items.length - 1;
            
            // Deactivate all collapsibles
            items.forEach(item => {
                const collapsible = item.querySelector('.collapsible');
                const content = item.querySelector('.content');
                collapsible.classList.remove('active');
                if (content) content.style.display = 'none';
            });
            
            // Activate the target item
            const targetItem = items[index];
            const collapsible = targetItem.querySelector('.collapsible');
            const content = targetItem.querySelector('.content');
            
            // Trigger click programmatically
            collapsible.classList.add('active');
            if (content) content.style.display = 'block';
            
            // Scroll the item into view
            const itemRect = targetItem.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            // Calculate desired scroll position to center the item
            const targetScroll = container.scrollLeft + 
                (itemRect.left - containerRect.left) - 
                (containerRect.width / 2) + 
                (itemRect.width / 2);
            
            container.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
            
            // Update current item index
            currentItemIndex = index;
        }

        // Handle wheel/trackpad scrolling
        container.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY || e.detail || e.wheelDelta;
            container.scrollLeft += (delta * scrollSettings.speed * scrollSettings.sensitivity);
            updateButtonVisibility();
        }, { passive: false });

        // Button click handlers for navigating between items
        prevBtn.addEventListener('click', () => {
            // Find current item index
            if (currentItemIndex < 0) currentItemIndex = findCurrentItem();
            
            // Move to previous item
            activateItem(currentItemIndex - 1);
            updateButtonVisibility();
        });

        nextBtn.addEventListener('click', () => {
            // Find current item index
            if (currentItemIndex < 0) currentItemIndex = findCurrentItem();
            
            // Move to next item
            activateItem(currentItemIndex + 1);
            updateButtonVisibility();
        });

        // Visibility logic
        function updateButtonVisibility() {
            const isScrollable = container.scrollWidth > container.clientWidth;
            
            if (!isScrollable || !hasEnoughItems) {
                // prevBtn.style.display = 'none';
                // nextBtn.style.display = 'none';
                return;
            }
            
            // Find current item if not set
            if (currentItemIndex < 0) currentItemIndex = findCurrentItem();
            
            // prevBtn.style.display = atStart ? 'none' : 'flex';
            // nextBtn.style.display = atEnd ? 'none' : 'flex';
        }

        // Update on scroll and resize
        container.addEventListener('scroll', () => {
            // Reset current item index when user scrolls manually
            currentItemIndex = -1;
            updateButtonVisibility();
        });
        
        window.addEventListener('resize', updateButtonVisibility);

        // Initialize clickable behavior for items
        items.forEach((item, index) => {
            const collapsible = item.querySelector('.collapsible');
            
            collapsible.addEventListener('click', () => {
                currentItemIndex = index;
                activateItem(index);
                updateButtonVisibility();
            });
        });

        // Initial check
        updateButtonVisibility();
    });
});