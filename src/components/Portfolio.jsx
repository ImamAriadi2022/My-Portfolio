import { useState } from 'react';
import { Link } from 'react-router-dom';
import { portfolioCategories, portfolioData } from '../data/portfolioData';

// Modal untuk detail portfolio
const PortfolioModal = ({ portfolio, isOpen, onClose }) => {
  const [imageAspectRatio, setImageAspectRatio] = useState('unknown');

  if (!isOpen || !portfolio) return null;

  const handleImageLoad = (e) => {
    const img = e.target;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    
    if (aspectRatio > 1.3) {
      setImageAspectRatio('landscape');
    } else if (aspectRatio < 0.8) {
      setImageAspectRatio('portrait');
    } else {
      setImageAspectRatio('square');
    }
  };

  return (
    <div className="portfolio-modal-overlay" onClick={onClose}>
      <div className="portfolio-modal" onClick={(e) => e.stopPropagation()}>
        <button className="portfolio-modal-close" onClick={onClose}>
          <i className="fa fa-times"></i>
        </button>
        
        <div className="portfolio-modal-content">
          <div className={`portfolio-modal-image ${imageAspectRatio}`}>
            <img 
              src={portfolio.image} 
              alt={portfolio.title}
              onLoad={handleImageLoad}
            />
          </div>
          
          <div className="portfolio-modal-info">
            <h3>{portfolio.title}</h3>
            <div className="portfolio-category-badge">
              {portfolioCategories.find(cat => cat.id === portfolio.category)?.name}
            </div>
            
            <p className="portfolio-description">{portfolio.description}</p>
            
            {portfolio.details && (
              <div className="portfolio-details">
                <h4>Project Details</h4>
                <p>{portfolio.details}</p>
              </div>
            )}
            
            <div className="portfolio-technologies">
              <h4>Technologies Used</h4>
              <div className="tech-tags">
                {portfolio.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
            
            <div className="portfolio-actions">
              {portfolio.type === 'demo' && portfolio.demoUrl && (
                <a 
                  href={portfolio.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <i className="fa fa-external-link"></i> View Demo
                </a>
              )}
              
              {portfolio.githubUrl && (
                <a 
                  href={portfolio.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <i className="fa fa-github"></i> Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Card komponen untuk setiap portfolio item
const PortfolioCard = ({ portfolio, onClick }) => {
  const [imageAspectRatio, setImageAspectRatio] = useState('unknown');
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = (e) => {
    const img = e.target;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    
    if (aspectRatio > 1.3) {
      setImageAspectRatio('landscape');
    } else if (aspectRatio < 0.8) {
      setImageAspectRatio('portrait');
    } else {
      setImageAspectRatio('square');
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="portfolio-card" onClick={() => onClick(portfolio)}>
      <div className={`portfolio-card-image ${imageAspectRatio}`}>
        {!imageError ? (
          <img 
            src={portfolio.image} 
            alt={portfolio.title}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className="image-placeholder">
            <i className="fa fa-image"></i>
          </div>
        )}
        
        <div className="portfolio-card-overlay">
          <div className="portfolio-card-actions">
            {portfolio.type === 'demo' ? (
              <div className="portfolio-type-badge demo">
                <i className="fa fa-external-link"></i>
                <span>Live Demo</span>
              </div>
            ) : (
              <div className="portfolio-type-badge project">
                <i className="fa fa-folder"></i>
                <span>Project</span>
              </div>
            )}
            <button className="btn btn-view">
              <i className="fa fa-eye"></i> View Details
            </button>
          </div>
        </div>
      </div>
      
      <div className="portfolio-card-content">
        <div className="portfolio-card-category">
          {portfolioCategories.find(cat => cat.id === portfolio.category)?.name}
        </div>
        <h3 className="portfolio-card-title">{portfolio.title}</h3>
        <p className="portfolio-card-description">{portfolio.description}</p>
        
        <div className="portfolio-card-tech">
          {portfolio.technologies.slice(0, 3).map((tech, index) => (
            <span key={index} className="tech-tag-small">{tech}</span>
          ))}
          {portfolio.technologies.length > 3 && (
            <span className="tech-more">+{portfolio.technologies.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  );
};

// Filter buttons komponen
const PortfolioFilter = ({ activeCategory, onFilterChange }) => {
  return (
    <div className="portfolio-filter">
      {portfolioCategories.map((category) => (
        <button
          key={category.id}
          className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => onFilterChange(category.id)}
        >
          <i className={`fa ${category.icon}`}></i>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};

// Main Portfolio component - Homepage version (Top 3 per category)
const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to get top 3 projects per category for homepage
  const getHomepagePortfolio = () => {
    if (activeCategory === 'all') {
      // Show top 3 from each category (9 total)
      return portfolioData;
    } else {
      // Show top 3 from selected category
      return portfolioData.filter(item => item.category === activeCategory);
    }
  };

  const filteredPortfolio = getHomepagePortfolio();

  const handlePortfolioClick = (portfolio) => {
    setSelectedPortfolio(portfolio);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPortfolio(null);
  };

  const handleViewAllProjects = () => {
    // Navigate to All Projects page
    // Using window.location for now, can be changed to Link later
    window.location.href = '/all-projects';
  };

  return (
    <section id="portfolio" className="section-padding">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title wow fadeInDown" data-wow-delay="0.3s">
            Featured Portfolio
          </h2>
          <div className="shape wow fadeInDown" data-wow-delay="0.3s"></div>
          <p className="section-subtitle">
            Here are some of my best projects across different categories
          </p>
        </div>
        
        <PortfolioFilter 
          activeCategory={activeCategory}
          onFilterChange={setActiveCategory}
        />
        
        <div className="portfolio-grid">
          {filteredPortfolio.map((portfolio) => (
            <PortfolioCard 
              key={portfolio.id}
              portfolio={portfolio}
              onClick={handlePortfolioClick}
            />
          ))}
        </div>
        
        {/* View All Projects Button */}
        <div className="portfolio-view-all">
          <Link 
            to="/all-projects"
            className="btn btn-view-all"
          >
            <i className="fa fa-grid"></i>
            <span>View All Projects</span>
            <small>({portfolioData.length + 6} total projects)</small>
          </Link>
        </div>
        
        {filteredPortfolio.length === 0 && (
          <div className="portfolio-empty">
            <p>No featured projects found in this category.</p>
          </div>
        )}
      </div>
      
      <PortfolioModal 
        portfolio={selectedPortfolio}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Portfolio;
