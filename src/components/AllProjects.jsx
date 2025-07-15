import { useState } from 'react';
import { Link } from 'react-router-dom';
import { allPortfolioData, portfolioCategories } from '../data/portfolioData';
import './AllProjects.css';

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
    <div className="all-projects-modal-overlay-unique" onClick={onClose}>
      <div className="all-projects-modal-unique" onClick={(e) => e.stopPropagation()}>
        <button className="all-projects-modal-close-unique" onClick={onClose}>
          <i className="fa fa-times"></i>
        </button>
        
        <div className="all-projects-modal-content-unique">
          <div className="all-projects-modal-image-unique">
            <img src={images[currentImageIndex]} alt={`${portfolio.title} - Image ${currentImageIndex + 1}`} />
            
            {images.length > 1 && (
              <>
                <button className="all-projects-image-nav-unique prev" onClick={prevImage}>
                  <i className="fa fa-chevron-left"></i>
                </button>
                <button className="all-projects-image-nav-unique next" onClick={nextImage}>
                  <i className="fa fa-chevron-right"></i>
                </button>
                
                <div className="all-projects-image-indicators-unique">
                  {images.map((_, index) => (
                    <button 
                      key={index}
                      className={`all-projects-indicator-unique ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          
          <div className="all-projects-modal-info-unique">
            <h3>{portfolio.title}</h3>
            <div className="all-projects-category-badge-unique">
              {portfolioCategories.find(cat => cat.id === portfolio.category)?.name}
            </div>
            
            <p className="all-projects-description-unique">{portfolio.description}</p>
            
            {portfolio.details && (
              <div className="all-projects-details-unique">
                <h4><i className="fa fa-info-circle"></i> Project Details</h4>
                <p>{portfolio.details}</p>
              </div>
            )}
            
            <div className="all-projects-technologies-unique">
              <h4><i className="fa fa-code"></i> Technologies Used</h4>
              <div className="all-projects-tech-tags-unique">
                {portfolio.technologies.map((tech, index) => (
                  <span key={index} className="all-projects-tech-tag-modal-unique">{tech}</span>
                ))}
              </div>
            </div>
            
            <div className="all-projects-actions-unique">
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
    <div className="all-projects-card-unique" onClick={() => onClick(portfolio)}>
      <div className="all-projects-card-image-unique">
        <img src={images[currentImageIndex]} alt={`${portfolio.title} - Image ${currentImageIndex + 1}`} />
        
        {images.length > 1 && (
          <>
            <button className="all-projects-card-nav-unique prev" onClick={prevImage}>
              <i className="fa fa-chevron-left"></i>
            </button>
            <button className="all-projects-card-nav-unique next" onClick={nextImage}>
              <i className="fa fa-chevron-right"></i>
            </button>
            
            <div className="all-projects-card-count-unique">
              {currentImageIndex + 1} / {images.length}
            </div>
          </>
        )}
        
        <div className="all-projects-card-overlay-unique">
          <div className="all-projects-card-actions-unique">
            {portfolio.type === 'demo' ? (
              <div className="all-projects-type-badge-unique demo">
                <i className="fa fa-external-link"></i>
                <span>Live Demo</span>
              </div>
            ) : (
              <div className="all-projects-type-badge-unique project">
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
            <button className="all-projects-btn-view-unique">
              <i className="fa fa-eye"></i> View Details
            </button>
          </div>
        </div>
      </div>
      
      <div className="all-projects-card-content-unique">
        <div className="all-projects-card-category-unique">
          {portfolioCategories.find(cat => cat.id === portfolio.category)?.name}
        </div>
        <h3 className="all-projects-card-title-unique">{portfolio.title}</h3>
        <p className="all-projects-card-description-unique">{portfolio.description}</p>
        
        <div className="all-projects-card-tech-unique">
          {portfolio.technologies.slice(0, 3).map((tech, index) => (
            <span key={index} className="all-projects-tech-tag-unique">{tech}</span>
          ))}
          {portfolio.technologies.length > 3 && (
            <span className="all-projects-tech-more-unique">+{portfolio.technologies.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  );
};

// Filter buttons komponen
const PortfolioFilter = ({ activeCategory, onFilterChange }) => {
  return (
    <div className="all-projects-filter-unique">
      {portfolioCategories.map((category) => (
        <button
          key={category.id}
          className={`all-projects-filter-btn ${activeCategory === category.id ? 'active' : ''}`}
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
    <div className="all-projects-page-unique">
      {/* Header */}
      <section className="all-projects-header-unique">
        <div className="container">
          <Link to="/" className="back-btn-unique">
            <i className="fa fa-arrow-left"></i> Back to Home
          </Link>
          <div className="all-projects-title-unique">
            <h1>All My Projects</h1>
            <p>Explore my complete portfolio of web development, mobile apps, and backend projects</p>
          </div>
        </div>
      </section>

      {/* Portfolio Content */}
      <section className="all-projects-content-unique">
        <div className="container">
          <PortfolioFilter 
            activeCategory={activeCategory}
            onFilterChange={setActiveCategory}
          />
          
          {/* Stats */}
          <div className="portfolio-stats-unique">
            <div className="stat-item-unique">
              <span className="stat-number-unique">{filteredPortfolio.length}</span>
              <span className="stat-label-unique">
                {activeCategory === 'all' ? 'Total Projects' : 'Projects in Category'}
              </span>
            </div>
            <div className="stat-item-unique">
              <span className="stat-number-unique">
                {filteredPortfolio.filter(p => p.type === 'demo').length}
              </span>
              <span className="stat-label-unique">Live Demos</span>
            </div>
            <div className="stat-item-unique">
              <span className="stat-number-unique">
                {filteredPortfolio.filter(p => p.featured).length}
              </span>
              <span className="stat-label-unique">Featured Projects</span>
            </div>
          </div>
          
          <div className="all-projects-grid-unique">
            {filteredPortfolio.map((portfolio) => (
              <PortfolioCard 
                key={portfolio.id}
                portfolio={portfolio}
                onClick={handlePortfolioClick}
              />
            ))}
          </div>
          
          {filteredPortfolio.length === 0 && (
            <div className="all-projects-empty-unique">
              <i className="fa fa-folder-open"></i>
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
