// <===== Login and Sinup Form =====>
const form = document.querySelector(".singup__container .signup__form"),
    usernameField = document.querySelector(".signup__form .usernameField"),
    userInput = document.querySelector(".input__field #username"),
    userErrorText = document.querySelector(".usernameField .error .error__text"),
    emailField = document.querySelector(".signup__form .emailField"),
    emailInput = document.querySelector(".input__field #email"),
    emailErrorText = document.querySelector(".emailField .error .error__text"),
    passwordField = document.querySelector(".signup__form .passwordField"),
    passwordInput = document.querySelector(".input__field #password"),
    passwordErrorText = document.querySelector(".passwordField .error .error__text"),
    conPasswordField = document.querySelector(".signup__form .conPasswordField"),
    conPasswordInput = document.querySelector(".input__field #con__password"),
    conpasswordErrorText = document.querySelector(".conPasswordField .error .error__text"),
    eyeIcons = document.querySelectorAll(".toggle__password .fa-eye-slash");

// Email Validtion
function checkUsername() {
    if (userInput.value == "") {
        return usernameField.classList.add("active__error");
    }
    usernameField.classList.remove("active__error");
}

// Email Validtion
function checkEmail() {
    const emaiPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
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
    const passPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (passwordInput.value == "") {
        passwordErrorText.innerText = "Password must be filled";
        return passwordField.classList.add("active__error");
    }
    else if (!passwordInput.value.match(passPattern)) {
        passwordErrorText.innerText = "Please enter at least 8 charatcer with number, symbol, small and capital letter.";
        return passwordField.classList.add("active__error"); //adding invalid class if password input value do not match with passPattern
    }
    passwordField.classList.remove("active__error"); //removing invalid class if password input value matched with passPattern
}

// Confirm Password Validtion
function confirmPass() {
    if (conPasswordInput.value == "") {
        conpasswordErrorText.innerText = "Confirmed-Password must be filled";
        return conPasswordField.classList.add("active__error");
    }
    else if (passwordInput.value !== conPasswordInput.value || conPasswordInput.value === "") {
        conpasswordErrorText.innerText = "Your password doesn't match";
        return conPasswordField.classList.add("active__error");
    }
    conPasswordField.classList.remove("active__error");
}

// Calling Funtion on Form Sumbit
form.addEventListener("submit", (e) => {
    e.preventDefault(); //preventing form submitting

    checkUsername();
    checkEmail();
    createPass();
    confirmPass();

    //calling function on key up
    userInput.addEventListener("keyup", checkUsername);
    emailInput.addEventListener("keyup", checkEmail);
    passwordInput.addEventListener("keyup", createPass);
    conPasswordInput.addEventListener("keyup", confirmPass);
    if (
        !usernameField.classList.contains("active__error") &&
        !emailField.classList.contains("active__error") &&
        !passwordField.classList.contains("active__error") &&
        !conPasswordField.classList.contains("active__error")
    ) {
        form.reset();
        location.href = form.getAttribute("action");
    }
});

// Hide and show password
eyeIcons.forEach((eyeIcon) => {
    eyeIcon.addEventListener("click", () => {
        const passInput = eyeIcon.parentElement.parentElement.querySelector("input"); //getting parent element of eye icon and selecting the password input

        passInput.type = passInput.type === "password" ? "text" : "password";

        // changing eye icon's class name to show open and close eye
        eyeIcon.className = `fa-solid fa-eye${passInput.type === "password" ? "-slash" : ""}`;
    })
});