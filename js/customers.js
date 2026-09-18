// =========================
// CUSTOMER DATA
// =========================

const customers = [
    {
        id: 1,
        name: "Alex Popescu",
        email: "alex.popescu@email.ro",
        status: "Activ",
        orders: 8,
        spent: 2849,
        since: "2026-02-14",
        lastOrder: "2026-09-13"
    },
    {
        id: 2,
        name: "Maria Ionescu",
        email: "maria.ionescu@email.ro",
        status: "Activ",
        orders: 12,
        spent: 4390,
        since: "2025-11-20",
        lastOrder: "2026-09-13"
    },
    {
        id: 3,
        name: "Andrei Matei",
        email: "andrei.matei@email.ro",
        status: "Nou",
        orders: 2,
        spent: 678,
        since: "2026-09-02",
        lastOrder: "2026-09-12"
    },
    {
        id: 4,
        name: "Elena Radu",
        email: "elena.radu@email.ro",
        status: "Activ",
        orders: 15,
        spent: 6240,
        since: "2025-08-17",
        lastOrder: "2026-09-12"
    },
    {
        id: 5,
        name: "Mihai Stan",
        email: "mihai.stan@email.ro",
        status: "Inactiv",
        orders: 3,
        spent: 829,
        since: "2025-12-03",
        lastOrder: "2026-05-21"
    },
    {
        id: 6,
        name: "Ioana Marinescu",
        email: "ioana.marinescu@email.ro",
        status: "Activ",
        orders: 9,
        spent: 3190,
        since: "2026-01-11",
        lastOrder: "2026-09-11"
    },
    {
        id: 7,
        name: "Robert Dumitru",
        email: "robert.dumitru@email.ro",
        status: "Activ",
        orders: 6,
        spent: 2150,
        since: "2026-03-18",
        lastOrder: "2026-09-10"
    },
    {
        id: 8,
        name: "Diana Pavel",
        email: "diana.pavel@email.ro",
        status: "Nou",
        orders: 1,
        spent: 159,
        since: "2026-09-10",
        lastOrder: "2026-09-10"
    },
    {
        id: 9,
        name: "Cristian Ene",
        email: "cristian.ene@email.ro",
        status: "Activ",
        orders: 11,
        spent: 4980,
        since: "2025-10-24",
        lastOrder: "2026-09-09"
    },
    {
        id: 10,
        name: "Ana Georgescu",
        email: "ana.georgescu@email.ro",
        status: "Activ",
        orders: 7,
        spent: 2460,
        since: "2026-02-28",
        lastOrder: "2026-09-09"
    },
    {
        id: 11,
        name: "Vlad Petrescu",
        email: "vlad.petrescu@email.ro",
        status: "Inactiv",
        orders: 4,
        spent: 1340,
        since: "2025-09-15",
        lastOrder: "2026-04-08"
    },
    {
        id: 12,
        name: "Bianca Tudor",
        email: "bianca.tudor@email.ro",
        status: "Nou",
        orders: 1,
        spent: 289,
        since: "2026-09-08",
        lastOrder: "2026-09-08"
    }
];


// =========================
// DOM
// =========================

const customersTableBody =
    document.querySelector("#customersTableBody");

const customerSearch =
    document.querySelector("#customerSearch");

const customerStatusFilter =
    document.querySelector("#customerStatusFilter");

const customerSort =
    document.querySelector("#customerSort");

const customersEmpty =
    document.querySelector("#customersEmpty");

const previousPage =
    document.querySelector("#customersPreviousPage");

const nextPage =
    document.querySelector("#customersNextPage");

const currentPageElement =
    document.querySelector("#customersCurrentPage");

const paginationInfo =
    document.querySelector("#customersPaginationInfo");

const themeButton =
    document.querySelector("#themeButton");

const sidebar =
    document.querySelector("#sidebar");

const sidebarOverlay =
    document.querySelector("#sidebarOverlay");

const mobileMenuButton =
    document.querySelector("#mobileMenuButton");

const customerModal =
    document.querySelector("#customerModal");

const customerModalBackdrop =
    document.querySelector("#customerModalBackdrop");

const closeCustomerModalButton =
    document.querySelector("#closeCustomerModal");

