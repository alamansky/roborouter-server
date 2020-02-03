const list = document.querySelector(".route-list");

const addresses = Array.from(document.querySelectorAll(".route-list--address"));

// init state
const state = {};

//populate state
for (let i = 0; i < addresses.length; ++i) {
  state[addresses[i].dataset.address.split(":")[1]] = {
    checked: false,
    open: false
  };
}

const getKey = (elem, component) => elem.dataset[component].split(":")[1];

const getElementByKey = (key, component) =>
  document.querySelector(`[data-${component}='${component}:${key}']`);

let handleClick = e => {
  let elem = e.target;

  switch (true) {
    case /P|INPUT/.test(elem.tagName): {
      let key =
        elem.tagName == "P" ? getKey(elem, "address") : getKey(elem, "check");
      state[key].checked = !state[key].checked;

      if (state[key].checked) {
        getElementByKey(key, "address").style.textDecoration = "line-through";
        getElementByKey(key, "row").style.opacity = "0.5";
        getElementByKey(key, "check").checked = true;
      } else {
        getElementByKey(key, "address").style.textDecoration = "none";
        getElementByKey(key, "row").style.opacity = "1";
        getElementByKey(key, "check").checked = false;
      }

      let progress = 0;
      let total = 0;
      for (let [key, value] of Object.entries(state)) {
        value.checked && ++progress;
        ++total;
      }
      document.querySelector(".progress-bar").style.width = `${(progress /
        total) *
        100}%`;
      break;
    }
    case /BUTTON|button/.test(elem.tagName): {
      let key = getKey(elem, "icon");
      state[key].open = !state[key].open;

      if (state[key].open) {
        getElementByKey(key, "details").classList.add("visible");
      } else {
        getElementByKey(key, "details").classList.remove("visible");
      }

      break;
    }
  }
};

list.addEventListener("click", e => handleClick(e));
