import React from 'react';
import { MediaAuditOverview } from './components/MediaAuditOverview';

export const App: React.FC = () => {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-base)' }}>
      <MediaAuditOverview />
    </main>
  );
};

export default App;
