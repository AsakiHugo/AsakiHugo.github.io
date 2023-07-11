// sidebar
const sidebar = document.querySelector(".dashboard .sidebar__container"),
    sidebar_open = document.querySelector(".header .nav i"),
    sidebar_closebtn = document.querySelector(".sidebar__container .sidebar__closeBtn"),
    dashboard_content_container = document.querySelector(".dashboard .dashboard__content__container");

sidebar_open.addEventListener("click", () => {
    sidebar.classList.add("sidebar__active");
    sidebar_closebtn.classList.add("sidebar__active");
    dashboard_content_container.classList.add("sidebar__active");
    sidebar_open.classList.add("sidebar__active");
})

sidebar_closebtn.addEventListener("click", () => {
    sidebar.classList.remove("sidebar__active");
    sidebar_closebtn.classList.remove("sidebar__active");
    dashboard_content_container.classList.remove("sidebar__active");
    sidebar_open.classList.remove("sidebar__active");
})

// shadow header
const header = document.querySelector(".header .nav");

window.addEventListener("scroll", () => {
    // shadow header
    if (window.scrollY >= 56) {
        header.classList.add("active__header");
    } else {
        header.classList.remove("active__header");
    }
})

// navigation lists indicator
const navLinkEls = document.querySelectorAll(".nav .nav__list a");

// Get the current page's URL path
const windowPathName = window.location.pathname;

navLinkEls.forEach(navLinkEl => {
    const navLinkPathName = new URL(navLinkEl.href).pathname;

    if ((windowPathName === navLinkPathName) ||
        (windowPathName === '/admin.html' && navLinkPathName === '/')) {
        navLinkEl.parentElement.classList.add("sidebar__active");
    }
})


// dark-light theme toggle and logo
const theme_toggler = document.querySelector(".theme__toggler label .toggle-slot"),
    restaurant_logos = document.querySelectorAll(".restaurant__logo img"),
    themeCheckbox = document.querySelector(".theme__toggler .toggle-checkbox");

// Previously selected theme and logo (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedLogo = localStorage.getItem("selected-logo");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains("darkTheme") ? "dark" : "light";
const getCurrentLogo = () => document.body.classList.contains("darkTheme") ? "/images/logo/Color logo - no background.svg" : "/images/logo/Black logo - no background.svg";

// We validate if the user previously chose a theme
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark theme
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"]("darkTheme");
}

// We validate if the user previously chose a logo
if (selectedLogo) {
    // If the validation is fulfilled, we set the initial logo based on the selected logo
    restaurant_logos.forEach(logo => {
        logo.src = selectedLogo;
    })
} else {
    // If no logo is selected, set the initial logo based on the current theme
    restaurant_logos.forEach(logo => {
        logo.src = getCurrentLogo();
    })
}

// Activate / deactivate the theme manually with the button
theme_toggler.addEventListener("click", () => {
    // Add or remove the dark theme
    document.body.classList.toggle("darkTheme");

    // Set the initial logo based on the current theme
    restaurant_logos.forEach(logo => {
        logo.src = getCurrentLogo();
    })

    // Save the theme and the current logo that the user chose
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-logo", getCurrentLogo());
});

