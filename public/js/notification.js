let dash = document.querySelector("#dash");

let handleCloseClick = e => {
  if (e.target.id) {
    let elem = document.querySelector(`#${e.target.id}`);
    elem && elem.parentNode.classList.add("invisible");
  }
};

dash.addEventListener("click", e => handleCloseClick(e));
