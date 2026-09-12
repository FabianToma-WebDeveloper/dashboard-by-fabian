// =========================
// DATE DEMO
// =========================

const dashboardData = {
    7: {
        revenue: 12480,
        revenueChange: 8.4,
        orders: 184,
        ordersChange: 6.2,
        customers: 126,
        customersChange: 4.8,
        conversion: 3.8,
        conversionChange: 0.6
    },

    30: {
        revenue: 48295,
        revenueChange: 12.5,
        orders: 1284,
        ordersChange: 8.2,
        customers: 3642,
        customersChange: 5.7,
        conversion: 4.82,
        conversionChange: -1.4
    },

    90: {
        revenue: 138760,
        revenueChange: 18.7,
        orders: 3584,
        ordersChange: 14.3,
        customers: 7290,
        customersChange: 11.6,
        conversion: 5.14,
        conversionChange: 1.8
    },

    365: {
        revenue: 584320,
        revenueChange: 24.6,
        orders: 14892,
        ordersChange: 19.4,
        customers: 18420,
        customersChange: 16.8,
        conversion: 5.62,
        conversionChange: 2.3
    }
};


// =========================
// COMENZI RECENTE
// =========================

const recentOrders = [
    {
        id: "#PB-1048",
        customer: "Alex Popescu",
        date: "12 Sep 2026",
        amount: 249,
        status: "Finalizată"
    },
    {
        id: "#PB-1047",
        customer: "Maria Ionescu",
        date: "12 Sep 2026",
        amount: 329,
        status: "În procesare"
    },
    {
        id: "#PB-1046",
        customer: "Andrei Matei",
        date: "11 Sep 2026",
        amount: 159,
        status: "Finalizată"
    },
    {
        id: "#PB-1045",
        customer: "Elena Radu",
        date: "11 Sep 2026",
        amount: 89,
        status: "În așteptare"
    }
];


// =========================
// PRODUSE DE TOP
// =========================

const topProducts = [
    {
        name: "Căști Wireless Pro",
        sales: 184,
        revenue: 12480,
        icon: "fa-headphones"
    },
    {
        name: "Smart Watch X",
        sales: 142,
        revenue: 9860,
        icon: "fa-clock"
    },
    {
        name: "Tastatură Mecanică",
        sales: 126,
        revenue: 7640,
        icon: "fa-keyboard"
    },
    {
        name: "Mouse Gaming",
        sales: 108,
        revenue: 5420,
        icon: "fa-computer-mouse"
    }
];


// =========================
// ELEMENTE DIN DOM
// =========================

const totalRevenue = document.querySelector("#totalRevenue");
const totalOrders = document.querySelector("#totalOrders");
const totalCustomers = document.querySelector("#totalCustomers");
const conversionRate = document.querySelector("#conversionRate");

const revenueChange = document.querySelector("#revenueChange");
const ordersChange = document.querySelector("#ordersChange");
const customersChange = document.querySelector("#customersChange");
const conversionChange = document.querySelector("#conversionChange");

const periodFilter = document.querySelector("#periodFilter");
const recentOrdersContainer = document.querySelector("#recentOrders");
const topProductsContainer = document.querySelector("#topProducts");

const mobileMenuButton = document.querySelector("#mobileMenuButton");
const sidebar = document.querySelector("#sidebar");


// =========================
// FORMATARE MONEDĂ
// =========================

function formatCurrency(value) {
    return new Intl.NumberFormat("ro-RO", {
        style: "currency",
        currency: "RON",
        maximumFractionDigits: 0
    }).format(value);
}


// =========================
// SCHIMBARE PROCENT
// =========================

function updateChange(element, value) {
    if (!element) return;

    const isPositive = value >= 0;

    element.textContent =
        `${isPositive ? "↑" : "↓"} ${Math.abs(value)}%`;

    element.classList.remove("positive", "negative");

    element.classList.add(
        isPositive ? "positive" : "negative"
    );
}


// =========================
// ACTUALIZARE KPI
// =========================

function updateDashboard(period = 30) {
    const data = dashboardData[period];

    if (!data) return;

    totalRevenue.textContent = formatCurrency(data.revenue);

    totalOrders.textContent =
        data.orders.toLocaleString("ro-RO");

    totalCustomers.textContent =
        data.customers.toLocaleString("ro-RO");

    conversionRate.textContent =
        `${data.conversion}%`;

    updateChange(revenueChange, data.revenueChange);
    updateChange(ordersChange, data.ordersChange);
    updateChange(customersChange, data.customersChange);
    updateChange(conversionChange, data.conversionChange);
}


// =========================
// AFIȘARE COMENZI
// =========================

function renderRecentOrders() {
    if (!recentOrdersContainer) return;

    recentOrdersContainer.innerHTML = recentOrders
        .map(order => {
            return `
                <tr>
                    <td>
                        <strong>${order.id}</strong>
                    </td>

                    <td>
                        ${order.customer}
                    </td>

                    <td>
                        ${order.date}
                    </td>

                    <td>
                        <strong>
                            ${formatCurrency(order.amount)}
                        </strong>
                    </td>

                    <td>
                        <span class="order-status">
                            ${order.status}
                        </span>
                    </td>
                </tr>
            `;
        })
        .join("");
}


// =========================
// AFIȘARE PRODUSE
// =========================

function renderTopProducts() {
    if (!topProductsContainer) return;

    topProductsContainer.innerHTML = topProducts
        .map(product => {
            return `
                <div class="product-item">

                    <div class="product-item__icon">
                        <i class="fa-solid ${product.icon}"></i>
                    </div>

                    <div class="product-item__info">
                        <strong>${product.name}</strong>

                        <span>
                            ${product.sales} vânzări
                        </span>
                    </div>

                    <strong class="product-item__revenue">
                        ${formatCurrency(product.revenue)}
                    </strong>

                </div>
            `;
        })
        .join("");
}


// =========================
// FILTRU PERIOADĂ
// =========================

periodFilter?.addEventListener("change", event => {
    const selectedPeriod = Number(event.target.value);

    updateDashboard(selectedPeriod);
});


// =========================
// MENIU MOBIL
// =========================

mobileMenuButton?.addEventListener("click", () => {
    sidebar?.classList.toggle("open");
});


// =========================
// PORNIRE APLICAȚIE
// =========================

function init() {
    updateDashboard(30);
    renderRecentOrders();
    renderTopProducts();

    console.log("E-Commerce Analytics Dashboard a fost inițializat.");
}

init();