// Function to check login status and conditionally display navbar
function initializeApp() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    const navBar = document.getElementById("nav-bar");

    if (isLoggedIn) {
        // Show the navigation bar if logged in
        if (navBar) navBar.style.display = "flex";
    } else {
        // Hide nav bar if not logged in and redirect to loading page if not on the home page
        if (navBar) navBar.style.display = "none";
        if (window.location.pathname !== '/homePage/home.html') {
            sessionStorage.setItem("nextPage", window.location.href);
            window.location.href = "../loadingPage/loading.html";
        }
    }
}

// Function to navigate with loading transition
function navigateWithLoading(targetUrl) {
    if (sessionStorage.getItem("isLoggedIn") === "true") {
        sessionStorage.setItem("nextPage", targetUrl);
        window.location.href = "../loadingPage/loading.html";
    } else {
        window.location.href = "../loginPage/login.html";
    }
}

// Logout function to clear session and redirect to home page
function logoutUser() {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.setItem("nextPage", "../homePage/home.html");
    window.location.href = "../loadingPage/loading.html";
}

// Event listener to initialize app on page load and attach navigation functionality
document.addEventListener("DOMContentLoaded", () => {
    initializeApp();
    
    // Attach navigation functionality to navbar icons if logged in
    document.querySelectorAll(".nav-icon").forEach(icon => {
        icon.addEventListener("click", (event) => {
            event.preventDefault();
            const targetUrl = icon.getAttribute("data-target");
            navigateWithLoading(targetUrl);
        });
    });
});

