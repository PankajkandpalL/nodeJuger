const passValidate = (password) => {
    const UpperCase = /[A-Z]/;
    const Number = /[0-9]/;
    const SpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const hasUpperCase = UpperCase.test(password);
    const hasNumber = Number.test(password);
    const hasSpecialChar = SpecialChar.test(password);
    const isLengthValid = password.length >= 8;
  
    return hasUpperCase && hasNumber && hasSpecialChar && isLengthValid;
  };
  
  module.exports = {passValidate};
  