const submitButton = document.querySelector("#submit");

const input = document.querySelector("#FSR");

let handleChange = e => {
  submitButton.href = `http://localhost:3000/${input.value}`;
  console.log(submitButton.href);
};

input.addEventListener("input", e => handleChange(e));
