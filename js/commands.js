// =========================
// DATE COMENZI
// =========================

const orders = [
    {
        id: "#EC-1060",
        customer: "Alex Popescu",
        email: "alex.popescu@email.ro",
        date: "2026-09-13",
        products: 3,
        amount: 749,
        status: "În procesare"
    },
    {
        id: "#EC-1059",
        customer: "Maria Ionescu",
        email: "maria.ionescu@email.ro",
        date: "2026-09-13",
        products: 1,
        amount: 329,
        status: "Finalizată"
    },
    {
        id: "#EC-1058",
        customer: "Andrei Matei",
        email: "andrei.matei@email.ro",
        date: "2026-09-12",
        products: 2,
        amount: 519,
        status: "În așteptare"
    },
    {
        id: "#EC-1057",
        customer: "Elena Radu",
        email: "elena.radu@email.ro",
        date: "2026-09-12",
        products: 4,
        amount: 1249,
        status: "Finalizată"
    },
    {
        id: "#EC-1056",
        customer: "Mihai Stan",
        email: "mihai.stan@email.ro",
        date: "2026-09-11",
        products: 1,
        amount: 199,
        status: "Anulată"
    },
    {
        id: "#EC-1055",
        customer: "Ioana Marinescu",
        email: "ioana.marinescu@email.ro",
        date: "2026-09-11",
        products: 2,
        amount: 439,
        status: "Finalizată"
    },
    {
        id: "#EC-1054",
        customer: "Robert Dumitru",
        email: "robert.dumitru@email.ro",
        date: "2026-09-10",
        products: 3,
        amount: 899,
        status: "În procesare"
    },
    {
        id: "#EC-1053",
        customer: "Diana Pavel",
        email: "diana.pavel@email.ro",
        date: "2026-09-10",
        products: 1,
        amount: 159,
        status: "Finalizată"
    },
    {
        id: "#EC-1052",
        customer: "Cristian Ene",
        email: "cristian.ene@email.ro",
        date: "2026-09-09",
        products: 5,
        amount: 1679,
        status: "În așteptare"
    },
    {
        id: "#EC-1051",
        customer: "Ana Georgescu",
        email: "ana.georgescu@email.ro",
        date: "2026-09-09",
        products: 2,
        amount: 579,
        status: "Finalizată"
    },
    {
        id: "#EC-1050",
        customer: "Vlad Petrescu",
        email: "vlad.petrescu@email.ro",
        date: "2026-09-08",
        products: 3,
        amount: 699,
        status: "În procesare"
    },
    {
        id: "#EC-1049",
        customer: "Bianca Tudor",
        email: "bianca.tudor@email.ro",
        date: "2026-09-08",
        products: 1,
        amount: 289,
        status: "Finalizată"
    }
];


// =========================
// DOM
// =========================

const ordersTableBody =
    document.querySelector("#ordersTableBody");

const orderSearch =
    document.querySelector("#orderSearch");

const statusFilter =
    document.querySelector("#statusFilter");

const sortOrders =
    document.querySelector("#sortOrders");

const ordersEmpty =
    document.querySelector("#ordersEmpty");

const previousPage =
    document.querySelector("#previousPage");

const nextPage =
    document.querySelector("#nextPage");

const currentPageElement =
    document.querySelector("#currentPage");

const paginationInfo =
    document.querySelector("#paginationInfo");

const themeButton =
    document.querySelector("#themeButton");

const sidebar =
    document.querySelector("#sidebar");

const sidebarOverlay =
    document.querySelector("#sidebarOverlay");

const mobileMenuButton =
    document.querySelector("#mobileMenuButton");

const exportOrdersButton =
    document.querySelector("#exportOrdersButton");

const orderModal =
    document.querySelector("#orderModal");

const orderModalBackdrop =
    document.querySelector("#orderModalBackdrop");

const closeOrderModalButton =
    document.querySelector("#closeOrderModal");


// =========================
// PAGINATION
// =========================

const ordersPerPage = 6;

let currentPage = 1;


// =========================
// FORMATĂRI
// =========================

function formatCurrency(value) {
    return new Intl.NumberFormat("ro-RO", {
        style: "currency",
        currency: "RON",
        maximumFractionDigits: 0
    }).format(value);
}


function formatDate(date) {
    return new Intl.DateTimeFormat("ro-RO", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).format(new Date(date));
}


// =========================
// INITIALS
// =========================

