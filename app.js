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
// COMENZI
// =========================

const recentOrders = [
    {
        id: "#EC-1048",
        customer: "Alex Popescu",
        date: "12 Sep 2026",
        amount: 249,
        status: "Finalizată"
    },
    {
        id: "#EC-1047",
        customer: "Maria Ionescu",
        date: "12 Sep 2026",
        amount: 329,
        status: "În procesare"
    },
    {
        id: "#EC-1046",
        customer: "Andrei Matei",
        date: "11 Sep 2026",
        amount: 159,
        status: "Finalizată"
    },
    {
        id: "#EC-1045",
        customer: "Elena Radu",
        date: "11 Sep 2026",
        amount: 89,
        status: "În așteptare"
    }
];


// =========================
// PRODUSE
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
// SELECTĂRI DOM
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

const themeButton = document.querySelector("#themeButton");
const exportButton = document.querySelector("#exportButton");

const searchInput = document.querySelector(".search input");


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


// =========================
// SCHIMBĂRI PROCENTUALE
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
// RANDARE COMENZI
// =========================

function renderRecentOrders(orders = recentOrders) {
    if (!recentOrdersContainer) return;

    recentOrdersContainer.innerHTML = orders
        .map(order => {
            const statusClass = getStatusClass(order.status);

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
                        <strong>${formatCurrency(order.amount)}</strong>
                    </td>

                    <td>
                        <span class="order-status ${statusClass}">
                            ${order.status}
                        </span>
                    </td>
                </tr>
            `;
        })
        .join("");
}


// =========================
// CLASĂ STATUS
// =========================

function getStatusClass(status) {
    if (status === "Finalizată") {
        return "completed";
    }

    if (status === "În procesare") {
        return "processing";
    }

    return "pending";
}


// =========================
// RANDARE PRODUSE
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
    createRevenueChart(selectedPeriod);
    createCategoryChart(selectedPeriod);
});

// =========================
// SIDEBAR MOBIL
// =========================

const sidebarOverlay =
    document.querySelector("#sidebarOverlay");

const sidebarLinks =
    document.querySelectorAll(".sidebar__link");

function openSidebar() {
    if (!sidebar || !sidebarOverlay) return;

    sidebar.classList.add("open");
    sidebarOverlay.classList.add("active");
    document.body.classList.add("sidebar-open");
}

function closeSidebar() {
    if (!sidebar || !sidebarOverlay) return;

    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("active");
    document.body.classList.remove("sidebar-open");
}

mobileMenuButton?.addEventListener("click", event => {
    event.stopPropagation();

    if (sidebar?.classList.contains("open")) {
        closeSidebar();
    } else {
        openSidebar();
    }
});

sidebarOverlay?.addEventListener("click", () => {
    closeSidebar();
});

sidebarLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            closeSidebar();
        }
    });
});

document.addEventListener("keydown", event => {
    if (
        event.key === "Escape" &&
        sidebar?.classList.contains("open")
    ) {
        closeSidebar();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        closeSidebar();
    }
});

// =========================
// DARK MODE
// =========================

function applyTheme(theme) {
    document.body.classList.toggle(
        "dark-theme",
        theme === "dark"
    );

    updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
    if (!themeButton) return;

    const icon = themeButton.querySelector("i");

    if (!icon) return;

    if (theme === "dark") {
        icon.className = "fa-regular fa-sun";
    } else {
        icon.className = "fa-regular fa-moon";
    }
}

function getSavedTheme() {
    return localStorage.getItem("dashboardTheme") || "light";
}

themeButton?.addEventListener("click", () => {
    const isDark =
        document.body.classList.contains("dark-theme");

    const newTheme = isDark ? "light" : "dark";

    localStorage.setItem("dashboardTheme", newTheme);

    applyTheme(newTheme);
});

// =========================
// SEARCH
// =========================

searchInput?.addEventListener("input", event => {
    const searchValue =
        event.target.value
            .toLowerCase()
            .trim();

    const filteredOrders = recentOrders.filter(order => {
        return (
            order.id.toLowerCase().includes(searchValue) ||
            order.customer.toLowerCase().includes(searchValue) ||
            order.status.toLowerCase().includes(searchValue)
        );
    });

    renderRecentOrders(filteredOrders);
});


// =========================
// EXPORT
// =========================

exportButton?.addEventListener("click", () => {
    const selectedPeriod =
        Number(periodFilter?.value || 30);

    const data = dashboardData[selectedPeriod];

    const report = `
E-COMMERCE ANALYTICS DASHBOARD

Perioadă: ${selectedPeriod} zile

Venit total:
${formatCurrency(data.revenue)}

Comenzi:
${data.orders}

Clienți:
${data.customers}

Rată de conversie:
${data.conversion}%
    `;

    const blob = new Blob(
        [report],
        { type: "text/plain;charset=utf-8" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "ecommerce-report.txt";

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);
});


// =========================
// OBIECTIV LUNAR
// =========================

function updateMonthlyGoal() {
    const currentRevenue = dashboardData[30].revenue;
    const monthlyGoal = 60000;

    const percentage = Math.min(
        (currentRevenue / monthlyGoal) * 100,
        100
    );

    const remaining = Math.max(
        monthlyGoal - currentRevenue,
        0
    );

    const currentElement =
        document.querySelector("#monthlyGoalCurrent");

    const progressBar =
        document.querySelector("#monthlyGoalBar");

    const percentageElement =
        document.querySelector("#monthlyGoalPercent");

    const remainingElement =
        document.querySelector("#monthlyGoalRemaining");

    if (currentElement) {
        currentElement.textContent =
            formatCurrency(currentRevenue);
    }

    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
    }

    if (percentageElement) {
        percentageElement.textContent =
            `${Math.round(percentage)}% realizat`;
    }

    if (remainingElement) {
        remainingElement.textContent =
            `${formatCurrency(remaining)} rămași`;
    }
}

// =========================
// DATE GRAFICE
// =========================

const chartData = {
    7: {
        revenueLabels: ["Lun", "Mar", "Mie", "Joi", "Vin", "Sâm", "Dum"],
        revenueValues: [1450, 1720, 1380, 1960, 2240, 1810, 1920],

        categories: [
            "Electronice",
            "Accesorii",
            "Gaming",
            "Smart Home"
        ],

        categoryValues: [42, 28, 18, 12]
    },

    30: {
        revenueLabels: [
            "Săpt. 1",
            "Săpt. 2",
            "Săpt. 3",
            "Săpt. 4"
        ],

        revenueValues: [
            10840,
            11720,
            12360,
            13375
        ],

        categories: [
            "Electronice",
            "Accesorii",
            "Gaming",
            "Smart Home"
        ],

        categoryValues: [46, 24, 19, 11]
    },

    90: {
        revenueLabels: [
            "Luna 1",
            "Luna 2",
            "Luna 3"
        ],

        revenueValues: [
            42100,
            45860,
            50800
        ],

        categories: [
            "Electronice",
            "Accesorii",
            "Gaming",
            "Smart Home"
        ],

        categoryValues: [44, 26, 20, 10]
    },

    365: {
        revenueLabels: [
            "Ian",
            "Feb",
            "Mar",
            "Apr",
            "Mai",
            "Iun",
            "Iul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ],

        revenueValues: [
            38200,
            41750,
            44600,
            46900,
            48150,
            50200,
            53300,
            49600,
            52120,
            55900,
            59600,
            63900
        ],

        categories: [
            "Electronice",
            "Accesorii",
            "Gaming",
            "Smart Home"
        ],

        categoryValues: [48, 23, 18, 11]
    }
};


// =========================
// INSTANȚE GRAFICE
// =========================

let revenueChartInstance = null;
let categoryChartInstance = null;


// =========================
// GRAFIC VENITURI
// =========================

function createRevenueChart(period = 30) {
    const canvas = document.querySelector("#revenueChart");

    if (!canvas) return;

    const data = chartData[period];

    if (!data) return;

    if (revenueChartInstance) {
        revenueChartInstance.destroy();
    }

    revenueChartInstance = new Chart(canvas, {
        type: "line",

        data: {
            labels: data.revenueLabels,

            datasets: [
                {
                    label: "Venituri",
                    data: data.revenueValues,

                    borderColor: "#2563eb",
                    backgroundColor: "rgba(37, 99, 235, 0.12)",

                    borderWidth: 3,

                    fill: true,

                    tension: 0.4,

                    pointRadius: 4,
                    pointHoverRadius: 6
                }
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            interaction: {
                intersect: false,
                mode: "index"
            },

            plugins: {
                legend: {
                    display: false
                },

                tooltip: {
                    callbacks: {
                        label(context) {
                            return formatCurrency(context.raw);
                        }
                    }
                }
            },

            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },

                y: {
                    beginAtZero: true,

                    ticks: {
                        callback(value) {
                            return `${value / 1000}k`;
                        }
                    }
                }
            }
        }
    });
}


// =========================
// GRAFIC CATEGORII
// =========================

function createCategoryChart(period = 30) {
    const canvas = document.querySelector("#categoryChart");

    if (!canvas) return;

    const data = chartData[period];

    if (!data) return;

    if (categoryChartInstance) {
        categoryChartInstance.destroy();
    }

    categoryChartInstance = new Chart(canvas, {
        type: "doughnut",

        data: {
            labels: data.categories,

            datasets: [
                {
                    data: data.categoryValues,

                    backgroundColor: [
                        "#2563eb",
                        "#7c3aed",
                        "#14b8a6",
                        "#f59e0b"
                    ],

                    borderWidth: 0
                }
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            cutout: "72%",

            plugins: {
                legend: {
                    display: false
                },

                tooltip: {
                    callbacks: {
                        label(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });

    renderCategoryLegend(data);
}


// =========================
// LEGENDĂ CATEGORII
// =========================

function renderCategoryLegend(data) {
    const legend =
        document.querySelector("#categoryLegend");

    if (!legend) return;

    const colors = [
        "#2563eb",
        "#7c3aed",
        "#14b8a6",
        "#f59e0b"
    ];

    legend.innerHTML = data.categories
        .map((category, index) => {
            return `
                <div class="category-legend__item">

                    <div class="category-legend__label">

                        <span
                            class="category-legend__dot"
                            style="background: ${colors[index]}"
                        ></span>

                        <span>
                            ${category}
                        </span>

                    </div>

                    <strong>
                        ${data.categoryValues[index]}%
                    </strong>

                </div>
            `;
        })
        .join("");
}

// =========================
// PORNIRE APLICAȚIE
// =========================

function init() {
    const savedTheme = getSavedTheme();

    applyTheme(savedTheme);

    updateDashboard(30);
    renderRecentOrders();
    renderTopProducts();

    createRevenueChart(30);
    createCategoryChart(30);

    updateMonthlyGoal();

    console.log(
        "E-Commerce Analytics Dashboard a fost inițializat."
    );
}

init();