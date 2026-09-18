// =========================
// NOTIFICATIONS
// =========================

const defaultNotifications = [
    {
        id: 1,
        type: "order",
        icon: "fa-solid fa-bag-shopping",
        title: "Comandă nouă",
        message: "Comanda #EC-1060 a fost plasată de Alex Popescu.",
        time: "Acum 5 minute",
        read: false
    },
    {
        id: 2,
        type: "stock",
        icon: "fa-solid fa-triangle-exclamation",
        title: "Stoc redus",
        message: "Mouse Gaming mai are doar 9 produse în stoc.",
        time: "Acum 18 minute",
        read: false
    },
    {
        id: 3,
        type: "stock",
        icon: "fa-solid fa-box-open",
        title: "Produs epuizat",
        message: "Căști Gaming RGB nu mai este disponibil în stoc.",
        time: "Acum 42 minute",
        read: false
    },
    {
        id: 4,
        type: "customer",
        icon: "fa-solid fa-user-plus",
        title: "Client nou",
        message: "Bianca Tudor și-a creat un cont nou.",
        time: "Acum 1 oră",
        read: true
    }
];


// =========================
// STORAGE
// =========================

const notificationsStorageKey = "dashboardNotifications";


function getNotifications() {
    const savedNotifications =
        localStorage.getItem(notificationsStorageKey);

    if (!savedNotifications) {
        localStorage.setItem(
            notificationsStorageKey,
            JSON.stringify(defaultNotifications)
        );

        return [...defaultNotifications];
    }

    try {
        return JSON.parse(savedNotifications);
    } catch (error) {
        console.error(
            "Nu am putut încărca notificările:",
            error
        );

        return [...defaultNotifications];
    }
}


function saveNotifications(notifications) {
    localStorage.setItem(
        notificationsStorageKey,
        JSON.stringify(notifications)
    );
}


// =========================
// FIND BELL BUTTON
// =========================

const notificationButton =
    document.querySelector(".notification-button");


if (notificationButton) {
    initializeNotifications();
}


// =========================
// INITIALIZE
// =========================

function initializeNotifications() {
    createNotificationsDropdown();

    renderNotifications();

    notificationButton.addEventListener(
        "click",
        event => {
            event.stopPropagation();

            toggleNotifications();
        }
    );


    document.addEventListener(
        "click",
        event => {
            const dropdown =
                document.querySelector(
                    "#notificationsDropdown"
                );

            if (
                dropdown &&
                !dropdown.contains(event.target) &&
                !notificationButton.contains(event.target)
            ) {
                closeNotifications();
            }
        }
    );


    document.addEventListener(
        "keydown",
        event => {
            if (event.key === "Escape") {
                closeNotifications();
            }
        }
    );
}


// =========================
// CREATE DROPDOWN
// =========================

function createNotificationsDropdown() {
    const existingDropdown =
        document.querySelector(
            "#notificationsDropdown"
        );

    if (existingDropdown) {
        return;
    }


    const dropdown =
        document.createElement("div");


    dropdown.className =
        "notifications-dropdown";


    dropdown.id =
        "notificationsDropdown";


    dropdown.innerHTML = `
        <div class="notifications-dropdown__header">

            <div>
                <h3>Notificări</h3>

                <span id="notificationsUnreadText">
                    0 necitite
                </span>
            </div>

            <button
                class="notifications-read-all"
                id="markAllNotificationsRead"
                type="button"
            >
                Marchează toate
            </button>

        </div>


        <div
            class="notifications-list"
            id="notificationsList"
        ></div>


        <div class="notifications-dropdown__footer">

            <span>
                Activitate recentă din dashboard
            </span>

        </div>
    `;


    document.body.appendChild(
        dropdown
    );


    const markAllButton =
        dropdown.querySelector(
            "#markAllNotificationsRead"
        );


    markAllButton.addEventListener(
        "click",
        event => {
            event.stopPropagation();

            markAllNotificationsAsRead();
        }
    );
}


// =========================
// RENDER
// =========================

