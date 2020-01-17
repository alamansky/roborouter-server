const config = require("../../config");

const submitButton = document.querySelector("#submit");

const input = document.querySelector("#FSR");

let handleChange = e => {
  submitButton.href = `${config.app}/${input.value}`;
};

input.addEventListener("input", e => handleChange(e));
