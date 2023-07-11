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
                <div class="menus__card  mix ${menu.className}">
                    <div class="menus__img__container">
                        <div class="menus__img">
                            <img loading="lazy" src="${menu.menu_img}" alt="menu-img">
                        </div>
                    </div>

                    <div class="menus__title">
                        <h3 class="menus__name">${menu.menu_name}</h3>
                        <p class="menus__price">MMK ${menu.menu_price} Ks</p>
                    </div>

                    <div class="menus__raw">
                        <p class="raw1">${menu.menu_raw1}</p>
                        <span class="seperate__raw">/</span>
                        <p class="raw2">${menu.menu_raw2}</p>
                        <span class="seperate__raw">/</span>
                        <p class="raw3">${menu.menu_raw3}</p>
                    </div>

                    <p class="menus__details">
                        ${menu.menu_details}
                    </p>

                    <button class="button quick__view">
                        <p>quick view</p>
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>

                    <!-- menu details explaination -->
                    <div class="menus__explaination__container">
                        <div class="menus__explaination">
                            <i class="fa-sharp fa-solid fa-circle-xmark"></i>
                            <div class="menus__img__card">
                                <div class="menus__exp__img">
                                    <img loading="lazy" src="${menu.menu_img}" alt="menu-img">
                                </div>
                            </div>

                            <div class="menus__exp__details">
                                <div class="menus__title">
                                    <h3 class="menus__name">${menu.menu_name}</h3>
                                    <p class="menus__price">MMK ${menu.menu_price} Ks</p>
                                </div>

                                <div class="menus__raw">
                                    <p class="raw1">${menu.menu_raw1}</p>
                                    <span class="seperate__raw">/</span>
                                    <p class="raw2">${menu.menu_raw2}</p>
                                    <span class="seperate__raw">/</span>
                                    <p class="raw3">${menu.menu_raw3}</p>
                                </div>

                                <p class="menus__details">
                                    ${menu.menu_details}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                `
            })

            document.querySelector(".menus__card__container").innerHTML = output;
        }

        // mixitup
        let mixerMenus = mixitup(".menus__card__container", {
            selectors: {
                target: ".menus__card"
            },
            animation: {
                duration: 300
            }
        });

        // close menu
        const viewBtn = document.querySelectorAll(".menus__card .quick__view"),
            menu_explaination_container = document.querySelectorAll(".menus__card .menus__explaination__container"),
            close_icon = document.querySelectorAll(".menus__explaination i");


        let menu_card = function (menuCLick) {
            menu_explaination_container[menuCLick].classList.add("active__menus");
        }

        viewBtn.forEach((menu, index) => {
            menu.addEventListener("click", () => {
                menu_card(index);
            })
        })

        close_icon.forEach(e => {
            e.addEventListener("click", () => {
                menu_explaination_container.forEach(menu => {
                    menu.classList.remove("active__menus");
                })
            })
        })
    }

    http.send();
}

window.addEventListener("load", getMenuData);