// Reservation lists shower
if (window.location.pathname.includes("admin.html")) {

    function getMenuReservationPerson(e) {
        e.preventDefault();

        // Handling the click event and update the reservation content and page numbers
        const reservationContentElement = document.querySelector(".reservation__noti__container table .content__rows");
        const currentPageElement = document.querySelector(".pages__shower .current__page");
        const totalPageElement = document.querySelector(".pages__shower .total__page");
        const nextPageButton = document.querySelector(".pages__slider .fa-angles-right");
        const prevPageButton = document.querySelector(".pages__slider .fa-angles-left");

        const http = new XMLHttpRequest();
        http.open("GET", "/javascript/admin_js/reservationPersons.json", true);

        http.onload = function () {
            if (http.status === 200) {
                const noti_persons = JSON.parse(this.responseText);

                let currentPage = 1;
                // Adjust the number of reservations per page as needed
                let reservationsPerPage = 6;
                let totalPages = Math.ceil(noti_persons.length / reservationsPerPage);
                totalPageElement.textContent = Math.ceil(noti_persons.length / reservationsPerPage);

                // next button
                nextPageButton.addEventListener("click", function () {
                    if (currentPage < totalPages) {
                        currentPage++;
                        currentPageElement.textContent = currentPage;

                        // Update the reservation content
                        reservationContentElement.innerHTML = getUpdatedReservationContent(currentPage);
                    }
                });

                // pre button
                prevPageButton.addEventListener("click", function () {
                    if (currentPage > 1) {
                        currentPage--;
                        currentPageElement.textContent = currentPage;

                        // Update the reservation content
                        reservationContentElement.innerHTML = getUpdatedReservationContent(currentPage);
                    }
                });

                // Function to get the updated reservation content for the specified page
                function getUpdatedReservationContent(page) {
                    let startIndex = (page - 1) * reservationsPerPage;
                    let endIndex = startIndex + reservationsPerPage;
                    let reservationContent = '';

                    // Generate the reservation content for the specified page
                    for (let i = startIndex; i < endIndex; i++) {
                        if (i >= noti_persons.length) {
                            break; // Break if there are no more reservations
                        }

                        let reservation = noti_persons[i];
                        reservationContent += `
                            <tr>
                                <td data-label="ID">${reservation.id}</td>
                                <td data-label="Customer Name">${reservation.username}</td>
                                <td data-label="Email">${reservation.email}</td>
                                <td data-label="Phone">${reservation.phone}</td>
                                <td data-label="Person">${reservation.guest}</td>
                                <td data-label="Date">${reservation.date}</td>
                                <td data-label="Time">${reservation.time}</td>
                                <td data-label="Status" class="${reservation.status}">${reservation.status}</td>
                            </tr>
                        `;
                    }

                    // Return the updated reservation content
                    return reservationContent;
                }

                // Initialize the reservation content on page load
                reservationContentElement.innerHTML = getUpdatedReservationContent(currentPage);
            }
        };

        http.send();
    }

    window.addEventListener("load", getMenuReservationPerson);
}

// Reservation lists shower
if (window.location.pathname.includes("reservation.html")) {

    function getMenuReservationPerson(e) {
        e.preventDefault();

        // Handling the click event and update the reservation content and page numbers
        const reservationContentElement = document.querySelector(".reservation__noti__container .reservation__noti__content");
        const currentPageElement = document.querySelector(".pages__shower .current__page");
        const totalPageElement = document.querySelector(".pages__shower .total__page");
        const nextPageButton = document.querySelector(".pages__slider .fa-angles-right");
        const prevPageButton = document.querySelector(".pages__slider .fa-angles-left");

        const http = new XMLHttpRequest();
        http.open("GET", "/javascript/admin_js/reservationPersons.json", true);

        http.onload = function () {
            if (http.status === 200) {
                const noti_persons = JSON.parse(this.responseText);

                let currentPage = 1;
                // Adjust the number of reservations per page as needed
                let reservationsPerPage = 6;
                let totalPages = Math.ceil(noti_persons.length / reservationsPerPage);
                totalPageElement.textContent = Math.ceil(noti_persons.length / reservationsPerPage);

                // next button
                nextPageButton.addEventListener("click", function () {
                    if (currentPage < totalPages) {
                        currentPage++;
                        currentPageElement.textContent = currentPage;

                        // Update the reservation content
                        reservationContentElement.innerHTML = getUpdatedReservationContent(currentPage);
                    }
                });

                // pre button
                prevPageButton.addEventListener("click", function () {
                    if (currentPage > 1) {
                        currentPage--;
                        currentPageElement.textContent = currentPage;

                        // Update the reservation content
                        reservationContentElement.innerHTML = getUpdatedReservationContent(currentPage);
                    }
                });

                // Function to get the updated reservation content for the specified page
                function getUpdatedReservationContent(page) {
                    let startIndex = (page - 1) * reservationsPerPage;
                    let endIndex = startIndex + reservationsPerPage;
                    let reservationContent = '';

                    // Generate the reservation content for the specified page
                    for (let i = startIndex; i < endIndex; i++) {
                        if (i >= noti_persons.length) {
                            break; // Break if there are no more reservations
                        }

                        let reservation = noti_persons[i];
                        reservationContent += `
                        <div class="reservation__content__container">
                            <div class="reservation__content">
                                <p data-label="ID" class="reservation__id">${reservation.id}</p>
                                <p data-label="Customer Name" class="username">${reservation.username}</p>
                                <p data-label="Email" class="email">${reservation.email}</p>
                                <p data-label="Phone" class="phone">${reservation.phone}</p>
                                <p data-label="Person" class="person">${reservation.guest}</p>
                                <p data-label="Date" class="reservation__date">${reservation.date}</p>
                                <p data-label="Time" class="reservation__time">${reservation.time}</p>
                                <p data-label="Status" class="reservation__status ${reservation.status}">${reservation.status}</p>
                            </div>
                    
                            <div class="notificationBtn__container">
                                <button class="notificationBtn mailToBtn"><a
                                    href="${reservation.email}">Mail To</a></button>
                                <button class="notificationBtn deleteBtn">Delete</button>
                            </div>
                        </div>
                        `;
                    }

                    // Return the updated reservation content
                    return reservationContent;
                }

                // Initialize the reservation content on page load
                reservationContentElement.innerHTML = getUpdatedReservationContent(currentPage);
            }

            // close menu
            const deleteBtns = document.querySelectorAll(".notificationBtn__container .deleteBtn"),
                reservation_status = document.querySelectorAll(".reservation__content .reservation__status");


            let reservation = function (cLickIndex) {
                reservation_status[cLickIndex].innerHTML = "cancel";
                reservation_status[cLickIndex].classList.remove("confirmed");
                reservation_status[cLickIndex].classList.add("cancel");
            }

            deleteBtns.forEach((deleteBtn, index) => {
                deleteBtn.addEventListener("click", () => {
                    reservation(index);
                })
            })
        };

        http.send();
    }

    window.addEventListener("load", getMenuReservationPerson);
}

