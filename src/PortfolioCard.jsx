import React from 'react';

function PortfolioCard({ item }) {
  return (
    <div className={`portfolio-item ${item.category}`}>
      <img src={item.image} alt={item.title} style={{ width: '100%', height: 'auto' }} />
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  );
}

export default PortfolioCard;
