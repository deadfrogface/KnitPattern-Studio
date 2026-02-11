const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('knitAPI', {
  generate: (maschenanzahl, reihenanzahl, mustertyp, customPatternText) =>
    ipcRenderer.invoke('generate', maschenanzahl, reihenanzahl, mustertyp, customPatternText),
  saveTxt: (content) => ipcRenderer.invoke('saveTxt', content)
});
