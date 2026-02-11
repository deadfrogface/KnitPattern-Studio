const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const generator = require('./generator');

function createWindow() {
  const win = new BrowserWindow({
    width: 700,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('generate', (_event, maschenanzahl, reihenanzahl, mustertyp, customPatternText) => {
  return generator.generateAnleitung(maschenanzahl, reihenanzahl, mustertyp, customPatternText);
});

ipcMain.handle('saveTxt', async (event, content) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  const { filePath } = await dialog.showSaveDialog(win, {
    defaultPath: 'KnittingPattern.txt',
    filters: [{ name: 'Text files', extensions: ['txt'] }]
  });
  if (filePath) {
    fs.writeFileSync(filePath, content, 'utf8');
    return { saved: true, path: filePath };
  }
  return { saved: false };
});
