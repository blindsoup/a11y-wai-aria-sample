getAllTreeRadioEls = () => document.querySelectorAll('.tree-radio');

getAllTreeButtonEls = () => document.querySelectorAll('.tree-nav');

hasSubTree = (itemEl) => !!itemEl.querySelector('.tree');

  getSubTreeEl = (itemEl) => itemEl.querySelector('.tree');

  isExpanded = (itemEl) => itemEl.getAttribute('aria-expanded') == 'true';

setExpand = (itemEl, expand) => {
  // if (!hasSubTree(itemEl)) return;
  itemEl.setAttribute('aria-expanded', expand);
  let subTreeEl = getSubTreeEl(itemEl);
  console.log(subTreeEl)
  if (expand) {
    subTreeEl.removeAttribute('hidden');
  } else {
    subTreeEl.setAttribute('hidden', 'hidden');
  }
}

selectItem = (targetEl) => {
  Array.from(getAllTreeRadioEls()).forEach(el => el.setAttribute('aria-pressed', false));
  targetEl.setAttribute('aria-pressed', true);
}

Array.from(getAllTreeButtonEls()).forEach(el => el.addEventListener('click', e => setExpand(e.target, !isExpanded(e.target))));
Array.from(getAllTreeRadioEls()).forEach(el => el.addEventListener('click', e => selectItem(e.target)));