// verify that email input is of valid email type
function validateEmail(emailInput) {
  const emailRegex = /^[a-zA-Z0-9._%+-]{2,30}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailRegex.test(emailInput)) {
    return true;
  } else {
    return false;
  }
}

// validate username input that matches any alphanumeric character
// (upper and lowercase) or underscores or hyphens and between 4, 12 chars
function validateUserName(userNameInput) {
  const userNameRegex = /^[a-zA-Z0-9_-]{4,12}$/;

  if (userNameRegex.test(userNameInput)) {
    return true;
  } else {
    return false;
  }
}

// verify that password input includes at least one numerical,
// special char, uppercase, lowercase and is between 8, 16 chars
function validatePassword(passwordInput) {
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[~`!@#$%^&*()\-=_+[\]{};':"\\|,.<>/?])(?=.*[A-Z])(?=.*[a-z]).{8,16}$/;

  if (passwordRegex.test(passwordInput)) {
    return true;
  } else {
    return false;
  }
}

// checks if the text field is not black on blur
export function isEmptyInput(state) {
  if (state.length === 0) {
    return true;
  }
}

// define the text field that needs validation and validate whether the input conforms to the regex pattern
export function validateInput(inputValue, state) {
  switch (state) {
    case 'userName':
      return validateUserName(inputValue);
    case 'email':
      return validateEmail(inputValue);
    case 'password':
      return validatePassword(inputValue);
  }
}
