import React, { useState } from 'react';
import PortfolioControls from 'PortfolioControl';  // Pastikan jalur benar
import Portfolio from 'Portfolio';  // Pastikan jalur benar

function App() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="app">
      <h1>My Portfolio</h1>
      <PortfolioControls setFilter={setFilter} />
      <Portfolio filter={filter} />
    </div>
  );
}

export default App;
