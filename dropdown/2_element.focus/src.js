let expanded = false;
let selectedItemId = -1;
const dropdownElement = document.querySelector(".dropdown-control");
const dropdownItemCount = document.querySelectorAll(".dropdown-item").length;
const dropdownItemElements = buttonElement.querySelectorAll(".dropdown-item");

const toggleDropdown = () => {
  if (expanded) {
    expanded = false;
    // ドロップダウンアイテムのDOMを削除する
  } else {
    expanded = true;
    // ドロップダウンのアイテムのDOMを追加する
    // 動的に追加するときはaria-setsize/aria-posinsetの値を適切に設定する
  }
  buttonElement.setAttribute("aria-expanded", expanded);
};

const shouldChangeItem = (key) => {
  return (
    key === "ArrowDown" || key === "ArrowUp" || key === "Home" || key === "End"
  );
};

const shouldToggleDropdown = (key) => {
  return key === " " || key === "Enter";
};

const setSelectItemID = (key) => {
  switch (key) {
    case "ArrowDown":
      selectedItemId++;
      if (selectedItemId >= dropdownItemCount) selectedItemId = 0;
      break;
    case "ArrowUp":
      selectedItemId--;
      if (selectedItemId < 0) selectedItemId = dropdownItemCount - 1;
      break;
    case "Home":
      selectedItemId = 0;
      break;
    case "End":
      selectedItemId = dropdownItemCount - 1;
      break;
    default:
      break;
  }
};

const changeSelectItem = (itemID) => {
  dropdownItemElements.forEach((itemElement) => {
    itemElement.removeAttribute("aria-selected");
    itemElement.classList.remove("selected");
    itemElement.setAttribute("tabindex", -1);
  });
  dropdownItemElements[itemID].setAttribute("aria-selected", true);
  dropdownItemElements[itemID].classList.add("selected");
  dropdownItemElements[itemID].setAttribute("tabindex", 0);
  dropdownItemElements[itemID].focus();
};

const handleKeyDown = (e) => {
  const key = e.key;
  if (shouldChangeItem(key)) {
    setSelectItemID(key);
    if (!expanded) toggleDropdown();
    changeSelectItem(selectedItemId);
  }
  if (shouldToggleDropdown(key)) {
    toggleDropdown();
  }
};

dropdownItemElements.forEach((dropdownItemElement) =>
  dropdownItemElement.addEventListener("keydown", handleKeyDown)
);
