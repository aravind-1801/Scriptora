// =============================================================================
// SCRIPTORA PROFESSIONAL PDF 1.4 VECTOR EXPORT ENGINE
// Genuine, typeset PDF documents with selectable text, standard Type 1 fonts,
// vector borders, tables, headers, footers, and page numbers.
// NO raster screenshots, NO canvas screen-grabs, NO application chrome.
// Exact byte-level offset encoding ensuring universal PDF reader compatibility.
// =============================================================================

function escapePdfText(str) {
  if (!str) return '';
  return String(str)
    // Replace Unicode typography, fractions, and symbols with clean, universal ASCII equivalents
    .replace(/\u00B0/g, ' deg ')       // degree sign °
    .replace(/\u00BD/g, ' 1/2')        // fraction 1/2
    .replace(/\u00BC/g, ' 1/4')        // fraction 1/4
    .replace(/\u00BE/g, ' 3/4')        // fraction 3/4
    .replace(/\u215B/g, ' 1/8')        // fraction 1/8
    .replace(/\u215C/g, ' 3/8')        // fraction 3/8
    .replace(/\u215D/g, ' 5/8')        // fraction 5/8
    .replace(/\u215E/g, ' 7/8')        // fraction 7/8
    .replace(/\u00A0/g, ' ')           // non-breaking space
    .replace(/[\t]+/g, ' ')            // tabs
    .replace(/\u2014/g, ' -- ')        // em-dash
    .replace(/\u2013/g, '-')           // en-dash
    .replace(/\u2026/g, '...')         // ellipsis
    .replace(/[\u201C\u201D]/g, '"')   // curly double quotes
    .replace(/[\u2018\u2019]/g, "'")   // curly single quotes
    .replace(/\u00B7/g, ' - ')         // middle dot
    .replace(/\u2022/g, '* ')          // bullet
    .replace(/\u2192/g, '->')          // right arrow
    .replace(/\u2190/g, '<-')          // left arrow
    // Replace any remaining non-ASCII character to avoid multi-byte font encoding issues
    .replace(/[^\x20-\x7E]/g, ' ')
    // Escape standard PDF syntax characters
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[\r\n]+/g, ' ');
}

export function getPdfTextWidth(text, size = 10, font = 'F1') {
  if (!text) return 0;
  const str = String(text);
  const factor = (font === 'F2' || font === 'F4') ? 0.56 : (font === 'F3' || font === 'F5') ? 0.60 : 0.52;
  return str.length * size * factor;
}

export function truncatePdfText(text, maxWidth, size = 10, font = 'F1') {
  if (!text) return '';
  const str = String(text).trim();
  if (getPdfTextWidth(str, size, font) <= maxWidth) return str;
  const ell = '...';
  const ellW = getPdfTextWidth(ell, size, font);
  let result = str;
  while (result.length > 0 && (getPdfTextWidth(result, size, font) + ellW) > maxWidth) {
    result = result.slice(0, -1);
  }
  return result ? result.trim() + ell : '';
}

export function wrapPdfTextByWidth(text, maxWidth, size = 10, font = 'F1') {
  if (!text) return [];
  const words = String(text).split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  const lines = [];
  let current = '';

  for (const w of words) {
    const candidate = current ? current + ' ' + w : w;
    if (getPdfTextWidth(candidate, size, font) <= maxWidth) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      if (getPdfTextWidth(w, size, font) > maxWidth) {
        lines.push(truncatePdfText(w, maxWidth, size, font));
        current = '';
      } else {
        current = w;
      }
    }
  }
  if (current) lines.push(current);
  return lines;
}

