const getTreeElement = () => document.querySelector(".tree");

const getTreeAllItemElements = () => document.querySelectorAll(".tree-item");

const getTreeFirstItemElement = () => document.querySelector(".tree-item");

const getSubTreeElement = (targetElement) =>
  targetElement.querySelector(".tree");

const nextFocus = () => {
  alert("f");
};

const setFocusable = (targetElement) => {
  getTreeAllItemElements().forEach((itemElement) =>
    itemElement.setAttribute("tabindex", -1)
  );
  targetElement.setAttribute("tabindex", 0);
};

const handleKeyDown = (e) => {
  switch (e.key) {
    case "ArrowDown":
      nextFocus();
      break;
    default:
      break;
  }
};

const setExpanded = (targetElement, expand) => {
  const subtreeElement = getSubTreeElement(targetElement);
  if (!subtreeElement) return;
  targetElement.setAttribute("aria-expanded", expand);
  if (expand) {
    subtreeElement.setAttribute("hidden", "hidden");
  } else {
    subtreeElement.removeAttribute("hidden");
  }
};

const setSelected = (targetElement) => {
  getTreeAllItemElements().forEach((itemElement) =>
    itemElement.setAttribute("aria-checked", false)
  );
  targetElement.setAttribute("aria-checked", true);
};
setFocusable(getTreeFirstItemElement());
getTreeElement().addEventListener("keydown", handleKeyDown);
