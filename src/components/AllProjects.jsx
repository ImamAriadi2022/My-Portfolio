import { useState } from 'react';
import { Link } from 'react-router-dom';
import { allPortfolioData, portfolioCategories } from '../data/portfolioData';

// Modal untuk detail portfolio
const PortfolioModal = ({ portfolio, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !portfolio) return null;

  const images = portfolio.images || [portfolio.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="portfolio-modal-overlay" onClick={onClose}>
      <div className="portfolio-modal" onClick={(e) => e.stopPropagation()}>
        <button className="portfolio-modal-close" onClick={onClose}>
          <i className="fa fa-times"></i>
        </button>
        
        <div className="portfolio-modal-content">
          <div className="portfolio-modal-image">
            <img src={images[currentImageIndex]} alt={`${portfolio.title} - Image ${currentImageIndex + 1}`} />
            
            {images.length > 1 && (
              <>
                <button className="image-nav prev" onClick={prevImage}>
                  <i className="fa fa-chevron-left"></i>
                </button>
                <button className="image-nav next" onClick={nextImage}>
                  <i className="fa fa-chevron-right"></i>
                </button>
                
                <div className="image-indicators">
                  {images.map((_, index) => (
                    <button 
                      key={index}
                      className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = portfolio.images || [portfolio.image];

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="portfolio-card dark-theme" onClick={() => onClick(portfolio)}>
      <div className="portfolio-card-image">
        <img src={images[currentImageIndex]} alt={`${portfolio.title} - Image ${currentImageIndex + 1}`} />
        
        {images.length > 1 && (
          <>
            <button className="card-image-nav prev" onClick={prevImage}>
              <i className="fa fa-chevron-left"></i>
            </button>
            <button className="card-image-nav next" onClick={nextImage}>
              <i className="fa fa-chevron-right"></i>
            </button>
            
            <div className="card-image-count">
              {currentImageIndex + 1} / {images.length}
            </div>
          </>
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
            {portfolio.featured && (
              <div className="portfolio-featured-badge">
                <i className="fa fa-star"></i>
                <span>Featured</span>
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

// All Projects Page Component
const AllProjects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter portfolio berdasarkan kategori
  const filteredPortfolio = activeCategory === 'all' 
    ? allPortfolioData 
    : allPortfolioData.filter(item => item.category === activeCategory);

  const handlePortfolioClick = (portfolio) => {
    setSelectedPortfolio(portfolio);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPortfolio(null);
  };

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="all-projects-page portfolio-dark">
      {/* Header */}
      <section className="all-projects-header">
        <div className="container">
          <Link to="/" className="back-btn">
            <i className="fa fa-arrow-left"></i> Back to Home
          </Link>
          <div className="all-projects-title">
            <h1>All My Projects</h1>
            <p>Explore my complete portfolio of web development, mobile apps, and backend projects</p>
          </div>
        </div>
      </section>

      {/* Portfolio Content */}
      <section className="all-projects-content">
        <div className="container">
          <PortfolioFilter 
            activeCategory={activeCategory}
            onFilterChange={setActiveCategory}
          />
          
          {/* Stats */}
          <div className="portfolio-stats">
            <div className="stat-item">
              <span className="stat-number">{filteredPortfolio.length}</span>
              <span className="stat-label">
                {activeCategory === 'all' ? 'Total Projects' : 'Projects in Category'}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {filteredPortfolio.filter(p => p.type === 'demo').length}
              </span>
              <span className="stat-label">Live Demos</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {filteredPortfolio.filter(p => p.featured).length}
              </span>
              <span className="stat-label">Featured Projects</span>
            </div>
          </div>
          
          <div className="portfolio-grid">
            {filteredPortfolio.map((portfolio) => (
              <PortfolioCard 
                key={portfolio.id}
                portfolio={portfolio}
                onClick={handlePortfolioClick}
              />
            ))}
          </div>
          
          {filteredPortfolio.length === 0 && (
            <div className="portfolio-empty">
              <p>No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
      
      <PortfolioModal 
        portfolio={selectedPortfolio}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default AllProjects;
