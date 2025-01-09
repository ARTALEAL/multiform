const nameInput = document.getElementById("name");
const idNumInput = document.getElementById("idNum");
const emailInput = document.getElementById("email");
const birthdateInput = document.getElementById("birthdate");
const documentInput = document.getElementById("document");
const departmentInput = document.getElementById("department");
const termsCheckbox = document.getElementById("terms");
// const skillsInput = document.getElementById("skills") as HTMLInputElement;
function validateStep(step) {
    let isValid = true;
    if (step === 0) {
        if (nameInput.value.trim() === "")
            showError(nameInput, "Имя обязательно");
        isValid = false;
    }
    if (idNumInput.value.trim() === "") {
        showError(idNumInput, "ID номер обязателен");
        isValid = false;
    }
    if (emailInput.value.trim() === "" || !emailInput.validity.valid) {
        showError(emailInput, "Введите корректный имейл");
        isValid = false;
    }
    if (birthdateInput.value === "") {
        showError(birthdateInput, "Дата рождения обязательна");
        isValid = false;
    }
    else if (step === 1) {
        if (documentInput.files) {
            if (!documentInput.files[0]) {
                showError(documentInput, "CV обязателен");
                isValid = false;
            }
        }
        if (departmentInput.value === "") {
            showError(departmentInput, "Выберите отдел");
            isValid = false;
        }
    }
    else if (step === 2) {
        if (!termsCheckbox.checked) {
            showError(termsCheckbox, "Подтвердите условия!");
            isValid = false;
        }
    }
    return isValid;
}
function showError(input, message) {
    const formControl = input.parentElement;
    if (formControl) {
        const errorSpan = formControl.querySelector(".error-message");
        input.classList.add("error");
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    }
}
export { validateStep };
