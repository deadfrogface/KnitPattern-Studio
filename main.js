const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
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

ipcMain.handle('generate', (_event, maschenanzahl, reihenanzahl, mustertyp) => {
  return generator.generateAnleitung(maschenanzahl, reihenanzahl, mustertyp);
});
