// =========================
// LOGOUT
// =========================

const logoutButton =
    document.querySelector("#logoutButton");

if (logoutButton) {
    initializeLogout();
}


// =========================
// INITIALIZE
// =========================

function initializeLogout() {
    createLogoutModal();

    logoutButton.addEventListener(
        "click",
        openLogoutModal
    );
}


// =========================
// CREATE MODAL
// =========================

function createLogoutModal() {
    if (document.querySelector("#logoutModal")) {
        return;
    }

    const modal =
        document.createElement("div");

    modal.className = "logout-modal";
    modal.id = "logoutModal";

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    modal.innerHTML = `
        <div
            class="logout-modal__backdrop"
            id="logoutModalBackdrop"
        ></div>

        <div
            class="logout-modal__content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="logoutModalTitle"
        >

            <div class="logout-modal__icon">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </div>

            <div class="logout-modal__text">

                <h3 id="logoutModalTitle">
                    Deconectare
                </h3>

                <p>
                    Sigur vrei să te deconectezi din dashboard?
                </p>

            </div>

            <div class="logout-modal__actions">

                <button
                    class="logout-modal__button logout-modal__button--cancel"
                    id="cancelLogoutButton"
                    type="button"
                >
                    Anulează
                </button>

                <button
                    class="logout-modal__button logout-modal__button--confirm"
                    id="confirmLogoutButton"
                    type="button"
                >
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                    Deconectare
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(modal);


    document
        .querySelector("#logoutModalBackdrop")
        .addEventListener(
            "click",
            closeLogoutModal
        );


    document
        .querySelector("#cancelLogoutButton")
        .addEventListener(
            "click",
            closeLogoutModal
        );


    document
        .querySelector("#confirmLogoutButton")
        .addEventListener(
            "click",
            handleLogout
        );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains("open")
            ) {
                closeLogoutModal();
            }

        }
    );
}


// =========================
// OPEN MODAL
// =========================

function openLogoutModal() {
    const modal =
        document.querySelector("#logoutModal");

    if (!modal) {
        return;
    }

    modal.classList.add("open");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";
}


// =========================
// CLOSE MODAL
// =========================

function closeLogoutModal() {
    const modal =
        document.querySelector("#logoutModal");

    if (!modal) {
        return;
    }

    modal.classList.remove("open");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";
}


// =========================
// LOGOUT ACTION
// =========================

function handleLogout() {
    const confirmButton =
        document.querySelector(
            "#confirmLogoutButton"
        );

    if (!confirmButton) {
        return;
    }


    confirmButton.disabled = true;

    confirmButton.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Deconectare...
    `;


    setTimeout(() => {

        /*
         * Dashboard-ul este un proiect demo,
         * deci nu avem autentificare reală.
         *
         * Nu ștergem dashboardTheme sau
         * dashboardNotifications deoarece
         * acestea sunt preferințe/date ale
         * dashboard-ului, nu sesiunea userului.
         */

        sessionStorage.removeItem(
            "dashboardSession"
        );


        showLogoutSuccess();

    }, 700);
}


// =========================
// SUCCESS STATE
// =========================

function showLogoutSuccess() {
    const modalContent =
        document.querySelector(
            ".logout-modal__content"
        );

    if (!modalContent) {
        return;
    }


    modalContent.innerHTML = `
        <div
            class="
                logout-modal__icon
                logout-modal__icon--success
            "
        >
            <i class="fa-solid fa-check"></i>
        </div>

        <div class="logout-modal__text">

            <h3>
                Deconectare reușită
            </h3>

            <p>
                Sesiunea demo a fost închisă.
            </p>

        </div>

        <div class="logout-modal__actions">

            <button
                class="
                    logout-modal__button
                    logout-modal__button--primary
                "
                id="returnDashboardButton"
                type="button"
            >
                Revino la dashboard
            </button>

        </div>
    `;


    document
        .querySelector(
            "#returnDashboardButton"
        )
        .addEventListener(
            "click",
            () => {
                window.location.href =
                    "index.html";
            }
        );
}