function wrapPdfText(text, maxChars) {
  if (!text) return [];
  const words = String(text).split(/\s+/);
  const lines = [];
  let current = '';

  for (const w of words) {
    if (!current) {
      current = w;
    } else if (current.length + 1 + w.length <= maxChars) {
      current += ' ' + w;
    } else {
      lines.push(current);
      current = w;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export function downloadPdfBlob(blob, filename) {
  if (!blob || !(blob instanceof Blob)) {
    throw new Error('Invalid PDF blob received for download');
  }

  // Create temporary URL and trigger browser download
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  if (a.style) a.style.display = 'none';
  a.href = url;
  a.download = filename || 'document.pdf';
  document.body.appendChild(a);
  a.click();

  // Safely clean up DOM element and revoke object URL
  setTimeout(() => {
    try {
      if (a.parentNode) a.parentNode.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (_) {}
  }, 4000);
}

// Low-level builder that compiles vector draw instructions into compliant PDF 1.4 binary
export function compilePdfDocument(pages, options = {}) {
  // Page size: Standard US Letter (612 x 792 pt)
  const pageWidth = options.pageWidth || 612;
  const pageHeight = options.pageHeight || 792;
  const totalPages = pages.length;

  const allObjects = [];
  let currentId = 0;
  function nextId() { return ++currentId; }

  const catalogId = nextId();
  const pagesRootId = nextId();
  const pageObjectIds = [];

  for (let i = 0; i < totalPages; i++) {
    pageObjectIds.push(nextId());
  }

  // Pre-allocate Font Objects with WinAnsiEncoding
  // F1: Helvetica, F2: Helvetica-Bold, F3: Courier, F4: Courier-Bold, F5: Courier-Oblique, F6: Helvetica-Oblique
  const fontIds = {
    F1: nextId(),
    F2: nextId(),
    F3: nextId(),
    F4: nextId(),
    F5: nextId(),
    F6: nextId()
  };

  const contentStreamIds = [];
  for (let i = 0; i < totalPages; i++) {
    contentStreamIds.push(nextId());
  }

  allObjects[catalogId] = `<< /Type /Catalog /Pages ${pagesRootId} 0 R >>`;
  allObjects[pagesRootId] = `<< /Type /Pages /Kids [${pageObjectIds.map(id => `${id} 0 R`).join(' ')}] /Count ${totalPages} >>`;

  allObjects[fontIds.F1] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>`;
  allObjects[fontIds.F2] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>`;
  allObjects[fontIds.F3] = `<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>`;
  allObjects[fontIds.F4] = `<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold /Encoding /WinAnsiEncoding >>`;
  allObjects[fontIds.F5] = `<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Oblique /Encoding /WinAnsiEncoding >>`;
  allObjects[fontIds.F6] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>`;

  const fontResourceDict = `<< /F1 ${fontIds.F1} 0 R /F2 ${fontIds.F2} 0 R /F3 ${fontIds.F3} 0 R /F4 ${fontIds.F4} 0 R /F5 ${fontIds.F5} 0 R /F6 ${fontIds.F6} 0 R >>`;

  const encoder = new TextEncoder();

  for (let i = 0; i < totalPages; i++) {
    allObjects[pageObjectIds[i]] = `<< /Type /Page /Parent ${pagesRootId} 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Contents ${contentStreamIds[i]} 0 R /Resources << /Font ${fontResourceDict} >> >>`;

    // Construct stream for this page
    const pageData = pages[i] || {};
    let stream = '';

    // Draw lines, rects, and text
    // 1. Vector Rectangles & Lines
    if (pageData.vectors && pageData.vectors.length) {
      for (const v of pageData.vectors) {
        if (v.type === 'rect') {
          // Fill
          if (v.fill) {
            stream += `${v.fill[0].toFixed(3)} ${v.fill[1].toFixed(3)} ${v.fill[2].toFixed(3)} rg\n`;
            stream += `${v.x.toFixed(2)} ${v.y.toFixed(2)} ${v.w.toFixed(2)} ${v.h.toFixed(2)} re\nf\n`;
          }
          // Stroke
          if (v.stroke) {
            stream += `${v.stroke[0].toFixed(3)} ${v.stroke[1].toFixed(3)} ${v.stroke[2].toFixed(3)} RG\n`;
            stream += `${(v.lineWidth || 1).toFixed(2)} w\n`;
            stream += `${v.x.toFixed(2)} ${v.y.toFixed(2)} ${v.w.toFixed(2)} ${v.h.toFixed(2)} re\nS\n`;
          }
        } else if (v.type === 'line') {
          stream += `${(v.stroke || [0, 0, 0])[0].toFixed(3)} ${(v.stroke || [0, 0, 0])[1].toFixed(3)} ${(v.stroke || [0, 0, 0])[2].toFixed(3)} RG\n`;
          stream += `${(v.lineWidth || 1).toFixed(2)} w\n`;
          stream += `${v.x1.toFixed(2)} ${v.y1.toFixed(2)} m ${v.x2.toFixed(2)} ${v.y2.toFixed(2)} l S\n`;
        }
      }
    }

    // 2. Vector Text
    if (pageData.texts && pageData.texts.length) {
      for (const t of pageData.texts) {
        const font = t.font || 'F1';
        const size = t.size || 10;
        const color = t.color || [0.1, 0.1, 0.1];
        const safe = escapePdfText(t.text);

        stream += `BT\n`;
        stream += `/${font} ${size} Tf\n`;
        stream += `${color[0].toFixed(3)} ${color[1].toFixed(3)} ${color[2].toFixed(3)} rg\n`;
        stream += `1 0 0 1 ${t.x.toFixed(2)} ${t.y.toFixed(2)} Tm\n`;
        stream += `(${safe}) Tj\n`;
        stream += `ET\n`;
      }
    }

    const streamBytes = encoder.encode(stream);
    allObjects[contentStreamIds[i]] = `<< /Length ${streamBytes.length} >>\nstream\n${stream}endstream`;
  }

  // Assemble PDF document binary with byte-exact offset calculation
  const header = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
  const headerBytes = encoder.encode(header);
  let totalBytes = headerBytes.length;

  const offsets = [];
  const objectBuffers = [];

  for (let i = 1; i <= currentId; i++) {
    offsets[i] = totalBytes;
    const objStr = `${i} 0 obj\n${allObjects[i]}\nendobj\n`;
    const objBytes = encoder.encode(objStr);
    objectBuffers.push(objBytes);
    totalBytes += objBytes.length;
  }

  const xrefOffset = totalBytes;
  let xrefStr = `xref\n0 ${currentId + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= currentId; i++) {
    xrefStr += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }

  xrefStr += `trailer\n<< /Size ${currentId + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  const xrefBytes = encoder.encode(xrefStr);

  return new Blob([headerBytes, ...objectBuffers, xrefBytes], { type: 'application/pdf' });
}

// =============================================================================
// 1. CALL SHEET PDF EXPORT
// =============================================================================
export function exportCallSheetPdf(cs = {}, scriptInfo = {}) {
  const title = scriptInfo.title || 'Chronicles of Dust';
  const company = scriptInfo.company || 'SCRIPTORA PRODUCTION STUDIO';
  const draft = scriptInfo.draft || 'Draft 4.2 (Pinned)';
  const dayNum = String(cs.callSheetNumber || '01').padStart(2, '0');
  const shootDayStr = cs.shootDay || `Day ${parseInt(dayNum, 10) || 1} of 14`;
  const isConfirmed = cs.status === 'Confirmed' || cs.isPublished;

  const pages = [];
  let currentVectors = [];
  let currentTexts = [];

  const MARGIN_LEFT = 36;
  const MARGIN_RIGHT = 576;
  const USABLE_WIDTH = 540;
  const FOOTER_RESERVE_Y = 56;

  function startNewPage(isContinuation = false) {
    currentVectors = [];
    currentTexts = [];
    pages.push({ vectors: currentVectors, texts: currentTexts });

    if (isContinuation) {
      // Continuation Header Banner
      const bannerH = 26;
      const topY = 756;
      currentVectors.push({
        type: 'rect',
        x: MARGIN_LEFT,
        y: topY - bannerH,
        w: USABLE_WIDTH,
        h: bannerH,
        fill: [0.08, 0.12, 0.20]
      });
      currentTexts.push({
        text: 'SCRIPTORA -- OFFICIAL CALL SHEET (CONTINUED)',
        x: MARGIN_LEFT + 10,
        y: topY - 17,
        font: 'F2',
        size: 9,
        color: [0.95, 0.95, 0.95]
      });
      const contRight = `${title.toUpperCase()} · ${shootDayStr.toUpperCase()}`;
      currentTexts.push({
        text: contRight,
        x: MARGIN_RIGHT - 10 - getPdfTextWidth(contRight, 8, 'F1'),
        y: topY - 17,
        font: 'F1',
        size: 8,
        color: [0.70, 0.82, 1.0]
      });
      return topY - bannerH - 12;
    }
    return 756;
  }

  let curY = startNewPage(false);

  // ---------------------------------------------------------------------------
  // 1. TOP MASTHEAD BANNER (Page 1 Only)
  // ---------------------------------------------------------------------------
  const mastheadH = 44;
  currentVectors.push({
    type: 'rect',
    x: MARGIN_LEFT,
    y: curY - mastheadH,
    w: USABLE_WIDTH,
    h: mastheadH,
    fill: [0.08, 0.12, 0.20]
  });

  // Left Titles
  currentTexts.push({
    text: 'SCRIPTORA -- OFFICIAL PRODUCTION CALL SHEET',
    x: MARGIN_LEFT + 12,
    y: curY - 17,
    font: 'F2',
    size: 10,
    color: [0.96, 0.97, 0.98]
  });

  const subBanner = truncatePdfText(`${company.toUpperCase()} · ${title.toUpperCase()} · ${draft}`, 320, 8.5, 'F1');
  currentTexts.push({
    text: subBanner,
    x: MARGIN_LEFT + 12,
    y: curY - 32,
    font: 'F1',
    size: 8.5,
    color: [0.65, 0.78, 0.98]
  });

  // Right Badge
  const dayBadge = `DAY ${dayNum} CALL SHEET`;
  currentTexts.push({
    text: dayBadge,
    x: MARGIN_RIGHT - 12 - getPdfTextWidth(dayBadge, 11, 'F2'),
    y: curY - 17,
    font: 'F2',
    size: 11,
    color: [1.0, 1.0, 1.0]
  });

  const statusBadge = isConfirmed ? 'OFFICIAL PUBLISHED SNAPSHOT' : 'WORKING REVISION DRAFT';
  const statusColor = isConfirmed ? [0.45, 0.90, 0.55] : [1.0, 0.82, 0.35];
  currentTexts.push({
    text: statusBadge,
    x: MARGIN_RIGHT - 12 - getPdfTextWidth(statusBadge, 7.5, 'F2'),
    y: curY - 32,
    font: 'F2',
    size: 7.5,
    color: statusColor
  });

  curY -= (mastheadH + 8);

  // ---------------------------------------------------------------------------
  // 2. CALL TIMES & KEY SCHEDULE DASHBOARD (4 Equal Columns with Dividers)
  // ---------------------------------------------------------------------------
  const timesBoxH = 52;
  currentVectors.push({
    type: 'rect',
    x: MARGIN_LEFT,
    y: curY - timesBoxH,
    w: USABLE_WIDTH,
    h: timesBoxH,
    fill: [0.975, 0.985, 0.995],
    stroke: [0.82, 0.86, 0.91],
    lineWidth: 0.8
  });

  const colW = 135; // 540 / 4 = 135
  const colYTop = curY - 14;
  const colYMid = curY - 29;
  const colYBot = curY - 43;

  // Column 1: Date & Day
  currentTexts.push({ text: 'DATE & DAY', x: MARGIN_LEFT + 10, y: colYTop, font: 'F2', size: 7.5, color: [0.42, 0.47, 0.55] });
  currentTexts.push({
    text: truncatePdfText(cs.shootDate || 'Saturday, Oct 24, 2026', 118, 9.5, 'F2'),
    x: MARGIN_LEFT + 10,
    y: colYMid,
    font: 'F2',
    size: 9.5,
    color: [0.10, 0.12, 0.16]
  });
  currentTexts.push({
    text: truncatePdfText(shootDayStr, 118, 7.5, 'F1'),
    x: MARGIN_LEFT + 10,
    y: colYBot,
    font: 'F1',
    size: 7.5,
    color: [0.42, 0.47, 0.55]
  });

  // Divider 1
  currentVectors.push({ type: 'line', x1: MARGIN_LEFT + colW, y1: curY - 46, x2: MARGIN_LEFT + colW, y2: curY - 6, stroke: [0.85, 0.88, 0.92], lineWidth: 0.6 });

  // Column 2: Crew Call
  const col2X = MARGIN_LEFT + colW + 10;
  currentTexts.push({ text: 'GENERAL CREW CALL', x: col2X, y: colYTop, font: 'F2', size: 7.5, color: [0.42, 0.47, 0.55] });
  currentTexts.push({
    text: truncatePdfText(cs.generalCrewCall || '06:00 AM', 118, 11.5, 'F2'),
    x: col2X,
    y: colYMid,
    font: 'F2',
    size: 11.5,
    color: [0.10, 0.12, 0.16]
  });
  currentTexts.push({
    text: truncatePdfText(`Breakfast: ${cs.breakfastTime || '05:15 AM'}`, 118, 7.5, 'F1'),
    x: col2X,
    y: colYBot,
    font: 'F1',
    size: 7.5,
    color: [0.42, 0.47, 0.55]
  });

  // Divider 2
  currentVectors.push({ type: 'line', x1: MARGIN_LEFT + colW * 2, y1: curY - 46, x2: MARGIN_LEFT + colW * 2, y2: curY - 6, stroke: [0.85, 0.88, 0.92], lineWidth: 0.6 });

  // Column 3: Shooting Call
  const col3X = MARGIN_LEFT + colW * 2 + 10;
  currentTexts.push({ text: 'SHOOTING CALL', x: col3X, y: colYTop, font: 'F2', size: 7.5, color: [0.10, 0.38, 0.85] });
  currentTexts.push({
    text: truncatePdfText(cs.shootingCall || '06:30 AM', 118, 11.5, 'F2'),
    x: col3X,
    y: colYMid,
    font: 'F2',
    size: 11.5,
    color: [0.10, 0.38, 0.85]
  });
  currentTexts.push({
    text: 'First Shot on Set',
    x: col3X,
    y: colYBot,
    font: 'F1',
    size: 7.5,
    color: [0.42, 0.47, 0.55]
  });

  // Divider 3
  currentVectors.push({ type: 'line', x1: MARGIN_LEFT + colW * 3, y1: curY - 46, x2: MARGIN_LEFT + colW * 3, y2: curY - 6, stroke: [0.85, 0.88, 0.92], lineWidth: 0.6 });

  // Column 4: Estimated Wrap
  const col4X = MARGIN_LEFT + colW * 3 + 10;
  currentTexts.push({ text: 'ESTIMATED WRAP', x: col4X, y: colYTop, font: 'F2', size: 7.5, color: [0.42, 0.47, 0.55] });
  currentTexts.push({
    text: truncatePdfText(cs.estimatedWrap || '06:30 PM', 118, 11.5, 'F2'),
    x: col4X,
    y: colYMid,
    font: 'F2',
    size: 11.5,
    color: [0.10, 0.12, 0.16]
  });
  currentTexts.push({
    text: '12-Hr Rest Turnaround',
    x: col4X,
    y: colYBot,
    font: 'F1',
    size: 7.5,
    color: [0.42, 0.47, 0.55]
  });

  curY -= (timesBoxH + 8);

  // ---------------------------------------------------------------------------
  // 3. SET LOCATION, MEDICAL EMERGENCY & WEATHER BOX
  // ---------------------------------------------------------------------------
  const locBoxH = 62;
  currentVectors.push({
    type: 'rect',
    x: MARGIN_LEFT,
    y: curY - locBoxH,
    w: USABLE_WIDTH,
    h: locBoxH,
    fill: [1.0, 1.0, 1.0],
    stroke: [0.82, 0.86, 0.91],
    lineWidth: 0.8
  });

  // Left side: Location (w = 285)
  const locX = MARGIN_LEFT + 10;
  currentTexts.push({
    text: 'SET LOCATION & BASECAMP ACCESS:',
    x: locX,
    y: curY - 13,
    font: 'F2',
    size: 7.5,
    color: [0.25, 0.30, 0.38]
  });
  currentTexts.push({
    text: truncatePdfText(cs.locationName || 'Mojave Outpost Gate 4', 280, 8.5, 'F2'),
    x: locX,
    y: curY - 25,
    font: 'F2',
    size: 8.5,
    color: [0.10, 0.12, 0.16]
  });
  currentTexts.push({
    text: truncatePdfText(cs.locationAddress || 'Perimeter Road 9, Cantil, CA', 280, 7.5, 'F1'),
    x: locX,
    y: curY - 37,
    font: 'F1',
    size: 7.5,
    color: [0.35, 0.40, 0.48]
  });
  currentTexts.push({
    text: truncatePdfText(`Parking: ${cs.parkingNotes || 'Basecamp Lot B. Crew shuttle runs every 10 mins.'}`, 280, 7, 'F1'),
    x: locX,
    y: curY - 49,
    font: 'F1',
    size: 7,
    color: [0.45, 0.50, 0.58]
  });

  // Divider between Left and Right
  currentVectors.push({
    type: 'line',
    x1: MARGIN_LEFT + 300,
    y1: curY - 56,
    x2: MARGIN_LEFT + 300,
    y2: curY - 6,
    stroke: [0.85, 0.88, 0.92],
    lineWidth: 0.6
  });

  // Right side: Medical & Weather (w = 230)
  const medX = MARGIN_LEFT + 310;
  currentTexts.push({
    text: 'EMERGENCY MEDICAL / NEAREST HOSPITAL:',
    x: medX,
    y: curY - 13,
    font: 'F2',
    size: 7.5,
    color: [0.85, 0.15, 0.15]
  });

  const hospLines = wrapPdfTextByWidth(cs.nearestHospital || 'Desert Care Regional Medical Center (Ph: 760-379-2681)', 220, 7, 'F1');
  currentTexts.push({
    text: truncatePdfText(hospLines[0] || 'Local Emergency Center', 220, 7, 'F1'),
    x: medX,
    y: curY - 24,
    font: 'F1',
    size: 7,
    color: [0.15, 0.15, 0.15]
  });
  if (hospLines[1]) {
    currentTexts.push({
      text: truncatePdfText(hospLines[1], 220, 7, 'F1'),
      x: medX,
      y: curY - 34,
      font: 'F1',
      size: 7,
      color: [0.15, 0.15, 0.15]
    });
  }

  const weatherText = truncatePdfText(`Weather: ${cs.weatherSummary || 'Clear skies, normal stage ambient temperature.'}`, 220, 7, 'F1');
  currentTexts.push({
    text: weatherText,
    x: medX,
    y: curY - 49,
    font: 'F1',
    size: 7,
    color: [0.20, 0.40, 0.65]
  });

  curY -= (locBoxH + 10);

  // ---------------------------------------------------------------------------
  // 4. SECTION 1: DAILY SCENE SCHEDULE TABLE
  // ---------------------------------------------------------------------------
  const scenes = (cs.scenes && cs.scenes.length > 0) ? cs.scenes : [
    { sceneNumber: 1, heading: 'EXT. MOJAVE OUTPOST GATE 4 - DAY', pages: '4 1/8', cast: ['KEVIN', 'MARCUS'], desc: 'Kevin arrives at border gate, inspection with Marcus.' },
    { sceneNumber: 2, heading: 'INT. OUTPOST CUSTOMS SHED - DAY', pages: '3 4/8', cast: ['KEVIN', 'MEERA'], desc: 'Kevin discovers pressure loss on telemetry terminal.' }
  ];

  function drawScenesTableHeader() {
    currentVectors.push({
      type: 'rect',
      x: MARGIN_LEFT,
      y: curY - 17,
      w: USABLE_WIDTH,
      h: 17,
      fill: [0.91, 0.93, 0.96],
      stroke: [0.78, 0.82, 0.88],
      lineWidth: 0.8
    });
    currentTexts.push({ text: 'SCENE #', x: MARGIN_LEFT + 6, y: curY - 12, font: 'F2', size: 7.5, color: [0.25, 0.30, 0.38] });
    currentTexts.push({ text: 'SET & SCENE DESCRIPTION', x: MARGIN_LEFT + 56, y: curY - 12, font: 'F2', size: 7.5, color: [0.25, 0.30, 0.38] });
    currentTexts.push({ text: 'D/N', x: MARGIN_LEFT + 325, y: curY - 12, font: 'F2', size: 7.5, color: [0.25, 0.30, 0.38] });
    currentTexts.push({ text: 'PAGES', x: MARGIN_LEFT + 368, y: curY - 12, font: 'F2', size: 7.5, color: [0.25, 0.30, 0.38] });
    currentTexts.push({ text: 'CAST CHARACTERS', x: MARGIN_LEFT + 418, y: curY - 12, font: 'F2', size: 7.5, color: [0.25, 0.30, 0.38] });
    curY -= 17;
  }

  // Section Heading
  currentTexts.push({
    text: 'SCHEDULED SCENES TO SHOOT',
    x: MARGIN_LEFT,
    y: curY,
    font: 'F2',
    size: 9.5,
    color: [0.10, 0.15, 0.22]
  });
  const scenesSummary = `${scenes.length} Scenes Scheduled`;
  currentTexts.push({
    text: scenesSummary,
    x: MARGIN_RIGHT - getPdfTextWidth(scenesSummary, 8, 'F1'),
    y: curY,
    font: 'F1',
    size: 8,
    color: [0.45, 0.50, 0.58]
  });
  curY -= 12;

  drawScenesTableHeader();

  // Render Scene Rows
  scenes.forEach((sc, idx) => {
    const headingLines = wrapPdfTextByWidth(sc.heading || `SCENE ${sc.sceneNumber}`, 260, 8, 'F2');
    const descLines = wrapPdfTextByWidth(sc.desc || '', 260, 7, 'F1');
    const castArr = Array.isArray(sc.cast) ? sc.cast : (sc.cast ? [sc.cast] : []);
    const castLines = wrapPdfTextByWidth(castArr.join(', '), 116, 7.5, 'F2');

    const contentHeight = Math.max(headingLines.length * 10 + descLines.length * 9, castLines.length * 9.5, 12);
    const rowH = Math.max(22, 8 + contentHeight);

    if (curY - rowH < FOOTER_RESERVE_Y) {
      curY = startNewPage(true);
      drawScenesTableHeader();
    }

    currentVectors.push({
      type: 'rect',
      x: MARGIN_LEFT,
      y: curY - rowH,
      w: USABLE_WIDTH,
      h: rowH,
      fill: idx % 2 === 0 ? [1.0, 1.0, 1.0] : [0.985, 0.988, 0.995],
      stroke: [0.86, 0.89, 0.93],
      lineWidth: 0.5
    });

    // Scene number
    currentTexts.push({
      text: `Sc. ${sc.sceneNumber}`,
      x: MARGIN_LEFT + 6,
      y: curY - 13,
      font: 'F2',
      size: 8.5,
      color: [0.10, 0.35, 0.85]
    });

    // Heading lines
    let textY = curY - 10;
    headingLines.forEach(hl => {
      currentTexts.push({ text: hl, x: MARGIN_LEFT + 56, y: textY, font: 'F2', size: 8, color: [0.10, 0.12, 0.15] });
      textY -= 10;
    });

    // Desc lines
    descLines.forEach(dl => {
      currentTexts.push({ text: dl, x: MARGIN_LEFT + 56, y: textY, font: 'F1', size: 7, color: [0.40, 0.45, 0.52] });
      textY -= 9;
    });

    // Day / Night
    const dn = sc.heading?.toUpperCase().includes('NIGHT') ? 'NIGHT' : 'DAY';
    currentTexts.push({
      text: dn,
      x: MARGIN_LEFT + 325,
      y: curY - 13,
      font: 'F1',
      size: 7.5,
      color: dn === 'NIGHT' ? [0.10, 0.15, 0.45] : [0.80, 0.45, 0.10]
    });

    // Pages
    currentTexts.push({
      text: sc.pages || '1.0',
      x: MARGIN_LEFT + 368,
      y: curY - 13,
      font: 'F2',
      size: 7.5,
      color: [0.20, 0.20, 0.20]
    });

    // Cast characters
    let castY = curY - 11;
    castLines.forEach(cl => {
      currentTexts.push({ text: cl, x: MARGIN_LEFT + 418, y: castY, font: 'F2', size: 7.5, color: [0.15, 0.20, 0.25] });
      castY -= 9.5;
    });

    curY -= rowH;
  });

  curY -= 10;

  // ---------------------------------------------------------------------------
  // 5. SECTION 2: CAST & TALENT CALL TABLE
  // ---------------------------------------------------------------------------
  const castCalls = (cs.castCalls && cs.castCalls.length > 0) ? cs.castCalls : [
    { character: 'KEVIN', actor: 'Dev Patel', pickup: '05:00 AM', hmuCall: '05:30 AM', onSet: '06:30 AM', status: 'Confirmed' },
    { character: 'MARCUS', actor: 'David Chen', pickup: '05:15 AM', hmuCall: '05:45 AM', onSet: '06:30 AM', status: 'Confirmed' },
    { character: 'MEERA', actor: 'Zoe Saldana', pickup: '08:30 AM', hmuCall: '09:00 AM', onSet: '10:30 AM', status: 'Confirmed' }
  ];

  function drawCastTableHeader() {
    currentVectors.push({
      type: 'rect',
      x: MARGIN_LEFT,
      y: curY - 17,
      w: USABLE_WIDTH,
      h: 17,
      fill: [0.91, 0.93, 0.96],
      stroke: [0.78, 0.82, 0.88],
      lineWidth: 0.8
    });
    currentTexts.push({ text: 'ID', x: MARGIN_LEFT + 6, y: curY - 12, font: 'F2', size: 7.5, color: [0.25, 0.30, 0.38] });
    currentTexts.push({ text: 'CHARACTER', x: MARGIN_LEFT + 32, y: curY - 12, font: 'F2', size: 7.5, color: [0.25, 0.30, 0.38] });
    currentTexts.push({ text: 'ACTOR / TALENT', x: MARGIN_LEFT + 140, y: curY - 12, font: 'F2', size: 7.5, color: [0.25, 0.30, 0.38] });
    currentTexts.push({ text: 'STATUS', x: MARGIN_LEFT + 270, y: curY - 12, font: 'F2', size: 7.5, color: [0.25, 0.30, 0.38] });
    currentTexts.push({ text: 'PICKUP', x: MARGIN_LEFT + 346, y: curY - 12, font: 'F2', size: 7.5, color: [0.25, 0.30, 0.38] });
    currentTexts.push({ text: 'H/MU CALL', x: MARGIN_LEFT + 406, y: curY - 12, font: 'F2', size: 7.5, color: [0.25, 0.30, 0.38] });
    currentTexts.push({ text: 'ON SET CALL', x: MARGIN_LEFT + 472, y: curY - 12, font: 'F2', size: 7.5, color: [0.25, 0.30, 0.38] });
    curY -= 17;
  }

  // Check budget for cast table start
  if (curY - 48 < FOOTER_RESERVE_Y) {
    curY = startNewPage(true);
  }

  currentTexts.push({
    text: 'CAST & TALENT CALL SCHEDULE',
    x: MARGIN_LEFT,
    y: curY,
    font: 'F2',
    size: 9.5,
    color: [0.10, 0.15, 0.22]
  });
  const castSummary = `${castCalls.length} Talent Booked`;
  currentTexts.push({
    text: castSummary,
    x: MARGIN_RIGHT - getPdfTextWidth(castSummary, 8, 'F1'),
    y: curY,
    font: 'F1',
    size: 8,
    color: [0.45, 0.50, 0.58]
  });
  curY -= 12;

  drawCastTableHeader();

  castCalls.forEach((c, idx) => {
    const rowH = 19;
    if (curY - rowH < FOOTER_RESERVE_Y) {
      curY = startNewPage(true);
      drawCastTableHeader();
    }

    currentVectors.push({
      type: 'rect',
      x: MARGIN_LEFT,
      y: curY - rowH,
      w: USABLE_WIDTH,
      h: rowH,
      fill: idx % 2 === 0 ? [1.0, 1.0, 1.0] : [0.985, 0.988, 0.995],
      stroke: [0.86, 0.89, 0.93],
      lineWidth: 0.5
    });

    // ID
    currentTexts.push({ text: String(idx + 1), x: MARGIN_LEFT + 6, y: curY - 13, font: 'F1', size: 7.5, color: [0.5, 0.5, 0.5] });

    // Character
    currentTexts.push({
      text: truncatePdfText(c.character || 'CHARACTER', 100, 8, 'F2'),
      x: MARGIN_LEFT + 32,
      y: curY - 13,
      font: 'F2',
      size: 8,
      color: [0.10, 0.12, 0.16]
    });

    // Actor
    currentTexts.push({
      text: truncatePdfText(c.actor || 'TBD', 120, 8, 'F1'),
      x: MARGIN_LEFT + 140,
      y: curY - 13,
      font: 'F1',
      size: 8,
      color: [0.20, 0.22, 0.26]
    });

    // Status
    const isConf = (c.status || '').toLowerCase().includes('conf');
    currentTexts.push({
      text: truncatePdfText(c.status || 'Confirmed', 68, 7.5, 'F2'),
      x: MARGIN_LEFT + 270,
      y: curY - 13,
      font: 'F2',
      size: 7.5,
      color: isConf ? [0.12, 0.55, 0.25] : [0.85, 0.55, 0.10]
    });

    // Pickup
    currentTexts.push({
      text: c.pickup || '-',
      x: MARGIN_LEFT + 346,
      y: curY - 13,
      font: 'F3',
      size: 7.5,
      color: [0.35, 0.35, 0.35]
    });

    // HMU
    currentTexts.push({
      text: c.hmuCall || '-',
      x: MARGIN_LEFT + 406,
      y: curY - 13,
      font: 'F3',
      size: 7.5,
      color: [0.35, 0.35, 0.35]
    });

    // On Set Call
    currentTexts.push({
      text: c.onSet || '-',
      x: MARGIN_LEFT + 472,
      y: curY - 13,
      font: 'F2',
      size: 8.5,
      color: [0.10, 0.35, 0.85]
    });

    curY -= rowH;
  });

  curY -= 10;

  // ---------------------------------------------------------------------------
  // 6. SECTION 3: SAFETY DIRECTIVES & PRODUCTION INSTRUCTIONS
  // ---------------------------------------------------------------------------
  const rawSafety = cs.specialInstructions || 'Standard studio health & safety protocols in effect. All crew must report any hazards or equipment anomalies immediately to the 1st AD or Health & Safety Supervisor.';
  const safetyLines = wrapPdfTextByWidth(rawSafety, 516, 7.5, 'F1');
  const safetyBoxH = Math.max(38, 18 + safetyLines.length * 10 + 6);

  if (curY - safetyBoxH < FOOTER_RESERVE_Y) {
    curY = startNewPage(true);
  }

  currentVectors.push({
    type: 'rect',
    x: MARGIN_LEFT,
    y: curY - safetyBoxH,
    w: USABLE_WIDTH,
    h: safetyBoxH,
    fill: [0.995, 0.985, 0.93],
    stroke: [0.90, 0.82, 0.65],
    lineWidth: 0.8
  });

  currentTexts.push({
    text: '[SAFETY & PRODUCTION DIRECTIVE] SPECIAL INSTRUCTIONS:',
    x: MARGIN_LEFT + 10,
    y: curY - 13,
    font: 'F2',
    size: 7.5,
    color: [0.60, 0.38, 0.05]
  });

  let sY = curY - 25;
  safetyLines.forEach(sl => {
    currentTexts.push({
      text: sl,
      x: MARGIN_LEFT + 10,
      y: sY,
      font: 'F1',
      size: 7.5,
      color: [0.30, 0.25, 0.15]
    });
    sY -= 10;
  });

  curY -= (safetyBoxH + 8);

  // ---------------------------------------------------------------------------
  // 7. SECTION 4: KEY PRODUCTION CONTACTS & DEPARTMENT RADIO CHANNELS
  // ---------------------------------------------------------------------------
  const deptBoxH = 34;
  if (curY - deptBoxH >= FOOTER_RESERVE_Y) {
    currentVectors.push({
      type: 'rect',
      x: MARGIN_LEFT,
      y: curY - deptBoxH,
      w: USABLE_WIDTH,
      h: deptBoxH,
      fill: [0.965, 0.975, 0.988],
      stroke: [0.84, 0.87, 0.92],
      lineWidth: 0.6
    });

    // Col 1 (Directing / 1st AD)
    currentTexts.push({
      text: 'DIRECTING & SET OPS',
      x: MARGIN_LEFT + 10,
      y: curY - 12,
      font: 'F2',
      size: 7,
      color: [0.25, 0.30, 0.38]
    });
    currentTexts.push({
      text: `1st AD: Ready on Set ${cs.shootingCall || '06:30 AM'} · Radio: Ch 1`,
      x: MARGIN_LEFT + 10,
      y: curY - 24,
      font: 'F1',
      size: 7,
      color: [0.35, 0.40, 0.48]
    });

    // Col 2 (Camera / Sound)
    currentTexts.push({
      text: 'CAMERA & SOUND TECH',
      x: MARGIN_LEFT + 195,
      y: curY - 12,
      font: 'F2',
      size: 7,
      color: [0.25, 0.30, 0.38]
    });
    currentTexts.push({
      text: `DP / Cam: ${cs.generalCrewCall || '06:00 AM'} · Radio: Ch 2 | Sound: Ch 3`,
      x: MARGIN_LEFT + 195,
      y: curY - 24,
      font: 'F1',
      size: 7,
      color: [0.35, 0.40, 0.48]
    });

    // Col 3 (Production Office / Approval)
    currentTexts.push({
      text: 'LOGISTICS & SIGN-OFF',
      x: MARGIN_LEFT + 375,
      y: curY - 12,
      font: 'F2',
      size: 7,
      color: [0.25, 0.30, 0.38]
    });
    const approvedStr = truncatePdfText(`Approved: ${cs.approvedBy || 'Production Office'} · Ch 4`, 160, 7, 'F1');
    currentTexts.push({
      text: approvedStr,
      x: MARGIN_LEFT + 375,
      y: curY - 24,
      font: 'F1',
      size: 7,
      color: [0.35, 0.40, 0.48]
    });

    curY -= (deptBoxH + 6);
  }

  // ---------------------------------------------------------------------------
  // 8. UNIVERSAL PROFESSIONAL FOOTERS ON ALL PAGES
  // ---------------------------------------------------------------------------
  const totalPages = pages.length;
  pages.forEach((p, pIdx) => {
    // Divider rule
    p.vectors.push({
      type: 'line',
      x1: MARGIN_LEFT,
      y1: 44,
      x2: MARGIN_RIGHT,
      y2: 44,
      stroke: [0.80, 0.83, 0.88],
      lineWidth: 0.7
    });

    // Confidential disclaimer
    p.texts.push({
      text: 'CONFIDENTIAL -- SCRIPTORA PRODUCTION STUDIO -- NOT FOR PUBLIC DISTRIBUTION',
      x: MARGIN_LEFT,
      y: 32,
      font: 'F1',
      size: 7,
      color: [0.45, 0.48, 0.52]
    });

    // Shoot date in center
    const centerDate = cs.shootDate || 'Production Call Sheet';
    p.texts.push({
      text: centerDate,
      x: 306 - getPdfTextWidth(centerDate, 7, 'F1') / 2,
      y: 32,
      font: 'F1',
      size: 7,
      color: [0.55, 0.58, 0.62]
    });

    // Dynamic Page Count
    const pageStr = `Page ${pIdx + 1} of ${totalPages}`;
    p.texts.push({
      text: pageStr,
      x: MARGIN_RIGHT - getPdfTextWidth(pageStr, 7.5, 'F2'),
      y: 32,
      font: 'F2',
      size: 7.5,
      color: [0.30, 0.35, 0.40]
    });
  });

  const blob = compilePdfDocument(pages);
  const cleanTitle = title.replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `CallSheet_Day${dayNum}_${cleanTitle}.pdf`;
  downloadPdfBlob(blob, filename);
  return blob;
}

// =============================================================================
// 2. DIALOGUE SHEET PDF EXPORT (Character-focused Screenplay Monospaced)
// =============================================================================
export function exportDialogueSheetPdf(characterName = 'CHARACTER', dialogueLines = [], scriptInfo = {}) {
  const title = scriptInfo.title || 'Chronicles of Dust';
  const draft = scriptInfo.draft || 'Draft 4.2';
  const pages = [];
  const linesPerPage = 38;

  // Split lines into chunks
  const chunks = [];
  let currentChunk = [];
  let lineCount = 0;

  for (const item of dialogueLines) {
    const diaText = item.dialogue || item.text || '';
    const speechLines = wrapPdfText(diaText, 46);
    const itemWeight = 4 + speechLines.length; // scene + char + parenthetical + dialogue + spacing
    if (lineCount + itemWeight > linesPerPage && currentChunk.length > 0) {
      chunks.push(currentChunk);
      currentChunk = [];
      lineCount = 0;
    }
    currentChunk.push({ ...item, speechLines });
    lineCount += itemWeight;
  }
  if (currentChunk.length > 0) chunks.push(currentChunk);
  if (chunks.length === 0) chunks.push([]);

  for (let pageIdx = 0; pageIdx < chunks.length; pageIdx++) {
    const chunk = chunks[pageIdx];
    const pVectors = [];
    const pTexts = [];

    // Screenplay Header
    pVectors.push({ type: 'line', x1: 54, y1: 746, x2: 558, y2: 746, stroke: [0.2, 0.2, 0.2], lineWidth: 1.2 });
    pTexts.push({ text: 'SCRIPTORA -- CHARACTER DIALOGUE SHEET', x: 54, y: 755, font: 'F4', size: 9, color: [0.3, 0.3, 0.3] });
    pTexts.push({ text: `PAGE ${pageIdx + 1} OF ${chunks.length}`, x: 490, y: 755, font: 'F4', size: 9, color: [0.3, 0.3, 0.3] });

    pTexts.push({ text: `${characterName.toUpperCase()} -- ALL DIALOGUE CUES`, x: 54, y: 730, font: 'F4', size: 12, color: [0.0, 0.0, 0.0] });
    pTexts.push({ text: `Screenplay: ${title} (${draft}) -- Pinned Baseline`, x: 54, y: 716, font: 'F3', size: 9, color: [0.4, 0.4, 0.4] });

    let curY = 680;
    for (const cue of chunk) {
      // Scene Heading
      const scNum = cue.sceneNum || cue.sceneNumber || 1;
      const heading = cue.heading || `SCENE ${scNum}`;
      pTexts.push({ text: `SCENE ${scNum} -- ${heading}`, x: 54, y: curY, font: 'F4', size: 9, color: [0.1, 0.3, 0.7] });
      curY -= 14;

      // Optional action context
      if (cue.action) {
        const actionLines = wrapPdfText(cue.action, 65);
        for (const aLine of actionLines) {
          pTexts.push({ text: aLine, x: 54, y: curY, font: 'F5', size: 8.5, color: [0.4, 0.4, 0.4] });
          curY -= 11;
        }
      }

      // Character Cue Name (Centered around X=306)
      const cueChar = cue.character || characterName || 'CHARACTER';
      const charWidth = cueChar.length * 6.5;
      pTexts.push({ text: cueChar, x: Math.max(160, 306 - (charWidth / 2)), y: curY, font: 'F4', size: 10, color: [0.0, 0.0, 0.0] });
      curY -= 12;

      // Parenthetical
      if (cue.parenthetical) {
        const parWidth = cue.parenthetical.length * 5.5;
        pTexts.push({ text: cue.parenthetical, x: Math.max(160, 306 - (parWidth / 2)), y: curY, font: 'F5', size: 9, color: [0.3, 0.3, 0.3] });
        curY -= 12;
      }

      // Dialogue Lines (Standard screenplay margin indent: X=170, max width 280 pt)
      const speech = cue.speechLines || wrapPdfText(cue.dialogue || cue.text || '', 46);
      for (const line of speech) {
        pTexts.push({ text: line, x: 170, y: curY, font: 'F3', size: 10, color: [0.0, 0.0, 0.0] });
        curY -= 13;
      }

      curY -= 12; // Gap between cues
    }

    // Screenplay Footer
    pVectors.push({ type: 'line', x1: 54, y1: 50, x2: 558, y2: 50, stroke: [0.8, 0.8, 0.8], lineWidth: 0.8 });
    pTexts.push({ text: `SCRIPTORA SCREENPLAY ARCHITECTURE -- ${characterName.toUpperCase()} -- DRAFT 4.2`, x: 54, y: 38, font: 'F3', size: 8, color: [0.5, 0.5, 0.5] });
    pTexts.push({ text: `Page ${pageIdx + 1} of ${chunks.length}`, x: 495, y: 38, font: 'F3', size: 8, color: [0.5, 0.5, 0.5] });

    pages.push({ vectors: pVectors, texts: pTexts });
  }

  const blob = compilePdfDocument(pages);
  const filename = `DialogueSheet_${characterName.replace(/\s+/g, '_')}_${title.replace(/\s+/g, '_')}.pdf`;
  downloadPdfBlob(blob, filename);
  return blob;
}

// =============================================================================
// 3. ACTOR SIDES PDF EXPORT (Rehearsal & On-Set Sides for Scene)
// =============================================================================
export function exportActorSidesPdf(sceneNumber = 1, sceneLines = [], sceneInfo = {}, scriptInfo = {}) {
  // Support flexible argument order
  if (sceneInfo && sceneInfo.title && !scriptInfo.title) {
    scriptInfo = sceneInfo;
  }
  const title = scriptInfo.title || 'Chronicles of Dust';
  const draft = scriptInfo.draft || 'Draft 4.2';
  const heading = sceneInfo.heading || (sceneLines[0]?.heading) || `SCENE ${sceneNumber} - DAY`;
  const pages = [];

  const pVectors = [];
  const pTexts = [];

  // Masthead
  pVectors.push({ type: 'rect', x: 54, y: 730, w: 504, h: 32, fill: [0.1, 0.1, 0.1] });
  pTexts.push({ text: 'SCRIPTORA -- REHEARSAL & ON-SET SIDES', x: 64, y: 748, font: 'F4', size: 9, color: [0.8, 0.8, 0.8] });
  pTexts.push({ text: `SCENE ${sceneNumber} SIDES`, x: 460, y: 748, font: 'F4', size: 10, color: [1.0, 1.0, 1.0] });

  pTexts.push({ text: `${title.toUpperCase()} -- SCENE ${sceneNumber}`, x: 54, y: 712, font: 'F4', size: 13, color: [0.0, 0.0, 0.0] });
  pTexts.push({ text: `${heading} -- ${draft}`, x: 54, y: 698, font: 'F3', size: 9, color: [0.4, 0.4, 0.4] });

  pVectors.push({ type: 'line', x1: 54, y1: 686, x2: 558, y2: 686, stroke: [0.2, 0.2, 0.2], lineWidth: 1.0 });

  let curY = 665;
  // Heading
  pTexts.push({ text: heading, x: 54, y: curY, font: 'F4', size: 10, color: [0.0, 0.0, 0.0] });
  curY -= 18;

  for (const line of sceneLines) {
    if (line.action) {
      const actLines = wrapPdfText(line.action, 65);
      for (const al of actLines) {
        pTexts.push({ text: al, x: 54, y: curY, font: 'F5', size: 9.5, color: [0.2, 0.2, 0.2] });
        curY -= 13;
      }
      curY -= 4;
    }

    if (line.character) {
      const charWidth = line.character.length * 6.5;
      pTexts.push({ text: line.character, x: Math.max(160, 306 - (charWidth / 2)), y: curY, font: 'F4', size: 10, color: [0.0, 0.0, 0.0] });
      curY -= 13;
    }

    if (line.parenthetical) {
      const pWidth = line.parenthetical.length * 5.5;
      pTexts.push({ text: line.parenthetical, x: Math.max(160, 306 - (pWidth / 2)), y: curY, font: 'F5', size: 9, color: [0.3, 0.3, 0.3] });
      curY -= 12;
    }

    const diaText = line.dialogue || line.text || '';
    if (diaText) {
      const diaLines = wrapPdfText(diaText, 46);
      for (const dl of diaLines) {
        pTexts.push({ text: dl, x: 170, y: curY, font: 'F3', size: 10, color: [0.0, 0.0, 0.0] });
        curY -= 13;
      }
    }

    curY -= 10;
  }

  // End of Scene Stamp
  pVectors.push({ type: 'rect', x: 180, y: curY - 15, w: 252, h: 20, fill: [0.95, 0.95, 0.95], stroke: [0.7, 0.7, 0.7], lineWidth: 0.8 });
  pTexts.push({ text: `END OF SCENE ${sceneNumber} SIDES -- STAMPED DRAFT 4.2`, x: 195, y: curY - 3, font: 'F4', size: 7.5, color: [0.3, 0.3, 0.3] });

  // Footer
  pVectors.push({ type: 'line', x1: 54, y1: 50, x2: 558, y2: 50, stroke: [0.8, 0.8, 0.8], lineWidth: 0.8 });
  pTexts.push({ text: 'SCRIPTORA REHEARSAL COPY -- OFFICIAL PRODUCTION SIDES', x: 54, y: 38, font: 'F3', size: 8, color: [0.5, 0.5, 0.5] });
  pTexts.push({ text: 'Page 1 of 1', x: 505, y: 38, font: 'F3', size: 8, color: [0.5, 0.5, 0.5] });

  pages.push({ vectors: pVectors, texts: pTexts });
  const blob = compilePdfDocument(pages);
  const filename = `ActorSides_Scene${sceneNumber}_${title.replace(/\s+/g, '_')}.pdf`;
  downloadPdfBlob(blob, filename);
  return blob;
}

// =============================================================================
// 4. SCRIPT BREAKDOWN REPORT PDF EXPORT
// =============================================================================
export function exportBreakdownPdf(breakdownItems = [], scriptInfo = {}) {
  const title = scriptInfo.title || 'Chronicles of Dust';
  const draft = scriptInfo.draft || 'Draft 4.2';
  const pages = [];
  const itemsPerPage = 18;

  const totalItems = breakdownItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  for (let pageIdx = 0; pageIdx < totalPages; pageIdx++) {
    const pVectors = [];
    const pTexts = [];
    const pageItems = breakdownItems.slice(pageIdx * itemsPerPage, (pageIdx + 1) * itemsPerPage);

    // Header
    pVectors.push({ type: 'rect', x: 36, y: 735, w: 540, h: 32, fill: [0.08, 0.12, 0.20] });
    pTexts.push({ text: 'SCRIPTORA -- SCRIPT BREAKDOWN MASTER REPORT', x: 46, y: 752, font: 'F2', size: 10, color: [1.0, 1.0, 1.0] });
    pTexts.push({ text: `${title.toUpperCase()} (${draft}) -- ${totalItems} ELEMENTS TAGGED`, x: 46, y: 741, font: 'F1', size: 8, color: [0.7, 0.8, 1.0] });
    pTexts.push({ text: `PAGE ${pageIdx + 1} OF ${totalPages}`, x: 505, y: 747, font: 'F2', size: 9, color: [1.0, 1.0, 1.0] });

    // Table Header
    let tableY = 705;
    pVectors.push({ type: 'rect', x: 36, y: tableY, w: 540, h: 18, fill: [0.93, 0.94, 0.96], stroke: [0.8, 0.83, 0.88], lineWidth: 0.8 });
    pTexts.push({ text: 'CATEGORY', x: 42, y: tableY + 5, font: 'F2', size: 8, color: [0.3, 0.35, 0.4] });
    pTexts.push({ text: 'ELEMENT NAME', x: 120, y: tableY + 5, font: 'F2', size: 8, color: [0.3, 0.35, 0.4] });
    pTexts.push({ text: 'SCENES', x: 270, y: tableY + 5, font: 'F2', size: 8, color: [0.3, 0.35, 0.4] });
    pTexts.push({ text: 'STATUS', x: 330, y: tableY + 5, font: 'F2', size: 8, color: [0.3, 0.35, 0.4] });
    pTexts.push({ text: 'DETAILS / SOURCING SPECIFICATION', x: 400, y: tableY + 5, font: 'F2', size: 8, color: [0.3, 0.35, 0.4] });

    tableY -= 22;
    for (const item of pageItems) {
      pVectors.push({ type: 'rect', x: 36, y: tableY, w: 540, h: 22, fill: [1.0, 1.0, 1.0], stroke: [0.88, 0.90, 0.93], lineWidth: 0.5 });
      pTexts.push({ text: item.category || 'Props', x: 42, y: tableY + 7, font: 'F2', size: 8, color: [0.1, 0.3, 0.8] });
      pTexts.push({ text: (item.name || '').slice(0, 32), x: 120, y: tableY + 7, font: 'F2', size: 8.5, color: [0.1, 0.1, 0.1] });
      pTexts.push({ text: (item.scenes || [item.sceneNumber || 18]).map(s => `#${s}`).join(', '), x: 270, y: tableY + 7, font: 'F3', size: 8, color: [0.4, 0.4, 0.4] });
      pTexts.push({ text: item.status || 'Confirmed', x: 330, y: tableY + 7, font: 'F1', size: 8, color: item.status === 'Confirmed' ? [0.1, 0.6, 0.2] : [0.8, 0.4, 0.1] });
      
      const spec = item.assignedActor || item.sourcingType || item.description || item.notes || 'Ready';
      pTexts.push({ text: spec.slice(0, 36), x: 400, y: tableY + 7, font: 'F1', size: 7.5, color: [0.3, 0.3, 0.3] });

      tableY -= 22;
    }

    // Footer
    pVectors.push({ type: 'line', x1: 36, y1: 52, x2: 576, y2: 52, stroke: [0.8, 0.8, 0.8], lineWidth: 0.8 });
    pTexts.push({ text: 'SCRIPTORA MASTER PRODUCTION BREAKDOWN -- IMMUTABLE SNAPSHOT', x: 36, y: 40, font: 'F2', size: 7.5, color: [0.4, 0.45, 0.5] });
    pTexts.push({ text: `Page ${pageIdx + 1} of ${totalPages}`, x: 510, y: 40, font: 'F1', size: 7.5, color: [0.4, 0.45, 0.5] });

    pages.push({ vectors: pVectors, texts: pTexts });
  }

  const blob = compilePdfDocument(pages);
  const filename = `ScriptBreakdown_${title.replace(/\s+/g, '_')}.pdf`;
  downloadPdfBlob(blob, filename);
  return blob;
}

// =============================================================================
// 5. SHOOTING SCHEDULE MASTER PDF EXPORT
// =============================================================================
export function exportSchedulePdf(scheduleDays = [], scenes = [], scriptInfo = {}) {
  const title = scriptInfo.title || 'Chronicles of Dust';
  const draft = scriptInfo.draft || 'Draft 4.2';
  const pages = [];

  const pVectors = [];
  const pTexts = [];

  // Masthead
  pVectors.push({ type: 'rect', x: 36, y: 735, w: 540, h: 32, fill: [0.08, 0.12, 0.20] });
  pTexts.push({ text: 'SCRIPTORA -- MASTER SHOOTING SCHEDULE', x: 46, y: 752, font: 'F2', size: 10, color: [1.0, 1.0, 1.0] });
  pTexts.push({ text: `${title.toUpperCase()} (${draft}) -- ${scheduleDays.length} SHOOT DAYS`, x: 46, y: 741, font: 'F1', size: 8, color: [0.7, 0.8, 1.0] });
  pTexts.push({ text: 'PAGE 1 OF 1', x: 515, y: 747, font: 'F2', size: 9, color: [1.0, 1.0, 1.0] });

  // Table Header
  let tableY = 705;
  pVectors.push({ type: 'rect', x: 36, y: tableY, w: 540, h: 18, fill: [0.93, 0.94, 0.96], stroke: [0.8, 0.83, 0.88], lineWidth: 0.8 });
  pTexts.push({ text: 'DAY #', x: 42, y: tableY + 5, font: 'F2', size: 8, color: [0.3, 0.35, 0.4] });
  pTexts.push({ text: 'DATE', x: 80, y: tableY + 5, font: 'F2', size: 8, color: [0.3, 0.35, 0.4] });
  pTexts.push({ text: 'SHOOT LOCATION / STAGE', x: 155, y: tableY + 5, font: 'F2', size: 8, color: [0.3, 0.35, 0.4] });
  pTexts.push({ text: 'SCENES', x: 340, y: tableY + 5, font: 'F2', size: 8, color: [0.3, 0.35, 0.4] });
  pTexts.push({ text: 'PAGES', x: 430, y: tableY + 5, font: 'F2', size: 8, color: [0.3, 0.35, 0.4] });
  pTexts.push({ text: 'HOURS', x: 480, y: tableY + 5, font: 'F2', size: 8, color: [0.3, 0.35, 0.4] });
  pTexts.push({ text: 'STATUS', x: 530, y: tableY + 5, font: 'F2', size: 8, color: [0.3, 0.35, 0.4] });

  tableY -= 26;
  for (const day of scheduleDays) {
    pVectors.push({ type: 'rect', x: 36, y: tableY, w: 540, h: 26, fill: [1.0, 1.0, 1.0], stroke: [0.88, 0.90, 0.93], lineWidth: 0.5 });
    pTexts.push({ text: `D${day.dayNumber}`, x: 42, y: tableY + 9, font: 'F2', size: 9, color: [0.1, 0.1, 0.1] });
    pTexts.push({ text: day.date || '', x: 80, y: tableY + 9, font: 'F1', size: 8, color: [0.3, 0.3, 0.3] });
    pTexts.push({ text: day.location || 'Location TBD', x: 155, y: tableY + 13, font: 'F2', size: 8.5, color: [0.1, 0.1, 0.1] });
    pTexts.push({ text: day.title || '', x: 155, y: tableY + 3, font: 'F1', size: 7.5, color: [0.5, 0.5, 0.5] });
    
    const scList = (day.sceneNumbers || []).map(s => `Sc ${s}`).join(', ') || 'None';
    pTexts.push({ text: scList, x: 340, y: tableY + 9, font: 'F4', size: 8.5, color: [0.1, 0.3, 0.8] });
    pTexts.push({ text: day.totalPages || '0 0/8', x: 430, y: tableY + 9, font: 'F3', size: 8, color: [0.3, 0.3, 0.3] });
    pTexts.push({ text: `${day.estHours || 8}h`, x: 480, y: tableY + 9, font: 'F1', size: 8, color: [0.4, 0.4, 0.4] });
    pTexts.push({ text: day.status || 'Draft', x: 530, y: tableY + 9, font: 'F1', size: 7.5, color: day.status === 'Confirmed' ? [0.1, 0.6, 0.2] : [0.4, 0.4, 0.4] });

    tableY -= 26;
  }

  // Footer
  pVectors.push({ type: 'line', x1: 36, y1: 52, x2: 576, y2: 52, stroke: [0.8, 0.8, 0.8], lineWidth: 0.8 });
  pTexts.push({ text: 'SCRIPTORA MASTER STRIPBOARD SCHEDULE -- OWNER CONFIRMED BASELINE', x: 36, y: 40, font: 'F2', size: 7.5, color: [0.4, 0.45, 0.5] });
  pTexts.push({ text: 'Page 1 of 1', x: 525, y: 40, font: 'F1', size: 7.5, color: [0.4, 0.45, 0.5] });

  pages.push({ vectors: pVectors, texts: pTexts });
  const blob = compilePdfDocument(pages);
  const filename = `ShootingSchedule_${title.replace(/\s+/g, '_')}.pdf`;
  downloadPdfBlob(blob, filename);
  return blob;
}

// =============================================================================
// 6. STORYBOARD STUDIO MASTER PDF EXPORT
// =============================================================================
export function exportStoryboardPdf(storyboardOrFrames = [], scriptInfo = {}) {
  const isStoryboardObj = storyboardOrFrames && typeof storyboardOrFrames === 'object' && !Array.isArray(storyboardOrFrames);
  const storyboard = isStoryboardObj ? storyboardOrFrames : null;
  const rawShots = isStoryboardObj ? (storyboard.shots || []) : (Array.isArray(storyboardOrFrames) ? storyboardOrFrames : []);

  const title = scriptInfo.title || (storyboard?.screenplayTitle) || 'Chronicles of Dust';
  const draft = scriptInfo.draft || scriptInfo.sourceVersion || (storyboard?.sourceVersion) || 'Draft 4.2';
  const sceneHeading = scriptInfo.heading || (storyboard?.sceneHeading) || (rawShots[0]?.sceneHeading) || 'SCENE 1 - EXT. MOJAVE OUTPOST GATE 4 - DAY';
  const sceneNum = storyboard?.sceneNumber || rawShots[0]?.sceneNumber || rawShots[0]?.sceneNum || 1;

  const defaultShots = [
    {
      shotNumber: '1A',
      title: 'Perimeter Outpost Gate',
      shotSize: 'Wide Shot',
      cameraAngle: 'High Angle',
      focalLength: '24mm Wide',
      aspectRatio: '2.39:1',
      lightingMood: 'Daylight Dust',
      description: "High altitude drone descending across dust devils toward Kevin's arrival at the arid customs gate.",
      approvalStatus: 'approved',
      directorNotes: "Capture sunrise glint off the guard gate perimeter wires."
    },
    {
      shotNumber: '1B',
      title: 'Gate Scanner Clearance Standoff',
      shotSize: 'Medium Two-Shot',
      cameraAngle: 'Eye Level',
      focalLength: '50mm Prime',
      aspectRatio: '2.39:1',
      lightingMood: 'Harsh Fluorescent Rim',
      description: 'Kevin presents his ID badge to Marcus over the buzzing clearance terminal.',
      approvalStatus: 'approved',
      directorNotes: "Focus pull from scanner terminal to Kevin's tense expression."
    },
    {
      shotNumber: '1C',
      title: 'Terminal Diagnostic Anomaly',
      shotSize: 'Close-Up',
      cameraAngle: 'Low Angle',
      focalLength: '85mm Portrait',
      aspectRatio: '2.39:1',
      lightingMood: 'Cyan Strobe',
      description: 'Close-up insert of the flickering scanner console displaying pressure alert warning in red neon.',
      approvalStatus: 'proposed',
      directorNotes: 'Practical screen insert with pulsing alarm strobe.'
    }
  ];

  const actualShots = (rawShots && rawShots.length > 0) ? rawShots : defaultShots;
  const shotsPerPage = 3;
  const totalPages = Math.ceil(actualShots.length / shotsPerPage) || 1;
  const pages = [];

  for (let pageIdx = 0; pageIdx < totalPages; pageIdx++) {
    const pVectors = [];
    const pTexts = [];
    const pageShots = actualShots.slice(pageIdx * shotsPerPage, (pageIdx + 1) * shotsPerPage);

    // Masthead Header Bar
    pVectors.push({ type: 'rect', x: 36, y: 735, w: 540, h: 32, fill: [0.08, 0.12, 0.20] });
    pTexts.push({ text: 'SCRIPTORA -- STORYBOARD STUDIO SHOT COMPOSITION', x: 46, y: 752, font: 'F2', size: 10, color: [1.0, 1.0, 1.0] });
    pTexts.push({ text: `${title.toUpperCase()} (${draft}) -- ${escapePdfText(sceneHeading).toUpperCase()}`, x: 46, y: 741, font: 'F1', size: 8, color: [0.7, 0.8, 1.0] });
    pTexts.push({ text: `PAGE ${pageIdx + 1} OF ${totalPages}`, x: 505, y: 747, font: 'F2', size: 9, color: [1.0, 1.0, 1.0] });

    let cardY = 575;
    for (const f of pageShots) {
      const shotNumStr = f.shotNumber || f.shotNum || `${sceneNum}A`;
      const shotTitle = f.title || `Shot ${shotNumStr}`;
      const lensSetup = f.focalLength || f.lens || '50mm Prime';
      const framingRatio = f.aspectRatio || '2.39:1';
      const angleSize = `${f.shotSize || 'Medium Shot'} / ${f.cameraAngle || 'Eye Level'}`;
      const appStatus = (f.approvalStatus || 'Draft').toUpperCase();
      const statusColor = appStatus === 'APPROVED' ? [0.1, 0.6, 0.2] : (appStatus === 'PROPOSED' ? [0.8, 0.5, 0.1] : [0.4, 0.45, 0.5]);

      // Outer Card Box
      pVectors.push({ type: 'rect', x: 36, y: cardY, w: 540, h: 140, fill: [1.0, 1.0, 1.0], stroke: [0.85, 0.88, 0.92], lineWidth: 0.8 });

      // Visual Viewport Frame Simulation (2.39:1 or 16:9 widescreen canvas)
      pVectors.push({ type: 'rect', x: 46, y: cardY + 15, w: 200, h: 110, fill: [0.08, 0.10, 0.15], stroke: [0.25, 0.30, 0.38], lineWidth: 1.0 });

      // Viewport Rule-of-Thirds Grid Markers
      pVectors.push({ type: 'line', x1: 112, y1: cardY + 15, x2: 112, y2: cardY + 125, stroke: [0.2, 0.25, 0.32], lineWidth: 0.4 });
      pVectors.push({ type: 'line', x1: 178, y1: cardY + 15, x2: 178, y2: cardY + 125, stroke: [0.2, 0.25, 0.32], lineWidth: 0.4 });
      pVectors.push({ type: 'line', x1: 46, y1: cardY + 52, x2: 246, y2: cardY + 52, stroke: [0.2, 0.25, 0.32], lineWidth: 0.4 });
      pVectors.push({ type: 'line', x1: 46, y1: cardY + 88, x2: 246, y2: cardY + 88, stroke: [0.2, 0.25, 0.32], lineWidth: 0.4 });

      // Center Crosshair
      pVectors.push({ type: 'line', x1: 141, y1: cardY + 70, x2: 151, y2: cardY + 70, stroke: [0.4, 0.6, 0.8], lineWidth: 0.8 });
      pVectors.push({ type: 'line', x1: 146, y1: cardY + 65, x2: 146, y2: cardY + 75, stroke: [0.4, 0.6, 0.8], lineWidth: 0.8 });

      // Corner Framing Tick Marks
      pVectors.push({ type: 'line', x1: 52, y1: cardY + 119, x2: 58, y2: cardY + 119, stroke: [0.5, 0.7, 0.9], lineWidth: 0.8 });
      pVectors.push({ type: 'line', x1: 52, y1: cardY + 119, x2: 52, y2: cardY + 113, stroke: [0.5, 0.7, 0.9], lineWidth: 0.8 });
      pVectors.push({ type: 'line', x1: 240, y1: cardY + 21, x2: 234, y2: cardY + 21, stroke: [0.5, 0.7, 0.9], lineWidth: 0.8 });
      pVectors.push({ type: 'line', x1: 240, y1: cardY + 21, x2: 240, y2: cardY + 27, stroke: [0.5, 0.7, 0.9], lineWidth: 0.8 });

      // Frame Badges inside canvas
      pTexts.push({ text: `REC * SHOT ${shotNumStr}`, x: 52, y: cardY + 110, font: 'F4', size: 7.5, color: [1.0, 1.0, 1.0] });
      pTexts.push({ text: `${framingRatio} * ${lensSetup}`, x: 52, y: cardY + 23, font: 'F3', size: 7, color: [0.7, 0.8, 0.9] });

      // Right Side Shot Details
      pTexts.push({ text: `SHOT ${shotNumStr} -- SCENE ${sceneNum}`, x: 260, y: cardY + 115, font: 'F2', size: 9.5, color: [0.1, 0.3, 0.8] });

      // Status Pill on top-right of card
      pVectors.push({ type: 'rect', x: 480, y: cardY + 112, w: 86, h: 16, fill: [0.95, 0.96, 0.98], stroke: statusColor, lineWidth: 0.7 });
      pTexts.push({ text: appStatus, x: 486, y: cardY + 117, font: 'F2', size: 7, color: statusColor });

      // Shot Title
      pTexts.push({ text: shotTitle.slice(0, 38), x: 260, y: cardY + 100, font: 'F2', size: 10.5, color: [0.08, 0.1, 0.12] });

      // Camera & Lens Details
      pTexts.push({ text: `Camera: ${angleSize} * ${lensSetup} (${framingRatio})`, x: 260, y: cardY + 86, font: 'F1', size: 8, color: [0.35, 0.4, 0.45] });

      // Description
      const descLines = wrapPdfText(f.description || '', 48);
      let descY = cardY + 72;
      for (let d = 0; d < Math.min(descLines.length, 3); d++) {
        pTexts.push({ text: descLines[d], x: 260, y: descY, font: 'F1', size: 8, color: [0.18, 0.22, 0.26] });
        descY -= 11;
      }

      // Director's Notes or Continuity
      const dirNotes = f.directorNotes || f.continuity?.lightingContinuity || f.continuity?.eyeline || '';
      if (dirNotes) {
        pTexts.push({ text: `Note: ${dirNotes.slice(0, 52)}`, x: 260, y: cardY + 25, font: 'F5', size: 7.5, color: [0.45, 0.48, 0.52] });
      }

      cardY -= 150;
    }

    // Page Footer
    pVectors.push({ type: 'line', x1: 36, y1: 52, x2: 576, y2: 52, stroke: [0.8, 0.8, 0.8], lineWidth: 0.8 });
    pTexts.push({ text: 'SCRIPTORA STORYBOARD STUDIO -- OFFICIAL CAMERA & CONCEPT COMPOSITION', x: 36, y: 40, font: 'F2', size: 7.5, color: [0.4, 0.45, 0.5] });
    pTexts.push({ text: `Page ${pageIdx + 1} of ${totalPages}`, x: 510, y: 40, font: 'F1', size: 7.5, color: [0.4, 0.45, 0.5] });

    pages.push({ vectors: pVectors, texts: pTexts });
  }

  const blob = compilePdfDocument(pages);
  const cleanSceneHeading = (sceneHeading || 'Scene1').replace(/[^a-zA-Z0-9]+/g, '_').slice(0, 30);
  const filename = `Storyboard_${title.replace(/\s+/g, '_')}_${cleanSceneHeading}.pdf`;
  downloadPdfBlob(blob, filename);
  return blob;
}
