/**
 * SCRIPTORA Shared Overlay & Popup Positioning Engine
 * Robust, viewport-aware positioning for modals, dropdowns, popovers, and contextual menus.
 * Automatically accounts for mobile virtual keyboards, visualViewport, safe areas,
 * persistent global header, bottom navigation bar, flipping above/below triggers,
 * horizontal clamping, and background scroll locking.
 */

let openModalsCount = 0;
let modalScrollY = 0;

/**
 * Lock background page scroll without altering scroll position.
 */
export function lockBodyScroll() {
  if (openModalsCount === 0) {
    modalScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    document.body.dataset.scriptoraModalScrollY = String(modalScrollY);
    document.body.classList.add('scriptora-modal-open');
    document.body.style.top = `-${modalScrollY}px`;
  }
  openModalsCount++;
}

/**
 * Unlock background page scroll and restore exact user scroll position.
 */
export function unlockBodyScroll() {
  openModalsCount = Math.max(0, openModalsCount - 1);
  if (openModalsCount === 0) {
    document.body.classList.remove('scriptora-modal-open');
    document.body.style.top = '';
    const savedY = parseInt(document.body.dataset.scriptoraModalScrollY || '0', 10);
    window.scrollTo({ top: savedY, behavior: 'instant' });
  }
}

/**
 * Calculate viewport-aware popup coordinates avoiding clipping by headers,
 * nav bars, and screen edges.
 */
export function calculatePopupPosition(triggerEl, popupEl, options = {}) {
  if (!triggerEl || !popupEl) return null;

  const {
    placement = 'auto', // 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'auto'
    offset = 4,
    boundaryMargin = 8,
    preferPosition = 'bottom' // 'bottom' | 'top'
  } = options;

  const triggerRect = triggerEl.getBoundingClientRect();

  // Visual viewport metrics (crucial on mobile when virtual keyboard is open)
  const vv = window.visualViewport;
  const viewportWidth = vv ? vv.width : window.innerWidth;
  const viewportHeight = vv ? vv.height : window.innerHeight;
  const viewportTop = vv ? vv.offsetTop : 0;
  const viewportLeft = vv ? vv.offsetLeft : 0;

  // Header and bottom nav awareness
  const globalHeader = document.getElementById('editor-fixed-header') ||
                       document.getElementById('scriptora-global-header') ||
                       document.querySelector('header[data-global-header="true"]');
  const headerBottom = globalHeader && !globalHeader.classList.contains('hidden')
    ? globalHeader.getBoundingClientRect().bottom
    : (viewportTop + 56);

  const globalNav = document.getElementById('scriptora-global-nav') ||
                    document.getElementById('scriptora-bottom-nav') ||
                    document.querySelector('nav[data-global-bottom-nav="true"]');
  const navTop = globalNav && !globalNav.classList.contains('hidden')
    ? globalNav.getBoundingClientRect().top
    : (viewportTop + viewportHeight);

  // Safe vertical boundaries
  const topBound = Math.max(viewportTop + boundaryMargin, headerBottom + 4);
  const bottomBound = Math.min(viewportTop + viewportHeight - boundaryMargin, navTop - 4);

  // Measure popup (ensure rendered/measured)
  const popupWidth = popupEl.offsetWidth || 200;
  const popupHeight = popupEl.offsetHeight || 160;

  // Space calculations
  const spaceBelow = bottomBound - triggerRect.bottom - offset;
  const spaceAbove = triggerRect.top - topBound - offset;

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

  // Calculate top coordinate & maxHeight
  let top;
  let maxHeight;
  if (placeTop) {
    maxHeight = Math.max(90, Math.min(popupHeight, spaceAbove));
    top = triggerRect.top - maxHeight - offset;
  } else {
    maxHeight = Math.max(90, Math.min(popupHeight, spaceBelow));
    top = triggerRect.bottom + offset;
  }

  // Clamp top to viewport bounds
  top = Math.max(topBound, Math.min(bottomBound - maxHeight, top));

  // Determine horizontal placement
  let left;
  const isRightAligned = placement.endsWith('end') || (triggerRect.left + popupWidth > viewportWidth - boundaryMargin);

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

  // Reparent to document.body if inside a scrolling or overflow container to avoid clipping
  if (options.portal !== false && popupEl.parentElement !== document.body && !popupEl.closest('.scriptora-modal-overlay')) {
    document.body.appendChild(popupEl);
  }

  // Ensure element is visible enough to measure
  const wasHidden = popupEl.classList.contains('hidden');
  if (wasHidden) {
    popupEl.style.visibility = 'hidden';
    popupEl.classList.remove('hidden');
  }

  popupEl.style.position = 'fixed';
  popupEl.style.zIndex = options.zIndex || '120';

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

/**
 * Standard SCRIPTORA Modal Initializer
 * Wires up top-aligned mobile placement, background scroll lock, backdrop click,
 * escape key closing, and scroll preservation.
 */
export function setupModal(overlayEl, options = {}) {
  if (!overlayEl) return null;

  overlayEl.classList.add('scriptora-modal-overlay');
  const card = overlayEl.querySelector('.scriptora-modal-card') || overlayEl.firstElementChild;
  if (card) {
    card.classList.add('scriptora-modal-card');
  }

  const { closeSelectors = [], onClose = null, onOpen = null } = options;

  const open = () => {
    overlayEl.classList.remove('hidden');
    lockBodyScroll();
    if (typeof onOpen === 'function') onOpen();
  };

  const close = () => {
    overlayEl.classList.add('hidden');
    unlockBodyScroll();
    if (typeof onClose === 'function') onClose();
  };

  // Close when clicking directly on the backdrop outside the card
  overlayEl.addEventListener('click', (e) => {
    if (e.target === overlayEl) {
      close();
    }
  });

  // Wire close buttons
  closeSelectors.forEach(sel => {
    const btn = typeof sel === 'string' ? overlayEl.querySelector(sel) : sel;
    if (btn) btn.addEventListener('click', close);
  });

  // Escape key handler
  const onKeyDown = (e) => {
    if (e.key === 'Escape' && !overlayEl.classList.contains('hidden')) {
      close();
    }
  };
  document.addEventListener('keydown', onKeyDown);

  return { open, close };
}
