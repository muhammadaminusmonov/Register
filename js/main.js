let usernameEl = document.getElementById("username");
let passwordEl = document.getElementById("password");
let confirmPasswordEl = document.getElementById("confirm-password");
let emailEl = document.querySelector("#email");
let form = document.getElementById("form");

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//In the event listener, you need to call the e.preventDefault() to prevent the form from submitting once the submit button is clicked.
form.addEventListener("submit", function (e) {
  // prevent the form from submitting
  e.preventDefault();
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//The following isRequired() function returns true if the input argument is empty:
const isRequired = (value) => (value === "" ? false : true);

//The following isBetween() function returns false if the length argument is not between the min and max argument:
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

//To check the email is valid, you’ll use a regular expression:
const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

//To check if a password is strong, which match a specified pattern, you’ll also use a regular expression:
const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};

//The following table illustrates the meaning of each part of the regular expression used to validate the password:
// ^	The password starts
// (?=.*[a-z])	The password must contain at least one lowercase character
// (?=.*[A-Z])	The password must contain at least one uppercase character
// (?=.*[0-9])	The password must contain at least one number
// (?=.*[!@#$%^&*])	The password must contain at least one special character.
// (?=.{8,})	The password must be eight characters or longer

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//The following showError() function highlights the border of the input field and displays an error message if the input field is invalid:
const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;
  // add the error class
  formField.classList.remove("success");
  formField.classList.add("error");
  // show the error message
  const error = formField.querySelector("small");
  error.textContent = message;
};
//How it works.

//First, get the parent element of the input field, which is the <div> element that contains the form-field class:
// const formField = input.parentElement;

//Second, remove the success class and add the error class to the form-field element:
// formField.classList.remove('success');
// formField.classList.add('error');

//Third, select the <small> element inside the form-field element:
// const error = formField.querySelector('small');

//!!!Notice that you use the formField.querySelector() instead of the document.querySelector().!!!

// Finally, set the error message to its textContent property of the <small> element:
// error.textContent = message;

//The function that shows the success indicator is similar to the showError() function:
const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove("error");
  formField.classList.add("success");

  // hide the error message
  const error = formField.querySelector("small");
  error.innerText = "Cool! Keep going";
};

//Unlike the showError() function, the showSuccess() function removes the error class, adds the success class, and set the error message to blank.
//Now, you can use the utility function above to check for each field.

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//Develop input field validating functions

//1) Validate the username field
// The following checkUsername() function uses:
// The isRequired() function to check if the username is provided.
// The isBetween() function to check if the length of the username is between 3 and 25 characters.
// The showError() and showSuccess() functions to show the error and success indicator.
// The function returns true if the field passes the checks.
const checkUsername = () => {
  let valid = false;
  const min = 3,
    max = 25;
  const username = usernameEl.value.trim();

  if (!isRequired(username)) {
    showError(usernameEl, "Username cannot be blank.");
  } else if (!isBetween(username.length, min, max)) {
    showError(
      usernameEl,
      `Username must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(usernameEl);
    valid = true;
  }
  return valid;
};

//2) Validate the email field
// The checkEmail() function returns true if the email is provided and valid.
// It uses the isRequired() and isEmailValid() functions for checking. And it uses the showError() and showSuccess() functions to provide feedback in case of error and success.
const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Email cannot be blank.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Email is not valid.");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

//3) Validate the password field
// The following checkPassword() function checks the password field if it is provided and match the required format:
const checkPassword = () => {
  let valid = false;

  const password = passwordEl.value.trim();

  if (!isRequired(password)) {
    showError(passwordEl, "Password cannot be blank.");
  } else if (!isPasswordSecure(password)) {
    showError(
      passwordEl,
      "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
    );
  } else {
    showSuccess(passwordEl);
    valid = true;
  }

  return valid;
};

//4) Validate the confirm password field
// The checkConfirmPassword() function checks if the confirm password is the same as the password.
const checkConfirmPassword = () => {
  let valid = false;
  // check confirm password
  const confirmPassword = confirmPasswordEl.value.trim();
  const password = passwordEl.value.trim();

  if (!isRequired(confirmPassword)) {
    showError(confirmPasswordEl, "Please enter the password again");
  } else if (password !== confirmPassword) {
    showError(confirmPasswordEl, "Confirm password does not match");
  } else {
    showSuccess(confirmPasswordEl);
    valid = true;
  }

  return valid;
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Modifying the submit event handler
// Now, you can use the functions that validate the input fields in the submit event handler:

form.addEventListener("submit", function (e) {
  // prevent the form from submitting
  e.preventDefault();

  // validate forms
  let isUsernameValid = checkUsername(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword();

  let isFormValid =
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;

  // submit to the server if the form is valid
  if (isFormValid) {
  }
});

// How it works:
// First, call each individual function to validate username, email, password, and confirm password fields.
// Second, use the && operator to determine if the form is valid. The form is valid only if all fields are valid.
// Finally, submit data to the server if the form is valid specified the isFormValid flag. Note that submitting form data to the server isn’t covered in this tutorial.

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Add Instant feedback feature
// To provide instant feedback, you can attach an event listener to the input event of each field and validate it.
//It’s even better to use the event delegation so that you attach the input event listener to the form and validate each field based on the current field id, like this:
form.addEventListener("input", function (e) {
  switch (e.target.id) {
    case "username":
      checkUsername();
      break;
    case "email":
      checkEmail();
      break;
    case "password":
      checkPassword();
      break;
    case "confirm-password":
      checkConfirmPassword();
      break;
  }
});

//Technically, you’ll wait for the users to pause the typing for a small amount of time or stop typing before validating the input.
// The following illustrates the debounce() function:
// const debounce = (fn, delay = 500) => {
//   let timeoutId;
//   return (...args) => {
//     // cancel the previous timer
//     if (timeoutId) {
//       clearTimeout(timeoutId);
//     }
//     // setup a new timer
//     timeoutId = setTimeout(() => {
//       fn.apply(null, args);
//     }, delay);
//   };
// };

//Now, you can pass the input event handler to the debounce() function to debounce it:
// form.addEventListener(
//   "input",
//   debounce(function (e) {
//     switch (e.target.id) {
//       case "username":
//         checkUsername();
//         break;
//       case "email":
//         checkEmail();
//         break;
//       case "password":
//         checkPassword();
//         break;
//       case "confirm-password":
//         checkConfirmPassword();
//         break;
//     }
//   })
// );
//If you enter data to a form field to trigger the input event, you’ll see that the error or success message will have a bit of delay.
