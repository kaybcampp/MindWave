document.addEventListener("DOMContentLoaded", () => {
    const formTitle = document.getElementById("form-title");
    const submitButton = document.getElementById("submit-button");
    const emailContainer = document.getElementById("email-container");
    const toggleButton = document.getElementById("toggle-create-account");
    const toggleLink = document.getElementById("toggle-link");
    const authForm = document.getElementById("auth-form");

    let isCreatingAccount = false;

    // Hardcoded test credentials
    const testUsername = "testuser";
    const testPassword = "password123";

    function toggleForm() {
        isCreatingAccount = !isCreatingAccount;
        formTitle.textContent = isCreatingAccount ? "Sign Up" : "Welcome";
        submitButton.textContent = isCreatingAccount ? "Create Account" : "Login";
        emailContainer.style.display = isCreatingAccount ? "block" : "none";
        toggleButton.textContent = isCreatingAccount ? "Back to Login" : "Create Account";
        toggleLink.textContent = isCreatingAccount ? "Log in instead" : "Create one now";
    }

    // Event listeners for toggling between login and sign up
    toggleButton.addEventListener("click", toggleForm);
    toggleLink.addEventListener("click", toggleForm);

    function navigateTo(pageUrl) {
        sessionStorage.setItem("nextPage", pageUrl); // Store target page URL
        window.location.href = "../loadingPage/loading.html"; // Redirect to loading page
    }

    // Form submit event listener
    authForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent page reload

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (isCreatingAccount) {
            alert(`Account created successfully for ${username}!`);
            toggleForm(); // Go back to login mode
        } else {
            // Check against test credentials
            if (username === testUsername && password === testPassword) {
                navigateTo("../homePage/home.html");
            } else {
                alert("Incorrect username or password. Please try again.");
            }
        }
    });
});
