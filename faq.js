document.addEventListener("DOMContentLoaded", function () {
    const faqs = document.querySelectorAll(".faq-item");

    faqs.forEach(faq => {
        faq.addEventListener("click", function () {
            const answer = this.querySelector(".answer");
            const toggle = this.querySelector(".toggle");

            // Toggle answer visibility
            if (answer.style.display === "block") {
                answer.style.display = "none";
                toggle.textContent = "+";
            } else {
                answer.style.display = "block";
                toggle.textContent = "-";
            }
        });
    });
});
