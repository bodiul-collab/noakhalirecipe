// Safeguard against environments where window.fetch has only a getter
(function () {
  try {
    const originalFetch = typeof window !== 'undefined' && window.fetch ? window.fetch.bind(window) : null;
    let currentFetch = originalFetch;

    if (typeof Window !== 'undefined' && Window.prototype) {
      try {
        Object.defineProperty(Window.prototype, 'fetch', {
          get() {
            return currentFetch;
          },
          set(fn) {
            currentFetch = fn;
          },
          configurable: true,
          enumerable: true,
        });
      } catch (_) {}
    }

    if (typeof window !== 'undefined') {
      try {
        Object.defineProperty(window, 'fetch', {
          get() {
            return currentFetch;
          },
          set(fn) {
            currentFetch = fn;
          },
          configurable: true,
          enumerable: true,
        });
      } catch (_) {}
    }
  } catch (_) {}
})();

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
