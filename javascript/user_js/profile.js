// profile-editor
const upload_img = document.querySelector(".profile__img__editor .upload__btn"),
    profileImg = document.querySelector(".profile__img img"),
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
            errorSpan.style.display = "block";
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