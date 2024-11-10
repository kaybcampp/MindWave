function showLoading(event, targetUrl) {
    event.preventDefault(); // Prevent default link behavior

    // Check if the user is logged in
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

    // Set the next page to navigate after loading
    sessionStorage.setItem("nextPage", isLoggedIn ? targetUrl : "../loginPage/login.html");

    // Display the loading page
    window.location.href = "../loadingPage/loading.html";
}

// Apply the `showLoading` function to each navigation link with `data-target` attributes
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".nav-icon").forEach(icon => {
        const targetUrl = icon.getAttribute("data-target");

        if (targetUrl) {
            icon.addEventListener("click", (event) => {
                showLoading(event, targetUrl);
            });
        }
    });
});
