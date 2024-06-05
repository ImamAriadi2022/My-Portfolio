import React from 'react';

function PortfolioControl({ setFilter }) {
  const handleClick = (category) => () => setFilter(category);

  return (
    <div className="controls text-center">
      <button className="filter btn btn-common" onClick={handleClick('all')}>
        All
      </button>
      <button className="filter btn btn-common" onClick={handleClick('design')}>
        UI/UX Designers
      </button>
      <button className="filter btn btn-common" onClick={handleClick('development')}>
        Fullstack Development
      </button>
      <button className="filter btn btn-common" onClick={handleClick('print')}>
        Graphic Design
      </button>
    </div>
  );
}

export default PortfolioControl;
