/* ==========================================================
   Oluwafunsho Osoba - Portfolio Website
   script.js
   
   1. Live date/time clock
   2. Light/Dark mode toggle
   3. Interactive project cards (mouseover / mouseout)
   4. Show More / Show Less projects button
   5. Image gallery (next / previous + auto rotate)
   6. Contact form validation
   7. Back to Top button
   ========================================================== */


/* ----------------------------------------------------------
   1. LIVE DATE / TIME CLOCK
   Updates the text of the element with id="datetime"
   every second so the visitor always sees the current time.
   ---------------------------------------------------------- */
function updateDateTime() {
    const datetimeElement = document.getElementById("datetime");

  
    if (datetimeElement) {
        const now = new Date();
        const dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        const formattedDate = now.toLocaleDateString(undefined, dateOptions);
        const formattedTime = now.toLocaleTimeString();

        datetimeElement.textContent = formattedDate + " | " + formattedTime;
    }
}


updateDateTime();
// Then update every 1000ms (1 second)
setInterval(updateDateTime, 1000);


/* ----------------------------------------------------------
   2. LIGHT MODE / DARK MODE TOGGLE
   Clicking the button adds or removes the "dark-mode" class
   on the body and swaps the button text.
   ---------------------------------------------------------- */
const modeToggleBtn = document.getElementById("modeToggleBtn");

if (modeToggleBtn) {
    modeToggleBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        const isDarkMode = document.body.classList.contains("dark-mode");

        modeToggleBtn.textContent = isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode";
        // Lets screen readers announce whether the toggle is "on" or "off"
        modeToggleBtn.setAttribute("aria-pressed", isDarkMode);
    });
}


/* ----------------------------------------------------------
   3. INTERACTIVE PROJECT CARDS
   When the mouse enters a card it grows slightly, changes
   border color, and reveals extra project info. When the
   mouse leaves, the card returns to normal.
   ---------------------------------------------------------- */
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(function (card) {
    card.addEventListener("mouseenter", function () {
        card.classList.add("card-hovered");
    });

    card.addEventListener("mouseleave", function () {
        card.classList.remove("card-hovered");
    });
});


/* ----------------------------------------------------------
   4. SHOW MORE / SHOW LESS PROJECTS BUTTON
   The first 3 project cards are always visible. The rest
   have the class "hidden-project" and start hidden. Clicking
   the button reveals or hides them and swaps the button text.
   ---------------------------------------------------------- */
const showMoreBtn = document.getElementById("showMoreBtn");
const hiddenProjects = document.querySelectorAll(".hidden-project");

if (showMoreBtn) {
    showMoreBtn.addEventListener("click", function () {
        // Check the current state by looking at the first hidden project
        const isHidden = hiddenProjects[0].style.display === "none" || hiddenProjects[0].style.display === "";

        hiddenProjects.forEach(function (project) {
            project.style.display = isHidden ? "block" : "none";
        });

        showMoreBtn.textContent = isHidden ? "Show Less Projects" : "Show More Projects";
    });
}


/* ----------------------------------------------------------
   5. IMAGE GALLERY
   Cycles through an array of project screenshots. Users can
   click Next / Previous, and the gallery also auto-advances
   every 5 seconds.
   ---------------------------------------------------------- */
const galleryImages = [
    { src: "/.gallery2.jpg", caption: "MovieMax AI - Search Results Page" },
    { src: "./gallery3.jpg", caption: "MovieMax AI - AI Search in Action" },
];

let currentImageIndex = 0;
const galleryImageEl = document.getElementById("galleryImage");
const galleryCaptionEl = document.getElementById("galleryCaption");
const nextBtn = document.getElementById("nextImageBtn");
const prevBtn = document.getElementById("prevImageBtn");

function showGalleryImage(index) {
    if (galleryImageEl && galleryCaptionEl) {
        galleryImageEl.src = galleryImages[index].src;
        galleryImageEl.alt = galleryImages[index].caption;
        galleryCaptionEl.textContent = galleryImages[index].caption;
    }
}

if (galleryImageEl) {
    // Show the first image right away
    showGalleryImage(currentImageIndex);

    nextBtn.addEventListener("click", function () {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showGalleryImage(currentImageIndex);
    });

    prevBtn.addEventListener("click", function () {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showGalleryImage(currentImageIndex);
    });

    // Auto-advance the gallery every 5 seconds
    setInterval(function () {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showGalleryImage(currentImageIndex);
    }, 5000);
}


/* ----------------------------------------------------------
   6. CONTACT FORM VALIDATION
   Checks every field before the form is allowed to submit.
   If a field fails validation, an error message is shown
   next to that field and the form submission is stopped.
   ---------------------------------------------------------- */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Stop the form from submitting so we can check it first

        let formIsValid = true;

        // Grab the fields
        const nameField = document.getElementById("name");
        const emailField = document.getElementById("email");
        const subjectField = document.getElementById("subject");
        const messageField = document.getElementById("message");

        //  error messages will be shown
        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const subjectError = document.getElementById("subjectError");
        const messageError = document.getElementById("messageError");

        nameError.textContent = "";
        emailError.textContent = "";
        subjectError.textContent = "";
        messageError.textContent = "";

        // ----- Name validation -----
        // Cannot be empty, minimum 3 characters
        const nameValue = nameField.value.trim();
        if (nameValue === "") {
            nameError.textContent = "Name is required.";
            formIsValid = false;
        } else if (nameValue.length < 3) {
            nameError.textContent = "Name must be at least 3 characters.";
            formIsValid = false;
        }

        // ----- Email validation -----
        // Cannot be empty, must be a valid email format
        const emailValue = emailField.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValue === "") {
            emailError.textContent = "Email is required.";
            formIsValid = false;
        } else if (!emailPattern.test(emailValue)) {
            emailError.textContent = "Please enter a valid email address.";
            formIsValid = false;
        }

    
        const subjectValue = subjectField.value.trim();
        if (subjectValue === "") {
            subjectError.textContent = "Subject is required.";
            formIsValid = false;
        }

       
        const messageValue = messageField.value.trim();
        if (messageValue === "") {
            messageError.textContent = "Message is required.";
            formIsValid = false;
        } else if (messageValue.length < 20) {
            messageError.textContent = "Message must be at least 20 characters.";
            formIsValid = false;
        }

        // If everything passed, show a success message and reset the form
        const successMessage = document.getElementById("formSuccessMessage");
        if (formIsValid) {
            successMessage.textContent = "Thank you! Your message has been sent.";
            successMessage.classList.add("form-success");
            contactForm.reset();
        } else {
            successMessage.textContent = "";
        }
    });
}


/* ----------------------------------------------------------
   7. BACK TO TOP BUTTON
   The button is hidden until the user scrolls down 300px.
   Clicking it smoothly scrolls the page back to the top.
   ---------------------------------------------------------- */
const backToTopBtn = document.getElementById("backToTopBtn");

if (backToTopBtn) {
    // 100px keeps this working even on shorter pages (like Home) that
    // don't have much room to scroll in the first place.
    window.addEventListener("scroll", function () {
        if (window.scrollY > 100) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    backToTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
