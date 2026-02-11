const form = document.getElementById('params-form');
const output = document.getElementById('output');
const btnGenerate = document.getElementById('btn-generate');
const mustertypSelect = document.getElementById('mustertyp');
const customPatternField = document.getElementById('custom-pattern-field');
const customPatternInput = document.getElementById('custom-pattern');
const btnCopy = document.getElementById('btn-copy');
const btnExportTxt = document.getElementById('btn-export-txt');
const copyFeedback = document.getElementById('copy-feedback');

function toggleCustomField() {
  const isCustom = mustertypSelect.value === 'custom';
  customPatternField.style.display = isCustom ? 'flex' : 'none';
}

mustertypSelect.addEventListener('change', toggleCustomField);
toggleCustomField();

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const maschenanzahl = document.getElementById('maschenanzahl').value.trim();
  const reihenanzahl = document.getElementById('reihenanzahl').value.trim();
  const mustertyp = mustertypSelect.value;
  const customPatternText = mustertyp === 'custom' ? customPatternInput.value.trim() : '';

  btnGenerate.disabled = true;
  output.value = 'Please wait…';
  copyFeedback.textContent = '';

  try {
    const result = await window.knitAPI.generate(maschenanzahl, reihenanzahl, mustertyp, customPatternText);
    if (result && result.error) {
      output.value = 'Error: ' + result.error;
    } else if (result && result.text) {
      output.value = result.text;
    } else {
      output.value = 'Unknown error during generation.';
    }
  } catch (err) {
    output.value = 'Error: ' + (err.message || String(err));
  } finally {
    btnGenerate.disabled = false;
  }
});

btnCopy.addEventListener('click', async () => {
  const text = output.value;
  if (!text) {
    copyFeedback.textContent = 'Nothing to copy.';
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    copyFeedback.textContent = 'Copied to clipboard.';
    copyFeedback.classList.remove('feedback-error');
    setTimeout(() => { copyFeedback.textContent = ''; }, 2500);
  } catch (err) {
    copyFeedback.textContent = 'Copy failed.';
    copyFeedback.classList.add('feedback-error');
  }
});

btnExportTxt.addEventListener('click', async () => {
  const text = output.value;
  if (!text) {
    copyFeedback.textContent = 'Generate a pattern first.';
    copyFeedback.classList.add('feedback-error');
    return;
  }
  copyFeedback.textContent = '';
  try {
    const result = await window.knitAPI.saveTxt(text);
    if (result && result.saved) {
      copyFeedback.textContent = 'Saved: ' + result.path;
      copyFeedback.classList.remove('feedback-error');
      setTimeout(() => { copyFeedback.textContent = ''; }, 3000);
    }
  } catch (err) {
    copyFeedback.textContent = 'Export failed.';
    copyFeedback.classList.add('feedback-error');
  }
});
