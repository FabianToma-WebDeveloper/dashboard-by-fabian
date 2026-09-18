// =========================
// REPORTS DATA
// =========================

const reportsData = {
    7: {
        revenue: 12480,
        revenueChange: 8.4,

        orders: 184,
        ordersChange: 6.2,

        averageOrder: 67.83,
        averageChange: 2.1,

        refundRate: 1.8,
        refundChange: -0.3,

        chart: {
            labels: [
                "Lun",
                "Mar",
                "Mie",
                "Joi",
                "Vin",
                "Sâm",
                "Dum"
            ],

            revenue: [
                1420,
                1680,
                1540,
                1920,
                2180,
                2010,
                1730
            ],

            orders: [
                21,
                25,
                23,
                29,
                32,
                30,
                24
            ]
        },

        categories: {
            labels: [
                "Audio",
                "Gaming",
                "Wearables",
                "Accesorii"
            ],

            values: [
                38,
                29,
                21,
                12
            ]
        },

        payments: {
            labels: [
                "Card",
                "Ramburs",
                "Apple / Google Pay",
                "Transfer"
            ],

            values: [
                52,
                24,
                17,
                7
            ]
        },

        bestCategory: "Audio",
        bestCategoryInfo: "38% din venituri",

        bestProduct: "Căști Wireless Pro",
        bestProductInfo: "46 unități vândute",

        bestPaymentMethod: "Card",
        bestPaymentInfo: "52% din tranzacții"
    },


    30: {
        revenue: 48295,
        revenueChange: 12.5,

        orders: 1284,
        ordersChange: 8.2,

        averageOrder: 37.61,
        averageChange: 4.0,

        refundRate: 2.1,
        refundChange: -0.4,

        chart: {
            labels: [
                "Săpt. 1",
                "Săpt. 2",
                "Săpt. 3",
                "Săpt. 4"
            ],

            revenue: [
                10380,
                11740,
                12495,
                13680
            ],

            orders: [
                276,
                304,
                329,
                375
            ]
        },

        categories: {
            labels: [
                "Audio",
                "Gaming",
                "Wearables",
                "Accesorii"
            ],

            values: [
                35,
                31,
                20,
                14
            ]
        },

        payments: {
            labels: [
                "Card",
                "Ramburs",
                "Apple / Google Pay",
                "Transfer"
            ],

            values: [
                49,
                27,
                16,
                8
            ]
        },

        bestCategory: "Audio",
        bestCategoryInfo: "35% din venituri",

        bestProduct: "Căști Wireless Pro",
        bestProductInfo: "184 unități vândute",

        bestPaymentMethod: "Card",
        bestPaymentInfo: "49% din tranzacții"
    },


    90: {
        revenue: 138760,
        revenueChange: 18.7,

        orders: 3584,
        ordersChange: 14.3,

        averageOrder: 38.72,
        averageChange: 3.8,

        refundRate: 1.9,
        refundChange: -0.6,

        chart: {
            labels: [
                "Iul",
                "Aug",
                "Sep"
            ],

            revenue: [
                42150,
                46320,
                50290
            ],

            orders: [
                1080,
                1194,
                1310
            ]
        },

        categories: {
            labels: [
                "Audio",
                "Gaming",
                "Wearables",
                "Accesorii"
            ],

            values: [
                34,
                30,
                22,
                14
            ]
        },

        payments: {
            labels: [
                "Card",
                "Ramburs",
                "Apple / Google Pay",
                "Transfer"
            ],

            values: [
                51,
                25,
                17,
                7
            ]
        },

        bestCategory: "Audio",
        bestCategoryInfo: "34% din venituri",

        bestProduct: "Căști Wireless Pro",
        bestProductInfo: "498 unități vândute",

        bestPaymentMethod: "Card",
        bestPaymentInfo: "51% din tranzacții"
    },


    365: {
        revenue: 584320,
        revenueChange: 24.6,

        orders: 14892,
        ordersChange: 19.4,

        averageOrder: 39.24,
        averageChange: 4.4,

        refundRate: 1.7,
        refundChange: -0.8,

        chart: {
            labels: [
                "Oct",
                "Nov",
                "Dec",
                "Ian",
                "Feb",
                "Mar",
                "Apr",
                "Mai",
                "Iun",
                "Iul",
                "Aug",
                "Sep"
            ],

            revenue: [
                35120,
                38940,
                46780,
                41250,
                43980,
                45760,
                47120,
                48690,
                51240,
                54280,
                61640,
                69520
            ],

            orders: [
                890,
                978,
                1160,
                1050,
                1110,
                1168,
                1205,
                1240,
                1310,
                1390,
                1590,
                1801
            ]
        },

        categories: {
            labels: [
                "Audio",
                "Gaming",
                "Wearables",
                "Accesorii"
            ],

            values: [
                36,
                28,
                23,
                13
            ]
        },

        payments: {
            labels: [
                "Card",
                "Ramburs",
                "Apple / Google Pay",
                "Transfer"
            ],

            values: [
                53,
                23,
                17,
                7
            ]
        },

        bestCategory: "Audio",
        bestCategoryInfo: "36% din venituri",

        bestProduct: "Căști Wireless Pro",
        bestProductInfo: "2.184 unități vândute",

        bestPaymentMethod: "Card",
        bestPaymentInfo: "53% din tranzacții"
    }
};


