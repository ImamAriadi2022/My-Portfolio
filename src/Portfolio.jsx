import React from 'react';
import { useTransition, animated } from 'react-spring';
import PortfolioCard from 'PortfolioCard';  // Pastikan jalur benar

const portfolioItems =  [
  { id: 1, category: 'design', title: 'UI/UX Design 1', description: 'Description of UI/UX Design 1', image: '../assets/img/b1.jpg' },
  { id: 2, category: 'development', title: 'Fullstack Development 1', description: 'Description of Fullstack Development 1', image: '../assets/img/b1.jpg' },
  { id: 3, category: 'print', title: 'Graphic Design 1', description: 'Description of Graphic Design 1', image: '../assets/img/b1.jpg' },
  { id: 4, category: 'design', title: 'UI/UX Design 2', description: 'Description of UI/UX Design 2', image: '../assets/img/b1.jpg' },
  { id: 5, category: 'development', title: 'Fullstack Development 2', description: 'Description of Fullstack Development 2', image: '../assets/img/b1.jpg' },
];

function Portfolio({ filter }) {
  const filteredItems = filter === 'all' ? portfolioItems : portfolioItems.filter(item => item.category === filter);
  const transitions = useTransition(filteredItems, item => item.id, {
    from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
  });

  return (
    <div className="portfolio">
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props} className="portfolio-item">
          <PortfolioCard item={item} />
        </animated.div>
      ))}
    </div>
  );
}

export default Portfolio;
