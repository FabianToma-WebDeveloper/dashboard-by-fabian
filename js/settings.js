// =========================
// SETTINGS CONFIG
// =========================

const SETTINGS_KEY = "dashboardSettings";

const defaultSettings = {
    name: "Fabian Toma",
    email: "fabian@ecommerce.ro",
    company: "E-Commerce Store",

    theme: "light",
    language: "ro",
    compactMode: false,

    orderNotifications: true,
    stockNotifications: true,
    customerNotifications: true,
    weeklyReports: false,

    currency: "RON",
    timezone: "Europe/Bucharest",
    lowStockThreshold: 10,
    itemsPerPage: 6
};


// =========================
// DOM
// =========================

const settingsName =
    document.querySelector("#settingsName");

const settingsEmail =
    document.querySelector("#settingsEmail");

const settingsCompany =
    document.querySelector("#settingsCompany");

const settingsTheme =
    document.querySelector("#settingsTheme");

const settingsLanguage =
    document.querySelector("#settingsLanguage");

const compactMode =
    document.querySelector("#compactMode");

const orderNotifications =
    document.querySelector("#orderNotifications");

const stockNotifications =
    document.querySelector("#stockNotifications");

const customerNotifications =
    document.querySelector("#customerNotifications");

const weeklyReports =
    document.querySelector("#weeklyReports");

const settingsCurrency =
    document.querySelector("#settingsCurrency");

const settingsTimezone =
    document.querySelector("#settingsTimezone");

const lowStockThreshold =
    document.querySelector("#lowStockThreshold");

const itemsPerPage =
    document.querySelector("#itemsPerPage");

const settingsAvatar =
    document.querySelector("#settingsAvatar");

const settingsProfileName =
    document.querySelector("#settingsProfileName");

const saveSettingsButton =
    document.querySelector("#saveSettingsButton");

const resetSettingsButton =
    document.querySelector("#resetSettingsButton");

const settingsToast =
    document.querySelector("#settingsToast");

const resetSettingsModal =
    document.querySelector("#resetSettingsModal");

const resetSettingsBackdrop =
    document.querySelector("#resetSettingsBackdrop");

const cancelResetSettings =
    document.querySelector("#cancelResetSettings");

const confirmResetSettings =
    document.querySelector("#confirmResetSettings");

const themeButton =
    document.querySelector("#themeButton");

const sidebar =
    document.querySelector("#sidebar");

const sidebarOverlay =
    document.querySelector("#sidebarOverlay");

const mobileMenuButton =
    document.querySelector("#mobileMenuButton");


// =========================
// GET INITIALS
// =========================

function getInitials(name) {
    const words =
        name
            .trim()
            .split(/\s+/)
            .filter(Boolean);


    if (words.length === 0) {
        return "FT";
    }


    return words
        .slice(0, 2)
        .map(word =>
            word.charAt(0)
        )
        .join("")
        .toUpperCase();
}


// =========================
// LOAD SETTINGS
// =========================

function getSavedSettings() {
    try {
        const savedSettings =
            localStorage.getItem(
                SETTINGS_KEY
            );


        if (!savedSettings) {
            return {
                ...defaultSettings,

                theme:
                    localStorage.getItem(
                        "dashboardTheme"
                    ) || defaultSettings.theme
            };
        }


        const parsedSettings =
            JSON.parse(
                savedSettings
            );


        return {
            ...defaultSettings,
            ...parsedSettings,

            /*
                dashboardTheme already exists
                globally in the project.

                We keep both synchronized.
            */

            theme:
                localStorage.getItem(
                    "dashboardTheme"
                ) ||
                parsedSettings.theme ||
                defaultSettings.theme
        };
    } catch (error) {
        console.error(
            "Nu s-au putut încărca setările:",
            error
        );


        return {
            ...defaultSettings
        };
    }
}


// =========================
// FILL FORM
// =========================

function fillSettingsForm(settings) {
    settingsName.value =
        settings.name;

    settingsEmail.value =
        settings.email;

    settingsCompany.value =
        settings.company;


    settingsTheme.value =
        settings.theme;

    settingsLanguage.value =
        settings.language;

    compactMode.checked =
        settings.compactMode;


    orderNotifications.checked =
        settings.orderNotifications;

    stockNotifications.checked =
        settings.stockNotifications;

    customerNotifications.checked =
        settings.customerNotifications;

    weeklyReports.checked =
        settings.weeklyReports;


    settingsCurrency.value =
        settings.currency;

    settingsTimezone.value =
        settings.timezone;

    lowStockThreshold.value =
        settings.lowStockThreshold;

    itemsPerPage.value =
        settings.itemsPerPage;


    updateProfilePreview(
        settings.name
    );
}


