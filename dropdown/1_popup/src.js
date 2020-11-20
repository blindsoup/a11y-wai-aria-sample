let expanded = false;
let selectedItemId = -1;
const buttonElement = document.querySelector("button");
const dropdownElement = document.querySelector(".dropdown-control");
const dropdownItemCount = document.querySelectorAll(".dropdown-item").length;

const toggleDropdown = () => {
  if (expanded) {
    buttonElement.setAttribute(
      "aria-labelledby",
      `dropdown-description dropdown-item-${selectedItemId}`
    );
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    dropdownItems.forEach((item) => {
      item.setAttribute("aria-checked", false);
      item.classList.remove("checked");
    });
    buttonElement.textContent = dropdownItems[selectedItemId].textContent;
    dropdownItems[selectedItemId].setAttribute("aria-checked", true);
    dropdownElement.removeAttribute("hidden");
    expanded = false;
    buttonElement.setAttribute("aria-expanded", false);
  } else {
    expanded = true;
    dropdownElement.setAttribute("hidden", "hidden");
    buttonElement.setAttribute("aria-expanded", true);
  }
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
  buttonElement.setAttribute(
    "aria-activedescendant",
    `dropdown-item-${itemID}`
  );
  buttonElement.setAttribute("aria-owns", `dropdown-item-${itemID}`);
};

const handleKeyDown = (e) => {
  const key = e.key;
  if (shouldChangeItem(key)) {
    setSelectItemID(key);
    changeSelectItem(selectedItemId);
  }
  if (shouldToggleDropdown(key)) {
    toggleDropdown();
  }
};

handleClick = (e) => {
  toggleDropdown();
};

buttonElement.addEventListener("click", handleClick);
buttonElement.addEventListener("keydown", handleKeyDown);
