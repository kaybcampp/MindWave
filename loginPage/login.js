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
        
        // Update form title and button text
        formTitle.textContent = isCreatingAccount ? "Sign Up" : "Welcome";
        submitButton.textContent = isCreatingAccount ? "Create Account" : "Login";
        
        // Show/hide the email field for account creation
        emailContainer.style.display = isCreatingAccount ? "block" : "none";
        
        // Update toggle text
        toggleButton.textContent = isCreatingAccount ? "Back to Login" : "Create Account";
        toggleLink.textContent = isCreatingAccount ? "Log in instead" : "Create one now";
    }

    // Event listeners for toggling between login and sign up
    toggleButton.addEventListener("click", toggleForm);
    toggleLink.addEventListener("click", toggleForm);

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
                showLoadingScreen();
                setTimeout(() => {
                    hideLoadingScreen();
                    window.location.href = "main.html"; // Redirect to main app page
                }, 1500); // Adjust delay as needed
            } else {
                alert("Incorrect username or password. Please try again.");
            }
        }
    });
});

// Show loading screen
function showLoadingScreen() {
    document.body.classList.add("loading-active");
}

// Hide loading screen
function hideLoadingScreen() {
    document.body.classList.remove("loading-active");
}
