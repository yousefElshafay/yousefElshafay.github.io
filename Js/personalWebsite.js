// side nav
const sidenavBox = document.querySelector("#sideNav");
const sidebarBtn = document.querySelector("#SideNavBtn");
const contentContainer = document.querySelector("#contentContainer");
const timelines = document.getElementsByClassName("timeline");
const clickMeIcon = document.getElementsByClassName("clickMeIcon");
const contents = document.getElementsByClassName("content");
const activeCollapsables = document.getElementsByClassName("active");
var maxMobileScreenWidth = 500;
var maxTabletScreenWidth = 800;
var SidenavBoxWidth = "25vw";
var ActiveSectionId;

if (window.innerWidth < maxTabletScreenWidth) {

    if (window.innerWidth < maxMobileScreenWidth) {
        // remove all timeline classes in mobile view
        removeClassName(timelines, ['timeline']);
        hideElements(clickMeIcon)
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
            if (ActiveSectionId == "skillsSection") {
                if (content.style.display === "flex") {
                    content.style.display = "none";
                } else {
                    content.style.display = "flex";
                }
            } else {

                if (this.classList.contains("active")) {
                    this.classList.remove("active")
                    content.style.display = "none";
                } else {
                    removeClassName(activeCollapsables, ['active'])
                    hideElements(contents);
                    this.classList.add("active")
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
        content = document.querySelector("#" + ActiveSectionId);

        // hide all active sections
        if (activeSections.length > 0) {
            var activenavs = document.getElementsByClassName("activeNav");
            removeClassName(activenavs, ['activeNav'])
            removeClassName(activeSections, ['activeSection']);
        }
        // this.firstElementChild.classList.add("activeNav");
        this.classList.add("activeNav");
        content.classList.add("activeSection");

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

// function getSiblings(element) {

//     // Setup siblings array and get the first sibling
//     var siblings = [];
//     var sibling = element.parentNode.firstChild;

//     // Loop through each sibling and push to the array
//     while (sibling) {
//         if (sibling.nodeType === 1 && sibling !== element) {
//             siblings.push(sibling);
//         }
//         sibling = sibling.nextSibling
//     }

//     return siblings;

// };


// this function magnify the hero image on the website
// REFERENCE https://www.w3schools.com/



// function magnify(imgID, zoom) {
//     var img, glass, w, h, bw;
//     img = document.getElementById(imgID);

//     /* Create magnifier glass: */
//     glass = document.createElement("DIV");
//     glass.setAttribute("class", "img-magnifier-glass");

//     /* Insert magnifier glass: */
//     img.parentElement.insertBefore(glass, img);

//     /* Set background properties for the magnifier glass: */
//     glass.style.backgroundImage = "url('" + img.src + "')";
//     glass.style.backgroundRepeat = "no-repeat";
//     glass.style.backgroundSize =
//         img.width * zoom + "px " + img.height * zoom + "px";
//     bw = 3;
//     w = glass.offsetWidth / 2;
//     h = glass.offsetHeight / 2;

//     /* Execute a function when someone moves the magnifier glass over the image: */
//     glass.addEventListener("mousemove", moveMagnifier);
//     img.addEventListener("mousemove", moveMagnifier);

//     /*and also for touch screens:*/
//     glass.addEventListener("touchmove", moveMagnifier);
//     img.addEventListener("touchmove", moveMagnifier);

//     function moveMagnifier(e) {
//         var pos, x, y;
//         /* Prevent any other actions that may occur when moving over the image */
//         e.preventDefault();
//         /* Get the cursor's x and y positions: */
//         pos = getCursorPos(e);
//         x = pos.x;
//         y = pos.y;
//         /* Prevent the magnifier glass from being positioned outside the image: */
//         if (x > img.width - w / zoom) {
//             x = img.width - w / zoom;
//         }
//         if (x < w / zoom) {
//             x = w / zoom;
//         }
//         if (y > img.height - h / zoom) {
//             y = img.height - h / zoom;
//         }
//         if (y < h / zoom) {
//             y = h / zoom;
//         }
//         /* Set the position of the magnifier glass: */
//         glass.style.left = x - w + "px";
//         glass.style.top = y - h + "px";
//         /* Display what the magnifier glass "sees": */
//         glass.style.backgroundPosition =
//             "-" + (x * zoom - w + bw) + "px -" + (y * zoom - h + bw) + "px";
//     }

//     function getCursorPos(e) {
//         var a,
//             x = 0,
//             y = 0;
//         e = e || window.event;
//         /* Get the x and y positions of the image: */
//         a = img.getBoundingClientRect();
//         /* Calculate the cursor's x and y coordinates, relative to the image: */
//         x = e.pageX - a.left;
//         y = e.pageY - a.top;
//         /* Consider any page scrolling: */
//         x = x - window.pageXOffset;
//         y = y - window.pageYOffset;
//         return {
//             x: x,
//             y: y
//         };
//     }
// }