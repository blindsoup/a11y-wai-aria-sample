let expanded = false;
let selectedMenuItemId = -1;

const buttonEl = document.querySelector(".button");
const menuEl = document.querySelector(".menu");
const menuItemCount = document.querySelectorAll(".menuitem").length;

const toggleMenu = (expanded) => {
  buttonEl.setAttribute("aria-expanded", expanded);
  menuEl.hidden = !expanded;
};

const handleClick = () => {
  toggleMenu(!expanded);
};

const shouldChangeMenuItem = (key) => {
  return key === "ArrowDown" || key === "ArrowUp";
};

const setSelectedMenuItemId = (key) => {
  switch (key) {
    case "ArrowDown":
      selectedMenuItemId++;
      if (selectedMenuItemId >= menuItemCount) {
        selectedMenuItemId = 0;
      }
      break;
    case "ArrowUp":
      selectedMenuItemId--;
      if (selectedMenuItemId < 0) {
        selectedMenuItemId = menuItemCount - 1;
      }
      break;
    default:
      break;
  }
};

const selectMenuitem = () => {
  const menuitemEls = document.querySelectorAll(".menuitem");
  menuitemEls.forEach((menuitemEl) => {
    menuitemEl.classList.remove("menuitem-selected");
  });
  menuitemEls[selectedMenuItemId].classList.add("menuitem-selected");
  buttonEl.setAttribute(
    "aria-activedescendant",
    "menuitem-" + selectedMenuItemId
  );
  buttonEl.setAttribute("aria-owns", "menuitem-" + selectedMenuItemId);
};

const handleKeyDown = (evt) => {
  const key = evt.key;
  if (shouldChangeMenuItem(key)) {
    setSelectedMenuItemId(key);
    selectMenuitem();
    console.log(selectedMenuItemId);
    evt.preventDefault();
  }
};

buttonEl.addEventListener("click", handleClick);
buttonEl.addEventListener("keydown", handleKeyDown);
toggleMenu(expanded);
