function getRootTreeEl() {
  return document.querySelector(".tree");
}

function getSubTreeEl(itemEl) {
  return itemEl.querySelector(".tree");
}

function getAllTreeEls() {
  return document.querySelectorAll(".tree");
}

function hasSubTree(itemEl) {
  return !!itemEl.querySelector(".tree");
}

function hasParentTree(itemEl) {
  return !!itemEl.closest(".tree").parentNode.closest(".tree");
}

function getFirstItemEl() {
  return document.querySelector(".treeitem");
}

function getActiveItemEl() {
  return document.activeElement.closest(".treeitem");
}

function getActiveItemNavEl() {
  return document.activeElement.closest(".treeitem-nav");
}

function getParentEl() {
  return getActiveItemEl().closest(".tree").parentElement;
}

function getAllItemEls() {
  return document.querySelectorAll(".treeitem");
}

function getAllNavEls() {
  return document.querySelectorAll(".treeitem-nav");
}

function getChildItemEls(treeEl) {
  return treeEl.children;
}

function getAllButtonEls() {
  return document.querySelectorAll(".treeitem-button");
}

function getAllLinkEls() {
  return document.querySelectorAll(".treeitem-link");
}

function getCheckboxEl(itemEl) {
  return itemEl.querySelector(".treeitem-checkbox");
}

function isExpanded(itemEl) {
  return itemEl.getAttribute("aria-expanded") === "true";
}

function getVisibleItemEls() {
  var itemEls = Array.from(getAllItemEls());
  // See: https://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom
  return itemEls.filter(function (el) {
    return el.offsetParent !== null;
  });
}

function findNewFocusedItem(delta) {
  var itemEls = getVisibleItemEls();
  var currentItemId = itemEls.findIndex(function (el) {
    return el === document.activeElement;
  });
  if (currentItemId === -1) {
    return itemEls[0];
  }
  var itemIdMax = itemEls.length - 1;
  var itemId = currentItemId + delta;
  if (itemId < 0) itemId = itemIdMax;
  if (itemId > itemIdMax) itemId = 0;
  return itemEls[itemId];
}

function shouldMoveParent(itemEl) {
  return (
    hasParentTree(itemEl) &&
    (!getSubTreeEl(itemEl) || getSubTreeEl(itemEl).hasAttribute("hidden"))
  );
}

function setFocusable(itemEl) {
  var itemEls = Array.from(getAllItemEls());
  itemEls.forEach(function (el) {
    el.setAttribute("tabindex", -1);
  });
  itemEl.setAttribute("tabindex", 0);
  return itemEl;
}

function forwardFocus() {
  setFocusable(findNewFocusedItem(+1)).focus();
}

function backwardFocus() {
  setFocusable(findNewFocusedItem(-1)).focus();
}

function setExpanded(itemEl, expanded) {
  if (!hasSubTree(itemEl)) {
    return;
  }
  itemEl.setAttribute("aria-expanded", expanded);
  const subTreeEl = getSubTreeEl(itemEl);
  if (expanded) {
    subTreeEl.removeAttribute("hidden");
  } else {
    subTreeEl.setAttribute("hidden", "hidden");
  }
}

function setAllExpanded(expanded) {
  Array.from(getAllItemEls()).forEach(function (itemEl) {
    setExpanded(itemEl, expanded);
  });
}

function toggleExpanded(itemEl) {
  setExpanded(itemEl, !isExpanded(itemEl));
}

function setAllNavSelected(selected) {
  Array.from(getAllNavEls()).forEach(function (navEl) {
    toggleNavSelected(navEl, selected);
  });
}

function toggleNavSelected(itemEl, selected) {
  itemEl.classList.toggle('selected', selected); //読み上げの邪魔になるのでaria-selectedは敢えて使わない。
}

function clickCheckbox() {
  const activeEl = getActiveItemEl();
  getCheckboxEl(activeEl).click();
  activeEl.setAttribute(
    "aria-checked",
    activeEl.getAttribute("aria-checked") === "true" ? "false" : "true"
  );
}

function handleKeyDown(evt) {
  switch (evt.key) {
    case "ArrowDown":
    case "Down":
      forwardFocus();
      evt.preventDefault();
      break;
    case "ArrowUp":
    case "Up":
      backwardFocus();
      evt.preventDefault();
      break;
    case "ArrowRight":
    case "Right":
      setExpanded(getActiveItemEl(), true);
      evt.preventDefault();
      break;
    case "ArrowLeft":
    case "Left":
      if (shouldMoveParent(getActiveItemEl())) {
        setFocusable(getParentEl()).focus();
      } else {
        setExpanded(getActiveItemEl(), false);
      }
      evt.preventDefault();
      break;
    case "Enter":
    case " ":
      clickCheckbox();
      setExpanded(getActiveItemEl(), true);
      break;
  }
  console.log(evt.key);
}

function handleButtonClick(evt) {
  toggleExpanded(getActiveItemEl());
  evt.stopPropagation();
}

function handleLinkClick(evt) {
  setAllNavSelected(false);
  toggleNavSelected(getActiveItemNavEl());
  setExpanded(getActiveItemEl(), true);
  evt.preventDefault();
  evt.stopPropagation();
}

getRootTreeEl().addEventListener("keydown", handleKeyDown);
Array.from(getAllButtonEls()).forEach(function (buttonEl) {
  buttonEl.addEventListener("click", handleButtonClick);
});
Array.from(getAllLinkEls()).forEach(function (linkEl) {
  linkEl.addEventListener("click", handleLinkClick);
});
setFocusable(getFirstItemEl());
setAllExpanded(true);
