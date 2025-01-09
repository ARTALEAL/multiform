const nameInput = document.getElementById("name") as HTMLInputElement;
const idNumInput = document.getElementById("idNum") as HTMLInputElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const birthdateInput = document.getElementById("birthdate") as HTMLInputElement;
const documentInput = document.getElementById("document") as HTMLInputElement;
const departmentInput = document.getElementById("department") as HTMLSelectElement;
const termsCheckbox = document.getElementById("terms") as HTMLInputElement;
const skillsInput = document.getElementById("skills") as HTMLInputElement;

const nameVal = document.getElementById("name-val") as HTMLElement;
const idVal = document.getElementById("id-val") as HTMLElement;
const emailVal = document.getElementById("email-val") as HTMLElement;
const bdVal = document.getElementById("bd-val") as HTMLElement;
const cvVal = document.getElementById("cv-val") as HTMLElement;
const deptVal = document.getElementById("dept-val") as HTMLElement;
const skillsVal = document.getElementById("skills-val") as HTMLElement;

function updateSummaryValues() {
  nameVal.textContent = nameInput.value;
  idVal.textContent = idNumInput.value;
  emailVal.textContent = emailInput.value;
  bdVal.textContent = birthdateInput.value;

  let fileName;
  if (documentInput.files) {
    fileName = documentInput.files[0]?.name
    const extension = fileName.split(".").pop();
    const baseName = fileName.split(".")[0];
    const truncatedName = baseName.length > 10 ? baseName.substring(0, 10) + "..." : baseName;
    cvVal.textContent = `${truncatedName}.${extension}`;
  } else {
    cvVal.textContent = "Файл не выбран";
  }
  deptVal.textContent = departmentInput.value;
  skillsVal.textContent = skillsInput.value || "Нет описания навыков";
}

function validateStep(step: number) {
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
    } else if (step === 2) {
  
      if (!termsCheckbox.checked) {
        showError(termsCheckbox, "Подтвердите условия!");
        isValid = false;
      }
    }
  
    return isValid;
  }

  function showError(input: HTMLElement, message: string): void {
    const formControl = input.parentElement;
    if (formControl) {
        const errorSpan = formControl.querySelector(".error-message");
        input.classList.add("error");
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    }
  }

  function clearError(input: HTMLElement): void {
    const formControl = input.parentElement;
    const errorSpan = formControl?.querySelector(".error-message");
    input.classList.remove("error");
    if (errorSpan) {
      errorSpan.textContent = "";
    }
  }

  function setupRealtimeValidation() {
    nameInput.addEventListener("input", () => {
      if (nameInput.value.trim() !== "") clearError(nameInput);
    });
  
    idNumInput.addEventListener("input", () => {
      if (idNumInput.value.trim() !== "") clearError(idNumInput);
    });
    
    emailInput.addEventListener("input", () => {
      if (emailInput.validity.valid) clearError(emailInput);
    });
    
    birthdateInput.addEventListener("change", () => {
      if (birthdateInput.value !== "") clearError(birthdateInput);
    });
    
    documentInput.addEventListener("change", () => {
      if(documentInput.files) {
        if (documentInput.files[0]) clearError(documentInput);
      }
    });
    
    departmentInput.addEventListener("change", () => {
      if (departmentInput.value !== "") clearError(departmentInput);
    });
    
    termsCheckbox.addEventListener("change", () => {
      if (termsCheckbox.checked) clearError(termsCheckbox);
    });
  }

export { validateStep, setupRealtimeValidation, updateSummaryValues }
