"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, (response) => {
    console.log(response);
    if (response.success) {
      location.reload();
    } else {
      setLoginErrorMessage(message);
    }
  });
}

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (response) => {
    if (response.success) {
      location.reload();
    } else {
      setRegisterErrorMessage(response.error);
    }
  });
}
