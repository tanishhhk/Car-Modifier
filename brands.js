document.addEventListener("DOMContentLoaded", function () {
    let filters = document.querySelectorAll(".filter-btn");
    let brands = document.querySelectorAll(".brand");

    filters.forEach(btn => {
        btn.addEventListener("click", function () {
            let category = this.getAttribute("data-category");
            
            brands.forEach(brand => {
                if (category === "all" || brand.classList.contains(category)) {
                    brand.style.display = "block";
                } else {
                    brand.style.display = "none";
                }
            });
        });
    });
});
