
/* ==========================================
   SHIFALI & ABIN
   PHASE 4 - COUNTDOWN & INTERACTIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log(
        "Shifali & Abin Wedding Website Loaded Successfully!"
    );

    initializeWebsite();

});


function initializeWebsite() {

    initializeScrollReveal();

    initializeCountdown();

    initializeGallery();

    console.log("Phase 4 initialization complete.");

}


/* ==========================================
   PHASE 2 - SCROLL REVEAL
========================================== */

function initializeScrollReveal() {

    const revealElements = document.querySelectorAll(
        ".section-label, " +
        ".section-title, " +
        ".invitation-text, " +
        ".couple-name, " +
        ".verse, " +
        ".countdown-item, " +
        ".event-card, " +
        ".gallery-placeholder, " +
        ".venue-section h3, " +
        ".rsvp-section .malayalam"
    );

    revealElements.forEach(element => {
        element.classList.add("js-reveal");
    });

    if (!("IntersectionObserver" in window)) {

        revealElements.forEach(element => {
            element.classList.add("is-visible");
        });

        return;
    }

    const observer = new IntersectionObserver(

        (entries, observerInstance) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observerInstance.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.15
        }

    );

    revealElements.forEach(element => {
        observer.observe(element);
    });

}


/* ==========================================
   PHASE 4 - WEDDING COUNTDOWN
========================================== */

function initializeCountdown() {

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    const countdownContainer = document.getElementById(
        "countdown-container"
    );

    const weddingDayMessage = document.getElementById(
        "wedding-day-message"
    );

    // Stop safely if countdown elements are unavailable.

    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        console.warn("Countdown elements not found.");
        return;
    }

    // 10 January 2027, 00:00 IST.
    // UTC+05:30 = UTC 18:30 on 9 January 2027.

    const weddingDate = new Date(
        "2027-01-09T18:30:00Z"
    ).getTime();

    let countdownInterval = null;
    
    function updateCountdown() {

        const now = Date.now();

        const difference = weddingDate - now;

        // Wedding day has arrived.

        if (difference <= 0) {

            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";

            if (countdownContainer) {
                countdownContainer.hidden = true;
            }

            if (weddingDayMessage) {
                weddingDayMessage.hidden = false;
            }

            clearInterval(countdownInterval);

            return;
        }

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (difference / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
            (difference / 1000) % 60
        );

        daysElement.textContent = String(days).padStart(2, "0");

        hoursElement.textContent = String(hours).padStart(2, "0");

        minutesElement.textContent = String(minutes).padStart(2, "0");

        secondsElement.textContent = String(seconds).padStart(2, "0");

    }


    // Update immediately.

    updateCountdown();


    // Update every second.

    countdownInterval = setInterval(
        updateCountdown,
        1000
    );

}


/* ==========================================
   PHASE 6 - GALLERY LIGHTBOX
========================================== */

function initializeGallery() {

    const galleryPhotos = document.querySelectorAll(
        ".gallery-photo"
    );

    const lightbox = document.getElementById(
        "gallery-lightbox"
    );

    const lightboxImage = document.getElementById(
        "lightbox-image"
    );

    const closeButton = document.querySelector(
        ".lightbox-close"
    );

    if (
        !lightbox ||
        !lightboxImage ||
        !closeButton
    ) {
        console.warn("Gallery lightbox elements not found.");
        return;
    }

    let previouslyFocusedElement = null;


    // OPEN LIGHTBOX

    galleryPhotos.forEach(photo => {

        photo.addEventListener("click", () => {

            const imagePath = photo.dataset.full;

            if (!imagePath) return;

            previouslyFocusedElement = photo;

            lightboxImage.src = imagePath;

            lightbox.hidden = false;

            document.body.style.overflow = "hidden";

            closeButton.focus();

        });

    });


    // CLOSE LIGHTBOX

    function closeLightbox() {

        if (lightbox.hidden) return;

        lightbox.hidden = true;

        lightboxImage.src = "";

        document.body.style.overflow = "";

        if (previouslyFocusedElement) {
            previouslyFocusedElement.focus();
        }

    }


    closeButton.addEventListener(
        "click",
        closeLightbox
    );


    // CLICK OUTSIDE IMAGE TO CLOSE

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });


    // ESCAPE KEY TO CLOSE

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            !lightbox.hidden
        ) {
            closeLightbox();
        }

    });

}
