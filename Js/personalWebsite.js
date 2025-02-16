// side nav
// const body = document.querySelector("body");
const sidenavBox = document.querySelector("#sideNav");
const sidebarBtn = document.querySelector("#SideNavBtn");
const contentContainer = document.querySelector("#contentContainer");
const timelines = document.getElementsByClassName("timeline");
const clickMeIcon = document.getElementsByClassName("clickMeIcon");
const contents = document.getElementsByClassName("content");
// const x_subSections = document.getElementsByClassName("x_subSection");
// const skillsSectionTitle = document.querySelector("#skillsSection").children[0].children[0];

const x_subSectionContents = document.querySelectorAll(".x_subSection ~ .content");
const activeCollapsables = document.getElementsByClassName("active");
const T_skillNavBar = document.getElementById("T_skillNavBar");
const L_skillNavBar = document.getElementById("L_skillNavBar");
const active_subSection = document.getElementsByClassName("active_subSection");


var maxMobileScreenWidth = 500;
var maxTabletScreenWidth = 800;
var SidenavBoxWidth = "25vw";
var ActiveSectionId;

if (window.innerWidth < maxTabletScreenWidth) {

    if (window.innerWidth < maxMobileScreenWidth) {
        // remove all timeline classes in mobile view
        removeClassName(timelines, ['timeline']);
        hideElements(clickMeIcon);
        SidenavBoxWidth = "50vw";
    }
    sidebarBtn.addEventListener("click", function(event) {
        if (sidebarBtn.classList.contains("fa-bars")) {
            OpenSideNav(SidenavBoxWidth);
        } else {
            CloseSideNav();
        }
    });

    sidenavBox.addEventListener("click", function(event) {
        CloseSideNav();
    });

    // if user clicks any where on screen close sidenav box 
    contentContainer.addEventListener("click", function(event) {
        CloseSideNav();
    });
}

function CloseSideNav() {
    sidenavBox.style.width = "0vw";
    sidebarBtn.classList.remove("fa-window-close");
    sidebarBtn.classList.add("fa-bars");
}

function OpenSideNav(SidenavBoxWidth) {
    sidenavBox.style.width = SidenavBoxWidth;
    sidenavBox.style.display = "block";
    sidebarBtn.classList.remove("fa-bars");
    sidebarBtn.classList.add("fa-window-close");
}
// contentContainer.addEventListener("click", function(event) {

//     if (activeCollapsables.length > 0) {
//         hideElements(contents);
//     }

// });
// var contents = document.getElementsByClassName("content");
var coll = document.getElementsByClassName("collapsible");
var i;



for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {

        var content = this.nextElementSibling;
        // hideElements(clickMeIcon)

        if (window.innerWidth > maxMobileScreenWidth) {
            hideElements(clickMeIcon)
                // this.classList.toggle("active");
            if (ActiveSectionId == "skillsSection2") {




                // if (this.id == T_skillNavBar.id) {
                //     T_skillNavBar.classList.add("active_SkillContainer");
                //     L_skillNavBar.classList.remove("active_SkillContainer");
                //     L_skillNavBar.nextElementSibling.style.display = "none";

                //     content.style.display = "flex";
                //     content.style.width = "fit-content";

                //     content.classList.add("align-skill-content");

                // }
                // if ((this.id == L_skillNavBar.id)) {
                    L_skillNavBar.classList.add("active_SkillContainer");
                    T_skillNavBar.classList.remove("active_SkillContainer");
                    T_skillNavBar.nextElementSibling.style.display = "none";

                    content.style.marginTop = "25vw";
                    content.classList.add("pad-one-em");
                    content.classList.add("margin-left-none");

                    content.style.display = "block";

                // }


                if (this.classList.contains("x_subSection")) {

                    hideElements(x_subSectionContents);

                    if (typeof(active_subSection) != 'undefined' && active_subSection.length > 0) {
                        removeClassName(active_subSection, ['active_subSection']);
                    }
                    this.classList.add("active_subSection");



                    content.classList.add("pad-one-em");
                    content.classList.add("margin-left-none");

                    content.classList.add("top");
                    content.style.display = "block";
                }


            } else {

                // T_skillNavBar.classList.remove("active_SkillContainer");
                // L_skillNavBar.classList.remove("active_SkillContainer");
                // removeClassName(active_subSection, ['active_subSection']);


                if (this.classList.contains("active")) {
                    this.classList.remove("active");
                    content.style.display = "none";
                } else {
                    removeClassName(activeCollapsables, ['active'])
                    hideElements(contents);
                    this.classList.add("active");
                    content.style.display = "block";
                }

            }
        } else {


            //remove click me icon from page 
            // var siblings = getSiblings(this);

            this.classList.toggle("active");
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        }
    });
}

var navItems = document.getElementsByClassName("navItem");
var activeSections = document.getElementsByClassName("activeSection");
var y;


