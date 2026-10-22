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
    // Replace Unicode typography with clean, universal ASCII equivalents
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
  const draft = scriptInfo.draft || 'Draft 4.2 (Pinned)';
  const pages = [];

  // Page 1 Setup
  const p1Vectors = [];
  const p1Texts = [];

  // Masthead Header Box
  p1Vectors.push({ type: 'rect', x: 36, y: 730, w: 540, h: 36, fill: [0.08, 0.12, 0.20] }); // Slate-900 banner
  p1Texts.push({ text: 'SCRIPTORA -- OFFICIAL PRODUCTION CALL SHEET', x: 46, y: 752, font: 'F2', size: 10, color: [0.9, 0.9, 0.9] });
  p1Texts.push({ text: `${title.toUpperCase()} -- ${draft}`, x: 46, y: 738, font: 'F1', size: 9, color: [0.7, 0.8, 1.0] });
  p1Texts.push({ text: `DAY ${cs.callSheetNumber || '01'} OF 14`, x: 495, y: 746, font: 'F2', size: 12, color: [1.0, 1.0, 1.0] });

  // Call Times Summary Box
  p1Vectors.push({ type: 'rect', x: 36, y: 670, w: 540, h: 50, fill: [0.97, 0.98, 0.99], stroke: [0.85, 0.88, 0.92], lineWidth: 0.8 });
  
  // 4 Call Columns
  p1Texts.push({ text: 'DATE', x: 50, y: 706, font: 'F2', size: 8, color: [0.4, 0.45, 0.5] });
  p1Texts.push({ text: cs.shootDate || 'Saturday, Oct 24, 2026', x: 50, y: 692, font: 'F2', size: 10, color: [0.1, 0.1, 0.1] });
  p1Texts.push({ text: cs.shootDay || 'Day 1 of 14', x: 50, y: 680, font: 'F1', size: 8, color: [0.4, 0.45, 0.5] });

  p1Texts.push({ text: 'CREW CALL', x: 190, y: 706, font: 'F2', size: 8, color: [0.4, 0.45, 0.5] });
  p1Texts.push({ text: cs.generalCrewCall || '06:00 AM', x: 190, y: 692, font: 'F2', size: 11, color: [0.1, 0.1, 0.1] });
  p1Texts.push({ text: `Breakfast: ${cs.breakfastTime || '05:15 AM'}`, x: 190, y: 680, font: 'F1', size: 8, color: [0.4, 0.45, 0.5] });

  p1Texts.push({ text: 'SHOOTING CALL', x: 320, y: 706, font: 'F2', size: 8, color: [0.1, 0.35, 0.85] });
  p1Texts.push({ text: cs.shootingCall || '06:30 AM', x: 320, y: 692, font: 'F2', size: 11, color: [0.1, 0.35, 0.85] });
  p1Texts.push({ text: 'First Shot on Set', x: 320, y: 680, font: 'F1', size: 8, color: [0.4, 0.45, 0.5] });

  p1Texts.push({ text: 'ESTIMATED WRAP', x: 450, y: 706, font: 'F2', size: 8, color: [0.4, 0.45, 0.5] });
  p1Texts.push({ text: cs.estimatedWrap || '06:30 PM', x: 450, y: 692, font: 'F2', size: 11, color: [0.1, 0.1, 0.1] });
  p1Texts.push({ text: '12hr Turnaround', x: 450, y: 680, font: 'F1', size: 8, color: [0.4, 0.45, 0.5] });

  // Location & Medical Notice Box
  p1Vectors.push({ type: 'rect', x: 36, y: 605, w: 540, h: 55, fill: [1.0, 1.0, 1.0], stroke: [0.85, 0.88, 0.92], lineWidth: 0.8 });
  p1Texts.push({ text: 'PRIMARY SET LOCATION & BASECAMP:', x: 46, y: 647, font: 'F2', size: 8, color: [0.2, 0.25, 0.3] });
  p1Texts.push({ text: `${cs.locationName || 'Mojave Outpost Gate 4'} -- ${cs.locationAddress || 'Perimeter Road 9, Cantil, CA'}`, x: 46, y: 635, font: 'F1', size: 9, color: [0.1, 0.1, 0.1] });
  p1Texts.push({ text: `Parking: ${cs.parkingNotes || 'Basecamp Lot B. Crew shuttle runs every 10 mins.'}`, x: 46, y: 624, font: 'F1', size: 8, color: [0.4, 0.45, 0.5] });
  p1Texts.push({ text: `Emergency Medical: ${cs.nearestHospital || 'Desert Care Regional Medical Center (Ph: 760-379-2681)'}`, x: 46, y: 613, font: 'F1', size: 8, color: [0.8, 0.2, 0.2] });

  // ---------------------------------------------------------------------------
  // SECTION 1: DAILY SCENE SCHEDULE TABLE
  // ---------------------------------------------------------------------------
  p1Texts.push({ text: 'SCHEDULED SCENES TO SHOOT', x: 36, y: 588, font: 'F2', size: 10, color: [0.1, 0.1, 0.1] });

  // Table Header Row
  let tableY = 570;
  p1Vectors.push({ type: 'rect', x: 36, y: tableY, w: 540, h: 18, fill: [0.93, 0.94, 0.96], stroke: [0.8, 0.83, 0.88], lineWidth: 0.8 });
  p1Texts.push({ text: 'SCENE #', x: 42, y: tableY + 5, font: 'F2', size: 8, color: [0.3, 0.35, 0.4] });
  p1Texts.push({ text: 'SET & SCENE DESCRIPTION', x: 105, y: tableY + 5, font: 'F2', size: 8, color: [0.3, 0.35, 0.4] });
  p1Texts.push({ text: 'D/N', x: 375, y: tableY + 5, font: 'F2', size: 8, color: [0.3, 0.35, 0.4] });
  p1Texts.push({ text: 'PAGES', x: 415, y: tableY + 5, font: 'F2', size: 8, color: [0.3, 0.35, 0.4] });
  p1Texts.push({ text: 'CAST CHARACTERS', x: 465, y: tableY + 5, font: 'F2', size: 8, color: [0.3, 0.35, 0.4] });

  const scenes = cs.scenes || [
    { sceneNumber: 1, heading: 'EXT. MOJAVE OUTPOST GATE 4 - DAY', pages: '4 1/8', cast: ['KEVIN', 'MARCUS'], desc: 'Kevin arrives at border gate, inspection.' },
    { sceneNumber: 2, heading: 'INT. OUTPOST CUSTOMS SHED - DAY', pages: '3 4/8', cast: ['KEVIN', 'MEERA'], desc: 'Kevin discovers telemetry pressure loss.' }
  ];

  tableY -= 24;
  for (const sc of scenes) {
    p1Vectors.push({ type: 'rect', x: 36, y: tableY, w: 540, h: 24, fill: [1.0, 1.0, 1.0], stroke: [0.88, 0.90, 0.93], lineWidth: 0.5 });
    p1Texts.push({ text: `Scene ${sc.sceneNumber}`, x: 42, y: tableY + 9, font: 'F4', size: 9, color: [0.1, 0.3, 0.8] });
    p1Texts.push({ text: sc.heading || `Scene ${sc.sceneNumber}`, x: 105, y: tableY + 12, font: 'F2', size: 8, color: [0.1, 0.1, 0.1] });
    p1Texts.push({ text: sc.desc || '', x: 105, y: tableY + 3, font: 'F1', size: 7.5, color: [0.4, 0.45, 0.5] });
    p1Texts.push({ text: sc.heading?.includes('NIGHT') ? 'NIGHT' : 'DAY', x: 375, y: tableY + 9, font: 'F1', size: 8, color: [0.3, 0.3, 0.3] });
    p1Texts.push({ text: sc.pages || '1.0', x: 415, y: tableY + 9, font: 'F3', size: 8, color: [0.3, 0.3, 0.3] });
    p1Texts.push({ text: (sc.cast || []).join(', '), x: 465, y: tableY + 9, font: 'F2', size: 8, color: [0.2, 0.2, 0.2] });
    tableY -= 24;
  }

  // ---------------------------------------------------------------------------
  // SECTION 2: CAST & TALENT CALL TABLE
  // ---------------------------------------------------------------------------
  tableY -= 15;
  p1Texts.push({ text: 'CAST & TALENT CALLS', x: 36, y: tableY + 10, font: 'F2', size: 10, color: [0.1, 0.1, 0.1] });

  p1Vectors.push({ type: 'rect', x: 36, y: tableY - 10, w: 540, h: 18, fill: [0.93, 0.94, 0.96], stroke: [0.8, 0.83, 0.88], lineWidth: 0.8 });
  p1Texts.push({ text: 'CHARACTER', x: 42, y: tableY - 5, font: 'F2', size: 8, color: [0.3, 0.35, 0.4] });
  p1Texts.push({ text: 'ACTOR / TALENT', x: 160, y: tableY - 5, font: 'F2', size: 8, color: [0.3, 0.35, 0.4] });
  p1Texts.push({ text: 'PICKUP', x: 300, y: tableY - 5, font: 'F2', size: 8, color: [0.3, 0.35, 0.4] });
  p1Texts.push({ text: 'H/MU CALL', x: 370, y: tableY - 5, font: 'F2', size: 8, color: [0.3, 0.35, 0.4] });
  p1Texts.push({ text: 'ON SET CALL', x: 450, y: tableY - 5, font: 'F2', size: 8, color: [0.3, 0.35, 0.4] });
  p1Texts.push({ text: 'STATUS', x: 520, y: tableY - 5, font: 'F2', size: 8, color: [0.3, 0.35, 0.4] });

  tableY -= 32;
  const castCalls = cs.castCalls || [
    { character: 'KEVIN', actor: 'Dev Patel', pickup: '05:00 AM', hmuCall: '05:30 AM', onSet: '06:30 AM', status: 'Confirmed' },
    { character: 'MARCUS', actor: 'David Chen', pickup: '05:15 AM', hmuCall: '05:45 AM', onSet: '06:30 AM', status: 'Confirmed' },
    { character: 'MEERA', actor: 'Zoe Saldana', pickup: '08:30 AM', hmuCall: '09:00 AM', onSet: '10:30 AM', status: 'Confirmed' }
  ];

  for (const c of castCalls) {
    p1Vectors.push({ type: 'rect', x: 36, y: tableY, w: 540, h: 20, fill: [1.0, 1.0, 1.0], stroke: [0.88, 0.90, 0.93], lineWidth: 0.5 });
    p1Texts.push({ text: c.character || 'CHARACTER', x: 42, y: tableY + 6, font: 'F2', size: 8.5, color: [0.1, 0.1, 0.1] });
    p1Texts.push({ text: c.actor || '', x: 160, y: tableY + 6, font: 'F1', size: 8.5, color: [0.2, 0.2, 0.2] });
    p1Texts.push({ text: c.pickup || '-', x: 300, y: tableY + 6, font: 'F3', size: 8, color: [0.3, 0.3, 0.3] });
    p1Texts.push({ text: c.hmuCall || '-', x: 370, y: tableY + 6, font: 'F3', size: 8, color: [0.3, 0.3, 0.3] });
    p1Texts.push({ text: c.onSet || '-', x: 450, y: tableY + 6, font: 'F4', size: 8.5, color: [0.1, 0.3, 0.8] });
    p1Texts.push({ text: c.status || 'Confirmed', x: 520, y: tableY + 6, font: 'F1', size: 7.5, color: [0.2, 0.6, 0.3] });
    tableY -= 20;
  }

  // Safety & Special Notes Box
  tableY -= 15;
  p1Vectors.push({ type: 'rect', x: 36, y: tableY - 35, w: 540, h: 42, fill: [0.99, 0.98, 0.94], stroke: [0.92, 0.88, 0.75], lineWidth: 0.8 });
  p1Texts.push({ text: 'SAFETY DIRECTIVES & PRODUCTION INSTRUCTIONS:', x: 46, y: tableY - 5, font: 'F2', size: 8, color: [0.6, 0.4, 0.1] });
  const noteLines = wrapPdfText(cs.specialInstructions || 'Eye protection mandatory for all perimeter crew during afternoon dust squalls. Hearing protection active in generator bays.', 105);
  p1Texts.push({ text: noteLines[0] || '', x: 46, y: tableY - 17, font: 'F1', size: 7.5, color: [0.3, 0.25, 0.1] });
  p1Texts.push({ text: noteLines[1] || '', x: 46, y: tableY - 28, font: 'F1', size: 7.5, color: [0.3, 0.25, 0.1] });

  // Footer Rule
  p1Vectors.push({ type: 'line', x1: 36, y1: 45, x2: 576, y2: 45, stroke: [0.8, 0.8, 0.8], lineWidth: 0.8 });
  p1Texts.push({ text: 'CONFIDENTIAL -- SCRIPTORA PRODUCTION STUDIO -- NOT FOR PUBLIC DISTRIBUTION', x: 36, y: 32, font: 'F1', size: 7.5, color: [0.5, 0.5, 0.5] });
  p1Texts.push({ text: 'Page 1 of 1', x: 525, y: 32, font: 'F1', size: 7.5, color: [0.5, 0.5, 0.5] });

  pages.push({ vectors: p1Vectors, texts: p1Texts });

  const blob = compilePdfDocument(pages);
  const filename = `CallSheet_Day${cs.callSheetNumber || '01'}_${title.replace(/\s+/g, '_')}.pdf`;
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
