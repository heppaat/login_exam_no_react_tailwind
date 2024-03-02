import "./style.css";
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
  "backToHomepage"
) as HTMLButtonElement;
const errorDiv = document.getElementById("errorDiv") as HTMLDivElement;
