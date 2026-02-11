/**
 * Reine Logik: Generierung textbasierter Strickanleitungen.
 * Kein DOM, keine Netzwerkaufrufe – deterministisch.
 */

const MUSTERTYPEN = {
  'glatt-rechts': 'Glatt rechts',
  'rippenmuster': 'Rippenmuster'
};

function generateAnleitung(maschenanzahl, reihenanzahl, mustertyp) {
  const m = parseInt(maschenanzahl, 10);
  const r = parseInt(reihenanzahl, 10);

  if (!Number.isInteger(m) || m < 1) {
    return { error: 'Maschenanzahl muss eine positive ganze Zahl sein.' };
  }
  if (!Number.isInteger(r) || r < 1) {
    return { error: 'Reihenanzahl muss eine positive ganze Zahl sein.' };
  }
  if (mustertyp !== 'glatt-rechts' && mustertyp !== 'rippenmuster') {
    return { error: 'Mustertyp muss "glatt-rechts" oder "rippenmuster" sein.' };
  }

  const musterName = MUSTERTYPEN[mustertyp];
  const lines = [];

  lines.push('=== Strickanleitung – ' + musterName + ' ===');
  lines.push('');
  lines.push('Parameter:');
  lines.push('  Maschenanzahl: ' + m);
  lines.push('  Reihenanzahl:  ' + r);
  lines.push('  Mustertyp:     ' + musterName);
  lines.push('');
  lines.push('--- Anleitung ---');
  lines.push('');

  if (mustertyp === 'glatt-rechts') {
    for (let reihe = 1; reihe <= r; reihe++) {
      if (reihe % 2 === 1) {
        lines.push('Reihe ' + reihe + ': rechts über alle ' + m + ' Maschen.');
      } else {
        lines.push('Reihe ' + reihe + ': links über alle ' + m + ' Maschen.');
      }
    }
  } else {
    // Rippenmuster: 1 re, 1 li über die Breite; gerade Reihen „wie sie erscheinen“
    for (let reihe = 1; reihe <= r; reihe++) {
      lines.push('Reihe ' + reihe + ': * 1 re, 1 li * bis Ende der Reihe (Strickrichtung beibehalten).');
    }
  }

  lines.push('');
  lines.push('=== Ende der Anleitung ===');
  return { text: lines.join('\n') };
}

module.exports = { generateAnleitung, MUSTERTYPEN };
