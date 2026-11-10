// SCRIPTORA — Authoritative Screenplay A4 Pagination & Layout Engine
// Standard ISO A4 Geometry: 210mm x 297mm (595.28 pt x 841.89 pt at 72 DPI; 794px x 1123px at 96 DPI)
// Standard Margins: Top 1.0in (72pt), Bottom 1.0in (72pt), Left 1.5in (108pt), Right 1.0in (72pt)
// Printable Height: 246.2mm (9.69in) -> at standard 6 lines/inch pitch (Courier 12pt) = 54 usable lines.

export const A4_PAGE_CAPACITY_LINES = 54;

export function getPageCapacityLines() {
  return A4_PAGE_CAPACITY_LINES;
}

/**
 * Accurately measures screenplay text lines accounting for element line wrapping and line breaks.
 */
export function countScreenplayTextLines(content, maxLineLength = 58) {
  if (!content) return 1;
  const rawText = String(content)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&(?:amp;)+nbsp;?/gi, ' ')
    .replace(/&nbsp;?/gi, ' ')
    .replace(/\u00A0/g, ' ')
    .trim();
  if (!rawText) return 1;
  const paras = rawText.split('\n');
  let total = 0;
  for (const p of paras) {
    const t = p.trim();
    if (t.length === 0) {
      total += 1;
    } else {
      total += Math.max(1, Math.ceil(t.length / maxLineLength));
    }
  }
  return Math.max(1, total);
}

/**
 * Calculates vertical space consumed by a screenplay block in line pitch units.
 * Accounts for element margins, leading/trailing blank lines, and line wrapping.
 */
export function estimateBlockLines(block, isFirstOnPage = false) {
  if (!block) return 1;
  const type = block.type || 'action';
  const content = block.content || '';

  if (type === 'pagebreak') return 1;

  if (type === 'scene') {
    // Standard screenplay spacing: 2 blank lines before heading (or 0 if top of page) + text lines + 1 blank line after
    const headingLines = countScreenplayTextLines(content, 57);
    return (isFirstOnPage ? 0 : 2) + headingLines + 1;
  }

  if (type === 'action' || type === 'text') {
    // 1 blank line before + body lines wrapped at 58 characters
    const textLines = countScreenplayTextLines(content, 58);
    return (isFirstOnPage ? 0 : 1) + textLines;
  }

  if (type === 'character') {
    // 1 blank line before + character cue line wrapped at 28 characters
    const cueLines = countScreenplayTextLines(content, 28);
    return (isFirstOnPage ? 0 : 1) + cueLines;
  }

  if (type === 'parenthetical') {
    // 0 blank lines before (tucked directly under character cue or within dialogue)
    return countScreenplayTextLines(content, 24);
  }

  if (type === 'dialogue') {
    // 0 blank lines before (flows immediately after character cue or parenthetical)
    return countScreenplayTextLines(content, 36);
  }

  if (type === 'transition') {
    // 1 blank line before + transition text + 1 line after
    return (isFirstOnPage ? 0 : 1) + 1 + 1;
  }

  if (type === 'shot') {
    return (isFirstOnPage ? 0 : 1) + countScreenplayTextLines(content, 58);
  }

  if (type === 'act' || type === 'endact') return 3;
  if (type === 'sequence') return 2;
  if (type === 'note' || type === 'outline') return 2;

  if (type === 'dual') {
    const d1 = countScreenplayTextLines(block.dia1 || '', 28);
    const d2 = countScreenplayTextLines(block.dia2 || '', 28);
    return Math.max(d1, d2) + 2;
  }

  if (type === 'lyrics') return 2;
  if (type === 'image') return 10;

  return 2;
}

/**
 * Authoritative Screenplay Pagination Engine.
 * Packs screenplay blocks into A4 pages respecting line capacity and screenplay element integrity.
 * Prevents orphan scene headings and stranded character cues.
 */
export function paginateScreenplayBlocks(screenplay, capacity = A4_PAGE_CAPACITY_LINES) {
  const scenes = screenplay?.scenes || [];
  const allItems = [];

  scenes.forEach(scene => {
    (scene.blocks || []).forEach(block => {
      allItems.push({
        block,
        sceneNumber: scene.number,
        sceneId: scene.id,
        slugline: scene.slugline
      });
    });
  });

  const pages = [];
  let currentPage = { pageNumber: 1, items: [] };
  let currentLines = 0;

  for (let i = 0; i < allItems.length; i++) {
    const item = allItems[i];
    const bType = item.block?.type || 'action';

    // 1. Manual Page Break
    if (bType === 'pagebreak') {
      currentPage.items.push(item);
      pages.push(currentPage);
      currentPage = { pageNumber: pages.length + 1, items: [] };
      currentLines = 0;
      continue;
    }

    const isFirstOnPage = currentPage.items.length === 0;
    const blockLines = estimateBlockLines(item.block, isFirstOnPage);

    // 2. Orphan Prevention: Scene Heading
    // A scene heading must be accompanied by at least 2 lines of subsequent action/dialogue.
    // If remaining capacity cannot accommodate heading + 3 lines, start on next page.
    if (bType === 'scene' && !isFirstOnPage) {
      const minNeeded = blockLines + 2;
      if (currentLines + minNeeded > capacity) {
        pages.push(currentPage);
        currentPage = { pageNumber: pages.length + 1, items: [] };
        currentLines = 0;
        currentPage.items.push(item);
        currentLines += estimateBlockLines(item.block, true);
        continue;
      }
    }

    // 3. Orphan Prevention: Character Cue
    // A character cue must not appear alone at the bottom of a page without dialogue.
    if (bType === 'character' && !isFirstOnPage) {
      const minNeeded = blockLines + 2;
      if (currentLines + minNeeded > capacity) {
        pages.push(currentPage);
        currentPage = { pageNumber: pages.length + 1, items: [] };
        currentLines = 0;
        currentPage.items.push(item);
        currentLines += estimateBlockLines(item.block, true);
        continue;
      }
    }

    // 4. Transition Placement
    if (bType === 'transition' && !isFirstOnPage) {
      if (currentLines + blockLines > capacity) {
        pages.push(currentPage);
        currentPage = { pageNumber: pages.length + 1, items: [] };
        currentLines = 0;
        currentPage.items.push(item);
        currentLines += estimateBlockLines(item.block, true);
        continue;
      }
    }

    // 5. General Line Capacity Check
    if (currentLines + blockLines > capacity && !isFirstOnPage) {
      pages.push(currentPage);
      currentPage = { pageNumber: pages.length + 1, items: [] };
      currentLines = 0;
      currentPage.items.push(item);
      currentLines += estimateBlockLines(item.block, true);
      continue;
    }

    currentPage.items.push(item);
    currentLines += blockLines;
  }

  if (currentPage.items.length > 0) {
    pages.push(currentPage);
  }

  if (pages.length === 0) {
    pages.push({
      pageNumber: 1,
      items: [
        {
          block: { id: `b-${Date.now()}-1`, type: 'scene', content: '' },
          sceneNumber: 1,
          sceneId: 'scene-1',
          slugline: ''
        }
      ]
    });
  }

  return pages;
}