for (y = 0; y < navItems.length; y++) {
    navItems[y].addEventListener("click", function() {
        var activeNavItemId = this.firstElementChild.id;

        // get the specified section to display
        ActiveSectionId = activeNavItemId.replace("NavItem", "Section")
        var content = document.querySelector("#" + ActiveSectionId);

        // hide all active sections
        if (activeSections.length > 0) {
            var activenavs = document.getElementsByClassName("activeNav");
            removeClassName(activenavs, ['activeNav']);
            removeClassName(activeSections, ['activeSection']);
        }
        // this.firstElementChild.classList.add("activeNav");
        this.classList.add("activeNav");
        content.classList.add("activeSection");

        // hide skill section title in case we are on bigger screens
        // if (window.innerWidth > maxMobileScreenWidth) {
        //     if (ActiveSectionId == "skillsSection") {
        //         if (skillsSectionTitle != undefined) {
        //             skillsSectionTitle.style.display = "none";
        //         }
        //     }
        // }

    });
}

function removeClassName(elements, classnames) {
    if (elements != null) {
        while (elements.length > 0) {
            for (var y = 0; y < classnames.length; y++) {
                elements[0].classList.remove(classnames[y]);
            }
        }
    }
}

function hideElements(elements) {
    if (elements != null) {
        for (const element of elements) {
            element.style.display = "none";
        }
    }
}

// Initialize desktop-only background overlay effect
function initBackgroundOverlay() {
  // Only run on desktop
  if (window.innerWidth <= 768) return;

  // Create and inject background overlay
  const bgDiv = document.createElement('div');
  bgDiv.id = 'bgOverlay';
  document.body.appendChild(bgDiv);

  // Random angle generator
  const getRandomAngle = () => Math.floor(Math.random() * 361);

  // Add click handlers to nav items
  const navItems = document.querySelectorAll('#sideNav .navItem a');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const newAngle = getRandomAngle();
      bgDiv.style.transform = `rotate(${newAngle}deg)`;
    });
  });
}

// Initialize on load and handle resize
document.addEventListener('DOMContentLoaded', initBackgroundOverlay);
window.addEventListener('resize', () => {
  const overlay = document.getElementById('bgOverlay');
  if (window.innerWidth <= 768 && overlay) {
    overlay.remove();
  } else if (window.innerWidth > 768 && !overlay) {
    initBackgroundOverlay();
  }
});

// Simplified timeline initialization
function initTimeline() {
  const timelines = document.querySelectorAll('.timeline');
  
  timelines.forEach(timeline => {
    const itemsContainer = timeline.querySelector('ul');
    const items = itemsContainer.children;
    const itemWidth = 300; // Width of each timeline item
    let currentPosition = 0;
    
    // Add content container if not exists
    let contentContainer = timeline.querySelector('.timeline-content-container');
    if (!contentContainer) {
      contentContainer = document.createElement('div');
      contentContainer.className = 'timeline-content-container';
      timeline.appendChild(contentContainer);
    }

    // Add navigation if more than 3 items
    // if (items.length > 2) {
    //   const nav = `
    //     <button class="timeline-nav prev">←</button>
    //     <button class="timeline-nav next">→</button>
    //   `;
    //   timeline.insertAdjacentHTML('beforeend', nav);
      
    //   const prevBtn = timeline.querySelector('.timeline-nav.prev');
    //   const nextBtn = timeline.querySelector('.timeline-nav.next');
      
    //   prevBtn.addEventListener('click', () => {
    //     currentPosition = Math.min(currentPosition + itemWidth, 0);
    //     itemsContainer.style.transform = `translateX(${currentPosition}px)`;
    //   });
      
    //   nextBtn.addEventListener('click', () => {
    //     currentPosition = Math.max(currentPosition - itemWidth, 
    //       -(itemWidth * (items.length - 3)));
    //     itemsContainer.style.transform = `translateX(${currentPosition}px)`;
    //   });
    // }
    
    // Handle item clicks
    Array.from(items).forEach(item => {
      const point = item.querySelector('.point');
      const content = item.querySelector('.content');
      
    //   if (point && content) {
    //     point.addEventListener('click', () => {
    //       // Remove active class from all items
    //       Array.from(items).forEach(i => i.classList.remove('active'));
          
    //       // Add active class to clicked item
    //       item.classList.add('active');
          
    //       // Move content to fixed container
    //       contentContainer.innerHTML = content.outerHTML;
    //       const movedContent = contentContainer.querySelector('.content');
    //       movedContent.style.opacity = '1';
    //       movedContent.style.visibility = 'visible';
    //     });
    //   }
    });
    
    // Activate first item by default
    // if (items[0]) {
    //   items[0].classList.add('active');
    //   const firstContent = items[0].querySelector('.content');
    //   if (firstContent) {
    //     contentContainer.innerHTML = firstContent.outerHTML;
    //     const movedContent = contentContainer.querySelector('.content');
    //     movedContent.style.opacity = '1';
    //     movedContent.style.visibility = 'visible';
    //   }
    // }
  });
}

// Initialize timeline on page load and section change
document.addEventListener('DOMContentLoaded', initTimeline);
document.querySelectorAll('.navItem').forEach(navItem => {
  navItem.addEventListener('click', () => {
    setTimeout(initTimeline, 100);
  });
});