const exportCustomersButton =
    document.querySelector("#exportCustomersButton");


// =========================
// STATE
// =========================

const customersPerPage = 6;

let currentPage = 1;


// =========================
// HELPERS
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


function getInitials(name) {
    return name
        .split(" ")
        .map(part => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}


function getStatusClass(status) {
    if (status === "Activ") {
        return "active";
    }

    if (status === "Nou") {
        return "new";
    }

    return "inactive";
}


// =========================
// KPI
// =========================

function updateCustomerStats() {
    const total =
        customers.length;

    const newCustomers =
        customers.filter(
            customer =>
                customer.status === "Nou"
        ).length;

    const activeCustomers =
        customers.filter(
            customer =>
                customer.status === "Activ"
        ).length;

    const totalSpent =
        customers.reduce(
            (total, customer) =>
                total + customer.spent,
            0
        );

    const averageValue =
        totalSpent / total;

    document.querySelector(
        "#customersTotal"
    ).textContent = total;

    document.querySelector(
        "#customersNew"
    ).textContent = newCustomers;

    document.querySelector(
        "#customersActive"
    ).textContent = activeCustomers;

    document.querySelector(
        "#averageCustomerValue"
    ).textContent =
        formatCurrency(averageValue);
}


// =========================
// FILTER + SORT
// =========================

function getFilteredCustomers() {
    const searchValue =
        customerSearch.value
            .trim()
            .toLowerCase();

    const selectedStatus =
        customerStatusFilter.value;

    let filtered =
        customers.filter(customer => {

            const matchesSearch =
                customer.name
                    .toLowerCase()
                    .includes(searchValue) ||

                customer.email
                    .toLowerCase()
                    .includes(searchValue);

            const matchesStatus =
                selectedStatus === "all" ||
                customer.status === selectedStatus;

            return (
                matchesSearch &&
                matchesStatus
            );
        });

    filtered = [...filtered];

    switch (customerSort.value) {

        case "spent-high":
            filtered.sort(
                (a, b) =>
                    b.spent - a.spent
            );
            break;

        case "spent-low":
            filtered.sort(
                (a, b) =>
                    a.spent - b.spent
            );
            break;

        case "orders":
            filtered.sort(
                (a, b) =>
                    b.orders - a.orders
            );
            break;

        case "recent":
        default:
            filtered.sort(
                (a, b) =>
                    new Date(b.lastOrder) -
                    new Date(a.lastOrder)
            );
    }

    return filtered;
}


// =========================
// RENDER
// =========================

function renderCustomers() {
    const filteredCustomers =
        getFilteredCustomers();

    const totalPages =
        Math.max(
            Math.ceil(
                filteredCustomers.length /
                customersPerPage
            ),
            1
        );

    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    const startIndex =
        (currentPage - 1) *
        customersPerPage;

    const endIndex =
        startIndex +
        customersPerPage;

    const visibleCustomers =
        filteredCustomers.slice(
            startIndex,
            endIndex
        );

    customersTableBody.innerHTML =
        visibleCustomers
            .map(customer => `
                <tr>

                    <td>
                        <div class="customer-cell">

                            <div class="customer-avatar">
                                ${getInitials(customer.name)}
                            </div>

                            <div class="customer-info">

                                <strong>
                                    ${customer.name}
                                </strong>

                                <span>
                                    ${customer.email}
                                </span>

                            </div>

                        </div>
                    </td>

                    <td>
                        <span
                            class="
                                customer-status
                                ${getStatusClass(customer.status)}
                            "
                        >
                            ${customer.status}
                        </span>
                    </td>

                    <td>
                        ${customer.orders}
                    </td>

                    <td>
                        <strong>
                            ${formatCurrency(customer.spent)}
                        </strong>
                    </td>

                    <td>
                        ${formatDate(customer.lastOrder)}
                    </td>

                    <td>
                        <button
                            class="view-customer-button"
                            type="button"
                            data-customer-id="${customer.id}"
                            aria-label="Vezi ${customer.name}"
                        >
                            <i class="fa-solid fa-eye"></i>
                        </button>
                    </td>

                </tr>
            `)
            .join("");

    customersEmpty.hidden =
        filteredCustomers.length !== 0;

    updatePagination(
        filteredCustomers.length,
        totalPages,
        startIndex,
        endIndex
    );

    addCustomerEvents();
}


// =========================
// PAGINATION
// =========================

function updatePagination(
    totalCustomers,
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

    if (totalCustomers === 0) {
        paginationInfo.textContent =
            "0 clienți";

        return;
    }

    const visibleEnd =
        Math.min(
            endIndex,
            totalCustomers
        );

    paginationInfo.textContent =
        `${startIndex + 1}-${visibleEnd} din ${totalCustomers} clienți`;
}


previousPage.addEventListener(
    "click",
    () => {
        if (currentPage > 1) {
            currentPage--;

            renderCustomers();
        }
    }
);


nextPage.addEventListener(
    "click",
    () => {
        const filtered =
            getFilteredCustomers();

        const totalPages =
            Math.ceil(
                filtered.length /
                customersPerPage
            );

        if (currentPage < totalPages) {
            currentPage++;

            renderCustomers();
        }
    }
);


// =========================
// FILTER EVENTS
// =========================

function resetAndRender() {
    currentPage = 1;

    renderCustomers();
}

customerSearch.addEventListener(
    "input",
    resetAndRender
);

customerStatusFilter.addEventListener(
    "change",
    resetAndRender
);

customerSort.addEventListener(
    "change",
    resetAndRender
);


// =========================
// CUSTOMER MODAL
// =========================

function openCustomerModal(customerId) {
    const customer =
        customers.find(
            item =>
                item.id === customerId
        );

    if (!customer) return;

    document.querySelector(
        "#modalCustomerAvatar"
    ).textContent =
        getInitials(customer.name);

    document.querySelector(
        "#modalCustomerName"
    ).textContent =
        customer.name;

    document.querySelector(
        "#modalCustomerEmail"
    ).textContent =
        customer.email;

    document.querySelector(
        "#modalCustomerStatus"
    ).textContent =
        customer.status;

    document.querySelector(
        "#modalCustomerOrders"
    ).textContent =
        customer.orders;

    document.querySelector(
        "#modalCustomerSpent"
    ).textContent =
        formatCurrency(customer.spent);

    document.querySelector(
        "#modalCustomerSince"
    ).textContent =
        formatDate(customer.since);

    document.querySelector(
        "#modalCustomerLastOrder"
    ).textContent =
        formatDate(customer.lastOrder);

    customerModal.classList.add("open");

    customerModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";
}


function closeCustomerModal() {
    customerModal.classList.remove("open");

    customerModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";
}


function addCustomerEvents() {
    document
        .querySelectorAll(
            ".view-customer-button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {
                    openCustomerModal(
                        Number(
                            button.dataset.customerId
                        )
                    );
                }
            );

        });
}


