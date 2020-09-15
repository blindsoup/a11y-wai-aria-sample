let expanded = false;
let selectedMenuItemId = -1;

const inputEl = document.querySelector(".input");
const menuEl = document.querySelector(".menu");
const menuItemCount = document.querySelectorAll(".menuitem").length;

const toggleMenu = (expanded) => {
  inputEl.setAttribute("aria-expanded", expanded);
  menuEl.hidden = !expanded;
};

const shouldChangeMenuItem = (key) => {
  return key === "ArrowDown" || key === "ArrowUp";
};

const shouldCloseMenu = (key) => {
  return key === "Escape" || key === "Enter";
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
  inputEl.setAttribute(
    "aria-activedescendant",
    "menuitem-" + selectedMenuItemId
  );
  inputEl.setAttribute("aria-owns", "menuitem-" + selectedMenuItemId);
};

const handleKeyDown = (evt) => {
  toggleMenu(!expanded);
  const key = evt.key;
  if (shouldChangeMenuItem(key)) {
    setSelectedMenuItemId(key);
    selectMenuitem();
  }
  if (shouldCloseMenu(key)) {
    toggleMenu(false);
  }
};

inputEl.addEventListener("keydown", handleKeyDown);
toggleMenu(expanded);

// メニューアイテムのホバースタイル
const menuitemContainers = document.querySelectorAll(".menuitem-container");
menuitemContainers.forEach((menuitemContainer) => {
  const menuitem = menuitemContainer.querySelector(".menuitem");
  menuitem.addEventListener("mouseenter", () => {
    menuitemContainer.classList.add("hovered");
  });
  menuitem.addEventListener("mouseout", () => {
    menuitemContainer.classList.remove("hovered");
  });
});
