// =========================
// PRODUCT DATA
// =========================

const products = [
    {
        id: 1,
        sku: "PRD-001",
        name: "Căști Wireless Pro",
        category: "Audio",
        price: 349,
        stock: 48,
        maxStock: 80,
        sales: 184,
        icon: "fa-solid fa-headphones"
    },
    {
        id: 2,
        sku: "PRD-002",
        name: "Smart Watch X",
        category: "Wearables",
        price: 429,
        stock: 32,
        maxStock: 60,
        sales: 142,
        icon: "fa-solid fa-clock"
    },
    {
        id: 3,
        sku: "PRD-003",
        name: "Tastatură Mecanică",
        category: "Gaming",
        price: 299,
        stock: 21,
        maxStock: 50,
        sales: 126,
        icon: "fa-solid fa-keyboard"
    },
    {
        id: 4,
        sku: "PRD-004",
        name: "Mouse Gaming",
        category: "Gaming",
        price: 189,
        stock: 9,
        maxStock: 50,
        sales: 108,
        icon: "fa-solid fa-computer-mouse"
    },
    {
        id: 5,
        sku: "PRD-005",
        name: "Boxă Bluetooth Mini",
        category: "Audio",
        price: 219,
        stock: 6,
        maxStock: 40,
        sales: 96,
        icon: "fa-solid fa-volume-high"
    },
    {
        id: 6,
        sku: "PRD-006",
        name: "Brățară Fitness",
        category: "Wearables",
        price: 179,
        stock: 27,
        maxStock: 50,
        sales: 87,
        icon: "fa-solid fa-heart-pulse"
    },
    {
        id: 7,
        sku: "PRD-007",
        name: "Mouse Pad XL",
        category: "Gaming",
        price: 89,
        stock: 64,
        maxStock: 80,
        sales: 82,
        icon: "fa-solid fa-gamepad"
    },
    {
        id: 8,
        sku: "PRD-008",
        name: "Hub USB-C 7 în 1",
        category: "Accesorii",
        price: 249,
        stock: 14,
        maxStock: 45,
        sales: 74,
        icon: "fa-solid fa-plug"
    },
    {
        id: 9,
        sku: "PRD-009",
        name: "Suport Laptop",
        category: "Accesorii",
        price: 159,
        stock: 4,
        maxStock: 35,
        sales: 69,
        icon: "fa-solid fa-laptop"
    },
    {
        id: 10,
        sku: "PRD-010",
        name: "Căști Gaming RGB",
        category: "Gaming",
        price: 279,
        stock: 0,
        maxStock: 40,
        sales: 63,
        icon: "fa-solid fa-headset"
    },
    {
        id: 11,
        sku: "PRD-011",
        name: "Încărcător Wireless",
        category: "Accesorii",
        price: 129,
        stock: 38,
        maxStock: 60,
        sales: 58,
        icon: "fa-solid fa-bolt"
    },
    {
        id: 12,
        sku: "PRD-012",
        name: "Smart Band Lite",
        category: "Wearables",
        price: 149,
        stock: 7,
        maxStock: 40,
        sales: 51,
        icon: "fa-solid fa-stopwatch"
    }
];


// =========================
// DOM
// =========================

const productsTableBody =
    document.querySelector("#productsTableBody");

const productSearch =
    document.querySelector("#productSearch");

const categoryFilter =
    document.querySelector("#categoryFilter");

const stockFilter =
    document.querySelector("#stockFilter");

const productSort =
    document.querySelector("#productSort");

const productsEmpty =
    document.querySelector("#productsEmpty");

const previousPage =
    document.querySelector("#productsPreviousPage");

const nextPage =
    document.querySelector("#productsNextPage");

const currentPageElement =
    document.querySelector("#productsCurrentPage");

const paginationInfo =
    document.querySelector("#productsPaginationInfo");

const exportProductsButton =
    document.querySelector("#exportProductsButton");

const productModal =
    document.querySelector("#productModal");

const productModalBackdrop =
    document.querySelector("#productModalBackdrop");

const closeProductModalButton =
    document.querySelector("#closeProductModal");

const themeButton =
    document.querySelector("#themeButton");

const sidebar =
    document.querySelector("#sidebar");

const sidebarOverlay =
    document.querySelector("#sidebarOverlay");

const mobileMenuButton =
    document.querySelector("#mobileMenuButton");


// =========================
// STATE
// =========================

const productsPerPage = 6;

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


function getProductStatus(product) {
    if (product.stock === 0) {
        return "Stoc epuizat";
    }

    if (product.stock <= 10) {
        return "Stoc redus";
    }

    return "În stoc";
}


function getStatusClass(status) {
    if (status === "În stoc") {
        return "in-stock";
    }

    if (status === "Stoc redus") {
        return "low-stock";
    }

    return "out-of-stock";
}


