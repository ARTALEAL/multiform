import { validateStep, setupRealtimeValidation, updateSummaryValues } from "./utils/formValidation.js";
const stepInfo = document.getElementById("stepInfo");
const navLeft = document.getElementById("navLeft");
const navRight = document.getElementById("navRight");
const form = document.getElementById("myForm");
const formSteps = ["one", "two", "three", "four"];
const editButtons = {
    "name-edit": 0,
    "id-edit": 0,
    "email-edit": 0,
    "bd-edit": 0,
    "cv-edit": 1,
    "dept-edit": 1,
    "skills-edit": 2
};
let currentStep = 0;
function updateStepVisibility() {
    formSteps.forEach((step) => {
        const element = document.getElementById(step);
        if (element) {
            element.style.display = "none";
        }
    });
    const currentFormPage = document.getElementById(formSteps[currentStep]);
    if (currentFormPage) {
        currentFormPage.style.display = "block";
    }
    if (stepInfo) {
        stepInfo.textContent = `Шаг ${currentStep + 1} из ${formSteps.length}`;
    }
    if (currentStep === 3) {
        updateSummaryValues();
    }
    if (navLeft) {
        navLeft.style.display = currentStep === 0 ? "none" : "block";
    }
    if (navRight) {
        navRight.style.display = currentStep === formSteps.length - 1 ? "none" : "block";
    }
}
document.addEventListener("DOMContentLoaded", () => {
    navLeft ? navLeft.style.display = "none" : null;
    updateStepVisibility();
    setupRealtimeValidation();
    if (navRight) {
        navRight.addEventListener("click", () => {
            if (currentStep < formSteps.length - 1) {
                if (validateStep(currentStep)) {
                    currentStep++;
                    updateStepVisibility();
                }
            }
        });
    }
    if (navLeft) {
        navLeft.addEventListener("click", () => {
            if (currentStep > 0) {
                currentStep--;
                updateStepVisibility();
            }
        });
    }
    Object.keys(editButtons).forEach((buttonId) => {
        const button = document.getElementById(buttonId);
        button.addEventListener("click", () => {
            currentStep = editButtons[buttonId];
            updateStepVisibility();
        });
    });
});
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateStep(2)) {
        alert("Форма успешно отправлена!");
        form.reset();
        currentStep = 0;
        updateStepVisibility();
    }
});
