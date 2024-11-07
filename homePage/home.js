document.addEventListener("DOMContentLoaded", () => {
    const chatIcon = document.getElementById("chat-icon");

    chatIcon.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent direct link navigation

        // Redirect to the loading page
        window.location.href = "../loadingPage/loading.html";
    });
});