// =========================
// PROFILE PREVIEW
// =========================

function updateProfilePreview(name) {
    const safeName =
        name.trim() ||
        defaultSettings.name;

    const initials =
        getInitials(safeName);

    // Profil Settings
    settingsProfileName.textContent =
        safeName;

    settingsAvatar.textContent =
        initials;

    // Profil sidebar
    const sidebarUserName =
        document.querySelector(
            ".sidebar__footer .user__info strong"
        );

    const sidebarUserAvatar =
        document.querySelector(
            ".sidebar__footer .user__avatar"
        );

    if (sidebarUserName) {
        sidebarUserName.textContent =
            safeName;
    }

    if (sidebarUserAvatar) {
        sidebarUserAvatar.textContent =
            initials;
    }
}

// =========================
// THEME
// =========================

function applyTheme(theme) {
    const isDark =
        theme === "dark";


    document.body.classList.toggle(
        "dark-theme",
        isDark
    );


    const icon =
        themeButton?.querySelector(
            "i"
        );


    if (icon) {
        icon.className =
            isDark
                ? "fa-regular fa-sun"
                : "fa-regular fa-moon";
    }
}


function saveTheme(theme) {
    localStorage.setItem(
        "dashboardTheme",
        theme
    );
}


// SELECT THEME

settingsTheme.addEventListener(
    "change",
    () => {

        const theme =
            settingsTheme.value;


        applyTheme(
            theme
        );


        /*
            Preview immediately.

            The final setting is saved when
            "Salvează modificările" is pressed.
        */
    }
);


// TOPBAR THEME BUTTON

themeButton?.addEventListener(
    "click",
    () => {

        const isDark =
            document.body.classList.contains(
                "dark-theme"
            );


        const newTheme =
            isDark
                ? "light"
                : "dark";


        settingsTheme.value =
            newTheme;


        applyTheme(
            newTheme
        );


        saveTheme(
            newTheme
        );


        /*
            Also update dashboardSettings
            so both storage entries remain
            synchronized.
        */

        const savedSettings =
            getSavedSettings();


        savedSettings.theme =
            newTheme;


        localStorage.setItem(
            SETTINGS_KEY,
            JSON.stringify(
                savedSettings
            )
        );
    }
);


// =========================
// COMPACT MODE
// =========================

function applyCompactMode(enabled) {
    document.body.classList.toggle(
        "compact-mode",
        enabled
    );
}


compactMode.addEventListener(
    "change",
    () => {

        applyCompactMode(
            compactMode.checked
        );
    }
);


// =========================
// COLLECT SETTINGS
// =========================

function collectSettings() {
    return {
        name:
            settingsName.value.trim() ||
            defaultSettings.name,

        email:
            settingsEmail.value.trim() ||
            defaultSettings.email,

        company:
            settingsCompany.value.trim() ||
            defaultSettings.company,

        theme:
            settingsTheme.value,

        language:
            settingsLanguage.value,

        compactMode:
            compactMode.checked,

        orderNotifications:
            orderNotifications.checked,

        stockNotifications:
            stockNotifications.checked,

        customerNotifications:
            customerNotifications.checked,

        weeklyReports:
            weeklyReports.checked,

        currency:
            settingsCurrency.value,

        timezone:
            settingsTimezone.value,

        lowStockThreshold:
            Number(
                lowStockThreshold.value
            ),

        itemsPerPage:
            Number(
                itemsPerPage.value
            )
    };
}


// =========================
// VALIDATION
// =========================

function validateSettings(settings) {
    if (!settings.name) {
        return {
            valid: false,
            message:
                "Introdu un nume valid."
        };
    }


    if (
        !settings.email ||
        !settings.email.includes("@")
    ) {
        return {
            valid: false,
            message:
                "Introdu o adresă de email validă."
        };
    }


    if (
        !Number.isFinite(
            settings.lowStockThreshold
        ) ||
        settings.lowStockThreshold < 1 ||
        settings.lowStockThreshold > 100
    ) {
        return {
            valid: false,
            message:
                "Pragul pentru stoc redus trebuie să fie între 1 și 100."
        };
    }


    return {
        valid: true
    };
}


