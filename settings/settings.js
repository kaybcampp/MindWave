document.addEventListener("DOMContentLoaded", () => {
    const profilePictureInput = document.getElementById("profile-picture");
    const avatarImg = document.querySelector(".avatar");
    const themeSelector = document.getElementById("theme-selector");
    const emailNotificationsCheckbox = document.getElementById("email-notifications");
    const pushNotificationsCheckbox = document.getElementById("push-notifications");
    const saveButton = document.querySelector(".save-button");

    // Profile picture preview function
    profilePictureInput.addEventListener("change", () => {
        const file = profilePictureInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                avatarImg.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle theme changes
    themeSelector.addEventListener("change", () => {
        const selectedTheme = themeSelector.value;
        document.body.className = ""; // Remove any previous theme classes
        document.body.classList.add(selectedTheme);
        saveSettings();
    });

    // Handle notifications checkboxes
    emailNotificationsCheckbox.addEventListener("change", () => saveSettings());
    pushNotificationsCheckbox.addEventListener("change", () => saveSettings());

    // Save button functionality to store settings in local storage
    saveButton.addEventListener("click", () => {
        saveSettings();
        alert("Settings saved successfully!");
    });

    // Function to save settings to localStorage
    function saveSettings() {
        const settings = {
            profilePicture: avatarImg.src,
            theme: themeSelector.value,
            emailNotifications: emailNotificationsCheckbox.checked,
            pushNotifications: pushNotificationsCheckbox.checked
        };
        localStorage.setItem("userSettings", JSON.stringify(settings));
    }

    // Function to load settings from localStorage
    function loadSettings() {
        const savedSettings = JSON.parse(localStorage.getItem("userSettings"));
        if (savedSettings) {
            if (savedSettings.profilePicture) {
                avatarImg.src = savedSettings.profilePicture;
            }
            if (savedSettings.theme) {
                themeSelector.value = savedSettings.theme;
                document.body.classList.add(savedSettings.theme);
            }
            emailNotificationsCheckbox.checked = savedSettings.emailNotifications || false;
            pushNotificationsCheckbox.checked = savedSettings.pushNotifications || false;
        }
    }

    // Load settings on page load
    loadSettings();
});
