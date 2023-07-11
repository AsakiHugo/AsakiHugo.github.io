// header shadow
const navBar = document.querySelector(".header .nav");

// when scroll to section, arrived section is seted to active
let currentSection = "home";
const sectionEls = document.querySelectorAll("main section"),
    navLinkEls = document.querySelectorAll(".nav__list .nav__link"),
    scrollUpArrow = document.querySelector(".scroll__up");

window.addEventListener("scroll", () => {
    // shadow header
    if (window.scrollY >= 56) {
        navBar.classList.add("active__header");
    } else {
        navBar.classList.remove("active__header");
    }

    // active nav status 
    // we only have scrollY in index.html
    if (window.location.pathname.includes("index.html")) {
        sectionEls.forEach(sectionEl => {
            const sectionElOffsetTop = sectionEl.offsetTop - 110;

            if (window.scrollY >= sectionElOffsetTop) {
                currentSection = sectionEl.id;
            }
        });

        navLinkEls.forEach(navEl => {
            if (navEl.href.includes(currentSection)) {
                document.querySelector(".active__nav__link").classList.remove("active__nav__link");
                navEl.parentElement.classList.add("active__nav__link");
            }
        })

        // scroll to home
        if (window.scrollY >= 260) {
            scrollUpArrow.classList.add("active__scroll__up");
        } else {
            scrollUpArrow.classList.remove("active__scroll__up");
        }
    }
})

// hamburger bar
const sideBar = document.querySelector(".nav__left .nav__lists"),
    overlay = document.querySelector(".overlay"),
    navSocial = document.querySelector(".header .nav .nav__right"),
    openBar = document.querySelector(".hamburger .fa-bars"),
    closeBar = document.querySelector(".hamburger .fa-xmark");

openBar.addEventListener("click", () => {
    overlay.classList.add("active__side");
    sideBar.classList.add("active__side");
    navSocial.classList.add("active__side");
    closeBar.classList.add("active__side");
    openBar.classList.remove("active__side");
})

closeBar.addEventListener("click", () => {
    openBar.classList.add("active__side");
    overlay.classList.remove("active__side");
    navSocial.classList.remove("active__side");
    sideBar.classList.remove("active__side");
    closeBar.classList.remove("active__side");
})

// navigation lists indicator within another page html
// Get the current page's URL path
const windowPathName = window.location.pathname;

// Get the URL fragment identifier
const fragmentIdentifier = window.location.hash;

navLinkEls.forEach(navLinkEl => {
    const navLinkPathName = new URL(navLinkEl.href).hash;

    if ((fragmentIdentifier === navLinkPathName) ||
        (windowPathName === '/index.html' && navLinkPathName === '/')) {
        navLinkEl.parentElement.classList.add("active__nav__link");
    }
})

// dark-light theme toggle and logo
const theme_toggler = document.querySelector(".theme__toggler label .toggle-slot"),
    restaurant_logos = document.querySelectorAll(".restaurant__logo img"),
    themeCheckbox = document.querySelector(".theme__toggler .toggle-checkbox");

// Previously selected theme and logo (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedLogo = localStorage.getItem("selected-logo");
const checkboxState = localStorage.getItem("checkbox-state");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains("darkTheme") ? "dark" : "light";
const getCurrentLogo = () => document.body.classList.contains("darkTheme") ? "/images/logo/Color logo - no background.svg" : "/images/logo/Black logo - no background.svg";
const getCurrentStatus = () => document.body.classList.contains("darkTheme") ? "active-check" : "normal-check";

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

if (checkboxState) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated checked status
    themeCheckbox.classList[checkboxState === "active-check" ? "add" : "remove"]("active__checked");
}

// Activate / deactivate the theme manually with the button
theme_toggler.addEventListener("click", () => {
    // Add or remove the dark theme
    document.body.classList.toggle("darkTheme");

    // Set the initial logo based on the current theme
    restaurant_logos.forEach(logo => {
        logo.src = getCurrentLogo();
    })

    // Add or remove checked classlist
    themeCheckbox.classList.toggle("active__checked");

    // Save the theme and the current logo that the user chose
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-logo", getCurrentLogo());
    localStorage.setItem("checkbox-state", getCurrentStatus());
});

// category buttons
const category_btns = document.querySelectorAll(".categories .category");

category_btns.forEach(category_btn => {
    category_btn.addEventListener("click", () => {
        document.querySelector(".active__menus").classList.remove("active__menus");
        category_btn.classList.add("active__menus");
    })
})

if (window.location.pathname.includes("index.html")) {
    const subscribeBtn = document.querySelector(".subscribe__input .subscribe__btn");
    const emailInput = document.querySelector(".subscribe__field #subscibe_email");

    subscribeBtn.addEventListener("click", () => {
        const email = emailInput.value;
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        if (!email) {
            alert("Your input is empty!");
        } else if (!email.match(emailPattern)) {
            alert("Invalid Email!");
        } else {
            window.location.href = `mailto:kyawkhaing.kk004@gmail.com?subject=New%20subscription&body=New%20subscription%20email:%20${email}`;
        }

        // Optional: You can clear the input field after sending the email
        emailInput.value = '';
    });
}