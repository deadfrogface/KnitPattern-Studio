const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('knitAPI', {
  generate: (maschenanzahl, reihenanzahl, mustertyp) =>
    ipcRenderer.invoke('generate', maschenanzahl, reihenanzahl, mustertyp)
});
