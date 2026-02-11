/**
 * Pattern generation logic: text-based knitting instructions.
 * Modular pattern registry, custom pattern engine, validation.
 * No DOM, no network – deterministic.
 */

const PATTERN_REGISTRY = [
  {
    id: 'glatt-rechts',
    name: 'Stockinette',
    getRowInstruction: (row, stitches) =>
      row % 2 === 1
        ? 'knit all ' + stitches + ' stitches.'
        : 'purl all ' + stitches + ' stitches.'
  },
  {
    id: 'kraus-rechts',
    name: 'Garter',
    getRowInstruction: (row, stitches) => 'knit all ' + stitches + ' stitches (every row same).'
  },
  {
    id: 'rippe-1x1',
    name: '1x1 Rib',
    getRowInstruction: () => '* k1, p1 * to end of row (work as they appear).'
  },
  {
    id: 'rippe-2x2',
    name: '2x2 Rib',
    getRowInstruction: () => '* k2, p2 * to end of row (work as they appear).'
  },
  {
    id: 'perlmuster',
    name: 'Seed stitch',
    getRowInstruction: (row) =>
      row % 2 === 1
        ? '* k1, p1 * to end of row.'
        : '* p1, k1 * to end of row.'
  },
  {
    id: 'halbpatent',
    name: 'Reverse stockinette',
    getRowInstruction: (row, stitches) =>
      row % 2 === 1
        ? 'purl all ' + stitches + ' stitches.'
        : 'knit all ' + stitches + ' stitches.'
  }
];

const PATTERN_MAP = Object.fromEntries(PATTERN_REGISTRY.map((p) => [p.id, p]));

/**
 * Parse custom pattern string (e.g. "k2 p2" or "k3 p1 k1 p3").
 * k = knit, p = purl, number = repeat count.
 */
function parseCustomPattern(input) {
  if (typeof input !== 'string') return { error: 'Custom pattern cannot be empty.' };
  const trimmed = input.trim();
  if (trimmed.length === 0) return { error: 'Please enter a custom pattern (e.g. k2 p2).' };

  const steps = [];
  const tokenRe = /([kp])(\d*)/gi;
  let match;
  while ((match = tokenRe.exec(trimmed)) !== null) {
    const type = match[1].toLowerCase();
    const count = match[2] === '' ? 1 : parseInt(match[2], 10);
    if (type !== 'k' && type !== 'p') continue;
    if (!Number.isInteger(count) || count < 1) return { error: 'Invalid repeat count at ' + match[0] + '.' };
    steps.push({ type: type === 'k' ? 'k' : 'p', count });
  }

  if (steps.length === 0) return { error: 'No valid pattern found. Use k (knit) and p (purl) with optional number (e.g. k2 p2).' };

  const rapportSize = steps.reduce((sum, s) => sum + s.count, 0);
  return { steps, rapportSize };
}

function expandRow(steps, stitches) {
  const parts = [];
  let remaining = stitches;
  while (remaining > 0) {
    for (const { type, count } of steps) {
      const n = Math.min(count, remaining);
      if (n > 0) parts.push((n > 1 ? type + n : type));
      remaining -= n;
      if (remaining <= 0) break;
    }
  }
  return parts.join(' ');
}

function generateCustomAnleitung(stitches, rows, steps, rapportSize) {
  const lines = [];
  const divisible = stitches % rapportSize === 0;
  if (!divisible) {
    lines.push('Note: Stitch count is not divisible by pattern repeat (' + rapportSize + '). Pattern is still applied across the row.');
    lines.push('');
  }
  for (let row = 1; row <= rows; row++) {
    lines.push('Row ' + row + ': ' + expandRow(steps, stitches));
  }
  return lines;
}

function formatOutput(headerLines, rowLines, footerLines) {
  const all = [
    '=== Knitting Pattern ===',
    '',
    ...headerLines,
    '',
    '--- Instructions ---',
    '',
    ...rowLines,
    '',
    '=== End of pattern ==='
  ];
  return all.join('\n').replace(/\n{3,}/g, '\n\n');
}

function validateInput(maschenanzahl, reihenanzahl, mustertyp, customPatternText) {
  const m = parseInt(maschenanzahl, 10);
  const r = parseInt(reihenanzahl, 10);

  if (maschenanzahl === '' || maschenanzahl === null || maschenanzahl === undefined) {
    return { error: 'Please enter stitch count.' };
  }
  if (!Number.isInteger(m) || m < 1) {
    return { error: 'Stitch count must be a positive whole number.' };
  }
  if (reihenanzahl === '' || reihenanzahl === null || reihenanzahl === undefined) {
    return { error: 'Please enter row count.' };
  }
  if (!Number.isInteger(r) || r < 1) {
    return { error: 'Row count must be a positive whole number.' };
  }

  if (mustertyp === 'custom') {
    const parsed = parseCustomPattern(customPatternText);
    if (parsed.error) return parsed;
    return { valid: true, m, r, custom: parsed };
  }

  if (!PATTERN_MAP[mustertyp]) {
    return { error: 'Invalid pattern type.' };
  }
  return { valid: true, m, r };
}

function generateAnleitung(maschenanzahl, reihenanzahl, mustertyp, customPatternText) {
  const validation = validateInput(maschenanzahl, reihenanzahl, mustertyp, customPatternText);
  if (validation.error) return { error: validation.error };
  const { m, r } = validation;
  const custom = validation.custom;

  const headerLines = [
    'Parameters:',
    '  Stitch count: ' + m,
    '  Row count:    ' + r,
    '  Pattern:      ' + (mustertyp === 'custom' ? 'Custom (' + (customPatternText || '').trim() + ')' : PATTERN_MAP[mustertyp].name)
  ];

  let rowLines;

  if (mustertyp === 'custom' && custom) {
    rowLines = generateCustomAnleitung(m, r, custom.steps, custom.rapportSize);
  } else {
    const pattern = PATTERN_MAP[mustertyp];
    rowLines = [];
    for (let reihe = 1; reihe <= r; reihe++) {
      rowLines.push('Row ' + reihe + ': ' + pattern.getRowInstruction(reihe, m));
    }
  }

  const text = formatOutput(headerLines, rowLines, []);
  return { text };
}

module.exports = {
  generateAnleitung,
  PATTERN_REGISTRY,
  PATTERN_MAP,
  parseCustomPattern,
  validateInput
};
