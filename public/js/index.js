const submitButton = document.querySelector("#submit");
const body = document.querySelector("body");

const input = document.querySelector("#FSR");

let handleChange = e => {
  e.preventDefault();
  submitButton.href = `${submitButton.dataset.endpoint}/${input.value}`;
};

input.addEventListener("input", e => handleChange(e));
body.addEventListener("keydown", e => {
  if (e.keyCode == 13) {
    e.preventDefault();
    window.location = `${submitButton.dataset.endpoint}/${input.value}`;
  }
});
