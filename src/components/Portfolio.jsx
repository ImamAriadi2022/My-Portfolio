import { useState } from 'react';
import { Link } from 'react-router-dom';
import { portfolioCategories, portfolioData } from '../data/portfolioData';
import './Portfolio.css';

// Modal untuk detail portfolio
const PortfolioModal = ({ portfolio, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageAspectRatio, setImageAspectRatio] = useState('unknown');

  if (!isOpen || !portfolio) return null;

  const images = portfolio.images || [portfolio.image];

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="portfolio-modal-overlay-unique" onClick={onClose}>
      <div className="portfolio-modal-unique" onClick={(e) => e.stopPropagation()}>
        <button className="portfolio-modal-close-unique" onClick={onClose}>
          <i className="fa fa-times"></i>
        </button>
        
        <div className="portfolio-modal-content-unique">
          <div className={`portfolio-modal-image-unique ${imageAspectRatio}`}>
            <img 
              src={images[currentImageIndex]} 
              alt={`${portfolio.title} - Image ${currentImageIndex + 1}`}
              onLoad={handleImageLoad}
            />
            
            {images.length > 1 && (
              <>
                <button className="image-nav-unique prev" onClick={prevImage}>
                  <i className="fa fa-chevron-left"></i>
                </button>
                <button className="image-nav-unique next" onClick={nextImage}>
                  <i className="fa fa-chevron-right"></i>
                </button>
                
                <div className="image-indicators-unique">
                  {images.map((_, index) => (
                    <button 
                      key={index}
                      className={`indicator-unique ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          
          <div className="portfolio-modal-info-unique">
            <h3>{portfolio.title}</h3>
            <div className="portfolio-category-badge-unique">
              {portfolioCategories.find(cat => cat.id === portfolio.category)?.name}
            </div>
            
            <p className="portfolio-description-unique">{portfolio.description}</p>
            
            {portfolio.details && (
              <div className="portfolio-details-unique">
                <h4><i className="fa fa-info-circle"></i> Project Details</h4>
                <p>{portfolio.details}</p>
              </div>
            )}
            
            <div className="portfolio-technologies-unique">
              <h4><i className="fa fa-code"></i> Technologies Used</h4>
              <div className="tech-tags-unique">
                {portfolio.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag-unique">{tech}</span>
                ))}
              </div>
            </div>
            
            <div className="portfolio-actions-unique">
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
  const [imageAspectRatio, setImageAspectRatio] = useState('unknown');
  const [imageError, setImageError] = useState(false);

  const images = portfolio.images || [portfolio.image];

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

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="portfolio-card-unique" onClick={() => onClick(portfolio)}>
      <div className={`portfolio-card-image-unique ${imageAspectRatio}`}>
        {!imageError ? (
          <>
            <img 
              src={images[currentImageIndex]} 
              alt={`${portfolio.title} - Image ${currentImageIndex + 1}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            
            {images.length > 1 && (
              <>
                <button className="card-image-nav-unique prev" onClick={prevImage}>
                  <i className="fa fa-chevron-left"></i>
                </button>
                <button className="card-image-nav-unique next" onClick={nextImage}>
                  <i className="fa fa-chevron-right"></i>
                </button>
                
                <div className="card-image-count-unique">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="image-placeholder-unique">
            <i className="fa fa-image"></i>
          </div>
        )}
        
        <div className="portfolio-card-overlay-unique">
          <div className="portfolio-card-actions-unique">
            {portfolio.type === 'demo' ? (
              <div className="portfolio-type-badge-unique demo">
                <i className="fa fa-external-link"></i>
                <span>Live Demo</span>
              </div>
            ) : (
              <div className="portfolio-type-badge-unique project">
                <i className="fa fa-folder"></i>
                <span>Project</span>
              </div>
            )}
            <button className="btn-view-unique">
              <i className="fa fa-eye"></i> View Details
            </button>
          </div>
        </div>
      </div>
      
      <div className="portfolio-card-content-unique">
        <div className="portfolio-card-category-unique">
          {portfolioCategories.find(cat => cat.id === portfolio.category)?.name}
        </div>
        <h3 className="portfolio-card-title-unique">{portfolio.title}</h3>
        <p className="portfolio-card-description-unique">{portfolio.description}</p>
        
        <div className="portfolio-card-tech-unique">
          {portfolio.technologies.slice(0, 3).map((tech, index) => (
            <span key={index} className="tech-tag-small-unique">{tech}</span>
          ))}
          {portfolio.technologies.length > 3 && (
            <span className="tech-more-unique">+{portfolio.technologies.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  );
};

// Filter buttons komponen
const PortfolioFilter = ({ activeCategory, onFilterChange }) => {
  return (
    <div className="portfolio-filter-unique">
      {portfolioCategories.map((category) => (
        <button
          key={category.id}
          className={`portfolio-filter-btn ${activeCategory === category.id ? 'active' : ''}`}
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
    <section id="portfolio" className="portfolio-section-main">
      <div className="container">
        <div className="portfolio-section-header">
          <h2 className="portfolio-section-title wow fadeInDown" data-wow-delay="0.3s">
            Featured Portfolio
          </h2>
          <div className="portfolio-section-shape wow fadeInDown" data-wow-delay="0.3s"></div>
          <p className="portfolio-section-subtitle">
            Here are some of my best projects across different categories
          </p>
        </div>
        
        <PortfolioFilter 
          activeCategory={activeCategory}
          onFilterChange={setActiveCategory}
        />
        
        <div className="portfolio-grid-unique">
          {filteredPortfolio.map((portfolio) => (
            <PortfolioCard 
              key={portfolio.id}
              portfolio={portfolio}
              onClick={handlePortfolioClick}
            />
          ))}
        </div>
        
        {/* View All Projects Button */}
        <div className="portfolio-view-all-unique">
          <Link 
            to="/all-projects"
            className="btn-view-all-unique"
          >
            <i className="fa fa-grid"></i>
            <span>View All Projects</span>
            <small>({portfolioData.length + 6} total projects)</small>
          </Link>
        </div>
        
        {filteredPortfolio.length === 0 && (
          <div className="portfolio-empty-unique">
            <i className="fa fa-folder-open"></i>
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