function getStockClass(product) {
    if (product.stock === 0) {
        return "out";
    }

    if (product.stock <= 10) {
        return "low";
    }

    return "";
}


function getStockPercentage(product) {
    if (product.maxStock <= 0) {
        return 0;
    }

    const percentage =
        (product.stock / product.maxStock) * 100;

    return Math.min(
        Math.max(percentage, 0),
        100
    );
}


// =========================
// KPI
// =========================

function updateProductStats() {
    const totalProducts =
        products.length;

    const activeProducts =
        products.filter(
            product => product.stock > 0
        ).length;

    const lowStockProducts =
        products.filter(
            product =>
                product.stock > 0 &&
                product.stock <= 10
        ).length;

    const inventoryValue =
        products.reduce(
            (total, product) =>
                total +
                product.price * product.stock,
            0
        );

    document.querySelector(
        "#productsTotal"
    ).textContent =
        totalProducts;

    document.querySelector(
        "#productsActive"
    ).textContent =
        activeProducts;

    document.querySelector(
        "#productsLowStock"
    ).textContent =
        lowStockProducts;

    document.querySelector(
        "#inventoryValue"
    ).textContent =
        formatCurrency(inventoryValue);
}


// =========================
// FILTER + SORT
// =========================

function getFilteredProducts() {
    const searchValue =
        productSearch.value
            .trim()
            .toLowerCase();

    const selectedCategory =
        categoryFilter.value;

    const selectedStock =
        stockFilter.value;

    let filtered =
        products.filter(product => {

            const status =
                getProductStatus(product);

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchValue) ||
                product.sku
                    .toLowerCase()
                    .includes(searchValue) ||
                product.category
                    .toLowerCase()
                    .includes(searchValue);

            const matchesCategory =
                selectedCategory === "all" ||
                product.category ===
                    selectedCategory;

            const matchesStock =
                selectedStock === "all" ||
                status === selectedStock;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesStock
            );
        });


    filtered = [...filtered];


    switch (productSort.value) {

        case "price-high":
            filtered.sort(
                (a, b) =>
                    b.price - a.price
            );
            break;


        case "price-low":
            filtered.sort(
                (a, b) =>
                    a.price - b.price
            );
            break;


        case "stock-high":
            filtered.sort(
                (a, b) =>
                    b.stock - a.stock
            );
            break;


        case "stock-low":
            filtered.sort(
                (a, b) =>
                    a.stock - b.stock
            );
            break;


        case "sales":
        default:
            filtered.sort(
                (a, b) =>
                    b.sales - a.sales
            );
    }


    return filtered;
}


// =========================
// RENDER PRODUCTS
// =========================

function renderProducts() {
    const filteredProducts =
        getFilteredProducts();

    const totalPages =
        Math.max(
            Math.ceil(
                filteredProducts.length /
                productsPerPage
            ),
            1
        );


    if (currentPage > totalPages) {
        currentPage = totalPages;
    }


    const startIndex =
        (currentPage - 1) *
        productsPerPage;

    const endIndex =
        startIndex +
        productsPerPage;


    const visibleProducts =
        filteredProducts.slice(
            startIndex,
            endIndex
        );


    productsTableBody.innerHTML =
        visibleProducts
            .map(product => {

                const status =
                    getProductStatus(product);

                const statusClass =
                    getStatusClass(status);

                const stockClass =
                    getStockClass(product);

                const stockPercentage =
                    getStockPercentage(product);


                return `
                    <tr>

                        <td>

                            <div class="product-cell">

                                <div class="product-icon">
                                    <i class="${product.icon}"></i>
                                </div>

                                <div class="product-info">

                                    <strong>
                                        ${product.name}
                                    </strong>

                                    <span>
                                        ${product.sku}
                                    </span>

                                </div>

                            </div>

                        </td>


                        <td>
                            <span class="product-category">
                                ${product.category}
                            </span>
                        </td>


                        <td>
                            <strong>
                                ${formatCurrency(product.price)}
                            </strong>
                        </td>


                        <td>

                            <div
                                class="
                                    product-stock
                                    ${stockClass}
                                "
                            >

                                <div class="product-stock__info">

                                    <strong>
                                        ${product.stock}
                                    </strong>

                                    <span>
                                        / ${product.maxStock}
                                    </span>

                                </div>


                                <div class="product-stock__bar">

                                    <div
                                        class="product-stock__progress"
                                        style="width: ${stockPercentage}%"
                                    ></div>

                                </div>

                            </div>

                        </td>


                        <td>
                            ${product.sales}
                        </td>


                        <td>

                            <span
                                class="
                                    product-status
                                    ${statusClass}
                                "
                            >
                                ${status}
                            </span>

                        </td>


                        <td>

                            <button
                                class="view-product-button"
                                type="button"
                                data-product-id="${product.id}"
                                aria-label="Vezi ${product.name}"
                            >
                                <i class="fa-solid fa-eye"></i>
                            </button>

                        </td>

                    </tr>
                `;
            })
            .join("");


    productsEmpty.hidden =
        filteredProducts.length !== 0;


    updatePagination(
        filteredProducts.length,
        totalPages,
        startIndex,
        endIndex
    );


    addProductEvents();
}


