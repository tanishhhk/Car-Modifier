document.addEventListener("DOMContentLoaded", function () {
    let currentPage = window.location.href.split("/").pop(); // Get current file name
    let navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {
        let linkPage = link.getAttribute("href").split("/").pop(); // Get link file name
        if (currentPage === linkPage || (currentPage === "" && linkPage === "index.html")) {
            link.classList.add("active");
        }
    });
});
