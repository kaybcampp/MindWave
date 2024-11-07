document.addEventListener("DOMContentLoaded", () => {
    const chatIcon = document.getElementById("chat-icon");

    chatIcon.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent direct link navigation

        // Save the target page (chat page) in session storage to retrieve it from loading page
        sessionStorage.setItem("targetPage", "../chatPage/chat.html");

        // Redirect to the loading page
        window.location.href = "../loadingPage/loading.html";
    });
});
