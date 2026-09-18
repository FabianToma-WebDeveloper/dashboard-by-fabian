// =========================
// TEAM DATA
// =========================

const teamMembers = [
    {
        id: 1,
        name: "Fabian Toma",
        email: "fabian@ecommerce.ro",
        role: "Frontend Developer / Administrator",
        status: "Online",
        activeTasks: 6,
        completedTasks: 48,
        completion: 94,
        since: "2025-04-12",
        activity: "Acum 2 minute",
        activityScore: 100
    },
    {
        id: 2,
        name: "Alex Popescu",
        email: "alex.popescu@ecommerce.ro",
        role: "Frontend Developer",
        status: "Online",
        activeTasks: 5,
        completedTasks: 42,
        completion: 91,
        since: "2025-07-18",
        activity: "Acum 8 minute",
        activityScore: 95
    },
    {
        id: 3,
        name: "Maria Ionescu",
        email: "maria.ionescu@ecommerce.ro",
        role: "UI/UX Designer",
        status: "Ocupat",
        activeTasks: 7,
        completedTasks: 39,
        completion: 88,
        since: "2025-08-03",
        activity: "Acum 15 minute",
        activityScore: 90
    },
    {
        id: 4,
        name: "Andrei Matei",
        email: "andrei.matei@ecommerce.ro",
        role: "Marketing",
        status: "Online",
        activeTasks: 4,
        completedTasks: 35,
        completion: 86,
        since: "2025-09-21",
        activity: "Acum 24 minute",
        activityScore: 84
    },
    {
        id: 5,
        name: "Elena Radu",
        email: "elena.radu@ecommerce.ro",
        role: "Customer Support",
        status: "Offline",
        activeTasks: 3,
        completedTasks: 51,
        completion: 96,
        since: "2025-06-14",
        activity: "Acum 3 ore",
        activityScore: 55
    },
    {
        id: 6,
        name: "Ioana Marinescu",
        email: "ioana.marinescu@ecommerce.ro",
        role: "UI/UX Designer",
        status: "Online",
        activeTasks: 5,
        completedTasks: 37,
        completion: 90,
        since: "2025-10-08",
        activity: "Acum 31 minute",
        activityScore: 80
    },
    {
        id: 7,
        name: "Robert Dumitru",
        email: "robert.dumitru@ecommerce.ro",
        role: "Frontend Developer",
        status: "Ocupat",
        activeTasks: 8,
        completedTasks: 44,
        completion: 89,
        since: "2025-05-26",
        activity: "Acum 45 minute",
        activityScore: 75
    },
    {
        id: 8,
        name: "Diana Pavel",
        email: "diana.pavel@ecommerce.ro",
        role: "Marketing",
        status: "Offline",
        activeTasks: 2,
        completedTasks: 29,
        completion: 83,
        since: "2026-01-17",
        activity: "Ieri",
        activityScore: 35
    },
    {
        id: 9,
        name: "Cristian Ene",
        email: "cristian.ene@ecommerce.ro",
        role: "Customer Support",
        status: "Online",
        activeTasks: 6,
        completedTasks: 46,
        completion: 92,
        since: "2025-11-02",
        activity: "Acum 12 minute",
        activityScore: 92
    }
];


// =========================
// DOM
// =========================

const teamGrid =
    document.querySelector("#teamGrid");

const teamEmpty =
    document.querySelector("#teamEmpty");

const teamSearch =
    document.querySelector("#teamSearch");

const teamRoleFilter =
    document.querySelector("#teamRoleFilter");

const teamStatusFilter =
    document.querySelector("#teamStatusFilter");

const teamSort =
    document.querySelector("#teamSort");

const teamPreviousPage =
    document.querySelector("#teamPreviousPage");

const teamNextPage =
    document.querySelector("#teamNextPage");

const teamCurrentPage =
    document.querySelector("#teamCurrentPage");

const teamPaginationInfo =
    document.querySelector("#teamPaginationInfo");

const exportTeamButton =
    document.querySelector("#exportTeamButton");

const teamModal =
    document.querySelector("#teamModal");

const teamModalBackdrop =
    document.querySelector("#teamModalBackdrop");

const closeTeamModalButton =
    document.querySelector("#closeTeamModal");

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

const membersPerPage = 6;

let currentPage = 1;


// =========================
// HELPERS
// =========================

function getInitials(name) {
    return name
        .split(" ")
        .map(word => word.charAt(0))
        .slice(0, 2)
        .join("")
        .toUpperCase();
}


function getStatusClass(status) {
    switch (status) {
        case "Online":
            return "online";

        case "Ocupat":
            return "busy";

        default:
            return "offline";
    }
}


