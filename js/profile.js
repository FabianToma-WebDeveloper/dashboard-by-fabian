// =========================
// GLOBAL PROFILE
// =========================

(() => {
    const SETTINGS_KEY =
        "dashboardSettings";


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


    function getSavedProfile() {
        try {
            const savedSettings =
                localStorage.getItem(
                    SETTINGS_KEY
                );


            if (!savedSettings) {
                return null;
            }


            const settings =
                JSON.parse(
                    savedSettings
                );


            return {
                name:
                    settings.name ||
                    "Fabian Toma",

                role:
                    "Administrator"
            };

        } catch (error) {

            console.error(
                "Nu s-a putut încărca profilul:",
                error
            );


            return null;
        }
    }


    function renderGlobalProfile() {
        const profile =
            getSavedProfile();


        if (!profile) {
            return;
        }


        const userNames =
            document.querySelectorAll(
                ".sidebar__footer .user__info strong"
            );


        const userRoles =
            document.querySelectorAll(
                ".sidebar__footer .user__info span"
            );


        const userAvatars =
            document.querySelectorAll(
                ".sidebar__footer .user__avatar"
            );


        userNames.forEach(element => {
            element.textContent =
                profile.name;
        });


        userRoles.forEach(element => {
            element.textContent =
                profile.role;
        });


        userAvatars.forEach(element => {
            element.textContent =
                getInitials(
                    profile.name
                );
        });
    }


    renderGlobalProfile();
})();