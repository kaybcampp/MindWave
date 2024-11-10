document.addEventListener("DOMContentLoaded", () => {
    const formTitle = document.getElementById("form-title");
    const submitButton = document.getElementById("submit-button");
    const emailContainer = document.getElementById("email-container");
    const toggleButton = document.getElementById("toggle-create-account");
    const toggleLink = document.getElementById("toggle-link");
    const authForm = document.getElementById("auth-form");

    let isCreatingAccount = false;

    // Hardcoded test credentials
    const TEST_USERNAME = "testuser";
    const TEST_PASSWORD = "password123";

    function toggleForm() {
        isCreatingAccount = !isCreatingAccount;
        formTitle.textContent = isCreatingAccount ? "Sign Up" : "Welcome";
        submitButton.textContent = isCreatingAccount ? "Create Account" : "Login";
        emailContainer.style.display = isCreatingAccount ? "block" : "none";
        toggleButton.textContent = isCreatingAccount ? "Back to Login" : "Create Account";
        toggleLink.textContent = isCreatingAccount ? "Log in instead" : "Create one now";
    }

    toggleButton.addEventListener("click", toggleForm);
    toggleLink.addEventListener("click", toggleForm);

    // Form submit event listener
    authForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Simple form validation
        if (!username || !password) {
            alert("Please fill in all required fields.");
            return;
        }

        if (isCreatingAccount) {
            alert(`Account created successfully for ${username}!`);
            toggleForm();
        } else {
            if (username === TEST_USERNAME && password === TEST_PASSWORD) {
                // Mark user as logged in and set the loading transition
                sessionStorage.setItem("isLoggedIn", "true"); 
                sessionStorage.setItem("nextPage", "../homePage/home.html"); // Set the home page as the next page after loading

                // Redirect to loading page first
                window.location.href = "../loadingPage/loading.html";
            } else {
                alert("Incorrect username or password. Please try again.");
            }
        }
    });
});
