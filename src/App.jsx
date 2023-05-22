import { useState } from 'react';
import { Footer, Header, Column } from './components';
import { CONFIG } from './services/config';
export function App() {
  const [theme, setTheme] = useState('light');
  return (
    <div className={`wrapper ${theme}`}>
      <Header theme={theme} setTheme={setTheme} />
      <div className="workflow">
        {Object.entries(CONFIG.statusList).map(([key, value]) => (
          <Column
            key={key}
            className="workflow-column"
            options={value}
            title={key}
          />
        ))}
      </div>
      <div className="summary">
      </div>
      <Footer />
    </div>
  );
}