function getInitials(name) {
    return name
        .split(" ")
        .map(part => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}


// =========================
// STATUS CLASS
// =========================

function getStatusClass(status) {
    switch (status) {
        case "Finalizată":
            return "completed";

        case "În procesare":
            return "processing";

        case "În așteptare":
            return "pending";

        case "Anulată":
            return "cancelled";

        default:
            return "";
    }
}


// =========================
// KPI
// =========================

function updateOrderStats() {
    const total = orders.length;

    const processing = orders.filter(
        order => order.status === "În procesare"
    ).length;

    const completed = orders.filter(
        order => order.status === "Finalizată"
    ).length;

    const totalRevenue = orders.reduce(
        (sum, order) => sum + order.amount,
        0
    );

    document.querySelector("#ordersTotal").textContent =
        total;

    document.querySelector("#ordersProcessing").textContent =
        processing;

    document.querySelector("#ordersCompleted").textContent =
        completed;

    document.querySelector("#ordersRevenue").textContent =
        formatCurrency(totalRevenue);
}


// =========================
// FILTRARE
// =========================

function getFilteredOrders() {
    const searchValue =
        orderSearch.value
            .toLowerCase()
            .trim();

    const selectedStatus =
        statusFilter.value;

    let filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.id
                .toLowerCase()
                .includes(searchValue) ||

            order.customer
                .toLowerCase()
                .includes(searchValue) ||

            order.email
                .toLowerCase()
                .includes(searchValue);

        const matchesStatus =
            selectedStatus === "all" ||
            order.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    filteredOrders = sortFilteredOrders(
        filteredOrders
    );

    return filteredOrders;
}


// =========================
// SORTARE
// =========================

function sortFilteredOrders(orderList) {
    const sortedOrders = [...orderList];

    switch (sortOrders.value) {
        case "oldest":
            return sortedOrders.sort(
                (a, b) =>
                    new Date(a.date) -
                    new Date(b.date)
            );

        case "highest":
            return sortedOrders.sort(
                (a, b) =>
                    b.amount - a.amount
            );

        case "lowest":
            return sortedOrders.sort(
                (a, b) =>
                    a.amount - b.amount
            );

        case "newest":
        default:
            return sortedOrders.sort(
                (a, b) =>
                    new Date(b.date) -
                    new Date(a.date)
            );
    }
}


// =========================
// RANDARE COMENZI
// =========================

function renderOrders() {
    const filteredOrders =
        getFilteredOrders();

    const totalPages =
        Math.max(
            Math.ceil(
                filteredOrders.length /
                ordersPerPage
            ),
            1
        );

    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    const startIndex =
        (currentPage - 1) *
        ordersPerPage;

    const endIndex =
        startIndex +
        ordersPerPage;

    const ordersToShow =
        filteredOrders.slice(
            startIndex,
            endIndex
        );

    ordersTableBody.innerHTML =
        ordersToShow
            .map(order => {
                return `
                    <tr>

                        <td>
                            <span class="order-id">
                                ${order.id}
                            </span>
                        </td>

                        <td>

                            <div class="customer-cell">

                                <div class="customer-avatar">
                                    ${getInitials(order.customer)}
                                </div>

                                <div class="customer-info">

                                    <strong>
                                        ${order.customer}
                                    </strong>

                                    <span>
                                        ${order.email}
                                    </span>

                                </div>

                            </div>

                        </td>

                        <td>
                            ${formatDate(order.date)}
                        </td>

                        <td>
                            ${order.products}
                        </td>

                        <td>
                            <strong>
                                ${formatCurrency(order.amount)}
                            </strong>
                        </td>

                        <td>

                            <span
                                class="
                                    order-status
                                    ${getStatusClass(order.status)}
                                "
                            >
                                ${order.status}
                            </span>

                        </td>

                        <td>

                            <button
                                class="view-order-button"
                                type="button"
                                data-order-id="${order.id}"
                                aria-label="Vezi comanda ${order.id}"
                            >
                                <i class="fa-solid fa-eye"></i>
                            </button>

                        </td>

                    </tr>
                `;
            })
            .join("");

    ordersEmpty.hidden =
        filteredOrders.length !== 0;

    updatePagination(
        filteredOrders.length,
        totalPages,
        startIndex,
        endIndex
    );

    addOrderButtonEvents();
}


// =========================
// PAGINATION UI
// =========================

function updatePagination(
    totalOrders,
    totalPages,
    startIndex,
    endIndex
) {
    currentPageElement.textContent =
        `${currentPage} / ${totalPages}`;

    previousPage.disabled =
        currentPage === 1;

    nextPage.disabled =
        currentPage === totalPages;

    if (totalOrders === 0) {
        paginationInfo.textContent =
            "0 comenzi";

        return;
    }

    const visibleEnd =
        Math.min(
            endIndex,
            totalOrders
        );

    paginationInfo.textContent =
        `${startIndex + 1}-${visibleEnd} din ${totalOrders} comenzi`;
}


// =========================
// PAGINATION EVENTS
// =========================

previousPage.addEventListener(
    "click",
    () => {
        if (currentPage > 1) {
            currentPage--;

            renderOrders();
        }
    }
);


nextPage.addEventListener(
    "click",
    () => {
        const filteredOrders =
            getFilteredOrders();

        const totalPages =
            Math.ceil(
                filteredOrders.length /
                ordersPerPage
            );

        if (currentPage < totalPages) {
            currentPage++;

            renderOrders();
        }
    }
);


// =========================
// SEARCH + FILTERS
// =========================

function resetAndRender() {
    currentPage = 1;

    renderOrders();
}

orderSearch.addEventListener(
    "input",
    resetAndRender
);

statusFilter.addEventListener(
    "change",
    resetAndRender
);

sortOrders.addEventListener(
    "change",
    resetAndRender
);


// =========================
// MODAL
// =========================

function openOrderModal(orderId) {
    const order =
        orders.find(
            item => item.id === orderId
        );

    if (!order) return;

    document.querySelector(
        "#modalOrderId"
    ).textContent = order.id;

    document.querySelector(
        "#modalCustomer"
    ).textContent = order.customer;

    document.querySelector(
        "#modalEmail"
    ).textContent = order.email;

    document.querySelector(
        "#modalDate"
    ).textContent = formatDate(order.date);

    document.querySelector(
        "#modalProducts"
    ).textContent =
        `${order.products} produse`;

    document.querySelector(
        "#modalStatus"
    ).textContent = order.status;

    document.querySelector(
        "#modalAmount"
    ).textContent =
        formatCurrency(order.amount);

    orderModal.classList.add("open");

    orderModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";
}


function closeOrderModal() {
    orderModal.classList.remove("open");

    orderModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";
}


function addOrderButtonEvents() {
    const buttons =
        document.querySelectorAll(
            ".view-order-button"
        );

    buttons.forEach(button => {
        button.addEventListener(
            "click",
            () => {
                openOrderModal(
                    button.dataset.orderId
                );
            }
        );
    });
}


closeOrderModalButton.addEventListener(
    "click",
    closeOrderModal
);

orderModalBackdrop.addEventListener(
    "click",
    closeOrderModal
);

document.addEventListener(
    "keydown",
    event => {
        if (
            event.key === "Escape" &&
            orderModal.classList.contains("open")
        ) {
            closeOrderModal();
        }
    }
);


// =========================
// DARK MODE
// =========================

function applyTheme(theme) {
    document.body.classList.toggle(
        "dark-theme",
        theme === "dark"
    );

    const icon =
        themeButton.querySelector("i");

    if (icon) {
        icon.className =
            theme === "dark"
                ? "fa-regular fa-sun"
                : "fa-regular fa-moon";
    }
}


function getSavedTheme() {
    return (
        localStorage.getItem(
            "dashboardTheme"
        ) || "light"
    );
}


themeButton.addEventListener(
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

        localStorage.setItem(
            "dashboardTheme",
            newTheme
        );

        applyTheme(newTheme);
    }
);


