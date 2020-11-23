(() => {
  let selectedID = 0;

  const getListboxElement = () => document.querySelector(".dialog-listbox");

  const getAllListItems = () => document.querySelectorAll(".dialog-list-item");

  const getNewItemElement = (key) => {
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
    return getAllListItems()[selectedID];
  };

  const setFocusable = (targetElement) => {
    getAllListItems().forEach((element) =>
      element.setAttribute("tabindex", -1)
    );
    targetElement.setAttribute("tabindex", 0);
    targetElement.focus();
  };

  const setSelected = (targetElement) => {
    targetElement.setAttribute(
      "aria-selected",
      targetElement.getAttribute("aria-selected") === "true" ? false : true
    );
  };

  const handleKeydown = (e) => {
    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp":
      case "Home":
      case "End":
        setFocusable(getNewItemElement(e.key));
        break;
      case " ":
      case "Enter":
        setSelected(e.target);
        break;
      default:
        break;
    }
  };

  getListboxElement().addEventListener("keydown", handleKeydown);
})();
