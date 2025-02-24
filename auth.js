// Signup Form Handling
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (!name || !email || !password) {
                alert("Please fill all fields.");
                return;
            }

            if (!validateEmail(email)) {
                alert("Invalid email format.");
                return;
            }

            if (password.length < 6) {
                alert("Password must be at least 6 characters.");
                return;
            }

            // Store user data (Temporary)
            localStorage.setItem("userEmail", email);
            alert("Signup successful! Redirecting to OTP verification...");
            window.location.href = "login.html"; // Redirect to login
        });
    }

    // Login Form Handling
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            if (!email || !password) {
                alert("Please enter both email and password.");
                return;
            }

            // Simulating a login check (Replace with backend API call)
            if (localStorage.getItem("userEmail") === email) {
                alert("Login successful!");
                window.location.href = "index.html"; // Redirect to dashboard (to be created)
            } else {
                alert("Incorrect email or password.");
            }
        });
    }

    // OTP Login Handling
    const otpLoginBtn = document.getElementById("otp-login");
    if (otpLoginBtn) {
        otpLoginBtn.addEventListener("click", function() {
            const generatedOTP = Math.floor(100000 + Math.random() * 900000);
            localStorage.setItem("otp", generatedOTP);
            alert(`Your OTP is: ${generatedOTP}`); // Mock OTP (Replace with real email system)
            document.getElementById("otp-section").style.display = "block";
        });
    }

    // Verify OTP
    const verifyOtpBtn = document.getElementById("verify-otp");
    if (verifyOtpBtn) {
        verifyOtpBtn.addEventListener("click", function() {
            const enteredOTP = document.getElementById("otp-input").value;
            const storedOTP = localStorage.getItem("otp");

            if (enteredOTP === storedOTP) {
                alert("OTP Verified! Login Successful.");
                window.location.href = "index.html"; // Redirect after OTP success
            } else {
                alert("Invalid OTP. Try again.");
            }
        });
    }
});

// Helper function to validate email
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
