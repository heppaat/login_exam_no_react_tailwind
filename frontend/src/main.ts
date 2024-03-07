import "./style.css";
import { safeFetch } from "./http";
import { z } from "zod";

const registrationForm = document.getElementById(
  "registrationForm"
) as HTMLDivElement;
const emailField = document.getElementById("email") as HTMLInputElement;
const passwordField = document.getElementById("password") as HTMLInputElement;
const passwordConfirmationField = document.getElementById(
  "passwordConfirmation"
) as HTMLInputElement;
const registerButton = document.getElementById("register") as HTMLButtonElement;
const successDiv = document.getElementById("successDiv") as HTMLDivElement;
const backToHomePageButton = document.getElementById(
  "backToHomePageButton"
) as HTMLButtonElement;

const errorDiv = document.getElementById("errorDiv") as HTMLDivElement;

registerButton.disabled = true;

const UserSchema = z.object({
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

type User = z.infer<typeof UserSchema>;

let userData: User | null = null;

//post function
const postData = async (data: User) => {
  const response = await safeFetch(
    "POST",
    "http://localhost:5002/api/register",
    UserSchema,
    data
  );

  if (!response.success) {
    if (response.status === 409) {
      showError(
        `Email is already registered</br><button id="back" class="btn btn-secondary">Back to homepage</button>`
      );
      successDiv.innerHTML = "";
      const backButton = document.getElementById("back") as HTMLButtonElement;
      backButton.addEventListener("click", () => {
        window.location.reload();
      });
    }
  }
  return;
};

//error function
const showError = (message: string) => {
  errorDiv.innerHTML = message;
  errorDiv.style.display = "block";
};

//form validation on Input

let errorMessage = "";

const checkValidity = () => {
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    emailField.value.trim()
  );
  const isPasswordValid = passwordField.value.trim().length > 5;
  const isConfirmationValid =
    passwordConfirmationField.value.trim() === passwordField.value.trim();

  registerButton.disabled = !(
    isValidEmail &&
    isPasswordValid &&
    isConfirmationValid
  );
};

emailField.addEventListener("input", () => {
  const email = emailField.value.trim();
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (isValidEmail) {
    emailField.classList.remove("error");
    emailField.classList.add("success");

    errorMessage = "";
    errorDiv.innerHTML = "";
  } else {
    emailField.classList.remove("success");
    emailField.classList.add("error");

    errorMessage = "Invalid email";
    showError(errorMessage);
  }
  checkValidity();
});

passwordField.addEventListener("input", () => {
  const password = passwordField.value.trim();
  if (password.length > 5) {
    passwordField.classList.remove("error");
    passwordField.classList.add("success");

    errorMessage = "";
    errorDiv.innerHTML = "";
  } else {
    passwordField.classList.remove("success");
    passwordField.classList.add("error");

    errorMessage = "Password must be at least 5 characters";
    showError(errorMessage);
  }
  checkValidity();
});

passwordConfirmationField.addEventListener("input", () => {
  const password = passwordField.value.trim();
  const confirmPassword = passwordConfirmationField.value.trim();
  if (password === confirmPassword) {
    passwordConfirmationField.classList.remove("error");
    passwordConfirmationField.classList.add("success");

    errorMessage = "";
    errorDiv.innerHTML = "";
  } else {
    passwordConfirmationField.classList.remove("success");
    passwordConfirmationField.classList.add("error");

    errorMessage = "Password and confirmation don't match";
    showError(errorMessage);
  }
  checkValidity();
});

registerButton.addEventListener("click", async () => {
  const email = emailField.value.trim();
  const password = passwordField.value.trim();
  const confirmPassword = passwordConfirmationField.value.trim();

  userData = { email, password, confirmPassword };
  await postData(userData);
  registrationForm.style.display = "none";
  successDiv.style.display = "block";
});
backToHomePageButton.addEventListener("click", () => {
  window.location.reload();
});
