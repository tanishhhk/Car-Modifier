document.addEventListener("DOMContentLoaded", function () {
    const filterDropdown = document.getElementById("category");
    const modelCards = document.querySelectorAll(".model-card");

    filterDropdown.addEventListener("change", function () {
        const selectedCategory = filterDropdown.value;

        modelCards.forEach(card => {
            const cardCategory = card.getAttribute("data-category");

            if (selectedCategory === "all" || cardCategory === selectedCategory) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });

    // View Details Button - Simulate Opening a Model Page
    const viewButtons = document.querySelectorAll(".view-details");
    viewButtons.forEach(button => {
        button.addEventListener("click", function () {
            alert("Redirecting to the model details page...");
            // Here you can add window.location.href = 'model-details.html'; if you have a model details page.
        });
    });
});
