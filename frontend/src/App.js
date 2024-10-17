import './App.css';
import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import JsonDiff from './components/JsonDiff';
import JsonValidator from './components/JsonValidator';

function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    { label: 'JSON Diff', icon: 'pi pi-fw pi-check' },
    { label: 'JSON Validator', icon: 'pi pi-fw pi-file' },
  ];

  const renderTabContent = () => {
    switch (activeIndex) {
      case 0:
        return <JsonDiff />;
      case 1:
        return <JsonValidator />;
      default:
        return <JsonDiff />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* PrimeReact TabMenu */}
        <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
      </header>

      {/* Render content based on active tab */}
      <main className="App-content">
        {renderTabContent()}
      </main>
    </div>
  );
}

export default App;