function renderNotifications() {
    const notifications =
        getNotifications();


    const notificationsList =
        document.querySelector(
            "#notificationsList"
        );


    const unreadText =
        document.querySelector(
            "#notificationsUnreadText"
        );


    if (!notificationsList) {
        return;
    }


    const unreadCount =
        notifications.filter(
            notification =>
                !notification.read
        ).length;


    updateNotificationBadge(
        unreadCount
    );


    if (unreadText) {
        unreadText.textContent =
            unreadCount === 1
                ? "1 necitită"
                : `${unreadCount} necitite`;
    }


    if (notifications.length === 0) {
        notificationsList.innerHTML = `
            <div class="notifications-empty">

                <i class="fa-regular fa-bell-slash"></i>

                <strong>
                    Nicio notificare
                </strong>

                <span>
                    Nu ai activitate nouă.
                </span>

            </div>
        `;

        return;
    }


    notificationsList.innerHTML =
        notifications
            .map(notification => `
                <button
                    class="
                        notification-item
                        ${notification.read ? "" : "unread"}
                    "
                    type="button"
                    data-notification-id="${notification.id}"
                >

                    <span
                        class="
                            notification-item__icon
                            notification-item__icon--${notification.type}
                        "
                    >
                        <i class="${notification.icon}"></i>
                    </span>


                    <span class="notification-item__content">

                        <span class="notification-item__top">

                            <strong>
                                ${notification.title}
                            </strong>

                            ${
                                notification.read
                                    ? ""
                                    : `
                                        <span
                                            class="notification-item__dot"
                                        ></span>
                                    `
                            }

                        </span>


                        <span class="notification-item__message">
                            ${notification.message}
                        </span>


                        <span class="notification-item__time">
                            ${notification.time}
                        </span>

                    </span>

                </button>
            `)
            .join("");


    document
        .querySelectorAll(
            ".notification-item"
        )
        .forEach(item => {

            item.addEventListener(
                "click",
                event => {
                    event.stopPropagation();

                    const notificationId =
                        Number(
                            item.dataset.notificationId
                        );

                    markNotificationAsRead(
                        notificationId
                    );
                }
            );

        });
}


// =========================
// BADGE
// =========================

function updateNotificationBadge(
    unreadCount
) {
    let badge =
        notificationButton.querySelector(
            ".notification-badge"
        );


    const oldDot =
        notificationButton.querySelector(
            ".notification-dot"
        );


    if (oldDot) {
        oldDot.style.display =
            unreadCount > 0
                ? "block"
                : "none";
    }


    if (unreadCount === 0) {
        if (badge) {
            badge.remove();
        }

        return;
    }


    if (!badge) {
        badge =
            document.createElement("span");

        badge.className =
            "notification-badge";

        notificationButton.appendChild(
            badge
        );
    }


    badge.textContent =
        unreadCount > 9
            ? "9+"
            : unreadCount;
}


// =========================
// MARK ONE AS READ
// =========================

function markNotificationAsRead(
    notificationId
) {
    const notifications =
        getNotifications();


    const notification =
        notifications.find(
            item =>
                item.id === notificationId
        );


    if (!notification) {
        return;
    }


    notification.read = true;


    saveNotifications(
        notifications
    );


    renderNotifications();
}


// =========================
// MARK ALL AS READ
// =========================

function markAllNotificationsAsRead() {
    const notifications =
        getNotifications()
            .map(notification => ({
                ...notification,
                read: true
            }));


    saveNotifications(
        notifications
    );


    renderNotifications();
}


// =========================
// OPEN / CLOSE
// =========================

function toggleNotifications() {
    const dropdown =
        document.querySelector(
            "#notificationsDropdown"
        );


    if (!dropdown) {
        return;
    }


    const isOpen =
        dropdown.classList.contains(
            "open"
        );


    if (isOpen) {
        closeNotifications();
    } else {
        openNotifications();
    }
}


function openNotifications() {
    const dropdown =
        document.querySelector(
            "#notificationsDropdown"
        );


    if (!dropdown) {
        return;
    }


    positionNotificationsDropdown();


    dropdown.classList.add(
        "open"
    );
}


function closeNotifications() {
    const dropdown =
        document.querySelector(
            "#notificationsDropdown"
        );


    dropdown?.classList.remove(
        "open"
    );
}


// =========================
// POSITION
// =========================

function positionNotificationsDropdown() {
    const dropdown =
        document.querySelector(
            "#notificationsDropdown"
        );


    if (!dropdown) {
        return;
    }


    const buttonPosition =
        notificationButton
            .getBoundingClientRect();


    const right =
        window.innerWidth -
        buttonPosition.right;


    dropdown.style.top =
        `${buttonPosition.bottom + 10}px`;


    dropdown.style.right =
        `${Math.max(right, 12)}px`;
}


window.addEventListener(
    "resize",
    () => {
        const dropdown =
            document.querySelector(
                "#notificationsDropdown"
            );


        if (
            dropdown?.classList.contains(
                "open"
            )
        ) {
            positionNotificationsDropdown();
        }
    }
);