// menu lists shower
if (window.location.pathname.includes("menu.html")) {
    function getMenuData(e) {
        e.preventDefault();

        const http = new XMLHttpRequest();

        http.open("GET", "/javascript/user_js/menu/menus.json", true);

        http.onload = function () {
            if (http.status === 200) {
                const menus = JSON.parse(this.responseText);

                let output = "";
                menus.forEach(function (menu) {

                    output += `
                    <div class="menus__card   mix ${menu.className}">
                        <div class="menus__img">
                            <img loading="lazy" src="${menu.menu_img}" alt="menu-img">
                        </div>

                        <div class="menus__details">
                            <div class="menus__name__price">
                                <h3 class="menus__name">${menu.menu_name}</h3>
                                <p class="menus__price">
                                    MMK
                                    <span class="price">${menu.menu_price}</span>
                                    Ks
                                </p>
                            </div>
                            <div class="raw__materials">
                                <p>${menu.menu_raw1}</p>
                                <span>/</span>
                                <p>${menu.menu_raw2}</p>
                                <span>/</span>
                                <p>${menu.menu_raw3}</p>
                            </div>
                            <p class="menus__desc">
                                ${menu.menu_details}
                            </p>
                            <button class="editBtn">
                                <i class="fa-solid fa-gear"></i>
                                <p>Edit</p>
                            </button>
                        </div>

                        <!-- editVersion -->
                        <div class="edit__version__container">
                            <div class="edit__menus">
                                <!-- menu edit -->
                                <form action="" method="post">
                                    <!-- close edit menu -->
                                    <i class="fa-solid fa-xmark"></i>

                                    <!-- image input -->
                                    <div class="img__input">
                                        <div class="menu__image">
                                            <img src="/images/person/upload-img.jpg" alt="menu-img">
                                        </div>
                                        <label for="menu_img">
                                            <i class="fa-solid fa-cloud-arrow-up"></i>
                                            <p>Upload menu</p>
                                        </label>
                                        <input type="file" accept="image/jpeg, image/png, image/jpg"
                                            name="menu_img" id="menu_img">
                                    </div>

                                    <!-- text input -->
                                    <div class="edit__inputs__container">

                                        <div class="input__field">
                                            <p>menu type</p>
                                            <input type="text" name="menu_type" id="menu_type" placeholder="${menu.className}">
                                        </div>
                                        <div class="input__field">
                                            <p>menu name</p>
                                            <input type="text" name="menu_name" id="menu_name" placeholder="${menu.menu_name}">
                                        </div>
                                        <div class="input__field">
                                            <p>menu price</p>
                                            <input type="text" name="menu_price" id="menu_price" placeholder="${menu.menu_price}">
                                        </div>
                                        <div class="input__field">
                                            <p>menu raw1</p>
                                            <input type="text" name="menu_raw1" id="menu_raw1" placeholder="${menu.menu_raw1}">
                                        </div>
                                        <div class="input__field">
                                            <p>menu raw2</p>
                                            <input type="text" name="menu_raw2" id="menu_raw2" placeholder="${menu.menu_raw2}">
                                        </div>
                                        <div class="input__field">
                                            <p>menu raw3</p>
                                            <input type="text" name="menu_raw3" id="menu_raw3" placeholder="${menu.menu_raw3}">
                                        </div>
                                        <div class="input__field">
                                            <p>menu details</p>
                                            <textarea name="menu_details" id="menu_details"></textarea>
                                        </div>

                                    </div>

                                    <!-- submit button -->
                                    <div class="submitBtn">
                                        <button type="submit">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    `
                })

                document.querySelector(".menus__card__container").innerHTML = output;

                // edit version to active
                const editBtn = document.querySelectorAll(".menus__card__container .editBtn"),
                    editVersion = document.querySelectorAll(".edit__version__container"),
                    closeIcon = document.querySelectorAll(".edit__menus form .fa-xmark");

                let menu_card = function (menuCLick) {
                    editVersion[menuCLick].classList.add("edit__active");
                }

                editBtn.forEach((menu, index) => {
                    menu.addEventListener("click", () => {
                        menu_card(index);
                    })
                })

                closeIcon.forEach(e => {
                    e.addEventListener("click", () => {
                        editVersion.forEach(menu => {
                            menu.classList.remove("edit__active");
                        })
                    })
                })
            }
        }

        http.send();
    }

    window.addEventListener("load", getMenuData);

    const addNewMenu = document.querySelector(".add__new__menus .add__menusBtn"),
        addMenuVersion = document.querySelector(".edit__version__container"),
        closeAddIcon = document.querySelector(".edit__menus .fa-xmark");

    addNewMenu.addEventListener("click", () => {
        addMenuVersion.classList.add("edit__active");
    })

    closeAddIcon.addEventListener("click", () => {
        addMenuVersion.classList.remove("edit__active");
    })
}