closeCustomerModalButton.addEventListener(
    "click",
    closeCustomerModal
);

customerModalBackdrop.addEventListener(
    "click",
    closeCustomerModal
);

document.addEventListener(
    "keydown",
    event => {
        if (
            event.key === "Escape" &&
            customerModal.classList.contains(
                "open"
            )
        ) {
            closeCustomerModal();
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
    sidebarOverlay.classList.add("active");

    document.body.classList.add(
        "sidebar-open"
    );
}


function closeSidebar() {
    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("active");

    document.body.classList.remove(
        "sidebar-open"
    );
}


mobileMenuButton.addEventListener(
    "click",
    () => {
        sidebar.classList.contains("open")
            ? closeSidebar()
            : openSidebar();
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

exportCustomersButton.addEventListener(
    "click",
    () => {

        const data =
            getFilteredCustomers();

        const header =
            "Nume,Email,Status,Comenzi,Total cheltuit,Client din,Ultima comanda";

        const rows =
            data.map(customer =>
                [
                    customer.name,
                    customer.email,
                    customer.status,
                    customer.orders,
                    customer.spent,
                    customer.since,
                    customer.lastOrder
                ].join(",")
            );

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
        link.download = "customers.csv";

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

    updateCustomerStats();

    renderCustomers();

    console.log(
        "Customers page initialized."
    );
}

init();