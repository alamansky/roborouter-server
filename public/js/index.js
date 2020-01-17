const submitButton = document.querySelector("#submit");

const input = document.querySelector("#FSR");

let handleChange = e => {
  submitButton.href = `https://roborouter.herokuapp.com/${input.value}`;
};

input.addEventListener("input", e => handleChange(e));