// =========================
// TOAST
// =========================

let toastTimeout = null;


function showToast(
    title = "Setări salvate",
    message =
        "Modificările au fost salvate cu succes.",
    type = "success"
) {
    if (!settingsToast) {
        return;
    }


    const icon =
        settingsToast.querySelector(
            ".settings-toast__icon i"
        );

    const titleElement =
        settingsToast.querySelector(
            "strong"
        );

    const messageElement =
        settingsToast.querySelector(
            "span"
        );


    titleElement.textContent =
        title;

    messageElement.textContent =
        message;


    if (type === "error") {
        icon.className =
            "fa-solid fa-triangle-exclamation";

        settingsToast.classList.add(
            "error"
        );
    } else {
        icon.className =
            "fa-solid fa-check";

        settingsToast.classList.remove(
            "error"
        );
    }


    settingsToast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimeout
    );


    toastTimeout =
        setTimeout(
            () => {

                settingsToast.classList.remove(
                    "show"
                );

            },
            3000
        );
}


// =========================
// SAVE
// =========================

saveSettingsButton.addEventListener(
    "click",
    () => {

        const settings =
            collectSettings();


        const validation =
            validateSettings(
                settings
            );


        if (!validation.valid) {
            showToast(
                "Verifică setările",
                validation.message,
                "error"
            );

            return;
        }


        localStorage.setItem(
            SETTINGS_KEY,
            JSON.stringify(
                settings
            )
        );


        saveTheme(
            settings.theme
        );


        applyTheme(
            settings.theme
        );


        applyCompactMode(
            settings.compactMode
        );


        updateProfilePreview(
            settings.name
        );


        showToast();
    }
);


// =========================
// RESET MODAL
// =========================

function openResetModal() {
    resetSettingsModal.classList.add(
        "open"
    );


    resetSettingsModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";
}


function closeResetModal() {
    resetSettingsModal.classList.remove(
        "open"
    );


    resetSettingsModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";
}


resetSettingsButton.addEventListener(
    "click",
    openResetModal
);


cancelResetSettings.addEventListener(
    "click",
    closeResetModal
);


resetSettingsBackdrop.addEventListener(
    "click",
    closeResetModal
);


// =========================
// CONFIRM RESET
// =========================

confirmResetSettings.addEventListener(
    "click",
    () => {

        const resetSettings = {
            ...defaultSettings
        };


        localStorage.setItem(
            SETTINGS_KEY,
            JSON.stringify(
                resetSettings
            )
        );


        localStorage.setItem(
            "dashboardTheme",
            resetSettings.theme
        );


        fillSettingsForm(
            resetSettings
        );


        applyTheme(
            resetSettings.theme
        );


        applyCompactMode(
            resetSettings.compactMode
        );


        closeResetModal();


        showToast(
            "Setări resetate",
            "Preferințele au revenit la valorile implicite."
        );
    }
);


// ESCAPE MODAL

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            resetSettingsModal.classList.contains(
                "open"
            )
        ) {
            closeResetModal();
        }
    }
);


// =========================
// MOBILE SIDEBAR
// =========================

function openSidebar() {
    sidebar?.classList.add(
        "open"
    );


    sidebarOverlay?.classList.add(
        "active"
    );


    document.body.classList.add(
        "sidebar-open"
    );
}


function closeSidebar() {
    sidebar?.classList.remove(
        "open"
    );


    sidebarOverlay?.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "sidebar-open"
    );
}


mobileMenuButton?.addEventListener(
    "click",
    () => {

        if (
            sidebar?.classList.contains(
                "open"
            )
        ) {
            closeSidebar();
        } else {
            openSidebar();
        }
    }
);


sidebarOverlay?.addEventListener(
    "click",
    closeSidebar
);


window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 768
        ) {
            closeSidebar();
        }
    }
);


// =========================
// INIT
// =========================

function initSettingsPage() {
    const savedSettings =
        getSavedSettings();


    fillSettingsForm(
        savedSettings
    );


    applyTheme(
        savedSettings.theme
    );


    applyCompactMode(
        savedSettings.compactMode
    );
}


initSettingsPage();