import { useState } from 'react';
import { portfolioItems } from '../data/portfolioData';

const PortfolioControls = ({ setFilter, activeFilter }) => {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'design', label: 'UI/UX Designers' },
    { key: 'development', label: 'Fullstack Development' },
    { key: 'print', label: 'Graphic Design' }
  ];

  return (
    <div className="controls text-center portfolio-filter">
      {filters.map(filter => (
        <button
          key={filter.key}
          className={`filter btn btn-common ${activeFilter === filter.key ? 'active' : ''}`}
          onClick={() => setFilter(filter.key)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

const PortfolioCard = ({ item, index }) => {
  return (
    <div 
      className={`col-lg-4 col-md-6 col-xs-12 portfolio-item ${item.category}`}
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div className="single_portfolio wow fadeInUp" data-wow-delay={`${0.2 + (index * 0.2)}s`}>
        <div className="portfolio-thumb">
          <img src={item.image} className="img-responsive" alt={item.title} />
          <div className="portfolio-overlay">
            <div className="portfolio-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="portfolio-technologies">
                {item.technologies?.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
              <a href="#" className="btn btn-secondary">View Details</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PortfolioSection = () => {
  const [filter, setFilter] = useState('all');

  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  return (
    <section id="portfolio" className="dark_bg section-padding">
      <div className="container">
        <h2 className="section-title wow flipInX" data-wow-delay="0.4s">
          My <span>Portfolio</span>
        </h2>
        <div className="row">
          <div className="col-md-12">
            <PortfolioControls setFilter={setFilter} activeFilter={filter} />
          </div>
        </div>
        <div className="row portfolio-container">
          {filteredItems.map((item, index) => (
            <PortfolioCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
