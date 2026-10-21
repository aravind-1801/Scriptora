/**
 * SCRIPTORA Shared Overlay & Popup Positioning Engine
 * Robust, viewport-aware positioning for dropdowns, popovers, and contextual menus.
 * Automatically accounts for mobile virtual keyboards, visualViewport, safe areas,
 * flipping above/below triggers, and horizontal clamping.
 */

export function calculatePopupPosition(triggerEl, popupEl, options = {}) {
  if (!triggerEl || !popupEl) return null;

  const {
    placement = 'auto', // 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'auto'
    offset = 4,
    boundaryMargin = 8,
    preferPosition = 'bottom', // 'bottom' | 'top'
    isFixed = true
  } = options;

  const triggerRect = triggerEl.getBoundingClientRect();

  // Visual viewport metrics (crucial on mobile when virtual keyboard is open)
  const vv = window.visualViewport;
  const viewportWidth = vv ? vv.width : window.innerWidth;
  const viewportHeight = vv ? vv.height : window.innerHeight;
  const viewportTop = vv ? vv.offsetTop : 0;
  const viewportLeft = vv ? vv.offsetLeft : 0;

  // Measure popup (ensure rendered/measured)
  const popupWidth = popupEl.offsetWidth || 200;
  const popupHeight = popupEl.offsetHeight || 160;

  // Space calculations
  const spaceBelow = (viewportTop + viewportHeight) - triggerRect.bottom - offset - boundaryMargin;
  const spaceAbove = triggerRect.top - viewportTop - offset - boundaryMargin;

  // Determine vertical placement
  let placeTop = false;
  if (placement.startsWith('top')) {
    placeTop = spaceAbove >= popupHeight || spaceAbove > spaceBelow;
  } else if (placement.startsWith('bottom')) {
    placeTop = spaceBelow < popupHeight && spaceAbove > spaceBelow;
  } else {
    // 'auto'
    if (preferPosition === 'top') {
      placeTop = spaceAbove >= popupHeight || spaceAbove > spaceBelow;
    } else {
      placeTop = spaceBelow < popupHeight && spaceAbove > spaceBelow;
    }
  }

  // Calculate top coordinate
  let top;
  let maxHeight;
  if (placeTop) {
    maxHeight = Math.max(100, Math.min(popupHeight, spaceAbove));
    top = triggerRect.top - maxHeight - offset;
  } else {
    maxHeight = Math.max(100, Math.min(popupHeight, spaceBelow));
    top = triggerRect.bottom + offset;
  }

  // Clamp top to viewport bounds
  top = Math.max(viewportTop + boundaryMargin, Math.min(viewportTop + viewportHeight - maxHeight - boundaryMargin, top));

  // Determine horizontal placement
  let left;
  const isRightAligned = placement.endsWith('end') || triggerRect.left + popupWidth > viewportWidth - boundaryMargin;

  if (isRightAligned) {
    left = triggerRect.right - popupWidth;
  } else {
    left = triggerRect.left;
  }

  // Clamp left to viewport bounds
  left = Math.max(viewportLeft + boundaryMargin, Math.min(viewportLeft + viewportWidth - popupWidth - boundaryMargin, left));

  return {
    top: Math.round(top),
    left: Math.round(left),
    maxHeight: Math.round(maxHeight),
    width: Math.min(popupWidth, viewportWidth - 2 * boundaryMargin),
    placement: placeTop ? 'top' : 'bottom'
  };
}

/**
 * Apply calculated position directly to a fixed popup element.
 */
export function positionPopup(triggerEl, popupEl, options = {}) {
  if (!triggerEl || !popupEl) return;

  // Ensure element is visible enough to measure
  const wasHidden = popupEl.classList.contains('hidden');
  if (wasHidden) {
    popupEl.style.visibility = 'hidden';
    popupEl.classList.remove('hidden');
  }

  popupEl.style.position = 'fixed';
  popupEl.style.zIndex = options.zIndex || '50';

  const coords = calculatePopupPosition(triggerEl, popupEl, options);
  if (coords) {
    popupEl.style.top = `${coords.top}px`;
    popupEl.style.left = `${coords.left}px`;
    popupEl.style.maxHeight = `${coords.maxHeight}px`;
    popupEl.style.overflowY = 'auto';
  }

  if (wasHidden) {
    popupEl.style.visibility = '';
  }
}

/**
 * Helper to bind a trigger and popup with auto-closing on outside click
 * and auto-repositioning on scroll / resize.
 */
export function setupPopupToggle(triggerEl, popupEl, options = {}) {
  if (!triggerEl || !popupEl) return;

  popupEl.classList.add('scriptora-popup');
  popupEl.setAttribute('data-scriptora-popup', 'true');

  const update = () => {
    if (!popupEl.classList.contains('hidden')) {
      positionPopup(triggerEl, popupEl, options);
    }
  };

  const open = () => {
    popupEl.classList.remove('hidden');
    positionPopup(triggerEl, popupEl, options);
  };

  const close = () => {
    popupEl.classList.add('hidden');
  };

  const toggle = () => {
    if (popupEl.classList.contains('hidden')) {
      open();
    } else {
      close();
    }
  };

  // Close on click outside
  const onDocClick = (e) => {
    if (popupEl.classList.contains('hidden')) return;
    if (!triggerEl.contains(e.target) && !popupEl.contains(e.target)) {
      close();
    }
  };

  document.addEventListener('click', onDocClick);
  window.addEventListener('scroll', update, { passive: true, capture: true });
  window.addEventListener('resize', update, { passive: true });
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', update, { passive: true });
    window.visualViewport.addEventListener('scroll', update, { passive: true });
  }

  return { open, close, toggle, update };
}
