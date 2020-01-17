const table = document.querySelector("#routeTable");

let handleHoverState = e => {
  e.path[1].style.backgroundColor == "rgb(200, 200, 200)"
    ? (e.path[1].style.backgroundColor = "white")
    : (e.path[1].style.backgroundColor = "rgb(200, 200, 200)");

  e.path[1].style.opacity == "0.5"
    ? (e.path[1].style.opacity = "1")
    : (e.path[1].style.opacity = "0.5");
  console.log(e.path[1]);
  console.log(e);
  window.scrollTo({
    top: e.pageY,
    left: 0,
    behavior: "smooth"
  });
};

table.addEventListener("click", e => handleHoverState(e));
