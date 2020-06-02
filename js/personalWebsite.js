// side nav
const sidenavBox = document.querySelector("#sideNav");
const sidebarBtn = document.querySelector("#btn-navMenu");
const contentContainer = document.querySelector("#contentContainer");
const timelineContentContainer = document.querySelector("#timelineContentContainer");
var maxMobileScreenWidth = 500;

if (window.innerWidth < maxMobileScreenWidth) {

    sidebarBtn.addEventListener("click", function(event) {
        sidenavBox.style.width = "50vw";
        sidenavBox.style.display = "block";
        sidebarBtn.style.display = "none";
    });

    sidenavBox.addEventListener("click", function(event) {
        sidenavBox.style.width = "0vw";
        sidebarBtn.style.display = "block";
    });
}


var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

var navItems = document.getElementsByClassName("navItem");
// var navItems = document.querySelectorAll('.navItem')

var activeSections = document.getElementsByClassName("activeSection");
var y;

for (y = 0; y < navItems.length; y++) {
    navItems[y].addEventListener("click", function() {

        var NavItemId = this.firstElementChild.id;

        // get the specified section to display 
        var sectionId = NavItemId.replace("NavItem", "Section")
        content = document.querySelector("#" + sectionId);

        // hide all active sections 
        if (activeSections.length > 0) {
            var activenavs = document.getElementsByClassName("activeNav");
            removeClassName(activenavs, "activeNav")
            removeClassName(activeSections, "activeSection");
        }
        // this.firstElementChild.classList.add("activeNav");
        this.classList.add("activeNav");

        content.classList.add("activeSection");

    });
}


function removeClassName(elements, classname) {
    [].forEach.call(elements, function(el) {
        el.classList.remove(classname);
    });
}


// var myScrollFunc = function() {
//     var y = window.pageYOffset;
//     if (y >= 450) {
//         sidebarBtn.classList.add("is-visible");
//         contentContainer.classList.add("is-visible");
//         sidebarBtn.classList.remove("is-not-visible");
//         contentContainer.classList.remove("is-not-visible");
//     } else {
//         sidebarBtn.classList.add("is-not-visible");
//         contentContainer.classList.add("is-not-visible");
//         sidebarBtn.classList.remove("is-visible");
//         contentContainer.classList.remove("is-visible");
//     }
// };

// window.addEventListener("scroll", myScrollFunc);






// this function magnify the hero image on the website
// REFERENCE https://www.w3schools.com/

function magnify(imgID, zoom) {
    var img, glass, w, h, bw;
    img = document.getElementById(imgID);

    /* Create magnifier glass: */
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");

    /* Insert magnifier glass: */
    img.parentElement.insertBefore(glass, img);

    /* Set background properties for the magnifier glass: */
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize =
        img.width * zoom + "px " + img.height * zoom + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;

    /* Execute a function when someone moves the magnifier glass over the image: */
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);

    /*and also for touch screens:*/
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);

    function moveMagnifier(e) {
        var pos, x, y;
        /* Prevent any other actions that may occur when moving over the image */
        e.preventDefault();
        /* Get the cursor's x and y positions: */
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;
        /* Prevent the magnifier glass from being positioned outside the image: */
        if (x > img.width - w / zoom) {
            x = img.width - w / zoom;
        }
        if (x < w / zoom) {
            x = w / zoom;
        }
        if (y > img.height - h / zoom) {
            y = img.height - h / zoom;
        }
        if (y < h / zoom) {
            y = h / zoom;
        }
        /* Set the position of the magnifier glass: */
        glass.style.left = x - w + "px";
        glass.style.top = y - h + "px";
        /* Display what the magnifier glass "sees": */
        glass.style.backgroundPosition =
            "-" + (x * zoom - w + bw) + "px -" + (y * zoom - h + bw) + "px";
    }

    function getCursorPos(e) {
        var a,
            x = 0,
            y = 0;
        e = e || window.event;
        /* Get the x and y positions of the image: */
        a = img.getBoundingClientRect();
        /* Calculate the cursor's x and y coordinates, relative to the image: */
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /* Consider any page scrolling: */
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return {
            x: x,
            y: y
        };
    }
}