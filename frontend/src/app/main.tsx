import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/globals.css';
import { QueryProvider } from './providers/QueryProvider';
import { CmsProvider } from './providers/CmsProvider';
import { SiteProvider } from './providers/SiteProvider';
import { FeaturesProvider } from '@/core/config/FeaturesContext';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <CmsProvider>
        <SiteProvider>
          <FeaturesProvider>
            <App />
          </FeaturesProvider>
        </SiteProvider>
      </CmsProvider>
    </QueryProvider>
  </StrictMode>,
);