// =========================
// MONTHLY DATA
// =========================

const monthlyPerformance = [
    {
        month: "Aprilie 2026",
        revenue: 47120,
        orders: 1205,
        customers: 2890,
        averageOrder: 39.10,
        growth: 3.0
    },
    {
        month: "Mai 2026",
        revenue: 48690,
        orders: 1240,
        customers: 3015,
        averageOrder: 39.27,
        growth: 3.3
    },
    {
        month: "Iunie 2026",
        revenue: 51240,
        orders: 1310,
        customers: 3198,
        averageOrder: 39.11,
        growth: 5.2
    },
    {
        month: "Iulie 2026",
        revenue: 54280,
        orders: 1390,
        customers: 3384,
        averageOrder: 39.05,
        growth: 5.9
    },
    {
        month: "August 2026",
        revenue: 61640,
        orders: 1590,
        customers: 3610,
        averageOrder: 38.77,
        growth: 13.6
    },
    {
        month: "Septembrie 2026",
        revenue: 69520,
        orders: 1801,
        customers: 3924,
        averageOrder: 38.60,
        growth: 12.8
    }
];


// =========================
// DOM
// =========================

const reportPeriod =
    document.querySelector("#reportPeriod");

const exportReportButton =
    document.querySelector("#exportReportButton");

const themeButton =
    document.querySelector("#themeButton");

const sidebar =
    document.querySelector("#sidebar");

const sidebarOverlay =
    document.querySelector("#sidebarOverlay");

const mobileMenuButton =
    document.querySelector("#mobileMenuButton");


// KPI

const reportRevenue =
    document.querySelector("#reportRevenue");

const reportRevenueChange =
    document.querySelector("#reportRevenueChange");

const reportOrders =
    document.querySelector("#reportOrders");

const reportOrdersChange =
    document.querySelector("#reportOrdersChange");

const reportAverageOrder =
    document.querySelector("#reportAverageOrder");

const reportAverageChange =
    document.querySelector("#reportAverageChange");

const reportRefundRate =
    document.querySelector("#reportRefundRate");

const reportRefundChange =
    document.querySelector("#reportRefundChange");


// INSIGHTS

const bestCategory =
    document.querySelector("#bestCategory");

const bestCategoryInfo =
    document.querySelector("#bestCategoryInfo");

const bestProduct =
    document.querySelector("#bestProduct");

const bestProductInfo =
    document.querySelector("#bestProductInfo");

const bestPaymentMethod =
    document.querySelector("#bestPaymentMethod");

const bestPaymentInfo =
    document.querySelector("#bestPaymentInfo");


// TABLE

const monthlyPerformanceBody =
    document.querySelector("#monthlyPerformanceBody");


// =========================
// CHART INSTANCES
// =========================

let revenueOrdersChart = null;

let categorySalesChart = null;

let paymentMethodsChart = null;


// =========================
// FORMATTERS
// =========================

function formatCurrency(value) {
    return new Intl.NumberFormat(
        "ro-RO",
        {
            style: "currency",
            currency: "RON",
            maximumFractionDigits: 0
        }
    ).format(value);
}


