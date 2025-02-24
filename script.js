document.addEventListener("DOMContentLoaded", function () {
    // Show the popup when page loads
    const popup = document.getElementById("popup");
    if (popup) {
        popup.style.display = "flex";
    }
});

function closePopup() {
    document.getElementById("popup").style.display = "none";
}
