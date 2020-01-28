const list = document.querySelector(".route-list");

const addresses = Array.from(document.querySelectorAll(".route-list--address"));

console.log(addresses);

// init state
const state = {};

//populate state
for (i = 0; i < addresses.length; ++i) {
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
  console.log(elem.tagName);

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
      console.log((progress / total) * 100);
      break;
    }
    case /BUTTON|button|svg|path/.test(elem.tagName): {
      let findKeyByBubble = elem => {
        if (elem.tagName == "button" || elem.tagName == "BUTTON") {
          return getKey(elem, "icon");
        } else {
          let num = e.target.tagName == "svg" ? 1 : 2;
          let findButton = e.path[num];
          return getKey(findButton, "icon");
        }
      };

      let key = findKeyByBubble(elem);

      state[key].open = !state[key].open;
      let action = state[key].open ? "block" : "none";

      getElementByKey(key, "details").style.display = action;

      break;
    }
  }
};

list.addEventListener("click", e => handleClick(e));