function formatCurrencyWithDecimals(value) {
    return new Intl.NumberFormat(
        "ro-RO",
        {
            style: "currency",
            currency: "RON",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    ).format(value);
}


function formatNumber(value) {
    return new Intl.NumberFormat(
        "ro-RO"
    ).format(value);
}


// =========================
// CHANGE BADGES
// =========================

function updateChangeBadge(
    element,
    value
) {
    const isNegative =
        value < 0;


    element.textContent =
        `${value > 0 ? "+" : ""}${value}%`;


    element.classList.toggle(
        "negative",
        isNegative
    );
}


// =========================
// KPI RENDER
// =========================

function renderKpis(data) {
    reportRevenue.textContent =
        formatCurrency(
            data.revenue
        );


    reportOrders.textContent =
        formatNumber(
            data.orders
        );


    reportAverageOrder.textContent =
        formatCurrencyWithDecimals(
            data.averageOrder
        );


    reportRefundRate.textContent =
        `${data.refundRate}%`;


    updateChangeBadge(
        reportRevenueChange,
        data.revenueChange
    );


    updateChangeBadge(
        reportOrdersChange,
        data.ordersChange
    );


    updateChangeBadge(
        reportAverageChange,
        data.averageChange
    );


    updateChangeBadge(
        reportRefundChange,
        data.refundChange
    );
}


// =========================
// INSIGHTS
// =========================

function renderInsights(data) {
    bestCategory.textContent =
        data.bestCategory;

    bestCategoryInfo.textContent =
        data.bestCategoryInfo;


    bestProduct.textContent =
        data.bestProduct;

    bestProductInfo.textContent =
        data.bestProductInfo;


    bestPaymentMethod.textContent =
        data.bestPaymentMethod;

    bestPaymentInfo.textContent =
        data.bestPaymentInfo;
}


// =========================
// CHART COLORS
// =========================

function getChartColors() {
    const isDark =
        document.body.classList.contains(
            "dark-theme"
        );


    return {
        text:
            isDark
                ? "#94a3b8"
                : "#64748b",

        grid:
            isDark
                ? "rgba(148, 163, 184, 0.10)"
                : "rgba(100, 116, 139, 0.10)",

        revenue:
            "#6366f1",

        revenueFill:
            isDark
                ? "rgba(99, 102, 241, 0.16)"
                : "rgba(99, 102, 241, 0.10)",

        orders:
            "#22c55e",

        categories: [
            "#6366f1",
            "#22c55e",
            "#f59e0b",
            "#ec4899"
        ],

        payments: [
            "#6366f1",
            "#0ea5e9",
            "#22c55e",
            "#f59e0b"
        ],

        tooltipBackground:
            isDark
                ? "#0f172a"
                : "#111827"
    };
}


// =========================
// CHART DEFAULTS
// =========================

function getBaseChartOptions() {
    const colors =
        getChartColors();


    return {
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
                backgroundColor:
                    colors.tooltipBackground,

                padding: 12,

                titleFont: {
                    size: 11
                },

                bodyFont: {
                    size: 10
                },

                cornerRadius: 8
            }
        },

        scales: {
            x: {
                grid: {
                    display: false
                },

                ticks: {
                    color: colors.text,
                    font: {
                        size: 10
                    }
                },

                border: {
                    display: false
                }
            },

            y: {
                beginAtZero: true,

                grid: {
                    color: colors.grid
                },

                ticks: {
                    color: colors.text,
                    font: {
                        size: 10
                    }
                },

                border: {
                    display: false
                }
            }
        }
    };
}


// =========================
// REVENUE + ORDERS CHART
// =========================

function renderRevenueOrdersChart(data) {
    const canvas =
        document.querySelector(
            "#revenueOrdersChart"
        );


    if (!canvas) {
        return;
    }


    if (revenueOrdersChart) {
        revenueOrdersChart.destroy();
    }


    const colors =
        getChartColors();


    const options =
        getBaseChartOptions();


    options.scales.y = {
        beginAtZero: true,

        position: "left",

        grid: {
            color: colors.grid
        },

        ticks: {
            color: colors.text,

            font: {
                size: 10
            },

            callback(value) {
                return `${value / 1000}k`;
            }
        },

        border: {
            display: false
        }
    };


    options.scales.yOrders = {
        beginAtZero: true,

        position: "right",

        grid: {
            drawOnChartArea: false
        },

        ticks: {
            color: colors.text,

            font: {
                size: 10
            }
        },

        border: {
            display: false
        }
    };


    options.plugins.tooltip.callbacks = {
        label(context) {

            if (
                context.dataset.yAxisID === "y"
            ) {
                return (
                    ` Venituri: ${
                        formatCurrency(
                            context.raw
                        )
                    }`
                );
            }


            return (
                ` Comenzi: ${
                    formatNumber(
                        context.raw
                    )
                }`
            );
        }
    };


    revenueOrdersChart =
        new Chart(
            canvas,
            {
                type: "line",

                data: {
                    labels:
                        data.chart.labels,

                    datasets: [
                        {
                            label:
                                "Venituri",

                            data:
                                data.chart.revenue,

                            borderColor:
                                colors.revenue,

                            backgroundColor:
                                colors.revenueFill,

                            borderWidth: 2,

                            fill: true,

                            tension: 0.4,

                            pointRadius: 3,

                            pointHoverRadius: 5,

                            yAxisID: "y"
                        },

                        {
                            label:
                                "Comenzi",

                            data:
                                data.chart.orders,

                            borderColor:
                                colors.orders,

                            backgroundColor:
                                colors.orders,

                            borderWidth: 2,

                            fill: false,

                            tension: 0.4,

                            pointRadius: 3,

                            pointHoverRadius: 5,

                            yAxisID: "yOrders"
                        }
                    ]
                },

                options
            }
        );
}


