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
  targetElement.getAttribute("aria-expanded") === "true";

const setSelected = (targetElement) => {
  getTreeAllItemElements().forEach((itemElement) => {
    itemElement.setAttribute("aria-selected", false);
    itemElement.classList.remove("selected");
  });
  targetElement.setAttribute("aria-selected", true);
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
      e.preventDefault();
      break;
    case "ArrowUp":
      backFocus();
      e.preventDefault();
      break;
    case "ArrowLeft":
      if (shouldMoveParent(e.target)) {
        setFocusable(
          document.activeElement.closest(".tree").previousElementSibling
        );
      } else {
        setExpanded(e.target, false);
      }
      e.preventDefault();
      break;
    case "ArrowRight":
      setExpanded(e.target, true);
      e.preventDefault();
      break;
    case " ":
    case "Enter":
      setExpanded(e.target, !isExpanded(e.target));
      setSelected(e.target);
      // 右ペインに選択したユーザ一覧を描画
      e.preventDefault();
      break;
    default:
      break;
  }
};

const handleClick = (e) => {
  setSelected(e.target);
  setExpanded(e.target, !isExpanded(e.target));
};

getTreeElement().addEventListener("keydown", handleKeyDown);
getTreeAllItemElements().forEach((element) =>
  element.addEventListener("click", handleClick)
);