// =========================
// MOBILE SIDEBAR
// =========================

function openSidebar() {
    sidebar.classList.add("open");

    sidebarOverlay.classList.add(
        "active"
    );

    document.body.classList.add(
        "sidebar-open"
    );
}


function closeSidebar() {
    sidebar.classList.remove("open");

    sidebarOverlay.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "sidebar-open"
    );
}


mobileMenuButton.addEventListener(
    "click",
    () => {
        if (
            sidebar.classList.contains(
                "open"
            )
        ) {
            closeSidebar();
        } else {
            openSidebar();
        }
    }
);


sidebarOverlay.addEventListener(
    "click",
    closeSidebar
);


window.addEventListener(
    "resize",
    () => {
        if (window.innerWidth > 768) {
            closeSidebar();
        }
    }
);


// =========================
// EXPORT CSV
// =========================

exportOrdersButton.addEventListener(
    "click",
    () => {
        const data =
            getFilteredOrders();

        const header =
            "Comanda,Client,Email,Data,Produse,Valoare,Status";

        const rows =
            data.map(order => {
                return [
                    order.id,
                    order.customer,
                    order.email,
                    order.date,
                    order.products,
                    order.amount,
                    order.status
                ].join(",");
            });

        const csv =
            [
                header,
                ...rows
            ].join("\n");

        const blob =
            new Blob(
                [csv],
                {
                    type:
                        "text/csv;charset=utf-8"
                }
            );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "ecommerce-orders.csv";

        document.body.appendChild(link);

        link.click();

        link.remove();

        URL.revokeObjectURL(url);
    }
);


// =========================
// INIT
// =========================

function init() {
    applyTheme(
        getSavedTheme()
    );

    updateOrderStats();

    renderOrders();

    console.log(
        "Orders page initialized."
    );
}

init();