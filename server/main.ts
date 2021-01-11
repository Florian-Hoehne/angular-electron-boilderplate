import { app, BrowserWindow} from 'electron';
import * as path from 'path';

let win: BrowserWindow;
const serve = process.argv.some(v => v === 'serve');

if (serve) {
  require('electron-reload')(__dirname, {});
}

async function createWindow(): Promise<void> {
  win = new BrowserWindow({ width: 800, height: 600 });

  await win.loadFile(path.join(__dirname, `/../../dist/client/index.html`));

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('activate', async () => {
  if (win === null) {
    await createWindow();
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