// chef lists shower
if (window.location.pathname.includes("chef.html")) {

    function getMenuData(e) {
        e.preventDefault();

        const http = new XMLHttpRequest();

        http.open("GET", "/javascript/user_js/chef/chef.json", true);

        http.onload = function () {
            if (http.status === 200) {
                const chefs = JSON.parse(this.responseText);

                let output = "";
                chefs.forEach(function (chef) {

                    output += `
                        <div class="chef__card">
                            <!-- chef img -->
                            <div class="chef__img">
                                <img loading="lazy" src="${chef.chefImg}" alt="chef-img">
                            </div>

                            <!-- chef info details -->
                            <div class="chef__info">

                                <div class="chef__info__row">
                                    <div class="title">chef character</div>
                                    <p class="desc chef__character"><span>:</span>${chef.chefCharacter}</p>
                                </div>

                                <div class="chef__info__row">
                                    <div class="title">chef name</div>
                                    <p class="desc chef__name"><span>:</span>${chef.chefName}</p>
                                </div>

                                <div class="chef__info__row">
                                    <div class="title">chef entrance year</div>
                                    <p class="desc chef__entrance"><span>:</span>${chef.chefEntranceYear}</p>
                                </div>

                                <div class="chef__detail__row">
                                    <div class="details">chef details :</div>
                                    <p class="chef__details">
                                        ${chef.chefDetails}
                                    </p>
                                </div>

                            </div>

                            <!-- edit btn -->
                            <button class="editBtn">
                                <i class="fa-solid fa-gear"></i>
                                <p>Edit</p>
                            </button>

                            <!-- editVersion -->
                            <div class="edit__version__container">
                                <div class="edit__chefs">
                                    <!-- chef edit -->
                                    <form action="" method="post">
                                        <!-- close edit chef -->
                                        <i class="fa-solid fa-xmark"></i>

                                        <!-- image input -->
                                        <div class="img__input">
                                            <div class="chef__image">
                                                <img src="/images/person/upload-img.jpg" alt="chef-img">
                                            </div>
                                            <label for="chef_img">
                                                <i class="fa-solid fa-cloud-arrow-up"></i>
                                                <p>Upload chef</p>
                                            </label>
                                            <input type="file" accept="image/jpeg, image/png, image/jpg"
                                                name="chef_img" id="chef_img">
                                        </div>

                                        <!-- text input -->
                                        <div class="edit__inputs__container">

                                            <div class="input__field">
                                                <p>chef character</p>
                                                <input type="text" name="chef_type" id="chef_type"
                                                    placeholder="${chef.chefCharacter}">
                                            </div>
                                            <div class="input__field">
                                                <p>chef name</p>
                                                <input type="text" name="chef_name" id="chef_name"
                                                    placeholder="${chef.chefName}">
                                            </div>
                                            <div class="input__field">
                                                <p>chef entrance year</p>
                                                <input type="text" name="chef_price" id="chef_price"
                                                    placeholder="${chef.chefEntranceYear}">
                                            </div>
                                            <div class="input__field">
                                                <p>chef details</p>
                                                <textarea name="chef_details" id="chef_details"></textarea>
                                            </div>

                                        </div>

                                        <!-- submit button -->
                                        <div class="submitBtn">
                                            <button type="submit">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    `
                })

                document.querySelector(".chefs__card__container").innerHTML = output;

                // edit version to active
                const editBtn = document.querySelectorAll(".chefs__card__container .editBtn"),
                    editVersion = document.querySelectorAll(".edit__version__container"),
                    closeIcon = document.querySelectorAll(".edit__chefs form .fa-xmark");

                let menu_card = function (menuCLick) {
                    editVersion[menuCLick].classList.add("edit__active");
                }

                editBtn.forEach((menu, index) => {
                    menu.addEventListener("click", () => {
                        menu_card(index);
                    })
                })

                closeIcon.forEach(e => {
                    e.addEventListener("click", () => {
                        editVersion.forEach(menu => {
                            menu.classList.remove("edit__active");
                        })
                    })
                })
            }
        }

        http.send();
    }

    window.addEventListener("load", getMenuData);

    const addNewChef = document.querySelector(".add__new__chef .add__chefBtn"),
        addChefVersion = document.querySelector(".edit__version__container"),
        closeAddIcon = document.querySelector(".edit__chefs .fa-xmark");

    addNewChef.addEventListener("click", () => {
        addChefVersion.classList.add("edit__active");
    })

    closeAddIcon.addEventListener("click", () => {
        addChefVersion.classList.remove("edit__active");
    })
}

