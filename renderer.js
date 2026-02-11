const form = document.getElementById('params-form');
const output = document.getElementById('output');
const btnGenerate = document.getElementById('btn-generate');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const maschenanzahl = document.getElementById('maschenanzahl').value;
  const reihenanzahl = document.getElementById('reihenanzahl').value;
  const mustertyp = document.getElementById('mustertyp').value;

  btnGenerate.disabled = true;
  output.value = 'Bitte warten …';

  try {
    const result = await window.knitAPI.generate(maschenanzahl, reihenanzahl, mustertyp);
    if (result && result.error) {
      output.value = 'Fehler: ' + result.error;
    } else if (result && result.text) {
      output.value = result.text;
    } else {
      output.value = 'Unbekannter Fehler bei der Generierung.';
    }
  } catch (err) {
    output.value = 'Fehler: ' + (err.message || String(err));
  } finally {
    btnGenerate.disabled = false;
  }
});
