const getTreeElement = () => document.querySelector(".tree");

const getTreeAllItemElements = () => document.querySelectorAll(".tree-item");

const getTreeFirstItemElement = () => document.querySelector(".tree-item");

const getSubTreeElement = (targetElement) =>
  targetElement.parentNode.querySelector(".tree");

const hasParentTree = (targetElement) =>
  !!targetElement.closest(".tree").parentNode.closest(".tree");

const getVisibleTreeElements = () => {
  return [...getTreeAllItemElements()].filter((element) => {
    return !!element.offsetParent;
  });
};

const findNewTreeItem = (index) => {
  const visibleTreeElements = getVisibleTreeElements();
  const activeElementID = visibleTreeElements.findIndex((element) => {
    return element === document.activeElement;
  });
  let newElementID = activeElementID + index;
  if (newElementID < 0) newElementID = visibleTreeElements.length - 1;
  if (newElementID >= visibleTreeElements.length) newElementID = 0;
  return visibleTreeElements[newElementID];
};

const nextFocus = () => setFocusable(findNewTreeItem(1));

const backFocus = () => setFocusable(findNewTreeItem(-1));

const setFocusable = (targetElement) => {
  getTreeAllItemElements().forEach((itemElement) =>
    itemElement.setAttribute("tabindex", -1)
  );
  targetElement.setAttribute("tabindex", 0);
  targetElement.focus();
};

const setExpanded = (targetElement, expand) => {
  const subtreeElement = getSubTreeElement(targetElement);
  if (!subtreeElement) return;
  targetElement.setAttribute("aria-expanded", expand);
  if (expand) {
    subtreeElement.removeAttribute("hidden");
  } else {
    subtreeElement.setAttribute("hidden", "hidden");
  }
};

const isExpanded = (targetElement) =>
  targetElement.getAttribute("aria-expanded");

const setSelected = (targetElement) => {
  getTreeAllItemElements().forEach((itemElement) => {
    itemElement.setAttribute("aria-checked", false);
    itemElement.classList.remove("selected");
  });
  targetElement.setAttribute("aria-checked", true);
  targetElement.classList.add("selected");
};

const shouldMoveParent = (targetElement) => {
  return (
    hasParentTree(targetElement) &&
    (!getSubTreeElement(targetElement) ||
      getSubTreeElement(targetElement).hasAttribute("hidden"))
  );
};

const handleKeyDown = (e) => {
  switch (e.key) {
    case "ArrowDown":
      nextFocus();
      break;
    case "ArrowUp":
      backFocus();
      break;
    case "ArrowLeft":
      if (shouldMoveParent(e.target))
        setFocusable(
          document.activeElement.closest(".tree").previousElementSibling
        );
      setExpanded(e.target, false);
      break;
    case "ArrowRight":
      setExpanded(e.target, true);
      break;
    case " ":
    case "Enter":
      setSelected(e.target);
      break;
    default:
      break;
  }
};

const handleClick = (e) => {
  setSelected(e.target);
};

setFocusable(getTreeFirstItemElement());
getTreeElement().addEventListener("keydown", handleKeyDown);
getTreeAllItemElements().forEach((element) =>
  element.addEventListener("click", handleClick)
);
