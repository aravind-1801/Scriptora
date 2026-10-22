/**
 * SCRIPTORA Shared Overlay & Popup Positioning Engine
 * Robust, viewport-aware positioning for modals, dropdowns, popovers, and contextual menus.
 *
 * Core Guarantees:
 * 1. Modals are portaled directly to #scriptora-modal-portal on document.body,
 *    preventing parent containers, animations (e.g. .fade-in) or transforms from clipping,
 *    offsetting, or breaking fixed viewport coordinates.
 * 2. Positioned in the current visible viewport using flex centering and margin:auto,
 *    ensuring the dialog opens right in front of the user regardless of how far the page is scrolled.
 * 3. Self-healing, non-destructive scroll locking keeps the background at its exact scroll position
 *    without jumping or resetting to the top.
 * 4. Dropdowns, autocomplete panels, and contextual menus are placed relative to their trigger
 *    using getBoundingClientRect(), automatically flipping above if space below is limited,
 *    and clamping within the visible viewport bounds.
 */

/**
 * Get or create the top-level portal element on document.body for modals.
 * Guarantees zero interference from parent transforms or overflow rules.
 */
export function getModalPortal() {
  let portal = document.getElementById('scriptora-modal-portal');
  if (!portal) {
    portal = document.createElement('div');
    portal.id = 'scriptora-modal-portal';
    document.body.appendChild(portal);
  }
  return portal;
}

/**
 * Move a modal overlay element into the top-level portal container.
 */
export function portalModal(overlayEl) {
  if (!overlayEl) return;
  const portal = getModalPortal();
  if (overlayEl.parentElement !== portal) {
    portal.appendChild(overlayEl);
  }
}

/**
 * Self-healing scroll lock updater. Checks if any modal is currently visible
 * and applies or removes the scroll lock classes accordingly.
 */
export function updateBodyScrollLock() {
  const anyVisible = !!document.querySelector(
    '#scriptora-modal-portal .scriptora-modal-overlay:not(.hidden), .scriptora-modal-overlay:not(.hidden)'
  );
  if (anyVisible) {
    document.documentElement.classList.add('scriptora-modal-open');
    document.body.classList.add('scriptora-modal-open');
  } else {
    document.documentElement.classList.remove('scriptora-modal-open');
    document.body.classList.remove('scriptora-modal-open');
  }
}

/**
 * Lock background page scroll without changing scroll position.
 */
export function lockBodyScroll() {
  document.documentElement.classList.add('scriptora-modal-open');
  document.body.classList.add('scriptora-modal-open');
}

/**
 * Unlock background page scroll.
 */
export function unlockBodyScroll() {
  updateBodyScrollLock();
}

/**
 * Open a modal overlay: portals it, shows it, locks scroll, and resets internal scroll to top.
 */
export function openModal(overlayEl) {
  if (!overlayEl) return;
  portalModal(overlayEl);
  overlayEl.classList.remove('hidden');
  overlayEl.classList.add('flex');
  lockBodyScroll();

  // Reset internal scroll position of the overlay and body/card so it starts at top
  overlayEl.scrollTop = 0;
  const card = overlayEl.querySelector('.scriptora-modal-card');
  if (card) {
    card.scrollTop = 0;
    const modalBody = card.querySelector('.scriptora-modal-body, .overflow-y-auto');
    if (modalBody) modalBody.scrollTop = 0;
  }
}

/**
 * Close a modal overlay: hides it and updates body scroll lock.
 */
export function closeModal(overlayEl) {
  if (!overlayEl) return;
  if (!overlayEl.classList.contains('hidden')) {
    overlayEl.classList.add('hidden');
    overlayEl.classList.remove('flex');
  }
  updateBodyScrollLock();
}

/**
 * Calculate viewport-aware popup coordinates avoiding clipping by headers,
 * nav bars, and screen edges. Automatically flips above trigger if space below is limited.
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

  // Check if trigger is inside an active modal overlay
  const isInsideModal = !!triggerEl.closest('.scriptora-modal-overlay');

  let topBound = viewportTop + boundaryMargin;
  let bottomBound = viewportTop + viewportHeight - boundaryMargin;

  // If outside a modal, respect persistent global header and bottom nav boundaries
  if (!isInsideModal) {
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

    topBound = Math.max(topBound, headerBottom + 4);
    bottomBound = Math.min(bottomBound, navTop - 4);
  }

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

  const isInsideModal = !!triggerEl.closest('.scriptora-modal-overlay');

  // Reparent to portal or document.body to avoid clipping by scrolling/overflow containers
  if (options.portal !== false) {
    const targetParent = isInsideModal ? getModalPortal() : document.body;
    if (popupEl.parentElement !== targetParent) {
      targetParent.appendChild(popupEl);
    }
  }

  // Ensure element is visible enough to measure
  const wasHidden = popupEl.classList.contains('hidden');
  if (wasHidden) {
    popupEl.style.visibility = 'hidden';
    popupEl.classList.remove('hidden');
  }

  popupEl.style.position = 'fixed';
  popupEl.style.zIndex = options.zIndex || (isInsideModal ? '10000' : '120');

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
 * Wires up portal placement, background scroll lock, backdrop click,
 * escape key closing, and scroll preservation.
 */
export function setupModal(overlayEl, options = {}) {
  if (!overlayEl) return null;

  portalModal(overlayEl);
  overlayEl.classList.add('scriptora-modal-overlay');
  const card = overlayEl.querySelector('.scriptora-modal-card') || overlayEl.firstElementChild;
  if (card) {
    card.classList.add('scriptora-modal-card');
  }

  const { closeSelectors = [], onClose = null, onOpen = null } = options;

  const open = () => {
    openModal(overlayEl);
    if (typeof onOpen === 'function') onOpen();
  };

  const close = () => {
    closeModal(overlayEl);
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

  return { open, close };
}

// Global delegated listeners for modal backdrop click, Escape key, and auto-portaling
if (typeof document !== 'undefined') {
  // 1. Delegated backdrop click
  document.addEventListener('click', (e) => {
    if (e.target && e.target.classList && e.target.classList.contains('scriptora-modal-overlay')) {
      closeModal(e.target);
    }
  });

  // 2. Escape key to close topmost modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModals = Array.from(document.querySelectorAll(
        '#scriptora-modal-portal .scriptora-modal-overlay:not(.hidden), .scriptora-modal-overlay:not(.hidden)'
      ));
      if (openModals.length > 0) {
        closeModal(openModals[openModals.length - 1]);
      }
    }
  });

  // 3. MutationObserver to automatically portal any modal overlay that is displayed
  const initModalObserver = () => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target;
          if (target && target.classList && target.classList.contains('scriptora-modal-overlay')) {
            if (!target.classList.contains('hidden')) {
              portalModal(target);
              updateBodyScrollLock();
            } else {
              updateBodyScrollLock();
            }
          }
        }
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
      subtree: true
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModalObserver);
  } else {
    initModalObserver();
  }
}
