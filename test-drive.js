document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("testDriveForm");
    const confirmationMessage = document.getElementById("confirmationMessage");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent actual form submission

        let isValid = true;

        // Get input values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        // const phone = document.getElementById("phone").value.trim();
        const model = document.getElementById("model").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const location = document.getElementById("location").value;

        // Name validation
        if (name === "") {
            document.getElementById("nameError").textContent = "Please enter your full name.";
            isValid = false;
        } else {
            document.getElementById("nameError").textContent = "";
        }

        // Email validation (Must contain @ and a valid domain)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            document.getElementById("emailError").textContent = "Please enter a valid email address.";
            isValid = false;
        } else {
            document.getElementById("emailError").textContent = "";
        }

        // Get country code and phone number
        const countryCode = document.getElementById("countryCode").value;
        const phone = document.getElementById("phone").value.trim();
        const fullPhoneNumber = countryCode + phone; // Combine country code + number

        // Phone number validation (Only digits, 10-15 characters)
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(phone)) {
        document.getElementById("phoneError").textContent = "Enter a valid phone number (10-15 digits).";
        isValid = false;
        } else {
        document.getElementById("phoneError").textContent = "";
        }

// Log final phone number (for backend submission)
console.log("Test Drive Request:", { fullPhoneNumber });

        

        // Check required fields
        if (!model) {
            alert("Please select a car model.");
            isValid = false;
        }
        if (!date) {
            alert("Please select a test drive date.");
            isValid = false;
        }
        if (!time) {
            alert("Please select a test drive time.");
            isValid = false;
        }
        if (!location) {
            alert("Please select a dealer location.");
            isValid = false;
        }

        // If everything is valid, submit the form
        if (isValid) {
            form.style.display = "none"; // Hide form
            confirmationMessage.classList.remove("hidden"); // Show confirmation
        }
    });
});