// location management
if (window.location.pathname.includes("location.html")) {
    // edit version to active
    const editBtn = document.querySelector(".contact__info__container .editBtn"),
        editVersion = document.querySelector(".edit__version__container"),
        closeIcon = document.querySelector(".edit__location form .fa-xmark");

    editBtn.addEventListener("click", () => {
        editVersion.classList.add("edit__active");
    })

    closeIcon.addEventListener("click", () => {
        editVersion.classList.remove("edit__active");
    })
}

// profile management
if (window.location.pathname.includes("profile.html")) {
    // profile-editor
    const upload_img = document.querySelector(".profile__img__editor .upload__btn"),
        profileImg = document.querySelector(".profile__image img"),
        editBtns = document.querySelectorAll(".profile__editor .editing"),
        closeEditBtns = document.querySelectorAll(".profile__editor .closeEdit"),
        saveBtns = document.querySelectorAll(".edit__input__container .save__btn"),
        deleteBtn = document.querySelector(".delete__btn__container .delete__btn");

    upload_img.addEventListener("change", () => {
        if (upload_img.files && upload_img.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                profileImg.src = e.target.result;
            };

            reader.readAsDataURL(upload_img.files[0]);
        }
    })

    editBtns.forEach(editBtn => {
        editBtn.addEventListener("click", () => {
            const edit_Input_Container = editBtn.parentElement.parentElement.nextElementSibling,
                closeBtn = editBtn.nextElementSibling;

            edit_Input_Container.style.display = "flex";
            editBtn.style.display = "none";
            closeBtn.style.display = "block";
        })
    })

    closeEditBtns.forEach(closeBtn => {
        closeBtn.addEventListener("click", () => {
            const edit_Input_Container = closeBtn.parentElement.parentElement.nextElementSibling,
                errorSpan = edit_Input_Container.nextElementSibling,
                editBtn = closeBtn.previousElementSibling;


            edit_Input_Container.style.display = "none";
            errorSpan.style.display = "none";
            closeBtn.style.display = "none";
            editBtn.style.display = "block";
        })
    })

    // Add event listener to each save__btn element
    saveBtns.forEach((saveBtn) => {
        saveBtn.addEventListener("click", () => {
            const editInputContainer = saveBtn.parentNode.parentNode;
            const editInput = editInputContainer.querySelector("input");
            const errorSpan = editInputContainer.nextElementSibling;
            const parentEditor = editInputContainer.previousElementSibling;

            // Check if the input is empty
            if (editInput.value === "") {
                // Display the error message
                errorSpan.style.display = "flex";
            } else {
                // Update the value in the profile__editor and display it
                parentEditor.querySelector(".profile__editor p").textContent = editInput.value;
                parentEditor.style.display = "flex";

                // Hide the edit__input__container and the error message
                editInput.value = "";
                parentEditor.querySelector(".profile__editor .editing").style.display = "block";
                parentEditor.querySelector(".profile__editor .closeEdit").style.display = "none";
                editInputContainer.style.display = "none";
                errorSpan.style.display = "none";
            }
        });
    });

    deleteBtn.addEventListener("click", () => {
        console.log("deleteBtn click");
    })
}

