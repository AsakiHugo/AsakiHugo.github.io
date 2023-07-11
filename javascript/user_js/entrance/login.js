// <===== Login and Sinup Form =====>
const form = document.querySelector(".login__container .login__form"),
    emailField = document.querySelector(".login__form .emailField"),
    emailInput = document.querySelector(".input__field #email"),
    emailErrorText = document.querySelector(".emailField .error .error__text"),
    passwordField = document.querySelector(".login__form .passwordField"),
    passwordInput = document.querySelector(".input__field #password"),
    passwordErrorText = document.querySelector(".passwordField .error .error__text"),
    eyeIcon = document.querySelector(".toggle__password .fa-eye-slash");

// Email Validtion
function checkEmail() {
    // const emaiPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const emaiPattern = "kk@gmail.com";

    if (emailInput.value == "") {
        emailErrorText.innerText = "Email must be filled";
        return emailField.classList.add("active__error");
    }
    else if (!emailInput.value.match(emaiPattern)) {
        emailErrorText.innerText = "Please enter a valid email";
        return emailField.classList.add("active__error");
    }
    emailField.classList.remove("active__error");
}

// Password Validation
function createPass() {
    const passPattern1 = "12345Kk@";
    const passPattern2 = "54321Kk@";

    if (passwordInput.value == "") {
        passwordErrorText.innerText = "Password must be filled";
        return passwordField.classList.add("active__error");
    }
    else if (!(passwordInput.value.match(passPattern1) || passwordInput.value.match(passPattern2))) {
        passwordErrorText.innerText = "Incorrect Password!";
        return passwordField.classList.add("active__error"); //adding invalid class if password input value do not match with passPattern
    }
    passwordField.classList.remove("active__error"); //removing invalid class if password input value matched with passPattern
}

// Calling Funtion on Form Sumbit
form.addEventListener("submit", (e) => {
    e.preventDefault(); //preventing form submitting

    const userKey = "12345Kk@";
    const adminKey = "54321Kk@";

    checkEmail();
    createPass();

    //calling function on key up
    emailInput.addEventListener("keyup", checkEmail);
    passwordInput.addEventListener("keyup", createPass);
    if (
        !emailField.classList.contains("active__error") &&
        !passwordField.classList.contains("active__error")
    ) {

        if (passwordInput.value === userKey) {
            form.reset();
            location.href = form.getAttribute("action");
        } else if (passwordInput.value === adminKey) {
            form.reset();
            location.href = "/html/admin_html/admin.html";
        }
    }
});

// Hide and show password
eyeIcon.addEventListener("click", () => {
    const passInput = eyeIcon.parentElement.parentElement.querySelector("input"); //getting parent element of eye icon and selecting the password input

    passInput.type = passInput.type === "password" ? "text" : "password";

    // changing eye icon's class name to show open and close eye
    eyeIcon.className = `fa-solid fa-eye${passInput.type === "password" ? "-slash" : ""}`;
});