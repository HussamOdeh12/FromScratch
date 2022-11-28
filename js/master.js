//-------------------------------------------------------
// Local Storage . . .
// Check if there's local storage color option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
  console.log("Local Storage is not empty, you can set it on root now");
  console.log(localStorage.getItem("color_option"));
  document.documentElement.style.setProperty("--main-color", mainColors);

  // Remove active class from all colors list item
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    // Add active class on element with data-color === Local Storage Item
    if (element.dataset.color === mainColors) {
      // Add active class
      element.classList.add("active");
    }
  });
}
// End checking of color option
//--------------------------
// Check if there's local storage random backgrounds item

// Random Background Option
let backgroundOption = true;
// Variable To Control The Background Interval
let backgroundInterval;
// Check If There's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");
// Check If Random Background Local Storage Is Not EMpty
if (backgroundLocalItem !== null) {
  // Remove Active Class From All Spans
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// End Local Storage
//-------------------------------------------------------
// Start Handle Active Stats

function handleActive(ev) {
  // Remove active class from all children's
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  // Add active class on self (the element i press on)
  ev.target.classList.add("active");
}

// End Handle Active Stats
//-------------------------------------------------------
// Start Settings Box

// During toggle . . .
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};

//--------------------------
// Switch Colors

const colorsLi = document.querySelectorAll(".colors-list li");
// Loop On List Items
colorsLi.forEach((li) => {
  // Click On Every List Item
  li.addEventListener("click", (e) => {
    // Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // Set color on local storage
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
  });
});

//--------------------------
// Switch Random Background Option

const randomBackEl = document.querySelectorAll(".random-backgrounds span");
// Loop On All Spans
randomBackEl.forEach((span) => {
  // Click On Every Span
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

//--------------------------
// Show and Hide Bullets

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});

//--------------------------
// Reset Options
document.querySelector(".reset-options").onclick = function () {
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");
  window.location.reload();
};

// End Settings Box
//-------------------------------------------------------
// Start Toggle Menu

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
toggleBtn.onclick = function (e) {
  // Stop Propagation
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
};
// Click anywhere outside menu and toggle
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    // Check if menu is open
    if (tLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      tLinks.classList.toggle("open");
    }
  }
});
// Stop propagation on menu
tLinks.onclick = function (e) {
  e.stopPropagation();
};

// End Toggle Menu
//-------------------------------------------------------
// Start Nav Bullets + Links

// Select all bullets + links
const allLinks = document.querySelectorAll(".links a");
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

function scrollTo(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollTo(allBullets);
scrollTo(allLinks);

// End Nav Bullets + Links
//-------------------------------------------------------
// Start Landing Page

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");
// Get Array Of Imgs
let imgsArray = ["landing1.jpg", "landing2.jpg", "landing3.jpg"];
// Function To Randomize Imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      // Change Background Image Url and transition
      landingPage.style.transition = "2s";
      landingPage.style.backgroundImage =
        'url("media/' + imgsArray[randomNumber] + '")';
    }, 5000);
  }
}
randomizeImgs();

// End Landing Page
//-------------------------------------------------------
// Start Our Skills Section

// Select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills offset top
  let skillsOffsetTop = ourSkills.offsetTop;
  // Skills outer height
  let skillsOuterHeight = ourSkills.offsetHeight;
  // Window height
  let windowHeight = this.innerHeight;
  // Window ScrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// End Our Skills Section
//-------------------------------------------------------
// Start Gallery Section

// Create popup with the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create overlay element
    let overlay = document.createElement("div");
    // Add class to overlay
    overlay.className = "popup-overlay";
    // Append overlay to the body
    document.body.appendChild(overlay);
    // Create the popup box
    let popupBox = document.createElement("div");
    // Add class to the popup box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Create heading
      let imgHeading = document.createElement("h3");
      // Create text for heading
      let imgText = document.createTextNode(img.alt);
      // Append the text to the heading
      imgHeading.appendChild(imgText);
      // Append the heading to the popup box
      popupBox.appendChild(imgHeading);
    }

    // Create the image
    let popupImage = document.createElement("img");
    // Set image source
    popupImage.src = img.src;
    // Add image to popup box
    popupBox.appendChild(popupImage);
    // Append the popup box to body
    document.body.appendChild(popupBox);
    // Create the close span
    let closeButton = document.createElement("span");
    // Create the close button text
    let closeButtonText = document.createTextNode("X");
    // Append text to close button
    closeButton.appendChild(closeButtonText);
    // Add class to close button
    closeButton.className = "close-button";
    // Add close button to the popup box
    popupBox.appendChild(closeButton);
  });
});

// Close popup
document.addEventListener("click", function (e) {
  if (e.target.className === "close-button") {
    // Remove the current popup
    e.target.parentNode.remove();
    // Remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// End Gallery Section
//-------------------------------------------------------
