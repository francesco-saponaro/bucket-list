import { createRoot } from 'react-dom/client';
import AppComponent from './App';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <AppComponent />
    </I18nextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);