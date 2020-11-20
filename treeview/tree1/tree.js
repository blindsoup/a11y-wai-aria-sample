function getRootTreeEl() {
  return document.querySelector('.tree');
}

function getSubTreeEl(itemEl) {
  return itemEl.querySelector('.tree');
}

function getAllTreeEls() {
  return document.querySelectorAll('.tree');
}

function hasSubTree(itemEl) {
  return !!itemEl.querySelector('.tree');
}

function getFirstItemEl() {
  return document.querySelector('.treeitem');
}

function getActiveItemEl() {
  return document.activeElement.closest('.treeitem');
}

function getAllItemEls() {
  return document.querySelectorAll('.treeitem'); 
}

function getChildItemEls(treeEl) {
  return treeEl.children;
}

function getAllButtonEls() {
  return document.querySelectorAll('.treeitem-button');
}

function getLinkEl(itemEl) {
  return itemEl.querySelector('a');
}

function isExpanded(itemEl) {
  return itemEl.getAttribute('aria-expanded') === 'true';
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

function setFocusable(itemEl) {
  var itemEls = Array.from(getAllItemEls());
  itemEls.forEach(function(el) {
    el.setAttribute('tabindex', -1);
  });
  itemEl.setAttribute('tabindex', 0);
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
  itemEl.setAttribute('aria-expanded', expanded);
  const subTreeEl = getSubTreeEl(itemEl);
  if (expanded) {
    subTreeEl.removeAttribute('hidden');
  } else {
    subTreeEl.setAttribute('hidden','hidden');
  }
}

function setAllExpanded(expanded) {
  Array.from(getAllItemEls()).forEach(function(itemEl) {
    setExpanded(itemEl, expanded);
  });
}

function toggleExpanded(itemEl) {
  setExpanded(itemEl, !isExpanded(itemEl));
}

function openLink() {
  getLinkEl(getActiveItemEl()).click();
}

// function setPosinsetAndSize() {
//   const treeEls = Array.from(getAllTreeEls());
//   treeEls.forEach(function(treeEl) {
//     const itemEls = Array.from(getChildItemEls(treeEl));
//     itemEls.forEach(function(itemEl, index, itemEls) {
//       itemEl.setAttribute('aria-posinset', index + 1);
//       itemEl.setAttribute('aria-setsize', itemEls.length);
//     });
//   });
// }

// function setLevel() {
//   function setLevelRec(itemEl, level) {
//     itemEl.setAttribute('aria-level', level);
//     if (!hasSubTree(itemEl)) {
//       return;
//     }
//     const childItemEls = Array.from(getChildItemEls(getSubTreeEl(itemEl)));
//     childItemEls.forEach(function(childItemEl) {
//       setLevelRec(childItemEl, level+1);
//     });
//   }
//   setLevelRec(getFirstItemEl(), 100);
// }

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
      setExpanded(getActiveItemEl(), false);
      evt.preventDefault();
      break;
    case "Enter":
    case "Space":
      openLink();
      break;
  }  
  console.log(evt.key);
}

function handleButtonClick(evt) {
  toggleExpanded(getActiveItemEl());
  evt.stopPropagation();
}

getRootTreeEl().addEventListener('keydown', handleKeyDown);
Array.from(getAllButtonEls()).forEach(function(buttonEl) {
  buttonEl.addEventListener('click', handleButtonClick);
});
setFocusable(getFirstItemEl());
setAllExpanded(true);
//setPosinsetAndSize();
// setLevel();