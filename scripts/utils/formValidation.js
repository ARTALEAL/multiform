const nameInput = document.getElementById("name");
const idNumInput = document.getElementById("idNum");
const emailInput = document.getElementById("email");
const birthdateInput = document.getElementById("birthdate");
const documentInput = document.getElementById("document");
const departmentInput = document.getElementById("department");
const termsCheckbox = document.getElementById("terms");
const skillsInput = document.getElementById("skills");
const nameVal = document.getElementById("name-val");
const idVal = document.getElementById("id-val");
const emailVal = document.getElementById("email-val");
const bdVal = document.getElementById("bd-val");
const cvVal = document.getElementById("cv-val");
const deptVal = document.getElementById("dept-val");
const skillsVal = document.getElementById("skills-val");
function updateSummaryValues() {
    var _a;
    nameVal.textContent = nameInput.value;
    idVal.textContent = idNumInput.value;
    emailVal.textContent = emailInput.value;
    bdVal.textContent = birthdateInput.value;
    let fileName;
    if (documentInput.files) {
        fileName = (_a = documentInput.files[0]) === null || _a === void 0 ? void 0 : _a.name;
        const extension = fileName.split(".").pop();
        const baseName = fileName.split(".")[0];
        const truncatedName = baseName.length > 10 ? baseName.substring(0, 10) + "..." : baseName;
        cvVal.textContent = `${truncatedName}.${extension}`;
    }
    else {
        cvVal.textContent = "Файл не выбран";
    }
    deptVal.textContent = departmentInput.value;
    skillsVal.textContent = skillsInput.value || "Нет описания навыков";
}
function validateStep(step) {
    let isValid = true;
    if (step === 0) {
        if (nameInput.value.trim() === "") {
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
function clearError(input) {
    const formControl = input.parentElement;
    const errorSpan = formControl === null || formControl === void 0 ? void 0 : formControl.querySelector(".error-message");
    input.classList.remove("error");
    if (errorSpan) {
        errorSpan.textContent = "";
    }
}
function setupRealtimeValidation() {
    nameInput.addEventListener("input", () => {
        if (nameInput.value.trim() !== "")
            clearError(nameInput);
    });
    idNumInput.addEventListener("input", () => {
        if (idNumInput.value.trim() !== "")
            clearError(idNumInput);
    });
    emailInput.addEventListener("input", () => {
        if (emailInput.validity.valid)
            clearError(emailInput);
    });
    birthdateInput.addEventListener("change", () => {
        if (birthdateInput.value !== "")
            clearError(birthdateInput);
    });
    documentInput.addEventListener("change", () => {
        if (documentInput.files) {
            if (documentInput.files[0])
                clearError(documentInput);
        }
    });
    departmentInput.addEventListener("change", () => {
        if (departmentInput.value !== "")
            clearError(departmentInput);
    });
    termsCheckbox.addEventListener("change", () => {
        if (termsCheckbox.checked)
            clearError(termsCheckbox);
    });
}
export { validateStep, setupRealtimeValidation, updateSummaryValues };
