// Sweet Crumbs Bakery JavaScript

// PRODUCT SEARCH FUNCTIONALITY
const productSearch = document.getElementById("productSearch");
const productItems = document.querySelectorAll(".product-item");
const searchMessage = document.getElementById("searchMessage");

if (productSearch) {
    productSearch.addEventListener("input", function () {

        const searchTerm = productSearch.value.toLowerCase().trim();
        let visibleProducts = 0;

        productItems.forEach(function (product) {

            const productName = product.querySelector("h2").textContent.toLowerCase();
            const productDescription = product.querySelector("p").textContent.toLowerCase();

            if (
                productName.includes(searchTerm) ||
                productDescription.includes(searchTerm)
            ) {
                product.style.display = "";
                visibleProducts++;
            } else {
                product.style.display = "none";
            }
        });

        if (visibleProducts === 0) {
            searchMessage.textContent = "Sorry, no matching products were found.";
        } else {
            searchMessage.textContent = visibleProducts + " product(s) found.";
        }
    });
}
// PRODUCT IMAGE LIGHTBOX

const productImages = document.querySelectorAll(".product-item img");
const imageLightbox = document.getElementById("imageLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

if (imageLightbox && lightboxImage && closeLightbox) {

    // Open enlarged image when a product image is clicked
    productImages.forEach(function (image) {

        image.addEventListener("click", function () {

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;

            imageLightbox.classList.add("active");
        });
    });

    // Close the lightbox
    closeLightbox.addEventListener("click", function () {
        imageLightbox.classList.remove("active");
    });

    // Close when clicking outside the image
    imageLightbox.addEventListener("click", function (event) {

        if (event.target === imageLightbox) {
            imageLightbox.classList.remove("active");
        }
    });
}
// AJAX FORM SUBMISSION

function handleFormSubmission(form, messageElement, successMessage) {
    if (!form || !messageElement) return;

    form.addEventListener("submit", async function(event) {
        event.preventDefault();
        messageElement.textContent = "";

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);

        try {
            const response = await fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(formData).toString()
            });

            if (!response.ok) {
                throw new Error("Form submission failed.");
            }

            messageElement.textContent = successMessage;
            form.reset();

        } catch (error) {
            messageElement.textContent =
                "Your message could not be submitted. Please try again later.";
        }
    });
}

// ENQUIRY FORM

const enquiryForm = document.getElementById("enquiryForm");
const enquiryMessage = document.getElementById("enquiryMessage");
const eventDate = document.getElementById("eventdate");

if (eventDate) {
    const today = new Date();
    const localToday = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    eventDate.min = localToday;
}

handleFormSubmission(
    enquiryForm,
    enquiryMessage,
    "Thank you! Your order enquiry has been submitted. We will contact you to confirm pricing and availability."
);

// CONTACT FORM

const contactForm = document.getElementById("contactForm");
const contactMessage = document.getElementById("contactMessage");

handleFormSubmission(
    contactForm,
    contactMessage,
    "Thank you! Your message has been submitted successfully."
);