function formatDate(date) {
    return new Intl.DateTimeFormat(
        "ro-RO",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    ).format(
        new Date(`${date}T00:00:00`)
    );
}


// =========================
// KPI
// =========================

function updateTeamStats() {
    const totalMembers =
        teamMembers.length;

    const onlineMembers =
        teamMembers.filter(
            member =>
                member.status === "Online"
        ).length;

    const activeTasks =
        teamMembers.reduce(
            (total, member) =>
                total + member.activeTasks,
            0
        );

    const averageCompletion =
        Math.round(
            teamMembers.reduce(
                (total, member) =>
                    total + member.completion,
                0
            ) / teamMembers.length
        );


    document.querySelector(
        "#teamTotal"
    ).textContent =
        totalMembers;


    document.querySelector(
        "#teamOnline"
    ).textContent =
        onlineMembers;


    document.querySelector(
        "#teamTasks"
    ).textContent =
        activeTasks;


    document.querySelector(
        "#teamCompletion"
    ).textContent =
        `${averageCompletion}%`;
}


// =========================
// FILTER + SORT
// =========================

function getFilteredMembers() {
    const searchValue =
        teamSearch.value
            .trim()
            .toLowerCase();

    const selectedRole =
        teamRoleFilter.value;

    const selectedStatus =
        teamStatusFilter.value;


    let filteredMembers =
        teamMembers.filter(member => {

            const matchesSearch =
                member.name
                    .toLowerCase()
                    .includes(searchValue) ||

                member.email
                    .toLowerCase()
                    .includes(searchValue) ||

                member.role
                    .toLowerCase()
                    .includes(searchValue);


            const matchesRole =
                selectedRole === "all" ||
                member.role === selectedRole;


            const matchesStatus =
                selectedStatus === "all" ||
                member.status === selectedStatus;


            return (
                matchesSearch &&
                matchesRole &&
                matchesStatus
            );
        });


    filteredMembers =
        [...filteredMembers];


    switch (teamSort.value) {

        case "tasks-high":

            filteredMembers.sort(
                (a, b) =>
                    b.activeTasks -
                    a.activeTasks
            );

            break;


        case "completion-high":

            filteredMembers.sort(
                (a, b) =>
                    b.completion -
                    a.completion
            );

            break;


        case "name":

            filteredMembers.sort(
                (a, b) =>
                    a.name.localeCompare(
                        b.name,
                        "ro"
                    )
            );

            break;


        case "activity":
        default:

            filteredMembers.sort(
                (a, b) =>
                    b.activityScore -
                    a.activityScore
            );
    }


    return filteredMembers;
}


// =========================
// RENDER
// =========================

function renderTeam() {
    const filteredMembers =
        getFilteredMembers();


    const totalPages =
        Math.max(
            Math.ceil(
                filteredMembers.length /
                membersPerPage
            ),
            1
        );


    if (currentPage > totalPages) {
        currentPage = totalPages;
    }


    const startIndex =
        (currentPage - 1) *
        membersPerPage;


    const endIndex =
        startIndex +
        membersPerPage;


    const visibleMembers =
        filteredMembers.slice(
            startIndex,
            endIndex
        );


    teamGrid.innerHTML =
        visibleMembers
            .map(member => {

                const statusClass =
                    getStatusClass(
                        member.status
                    );


                return `
                    <article class="team-member">

                        <div class="team-member__top">

                            <div class="team-member__profile">

                                <div class="team-member__avatar">

                                    ${getInitials(member.name)}

                                    <span
                                        class="
                                            team-member__presence
                                            ${statusClass}
                                        "
                                    ></span>

                                </div>


                                <div class="team-member__identity">

                                    <strong>
                                        ${member.name}
                                    </strong>

                                    <span>
                                        ${member.role}
                                    </span>

                                </div>

                            </div>


                            <button
                                class="team-member__view"
                                type="button"
                                data-member-id="${member.id}"
                                aria-label="Vezi ${member.name}"
                            >
                                <i class="fa-solid fa-eye"></i>
                            </button>

                        </div>


                        <span
                            class="
                                team-member__status
                                ${statusClass}
                            "
                        >
                            ${member.status}
                        </span>


                        <div class="team-member__details">

                            <div class="team-member__detail">

                                <span>
                                    Task-uri active
                                </span>

                                <strong>
                                    ${member.activeTasks}
                                </strong>

                            </div>


                            <div class="team-member__detail">

                                <span>
                                    Finalizate
                                </span>

                                <strong>
                                    ${member.completedTasks}
                                </strong>

                            </div>

                        </div>


                        <div class="team-member__performance">

                            <div class="team-member__performance-top">

                                <span>
                                    Rată finalizare
                                </span>

                                <strong>
                                    ${member.completion}%
                                </strong>

                            </div>


                            <div class="team-member__progress">

                                <div
                                    class="team-member__progress-bar"
                                    style="width: ${member.completion}%"
                                ></div>

                            </div>

                        </div>

                    </article>
                `;
            })
            .join("");


    teamEmpty.hidden =
        filteredMembers.length !== 0;


    updatePagination(
        filteredMembers.length,
        totalPages,
        startIndex,
        endIndex
    );


    addMemberEvents();
}


