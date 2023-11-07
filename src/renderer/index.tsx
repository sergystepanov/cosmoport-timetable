import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

const handlers = {
  onScreenSelect: () => ({})
};

window.electron.ipcRenderer.on('config', (config) => {
  root.render(<App conf={config} handlers={handlers} />);
});

window.electron.ipcRenderer.on('set-number', (n) => {
  handlers.onScreenSelect(n);

});
