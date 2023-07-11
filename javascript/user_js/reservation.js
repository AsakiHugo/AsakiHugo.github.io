// // date and time checking
const dropDownBtns = document.querySelectorAll(".reservation__info__title i"),
    reservation_inputs = document.querySelectorAll(".reservation__info__details .reservation__inputs__container"),
    complete_reservation = document.querySelector(".complete__reservation"),
    recomfirmation_container = document.querySelector(".complete__reservation .recomfirmation__container"),
    completion_container = document.querySelector(".complete__reservation .completion__container"),
    continue_btn = document.querySelector(".confirmation__buttons .continue__btn"),
    exit_btn = document.querySelector(".confirmation__buttons .exit__btn"),
    completion_btn = document.querySelector(".completion__card .completion__btn"),
    reservation_form = document.querySelector(".reservation__content form"),
    dateField = document.querySelector(".reservation__inputs__container .date__input"),
    dateInput = document.querySelector(".input__fields #date"),
    // personField = document.querySelector(".reservation__inputs__container .guest__input"),
    // personInput = document.querySelector(".input__fields #guest"),
    tableField = document.querySelector(".reservation__inputs__container .table__input"),
    tableInput = document.querySelector(".table__field #table"),
    timeField = document.querySelector(".reservation__inputs__container .time__input__container"),
    timeInputs = document.querySelectorAll(".time__content input");

let inputContainer = function (clickIndex) {
    reservation_inputs[clickIndex].classList.toggle("active__inputs");
}

dropDownBtns.forEach((dropDownBtn, index) => {
    dropDownBtn.addEventListener("click", () => {
        inputContainer(index);
        dropDownBtn.classList.toggle("active__dropDown");
    })
})

function handleDate() {
    const errorTag = dateField.lastElementChild;

    if (dateInput.value == "") {
        errorTag.classList.add("active__error");
    } else {
        errorTag.classList.remove("active__error");
    }
}

// function handlePerson() {
//     const errorTag = personField.lastElementChild;

//     if (personInput.value == "") {
//         errorTag.classList.add("active__error");
//     } else {
//         errorTag.classList.remove("active__error");
//     }
// }

function handleTable() {
    const errorTag = tableField.lastElementChild;

    if (tableInput.value == "Select Table") {
        errorTag.classList.add("active__error");
    } else {
        errorTag.classList.remove("active__error");
    }
}

// selectable one time
timeInputs.forEach(timeInput => {
    timeInput.addEventListener("change", () => {
        timeInputs.forEach(otherCheckbox => {
            if (otherCheckbox !== timeInput) {
                otherCheckbox.checked = false;
                otherCheckbox.disabled = timeInput.checked;
            }
        });
    })
});

function handleTime() {
    const errorTag = timeField.firstElementChild;
    const selectedTimeInputs = document.querySelectorAll(".time__content input:checked");

    if (selectedTimeInputs.length === 0) {
        errorTag.classList.add("active__error");
    } else {
        errorTag.classList.remove("active__error");
    }
}

// personal information checking
const usernameField = document.querySelector(".reservation__inputs__container .username__input"),
    usernameInput = document.querySelector(".input__fields #username"),
    emailField = document.querySelector(".reservation__inputs__container .email__input"),
    emailInput = document.querySelector(".input__fields #email"),
    phoneField = document.querySelector(".reservation__inputs__container .phone__input"),
    phoneInput = document.querySelector(".input__fields #phone"),
    addressField = document.querySelector(".reservation__inputs__container .location__input"),
    addressInput = document.querySelector(".input__fields #location");

function handleUsername() {
    const errorTag = usernameField.lastElementChild;

    if (usernameInput.value == "") {
        errorTag.classList.add("active__error");
    } else {
        errorTag.classList.remove("active__error");
    }
}

function handleEmail() {
    const emaiPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const errorTag = emailField.lastElementChild;

    if (emailInput.value == "" || !emailInput.value.match(emaiPattern)) {
        errorTag.classList.add("active__error");
    } else {
        errorTag.classList.remove("active__error");
    }
}

function handlePhone() {
    const phNumberPattern = /^09\d{9}$/;
    const errorTag = phoneField.lastElementChild;

    if (phoneInput.value == "" || !phoneInput.value.match(phNumberPattern)) {
        errorTag.classList.add("active__error");
    } else {
        errorTag.classList.remove("active__error");
    }
}

function handleAddress() {
    const errorTag = addressField.lastElementChild;

    if (addressInput.value == "") {
        errorTag.classList.add("active__error");
    } else {
        errorTag.classList.remove("active__error");
    }
}


// payment checking
const paymentField = document.querySelector(".reservation__inputs__container .payment__input__container"),
    paymentInputs = document.querySelectorAll(".payment__content input");

// selectable one time
paymentInputs.forEach(paymentInput => {
    paymentInput.addEventListener("change", () => {
        paymentInputs.forEach(otherCheckbox => {
            if (otherCheckbox !== paymentInput) {
                otherCheckbox.checked = false;
                otherCheckbox.disabled = paymentInput.checked;
            }
        });
    })
});

function handlePayment() {
    const errorTag = paymentField.lastElementChild;
    const selectedPayInputs = document.querySelectorAll(".payment__content input:checked");

    if (selectedPayInputs.length === 0) {
        errorTag.classList.add("active__error");
    } else {
        errorTag.classList.remove("active__error");
    }
}

// reservation form checker
reservation_form.addEventListener("submit", function (e) {
    e.preventDefault();

    handleDate();
    // handlePerson();
    handleTable();
    handleTime();
    handleUsername();
    handleEmail();
    handlePhone();
    handleAddress();
    handlePayment();

    // date and time checking
    dateInput.addEventListener("keyup", handleDate);
    // personInput.addEventListener("keyup", handlePerson);
    tableInput.addEventListener("keyup", handleTable);
    timeInputs.forEach(timeInput => {
        timeInput.addEventListener("change", handleTime);
    })

    // personal information checking
    usernameInput.addEventListener("keyup", handleUsername);
    emailInput.addEventListener("keyup", handleEmail);
    phoneInput.addEventListener("keyup", handlePhone);
    addressInput.addEventListener("keyup", handleAddress);

    // payment checking
    paymentInputs.forEach(paymentInput => {
        paymentInput.addEventListener("change", handlePayment);
    })

    if (
        dateField.querySelector(".active__error") == null &&
        // personField.querySelector(".active__error") == null &&
        tableField.querySelector(".active__error") == null &&
        timeField.querySelector(".active__error") == null &&
        usernameField.querySelector(".active__error") == null &&
        emailField.querySelector(".active__error") == null &&
        phoneField.querySelector(".active__error") == null &&
        addressField.querySelector(".active__error") == null &&
        paymentField.querySelector(".active__error") == null
    ) {
        complete_reservation.classList.add("active__reconfirm");
        recomfirmation_container.classList.add("active__reconfirm");
    }
})

exit_btn.addEventListener("click", () => {
    complete_reservation.classList.remove("active__reconfirm");
    recomfirmation_container.classList.remove("active__reconfirm");
})

continue_btn.addEventListener("click", () => {
    recomfirmation_container.classList.remove("active__reconfirm");
    completion_container.classList.add("active__reconfirm");
})

completion_btn.addEventListener("click", () => {
    complete_reservation.classList.remove("active__reconfirm");
    completion_container.classList.remove("active__reconfirm");
    reservation_form.reset();
    location.href = "index.html";
})