// =========================
// PAGINATION
// =========================

function updatePagination(
    totalMembers,
    totalPages,
    startIndex,
    endIndex
) {
    teamCurrentPage.textContent =
        `${currentPage} / ${totalPages}`;


    teamPreviousPage.disabled =
        currentPage === 1;


    teamNextPage.disabled =
        currentPage === totalPages;


    if (totalMembers === 0) {
        teamPaginationInfo.textContent =
            "0 membri";

        return;
    }


    const visibleEnd =
        Math.min(
            endIndex,
            totalMembers
        );


    teamPaginationInfo.textContent =
        `${startIndex + 1}-${visibleEnd} din ${totalMembers} membri`;
}


teamPreviousPage.addEventListener(
    "click",
    () => {

        if (currentPage > 1) {
            currentPage--;

            renderTeam();
        }

    }
);


teamNextPage.addEventListener(
    "click",
    () => {

        const filteredMembers =
            getFilteredMembers();


        const totalPages =
            Math.ceil(
                filteredMembers.length /
                membersPerPage
            );


        if (currentPage < totalPages) {
            currentPage++;

            renderTeam();
        }

    }
);


// =========================
// FILTER EVENTS
// =========================

function resetAndRender() {
    currentPage = 1;

    renderTeam();
}


teamSearch.addEventListener(
    "input",
    resetAndRender
);


teamRoleFilter.addEventListener(
    "change",
    resetAndRender
);


teamStatusFilter.addEventListener(
    "change",
    resetAndRender
);


teamSort.addEventListener(
    "change",
    resetAndRender
);


// =========================
// MODAL
// =========================

function openTeamModal(memberId) {
    const member =
        teamMembers.find(
            item =>
                item.id === memberId
        );


    if (!member) {
        return;
    }


    document.querySelector(
        "#modalTeamAvatar"
    ).textContent =
        getInitials(member.name);


    document.querySelector(
        "#modalTeamName"
    ).textContent =
        member.name;


    document.querySelector(
        "#modalTeamRole"
    ).textContent =
        member.role;


    document.querySelector(
        "#modalTeamEmail"
    ).textContent =
        member.email;


    document.querySelector(
        "#modalTeamStatus"
    ).textContent =
        member.status;


    document.querySelector(
        "#modalTeamTasks"
    ).textContent =
        member.activeTasks;


    document.querySelector(
        "#modalTeamCompleted"
    ).textContent =
        member.completedTasks;


    document.querySelector(
        "#modalTeamCompletion"
    ).textContent =
        `${member.completion}%`;


    document.querySelector(
        "#modalTeamSince"
    ).textContent =
        formatDate(member.since);


    document.querySelector(
        "#modalTeamActivity"
    ).textContent =
        member.activity;


    teamModal.classList.add(
        "open"
    );


    teamModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";
}


function closeTeamModal() {
    teamModal.classList.remove(
        "open"
    );


    teamModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";
}


function addMemberEvents() {
    document
        .querySelectorAll(
            ".team-member__view"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const memberId =
                        Number(
                            button.dataset.memberId
                        );


                    openTeamModal(
                        memberId
                    );
                }
            );

        });
}


closeTeamModalButton.addEventListener(
    "click",
    closeTeamModal
);


teamModalBackdrop.addEventListener(
    "click",
    closeTeamModal
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            teamModal.classList.contains(
                "open"
            )
        ) {
            closeTeamModal();
        }

    }
);


// =========================
// EXPORT CSV
// =========================

exportTeamButton.addEventListener(
    "click",
    () => {

        const filteredMembers =
            getFilteredMembers();


        const header = [
            "Nume",
            "Email",
            "Rol",
            "Status",
            "Task-uri active",
            "Task-uri finalizate",
            "Rata finalizare",
            "Membru din",
            "Ultima activitate"
        ];


        const rows =
            filteredMembers.map(
                member => [
                    member.name,
                    member.email,
                    member.role,
                    member.status,
                    member.activeTasks,
                    member.completedTasks,
                    `${member.completion}%`,
                    member.since,
                    member.activity
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
            document.createElement("a");


        link.href = url;

        link.download =
            "team.csv";


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
// INIT
// =========================

function initTeamPage() {
    applyTheme(
        getSavedTheme()
    );

    updateTeamStats();

    renderTeam();
}


initTeamPage();