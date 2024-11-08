function showLoading(event, targetUrl) {
    event.preventDefault(); // Prevent default link behavior

    // Store the target URL in session storage
    sessionStorage.setItem("nextPage", targetUrl);

    // Display the loading page
    window.location.href = "../loadingPage/loading.html";
}
