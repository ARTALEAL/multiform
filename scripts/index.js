import { validateStep } from "./utils/formValidation.js";
const stepInfo = document.getElementById("stepInfo");
const navLeft = document.getElementById("navLeft");
const navRight = document.getElementById("navRight");
const form = document.getElementById("myForm");
const formSteps = ["one", "two", "three"];
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
        stepInfo.textContent = `Step ${currentStep + 1} of ${formSteps.length}`;
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
});