// =========================
// PAGINATION
// =========================

function updatePagination(
    totalProducts,
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


    if (totalProducts === 0) {
        paginationInfo.textContent =
            "0 produse";

        return;
    }


    const visibleEnd =
        Math.min(
            endIndex,
            totalProducts
        );


    paginationInfo.textContent =
        `${startIndex + 1}-${visibleEnd} din ${totalProducts} produse`;
}


previousPage.addEventListener(
    "click",
    () => {

        if (currentPage > 1) {
            currentPage--;

            renderProducts();
        }

    }
);


nextPage.addEventListener(
    "click",
    () => {

        const filteredProducts =
            getFilteredProducts();

        const totalPages =
            Math.ceil(
                filteredProducts.length /
                productsPerPage
            );


        if (currentPage < totalPages) {
            currentPage++;

            renderProducts();
        }

    }
);


// =========================
// FILTER EVENTS
// =========================

function resetAndRender() {
    currentPage = 1;

    renderProducts();
}


productSearch.addEventListener(
    "input",
    resetAndRender
);


categoryFilter.addEventListener(
    "change",
    resetAndRender
);


stockFilter.addEventListener(
    "change",
    resetAndRender
);


productSort.addEventListener(
    "change",
    resetAndRender
);


// =========================
// PRODUCT MODAL
// =========================

function openProductModal(productId) {

    const product =
        products.find(
            item =>
                item.id === productId
        );


    if (!product) {
        return;
    }


    const status =
        getProductStatus(product);


    const modalIcon =
        document.querySelector(
            "#modalProductIcon"
        );


    modalIcon.innerHTML =
        `<i class="${product.icon}"></i>`;


    document.querySelector(
        "#modalProductName"
    ).textContent =
        product.name;


    document.querySelector(
        "#modalProductCategory"
    ).textContent =
        product.category;


    document.querySelector(
        "#modalProductPrice"
    ).textContent =
        formatCurrency(product.price);


    document.querySelector(
        "#modalProductStock"
    ).textContent =
        `${product.stock} / ${product.maxStock}`;


    document.querySelector(
        "#modalProductSales"
    ).textContent =
        product.sales;


    document.querySelector(
        "#modalProductStatus"
    ).textContent =
        status;


    document.querySelector(
        "#modalProductRevenue"
    ).textContent =
        formatCurrency(
            product.price *
            product.sales
        );


    productModal.classList.add(
        "open"
    );


    productModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";
}


function closeProductModal() {

    productModal.classList.remove(
        "open"
    );


    productModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";
}


function addProductEvents() {

    document
        .querySelectorAll(
            ".view-product-button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const productId =
                        Number(
                            button.dataset.productId
                        );


                    openProductModal(
                        productId
                    );
                }
            );

        });
}


closeProductModalButton.addEventListener(
    "click",
    closeProductModal
);


productModalBackdrop.addEventListener(
    "click",
    closeProductModal
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            productModal.classList.contains(
                "open"
            )
        ) {
            closeProductModal();
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
        themeButton?.querySelector("i");


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


themeButton?.addEventListener(
    "click",
    () => {

        const currentTheme =
            document.body.classList.contains(
                "dark-theme"
            )
                ? "dark"
                : "light";


        const newTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";


        localStorage.setItem(
            "dashboardTheme",
            newTheme
        );


        applyTheme(
            newTheme
        );

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

        if (window.innerWidth > 768) {
            closeSidebar();
        }

    }
);


// =========================
// EXPORT CSV
// =========================

exportProductsButton?.addEventListener(
    "click",
    () => {

        const filteredProducts =
            getFilteredProducts();


        const header = [
            "SKU",
            "Produs",
            "Categorie",
            "Pret",
            "Stoc",
            "Stoc maxim",
            "Vanzari",
            "Status",
            "Venit generat"
        ];


        const rows =
            filteredProducts.map(
                product => [

                    product.sku,

                    product.name,

                    product.category,

                    product.price,

                    product.stock,

                    product.maxStock,

                    product.sales,

                    getProductStatus(
                        product
                    ),

                    product.price *
                    product.sales

                ]
            );


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
            "products.csv";


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
// INIT
// =========================

function init() {

    applyTheme(
        getSavedTheme()
    );


    updateProductStats();


    renderProducts();


    console.log(
        "Products page initialized."
    );
}


init();