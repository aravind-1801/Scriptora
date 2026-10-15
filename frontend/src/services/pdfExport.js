// =============================================================================
// SCRIPTORA PROFESSIONAL PDF 1.4 VECTOR EXPORT ENGINE
// Genuine, typeset PDF documents with selectable text, standard Type 1 fonts,
// vector borders, tables, headers, footers, and page numbers.
// NO raster screenshots, NO canvas screen-grabs, NO application chrome.
// =============================================================================

function escapePdfText(str) {
  if (!str) return '';
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[\r\n]+/g, ' ');
}

function wrapPdfText(text, maxChars) {
  if (!text) return [];
  const words = String(text).split(' ');
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
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 1500);
}

// Low-level builder that compiles vector draw instructions into PDF 1.4 binary
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

  // Pre-allocate Font Objects
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

  allObjects[fontIds.F1] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`;
  allObjects[fontIds.F2] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>`;
  allObjects[fontIds.F3] = `<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>`;
  allObjects[fontIds.F4] = `<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold >>`;
  allObjects[fontIds.F5] = `<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Oblique >>`;
  allObjects[fontIds.F6] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>`;

  const fontResourceDict = `<< /F1 ${fontIds.F1} 0 R /F2 ${fontIds.F2} 0 R /F3 ${fontIds.F3} 0 R /F4 ${fontIds.F4} 0 R /F5 ${fontIds.F5} 0 R /F6 ${fontIds.F6} 0 R >>`;

  for (let i = 0; i < totalPages; i++) {
    allObjects[pageObjectIds[i]] = `<< /Type /Page /Parent ${pagesRootId} 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Contents ${contentStreamIds[i]} 0 R /Resources << /Font ${fontResourceDict} >> >>`;

    // Construct stream for this page
    const pageData = pages[i];
    let stream = '';

    // Draw lines, rects, and text
    // 1. Vector Rectangles & Lines
    if (pageData.vectors && pageData.vectors.length) {
      for (const v of pageData.vectors) {
        if (v.type === 'rect') {
          // Fill
          if (v.fill) {
            stream += `${v.fill[0]} ${v.fill[1]} ${v.fill[2]} rg\n`;
            stream += `${v.x.toFixed(2)} ${v.y.toFixed(2)} ${v.w.toFixed(2)} ${v.h.toFixed(2)} re\nf\n`;
          }
          // Stroke
          if (v.stroke) {
            stream += `${v.stroke[0]} ${v.stroke[1]} ${v.stroke[2]} RG\n`;
            stream += `${v.lineWidth || 1} w\n`;
            stream += `${v.x.toFixed(2)} ${v.y.toFixed(2)} ${v.w.toFixed(2)} ${v.h.toFixed(2)} re\nS\n`;
          }
        } else if (v.type === 'line') {
          stream += `${v.stroke[0]} ${v.stroke[1]} ${v.stroke[2]} RG\n`;
          stream += `${v.lineWidth || 1} w\n`;
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
        stream += `${color[0]} ${color[1]} ${color[2]} rg\n`;
        stream += `1 0 0 1 ${t.x.toFixed(2)} ${t.y.toFixed(2)} Tm\n`;
        stream += `(${safe}) Tj\n`;
        stream += `ET\n`;
      }
    }

    allObjects[contentStreamIds[i]] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
  }

  // Assemble PDF document binary
  let pdf = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
  const offsets = [];

  for (let i = 1; i <= currentId; i++) {
    offsets[i] = pdf.length;
    pdf += `${i} 0 obj\n${allObjects[i]}\nendobj\n`;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${currentId + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= currentId; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${currentId + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return new Blob([pdf], { type: 'application/pdf' });
}

// =============================================================================
// 1. CALL SHEET PDF EXPORT
// =============================================================================
export function exportCallSheetPdf(cs, scriptInfo = {}) {
  const title = scriptInfo.title || 'Chronicles of Dust';
  const draft = scriptInfo.draft || 'Draft 4.2 (Pinned)';
  const pages = [];

  // Page 1 Setup
  const p1Vectors = [];
  const p1Texts = [];

  // Masthead Header Box
  p1Vectors.push({ type: 'rect', x: 36, y: 730, w: 540, h: 36, fill: [0.08, 0.12, 0.20] }); // Slate-900 banner
  p1Texts.push({ text: 'SCRIPTORA · OFFICIAL PRODUCTION CALL SHEET', x: 46, y: 752, font: 'F2', size: 10, color: [0.9, 0.9, 0.9] });
  p1Texts.push({ text: `${title.toUpperCase()} — ${draft}`, x: 46, y: 738, font: 'F1', size: 9, color: [0.7, 0.8, 1.0] });
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
  p1Texts.push({ text: `${cs.locationName || 'Mojave Outpost Gate 4'} — ${cs.locationAddress || 'Perimeter Road 9, Cantil, CA'}`, x: 46, y: 635, font: 'F1', size: 9, color: [0.1, 0.1, 0.1] });
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
    p1Texts.push({ text: c.character, x: 42, y: tableY + 6, font: 'F2', size: 8.5, color: [0.1, 0.1, 0.1] });
    p1Texts.push({ text: c.actor, x: 160, y: tableY + 6, font: 'F1', size: 8.5, color: [0.2, 0.2, 0.2] });
    p1Texts.push({ text: c.pickup, x: 300, y: tableY + 6, font: 'F3', size: 8, color: [0.3, 0.3, 0.3] });
    p1Texts.push({ text: c.hmuCall, x: 370, y: tableY + 6, font: 'F3', size: 8, color: [0.3, 0.3, 0.3] });
    p1Texts.push({ text: c.onSet, x: 450, y: tableY + 6, font: 'F4', size: 8.5, color: [0.1, 0.3, 0.8] });
    p1Texts.push({ text: c.status || 'Confirmed', x: 520, y: tableY + 6, font: 'F1', size: 7.5, color: [0.2, 0.6, 0.3] });
    tableY -= 20;
  }

  // Safety & Special Notes Box
  tableY -= 15;
  p1Vectors.push({ type: 'rect', x: 36, y: tableY - 35, w: 540, h: 42, fill: [0.99, 0.98, 0.94], stroke: [0.92, 0.88, 0.75], lineWidth: 0.8 });
  p1Texts.push({ text: 'SAFETY DIRECTIVES & PRODUCTION INSTRUCTIONS:', x: 46, y: tableY - 5, font: 'F2', size: 8, color: [0.6, 0.4, 0.1] });
  const noteLines = wrapPdfText(cs.specialInstructions || 'Eye protection mandatory for all perimeter crew during afternoon dust squalls. Hearing protection active in generator bays.', 105);
  p1Texts.push({ text: noteLines[0] || '', x: 46, y: tableY - 17, font: 'F1', size: 7.5, color: [0.3, 0.25, 0.1] });
  if (noteLines[1]) p1Texts.push({ text: noteLines[1], x: 46, y: tableY - 27, font: 'F1', size: 7.5, color: [0.3, 0.25, 0.1] });

  // Official Footer
  p1Vectors.push({ type: 'line', x1: 36, y1: 52, x2: 576, y2: 52, stroke: [0.8, 0.8, 0.8], lineWidth: 0.8 });
  p1Texts.push({ text: 'APPROVED & PUBLISHED BY OWNER · SCRIPTORA PRODUCTION ARCHITECTURE', x: 36, y: 40, font: 'F2', size: 7.5, color: [0.4, 0.45, 0.5] });
  p1Texts.push({ text: `Version: ${cs.version || 'v1.0 (Snapshot)'} • Page 1 of 1`, x: 440, y: 40, font: 'F1', size: 7.5, color: [0.4, 0.45, 0.5] });

  pages.push({ vectors: p1Vectors, texts: p1Texts });
  const blob = compilePdfDocument(pages);
  const filename = `CallSheet_Day${cs.callSheetNumber || '01'}_${title.replace(/\s+/g, '_')}.pdf`;
  downloadPdfBlob(blob, filename);
  return blob;
}

// =============================================================================
// 2. DIALOGUE SHEET PDF EXPORT (Character-focused Screenplay Monospaced)
// =============================================================================
export function exportDialogueSheetPdf(characterName, dialogueLines, scriptInfo = {}) {
  const title = scriptInfo.title || 'Chronicles of Dust';
  const draft = scriptInfo.draft || 'Draft 4.2';
  const pages = [];
  const linesPerPage = 38;

  // Split lines into chunks
  const chunks = [];
  let currentChunk = [];
  let lineCount = 0;

  for (const item of dialogueLines) {
    const speechLines = wrapPdfText(item.dialogue, 46);
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
    pTexts.push({ text: 'SCRIPTORA · CHARACTER DIALOGUE SHEET', x: 54, y: 755, font: 'F4', size: 9, color: [0.3, 0.3, 0.3] });
    pTexts.push({ text: `PAGE ${pageIdx + 1} OF ${chunks.length}`, x: 490, y: 755, font: 'F4', size: 9, color: [0.3, 0.3, 0.3] });

    pTexts.push({ text: `${characterName.toUpperCase()} — ALL DIALOGUE CUES`, x: 54, y: 730, font: 'F4', size: 12, color: [0.0, 0.0, 0.0] });
    pTexts.push({ text: `Screenplay: ${title} (${draft}) • Pinned Baseline`, x: 54, y: 716, font: 'F3', size: 9, color: [0.4, 0.4, 0.4] });

    let curY = 680;
    for (const cue of chunk) {
      // Scene Heading
      pTexts.push({ text: `SCENE ${cue.sceneNum} — ${cue.heading}`, x: 54, y: curY, font: 'F4', size: 9, color: [0.1, 0.3, 0.7] });
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
      const charWidth = cue.character.length * 6.5;
      pTexts.push({ text: cue.character, x: Math.max(160, 306 - (charWidth / 2)), y: curY, font: 'F4', size: 10, color: [0.0, 0.0, 0.0] });
      curY -= 12;

      // Parenthetical
      if (cue.parenthetical) {
        const parWidth = cue.parenthetical.length * 5.5;
        pTexts.push({ text: cue.parenthetical, x: Math.max(160, 306 - (parWidth / 2)), y: curY, font: 'F5', size: 9, color: [0.3, 0.3, 0.3] });
        curY -= 12;
      }

      // Dialogue Lines (Standard screenplay margin indent: X=170, max width 280 pt)
      for (const line of cue.speechLines) {
        pTexts.push({ text: line, x: 170, y: curY, font: 'F3', size: 10, color: [0.0, 0.0, 0.0] });
        curY -= 13;
      }

      curY -= 12; // Gap between cues
    }

    // Screenplay Footer
    pVectors.push({ type: 'line', x1: 54, y1: 50, x2: 558, y2: 50, stroke: [0.8, 0.8, 0.8], lineWidth: 0.8 });
    pTexts.push({ text: `SCRIPTORA SCREENPLAY ARCHITECTURE · ${characterName.toUpperCase()} · DRAFT 4.2`, x: 54, y: 38, font: 'F3', size: 8, color: [0.5, 0.5, 0.5] });
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
export function exportActorSidesPdf(sceneNumber, sceneLines, sceneInfo = {}, scriptInfo = {}) {
  const title = scriptInfo.title || 'Chronicles of Dust';
  const draft = scriptInfo.draft || 'Draft 4.2';
  const heading = sceneInfo.heading || `SCENE ${sceneNumber} - DAY`;
  const pages = [];

  const pVectors = [];
  const pTexts = [];

  // Masthead
  pVectors.push({ type: 'rect', x: 54, y: 730, w: 504, h: 32, fill: [0.1, 0.1, 0.1] });
  pTexts.push({ text: 'SCRIPTORA · REHEARSAL & ON-SET SIDES', x: 64, y: 748, font: 'F4', size: 9, color: [0.8, 0.8, 0.8] });
  pTexts.push({ text: `SCENE ${sceneNumber} SIDES`, x: 460, y: 748, font: 'F4', size: 10, color: [1.0, 1.0, 1.0] });

  pTexts.push({ text: `${title.toUpperCase()} — SCENE ${sceneNumber}`, x: 54, y: 712, font: 'F4', size: 13, color: [0.0, 0.0, 0.0] });
  pTexts.push({ text: `${heading} · ${draft}`, x: 54, y: 698, font: 'F3', size: 9, color: [0.4, 0.4, 0.4] });

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

    // Character Cue
    const charWidth = line.character.length * 6.5;
    pTexts.push({ text: line.character, x: Math.max(160, 306 - (charWidth / 2)), y: curY, font: 'F4', size: 10, color: [0.0, 0.0, 0.0] });
    curY -= 13;

    if (line.parenthetical) {
      const pWidth = line.parenthetical.length * 5.5;
      pTexts.push({ text: line.parenthetical, x: Math.max(160, 306 - (pWidth / 2)), y: curY, font: 'F5', size: 9, color: [0.3, 0.3, 0.3] });
      curY -= 12;
    }

    const diaLines = wrapPdfText(line.dialogue, 46);
    for (const dl of diaLines) {
      pTexts.push({ text: dl, x: 170, y: curY, font: 'F3', size: 10, color: [0.0, 0.0, 0.0] });
      curY -= 13;
    }

    curY -= 10;
  }

  // End of Scene Stamp
  pVectors.push({ type: 'rect', x: 180, y: curY - 15, w: 252, h: 20, fill: [0.95, 0.95, 0.95], stroke: [0.7, 0.7, 0.7], lineWidth: 0.8 });
  pTexts.push({ text: `END OF SCENE ${sceneNumber} SIDES · STAMPED DRAFT 4.2`, x: 195, y: curY - 3, font: 'F4', size: 7.5, color: [0.3, 0.3, 0.3] });

  // Footer
  pVectors.push({ type: 'line', x1: 54, y1: 50, x2: 558, y2: 50, stroke: [0.8, 0.8, 0.8], lineWidth: 0.8 });
  pTexts.push({ text: 'SCRIPTORA REHEARSAL COPY · OFFICIAL PRODUCTION SIDES', x: 54, y: 38, font: 'F3', size: 8, color: [0.5, 0.5, 0.5] });
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
export function exportBreakdownPdf(breakdownItems, scriptInfo = {}) {
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
    pTexts.push({ text: 'SCRIPTORA · SCRIPT BREAKDOWN MASTER REPORT', x: 46, y: 752, font: 'F2', size: 10, color: [1.0, 1.0, 1.0] });
    pTexts.push({ text: `${title.toUpperCase()} (${draft}) · 18 SCENES`, x: 46, y: 741, font: 'F1', size: 8, color: [0.7, 0.8, 1.0] });
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
    pTexts.push({ text: 'SCRIPTORA MASTER PRODUCTION BREAKDOWN · IMMUTABLE SNAPSHOT', x: 36, y: 40, font: 'F2', size: 7.5, color: [0.4, 0.45, 0.5] });
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
export function exportSchedulePdf(scheduleDays, scenes = [], scriptInfo = {}) {
  const title = scriptInfo.title || 'Chronicles of Dust';
  const draft = scriptInfo.draft || 'Draft 4.2';
  const pages = [];
  const daysPerPage = 14;

  const pVectors = [];
  const pTexts = [];

  // Masthead
  pVectors.push({ type: 'rect', x: 36, y: 735, w: 540, h: 32, fill: [0.08, 0.12, 0.20] });
  pTexts.push({ text: 'SCRIPTORA · MASTER SHOOTING SCHEDULE', x: 46, y: 752, font: 'F2', size: 10, color: [1.0, 1.0, 1.0] });
  pTexts.push({ text: `${title.toUpperCase()} (${draft}) · 14 SHOOT DAYS · 18 SCENES`, x: 46, y: 741, font: 'F1', size: 8, color: [0.7, 0.8, 1.0] });
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
  pTexts.push({ text: 'SCRIPTORA MASTER STRIPBOARD SCHEDULE · OWNER CONFIRMED BASELINE', x: 36, y: 40, font: 'F2', size: 7.5, color: [0.4, 0.45, 0.5] });
  pTexts.push({ text: 'Page 1 of 1', x: 525, y: 40, font: 'F1', size: 7.5, color: [0.4, 0.45, 0.5] });

  pages.push({ vectors: pVectors, texts: pTexts });
  const blob = compilePdfDocument(pages);
  const filename = `ShootingSchedule_${title.replace(/\s+/g, '_')}.pdf`;
  downloadPdfBlob(blob, filename);
  return blob;
}