// =========================
// CATEGORY CHART
// =========================

function renderCategoryChart(data) {
    const canvas =
        document.querySelector(
            "#categorySalesChart"
        );


    if (!canvas) {
        return;
    }


    if (categorySalesChart) {
        categorySalesChart.destroy();
    }


    const colors =
        getChartColors();


    categorySalesChart =
        new Chart(
            canvas,
            {
                type: "doughnut",

                data: {
                    labels:
                        data.categories.labels,

                    datasets: [
                        {
                            data:
                                data.categories.values,

                            backgroundColor:
                                colors.categories,

                            borderWidth: 0,

                            hoverOffset: 5
                        }
                    ]
                },

                options: {
                    responsive: true,

                    maintainAspectRatio: false,

                    cutout: "68%",

                    plugins: {
                        legend: {
                            position: "bottom",

                            labels: {
                                color: colors.text,

                                usePointStyle: true,

                                pointStyle: "circle",

                                padding: 18,

                                font: {
                                    size: 10
                                }
                            }
                        },

                        tooltip: {
                            backgroundColor:
                                colors.tooltipBackground,

                            padding: 12,

                            callbacks: {
                                label(context) {
                                    return (
                                        ` ${context.label}: ` +
                                        `${context.raw}%`
                                    );
                                }
                            }
                        }
                    }
                }
            }
        );
}


// =========================
// PAYMENT CHART
// =========================

function renderPaymentChart(data) {
    const canvas =
        document.querySelector(
            "#paymentMethodsChart"
        );


    if (!canvas) {
        return;
    }


    if (paymentMethodsChart) {
        paymentMethodsChart.destroy();
    }


    const colors =
        getChartColors();


    paymentMethodsChart =
        new Chart(
            canvas,
            {
                type: "bar",

                data: {
                    labels:
                        data.payments.labels,

                    datasets: [
                        {
                            label:
                                "Procent tranzacții",

                            data:
                                data.payments.values,

                            backgroundColor:
                                colors.payments,

                            borderRadius: 7,

                            borderSkipped: false,

                            barThickness: 28
                        }
                    ]
                },

                options: {
                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {
                        legend: {
                            display: false
                        },

                        tooltip: {
                            backgroundColor:
                                colors.tooltipBackground,

                            padding: 12,

                            callbacks: {
                                label(context) {
                                    return (
                                        ` ${context.raw}% ` +
                                        "din tranzacții"
                                    );
                                }
                            }
                        }
                    },

                    scales: {
                        x: {
                            grid: {
                                display: false
                            },

                            ticks: {
                                color: colors.text,

                                font: {
                                    size: 9
                                }
                            },

                            border: {
                                display: false
                            }
                        },

                        y: {
                            beginAtZero: true,

                            suggestedMax: 60,

                            grid: {
                                color: colors.grid
                            },

                            ticks: {
                                color: colors.text,

                                font: {
                                    size: 10
                                },

                                callback(value) {
                                    return `${value}%`;
                                }
                            },

                            border: {
                                display: false
                            }
                        }
                    }
                }
            }
        );
}


// =========================
// ALL CHARTS
// =========================

function renderCharts(data) {
    renderRevenueOrdersChart(
        data
    );

    renderCategoryChart(
        data
    );

    renderPaymentChart(
        data
    );
}


// =========================
// MONTHLY TABLE
// =========================