// table management
if (window.location.pathname.includes("table.html")) {

    function getMenuData(e) {
        e.preventDefault();

        const http = new XMLHttpRequest();

        http.open("GET", "/javascript/user_js/table/table.json", true);

        http.onload = function () {
            if (http.status === 200) {
                const tables = JSON.parse(this.responseText);

                let output = "";
                tables.forEach(function (table) {

                    output += `
                    <div class="table__card">
                        <!-- chef img -->
                        <div class="table__img">
                            <img loading="lazy" src="${table.tableImg}" alt="table-img">
                        </div>

                        <!-- chef info details -->
                        <div class="table__info__container">

                            <div class="table__info">
                                <div class="title">table type</div>
                                <p class="table__type">${table.tabelType}</p>
                            </div>

                            <div class="table__info">
                                <div class="title">price</div>
                                <p class="table__price">
                                    <span class="price">${table.tablePrice}</span>
                                    MMK
                                </p>
                            </div>
                        </div>

                        <!-- edit btn -->
                        <button class="editBtn">
                            <i class="fa-solid fa-gear"></i>
                            <p>Edit</p>
                        </button>

                        <!-- editVersion -->
                        <div class="edit__version__container">
                            <div class="edit__tables">

                                <!-- chef edit -->
                                <form action="" method="post">
                                    <!-- close edit chef -->
                                    <i class="fa-solid fa-xmark"></i>

                                    <!-- image input -->
                                    <div class="img__input">
                                        <div class="table__image">
                                            <img src="/images/person/upload-img.jpg" alt="table-img">
                                        </div>
                                        <label for="table_img">
                                            <i class="fa-solid fa-cloud-arrow-up"></i>
                                            <p>Upload table</p>
                                        </label>
                                        <input type="file" accept="image/jpeg, image/png, image/jpg"
                                            name="table_img" id="table_img">
                                    </div>

                                    <!-- text input -->
                                    <div class="edit__inputs__container">

                                        <div class="input__field">
                                            <p>table type</p>
                                            <select name="table_price" id="table_price">
                                                <option value="single table">single table</option>
                                                <option value="couple table">couple table</option>
                                                <option value="family table">family table</option>
                                                <option value="party table">party table</option>
                                            </select>
                                        </div>
                                        <div class="input__field">
                                            <p>table price</p>
                                            <input type="text" name="table_type" id="table_type">
                                        </div>

                                    </div>

                                    <!-- submit button -->
                                    <div class="submitBtn">
                                        <button type="submit">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    `
                })

                document.querySelector(".tables__container").innerHTML = output;

                // edit version to active
                const editBtn = document.querySelectorAll(".table__card .editBtn"),
                    editVersion = document.querySelectorAll(".edit__version__container"),
                    closeIcon = document.querySelectorAll(".edit__tables form .fa-xmark");

                let table_card = function (tableCLick) {
                    editVersion[tableCLick].classList.add("edit__active");
                }

                editBtn.forEach((table, index) => {
                    table.addEventListener("click", () => {
                        table_card(index);
                    })
                })

                closeIcon.forEach(e => {
                    e.addEventListener("click", () => {
                        editVersion.forEach(table => {
                            table.classList.remove("edit__active");
                        })
                    })
                })
            }
        }

        http.send();
    }

    window.addEventListener("load", getMenuData);

    const addNewChef = document.querySelector(".add__new__table .add__tableBtn"),
        addChefVersion = document.querySelector(".edit__version__container"),
        closeAddIcon = document.querySelector(".edit__tables .fa-xmark");

    addNewChef.addEventListener("click", () => {
        addChefVersion.classList.add("edit__active");
    })

    closeAddIcon.addEventListener("click", () => {
        addChefVersion.classList.remove("edit__active");
    })
}