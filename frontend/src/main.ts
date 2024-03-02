import "./style.css";

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

type User = { email: string; password: string; confirmPassword: string };

//post function
const postData = async (data: User) => {
  let response = null;
  try {
    response = await fetch("http://localhost:5002/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    registrationForm.style.display = "none";
    successDiv.style.display = "block";
  } catch (error) {
    console.error;
    showError("There was a problem with the registration");
  }
  //if no internet, network error
  if (response === null) return alert("network error");

  //if body input is invalid
  if (response.status >= 400 && response.status < 500)
    return alert("Invalid body input");

  //if server has error
  if (response.status >= 500) return alert("server error");

  alert("Success");
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

//register function
const registerFunction = () => {};