function renderMonthlyPerformance() {
    monthlyPerformanceBody.innerHTML =
        monthlyPerformance
            .map(item => {

                const growthClass =
                    item.growth < 0
                        ? "negative"
                        : "";


                const growthIcon =
                    item.growth < 0
                        ? "fa-arrow-down"
                        : "fa-arrow-up";


                const growthPrefix =
                    item.growth > 0
                        ? "+"
                        : "";


                return `
                    <tr>

                        <td>
                            <strong>
                                ${item.month}
                            </strong>
                        </td>


                        <td>
                            ${formatCurrency(
                                item.revenue
                            )}
                        </td>


                        <td>
                            ${formatNumber(
                                item.orders
                            )}
                        </td>


                        <td>
                            ${formatNumber(
                                item.customers
                            )}
                        </td>


                        <td>
                            ${formatCurrencyWithDecimals(
                                item.averageOrder
                            )}
                        </td>


                        <td>

                            <span
                                class="
                                    monthly-growth
                                    ${growthClass}
                                "
                            >

                                <i
                                    class="
                                        fa-solid
                                        ${growthIcon}
                                    "
                                ></i>

                                ${growthPrefix}${item.growth}%

                            </span>

                        </td>

                    </tr>
                `;
            })
            .join("");
}


// =========================
// REPORT RENDER
// =========================

function renderReport() {
    const selectedPeriod =
        reportPeriod.value;


    const data =
        reportsData[
            selectedPeriod
        ];


    if (!data) {
        return;
    }


    renderKpis(
        data
    );


    renderInsights(
        data
    );


    renderCharts(
        data
    );
}


// =========================
// PERIOD CHANGE
// =========================

reportPeriod.addEventListener(
    "change",
    renderReport
);


// =========================
// CSV EXPORT
// =========================

exportReportButton.addEventListener(
    "click",
    () => {

        const selectedPeriod =
            reportPeriod.value;


        const data =
            reportsData[
                selectedPeriod
            ];


        const header = [
            "Indicator",
            "Valoare"
        ];


        const rows = [
            [
                "Perioada",
                `${selectedPeriod} zile`
            ],

            [
                "Venit total",
                `${data.revenue} RON`
            ],

            [
                "Schimbare venit",
                `${data.revenueChange}%`
            ],

            [
                "Comenzi",
                data.orders
            ],

            [
                "Schimbare comenzi",
                `${data.ordersChange}%`
            ],

            [
                "Valoare medie comandă",
                `${data.averageOrder} RON`
            ],

            [
                "Rată rambursări",
                `${data.refundRate}%`
            ],

            [
                "Cea mai bună categorie",
                data.bestCategory
            ],

            [
                "Cel mai vândut produs",
                data.bestProduct
            ],

            [
                "Metoda preferată",
                data.bestPaymentMethod
            ]
        ];


        const csvRows =
            [
                header,
                ...rows
            ].map(row =>
                row
                    .map(value =>
                        `"${String(value)
                            .replaceAll(
                                '"',
                                '""'
                            )}"`
                    )
                    .join(",")
            );


        const csv =
            "\uFEFF" +
            csvRows.join("\n");


        const blob =
            new Blob(
                [csv],
                {
                    type:
                        "text/csv;charset=utf-8;"
                }
            );


        const url =
            URL.createObjectURL(
                blob
            );


        const link =
            document.createElement(
                "a"
            );


        link.href =
            url;


        link.download =
            `raport-${selectedPeriod}-zile.csv`;


        document.body.appendChild(
            link
        );


        link.click();

        link.remove();


        URL.revokeObjectURL(
            url
        );
    }
);


// =========================
// THEME
// =========================

function getSavedTheme() {
    return (
        localStorage.getItem(
            "dashboardTheme"
        ) || "light"
    );
}


function applyTheme(theme) {
    document.body.classList.toggle(
        "dark-theme",
        theme === "dark"
    );


    const icon =
        themeButton?.querySelector(
            "i"
        );


    if (icon) {
        icon.className =
            theme === "dark"
                ? "fa-regular fa-sun"
                : "fa-regular fa-moon";
    }
}


// THEME BUTTON

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


        localStorage.setItem(
            "dashboardTheme",
            newTheme
        );


        applyTheme(
            newTheme
        );


        /*
            Re-render charts so labels,
            grid lines and tooltips also
            change between light/dark.
        */

        renderReport();
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

function initReportsPage() {
    applyTheme(
        getSavedTheme()
    );


    renderMonthlyPerformance();


    renderReport();
}


initReportsPage();