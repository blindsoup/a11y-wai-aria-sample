(() => {
  let selectedID = 0;

  const getListboxElement = () => document.querySelector(".dialog-listbox");

  const getAllListItems = () => document.querySelectorAll(".dialog-list-item");

  const getNewItemID = (key) => {
    const listItemCount = getAllListItems().length;
    switch (key) {
      case "ArrowDown":
        selectedID++;
        if (selectedID >= listItemCount) selectedID = 0;
        break;
      case "ArrowUp":
        selectedID--;
        if (selectedID < 0) selectedID = listItemCount - 1;
        break;
      case "Home":
        selectedID = 0;
        break;
      case "End":
        selectedID = listItemCount - 1;
        break;
      default:
        break;
    }
    return selectedID;
  };

  const setTargetItem = (targetID) => {
    getListboxElement().setAttribute(
      "aria-activedescendant",
      `dialog-list-item-${targetID}`
    );
  };

  const handleClick = (e) => {
    e.target.setAttribute(
      "aria-selected",
      e.target.getAttribute("aria-selected") === "true" ? false : true
    );
  };

  const setSelected = () => {
    getAllListItems()[selectedID].click();
  };

  const handleKeydown = (e) => {
    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp":
      case "Home":
      case "End":
        setTargetItem(getNewItemID(e.key));
        e.preventDefault();
        break;
      case " ":
      case "Enter":
        setSelected();
        e.preventDefault();
        break;
      default:
        break;
    }
  };

  getListboxElement().addEventListener("keydown", handleKeydown, true);
  getAllListItems().forEach((element) =>
    element.addEventListener("click", handleClick)
  );
})();
