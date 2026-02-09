import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import App from './App.tsx';
import { store, persistor } from '@/app/store';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Toaster } from 'react-hot-toast';
import Loader from './components/ui/Loader.tsx';

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <Toaster />
    <Provider store={store}>
      <PersistGate loading={<Loader fullscreen />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ErrorBoundary>,
);
