import "./style.css";
import { safeFetch } from "./http";
import { z } from "zod";

window.addEventListener("DOMContentLoaded", () => {
  const registrationForm = document.getElementById(
    "registrationForm"
  ) as HTMLDivElement;
  const emailField = document.getElementById("email") as HTMLInputElement;
  const passwordField = document.getElementById("password") as HTMLInputElement;
  const passwordConfirmationField = document.getElementById(
    "passwordConfirmation"
  ) as HTMLInputElement;
  const registerButton = document.getElementById(
    "register"
  ) as HTMLButtonElement;
  const successDiv = document.getElementById("successDiv") as HTMLDivElement;
  const backToHomePageButton = document.getElementById(
    "backToHomepage"
  ) as HTMLButtonElement;
  const errorDiv = document.getElementById("errorDiv") as HTMLDivElement;

  const UserSchema = z.object({
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  });

  type User = z.infer<typeof UserSchema>;

  let userData: any | null = null;

  //post function
  const postData = async (data: User) => {
    try {
      const response = await safeFetch(
        "POST",
        "http://localhost:5002/api/register",
        UserSchema,
        data
      );

      if (!response.success) return;
    } catch (error) {
      console.error;
    }
  };

  //error function
  const showError = (message: string) => {
    errorDiv.innerHTML = message;
    errorDiv.style.display = "block";
  };

  //show form function
  const showForm = () => {
    registrationForm.style.display = "block";
    successDiv.style.display = "none";
    errorDiv.style.display = "none";
    emailField.value = "";
    passwordField.value = "";
    passwordConfirmationField.value = "";
    errorDiv.innerHTML = "";
  };

  //form validation on Input

  emailField.addEventListener("input", () => {
    const email = emailField.value.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (isValidEmail) {
      emailField.classList.remove("error");
      emailField.classList.add("success");
    } else {
      emailField.classList.remove("success");
      emailField.classList.add("error");
    }
  });

  passwordField.addEventListener("input", () => {
    const password = passwordField.value.trim();
    if (password.length > 5) {
      passwordField.classList.remove("error");
      passwordField.classList.add("success");
    } else {
      passwordField.classList.remove("success");
      passwordField.classList.add("error");
    }
  });

  passwordConfirmationField.addEventListener("input", () => {
    const password = passwordField.value.trim();
    const confirmPassword = passwordConfirmationField.value.trim();
    if (password === confirmPassword) {
      passwordConfirmationField.classList.remove("error");
      passwordConfirmationField.classList.add("success");
    } else {
      passwordConfirmationField.classList.remove("success");
      passwordConfirmationField.classList.add("error");
    }
  });

  //register Function

  registerButton.addEventListener("click", async () => {
    const email = emailField.value.trim();
    const password = passwordField.value.trim();
    const confirmPassword = passwordConfirmationField.value.trim();

    let isValid = true;

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      isValid = false;
      showError("Invalid email");
      return;
    }

    if (password.length < 5) {
      isValid = false;
      showError("Password must be at least 5 characters");
      return;
    }

    if (password !== confirmPassword) {
      isValid = false;
      showError("Password and confirmation don't match");
      return;
    }

    registerButton.disabled = !isValid;

    if (isValid) {
      userData = { email, password, confirmPassword };
      await postData(userData);
      registrationForm.style.display = "none";
      successDiv.style.display = "block";
      errorDiv.innerHTML = "";
    } else {
      showError("Registration not successfull");
    }
  });
});
