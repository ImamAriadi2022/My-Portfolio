import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { allPortfolioData, portfolioCategories, portfolioData } from '../data/portfolioData';
import socialData from '../data/socialData.json';
import './Portfolio.css';

// Modal untuk detail portfolio
const PortfolioModal = ({ portfolio, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageAspectRatio, setImageAspectRatio] = useState('unknown');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentImageIndex(0);
      setActiveTab('overview');
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, portfolio]);

  if (!isOpen || !portfolio) return null;

  // Normalisasi gambar: mendukung array string maupun array objek { url, caption }
  const rawImages = portfolio.images && portfolio.images.length > 0
    ? portfolio.images
    : [portfolio.image];

  const normalizedImages = rawImages.map((item, idx) => {
    if (typeof item === 'string') {
      return { url: item, caption: `Halaman ${idx + 1}` };
    }
    return {
      url: item.url || item.image || item.src,
      caption: item.caption || item.title || `Halaman ${idx + 1}`
    };
  });

  const currentItem = normalizedImages[currentImageIndex] || normalizedImages[0];
  const hasLiveDemo = Boolean(portfolio.demoUrl && portfolio.demoUrl !== '#');

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
    setCurrentImageIndex((prev) => (prev + 1) % normalizedImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + normalizedImages.length) % normalizedImages.length);
  };

  const socialList = Array.isArray(socialData) ? socialData : (socialData?.socialLinks || []);
  const whatsappItem = socialList.find(item => 
    (item.id?.toLowerCase() === 'whatsapp' || item.name?.toLowerCase() === 'whatsapp' || (item.url && item.url.includes('wa.me'))) && 
    item.enabled !== false && item.url
  );
  const waNumber = whatsappItem?.number?.replace(/[^0-9]/g, '') || 
    (whatsappItem?.url?.includes('wa.me/') ? whatsappItem.url.split('wa.me/')[1]?.split('?')[0]?.replace(/[^0-9]/g, '') : null);

  return (
    <div className="portfolio-modal-overlay-unique" onClick={onClose}>
      <div className="portfolio-modal-unique" onClick={(e) => e.stopPropagation()}>
        <button className="portfolio-modal-close-unique" onClick={onClose} title="Tutup">
          <i className="fa fa-times"></i>
        </button>
        
        <div className="portfolio-modal-content-unique">
          {/* Kolom Kiri: Galeri Pameran Dokumentasi Halaman */}
          <div className="portfolio-modal-gallery-column-unique">
            {/* Header Dokumentasi: Info Halaman & Tombol Buka Fullscreen */}
            <div className="gallery-header-bar-unique">
              <span className="gallery-counter-badge-unique">
                <i className="fa fa-book"></i> Halaman {currentImageIndex + 1} dari {normalizedImages.length}
              </span>
              <a 
                href={currentItem.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="gallery-btn-fullscreen-unique"
                title="Buka gambar dalam ukuran penuh di tab baru"
              >
                <i className="fa fa-expand"></i> Buka Fullscreen
              </a>
            </div>

            {/* Panggung Gambar Utama */}
            <div className={`portfolio-modal-image-unique ${imageAspectRatio}`}>
              <img 
                src={currentItem.url} 
                alt={`${portfolio.title} - ${currentItem.caption}`}
                onLoad={handleImageLoad}
              />
              
              {normalizedImages.length > 1 && (
                <>
                  <button className="image-nav-unique prev" onClick={prevImage} title="Halaman Sebelumnya">
                    <i className="fa fa-chevron-left"></i>
                  </button>
                  <button className="image-nav-unique next" onClick={nextImage} title="Halaman Berikutnya">
                    <i className="fa fa-chevron-right"></i>
                  </button>
                </>
              )}

              {/* Keterangan Halaman (Caption) di Bagian Bawah Gambar */}
              {currentItem.caption && (
                <div className="gallery-caption-bar-unique">
                  <i className="fa fa-info-circle"></i>
                  <span>{currentItem.caption}</span>
                </div>
              )}
            </div>

            {/* Baris Thumbnail Selector (jika memiliki lebih dari 1 halaman) */}
            {normalizedImages.length > 1 && (
              <div className="gallery-thumbnails-strip-unique">
                {normalizedImages.map((imgItem, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`gallery-thumbnail-item-unique ${idx === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(idx)}
                    title={imgItem.caption || `Halaman ${idx + 1}`}
                  >
                    <img src={imgItem.url} alt={`Thumbnail ${idx + 1}`} />
                    <span className="thumbnail-page-number">P{idx + 1}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Kolom Kanan: Informasi, Tab Switcher & Studi Kasus Proyek */}
          <div className="portfolio-modal-info-unique">
            {/* Header Proyek */}
            <div className="portfolio-modal-header-unique">
              <div className="portfolio-modal-title-row-unique">
                <span className="portfolio-category-badge-unique">
                  {portfolioCategories.find(cat => cat.id === portfolio.category)?.name}
                </span>
                {hasLiveDemo ? (
                  <span className="portfolio-status-pill-unique online">
                    <span className="status-dot"></span> Live Online
                  </span>
                ) : (
                  <span className="portfolio-status-pill-unique offline">
                    <span className="status-dot"></span> Dokumentasi Lengkap
                  </span>
                )}
              </div>
              <h3 className="portfolio-modal-title-unique">{portfolio.title}</h3>
            </div>

            {/* Tab Switcher */}
            <div className="portfolio-modal-tabs-unique">
              <button 
                type="button"
                className={`portfolio-modal-tab-btn-unique ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <i className="fa fa-list-alt"></i> Ringkasan &amp; Fitur
              </button>
              <button 
                type="button"
                className={`portfolio-modal-tab-btn-unique ${activeTab === 'technical' ? 'active' : ''}`}
                onClick={() => setActiveTab('technical')}
              >
                <i className="fa fa-cogs"></i> Arsitektur &amp; Teknis
              </button>
            </div>

            {/* Scrollable Tab Body */}
            <div className="portfolio-modal-body-scroll-unique">
              {activeTab === 'overview' && (
                <div className="portfolio-tab-pane-unique">
                  {/* Status Deployment Banner */}
                  {hasLiveDemo ? (
                    <div className="portfolio-deploy-banner-unique online">
                      <i className="fa fa-globe"></i>
                      <div>
                        <strong>Status Proyek: Live Online</strong>
                        <span>Aplikasi telah terdeploy dan dapat langsung dicoba melalui tombol Live Demo di bawah.</span>
                      </div>
                    </div>
                  ) : (
                    <div className="portfolio-deploy-banner-unique offline">
                      <i className="fa fa-laptop"></i>
                      <div>
                        <strong>Status Proyek: Dokumentasi Halaman</strong>
                        <span>Seluruh antarmuka halaman didokumentasikan lengkap melalui tangkapan layar (screenshot) di samping. Anda juga dapat meminta live demo privat.</span>
                      </div>
                    </div>
                  )}

                  <div className="portfolio-section-block-unique description-block">
                    <h4><i className="fa fa-info-circle"></i> Tentang Proyek</h4>
                    <p className="portfolio-description-unique">{portfolio.description}</p>
                  </div>

                  {portfolio.goal && (
                    <div className="portfolio-section-block-unique goal-block">
                      <h4><i className="fa fa-bullseye"></i> Tujuan Proyek</h4>
                      <p>{portfolio.goal}</p>
                    </div>
                  )}

                  {portfolio.features && portfolio.features.length > 0 && (
                    <div className="portfolio-section-block-unique features-block">
                      <h4><i className="fa fa-check-square-o"></i> Fitur Utama</h4>
                      <ul className="portfolio-features-list-unique">
                        {portfolio.features.map((feature, idx) => (
                          <li key={idx}>
                            <i className="fa fa-check-circle"></i>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'technical' && (
                <div className="portfolio-tab-pane-unique">
                  {portfolio.architecture && (
                    <div className="portfolio-section-block-unique architecture-block">
                      <h4><i className="fa fa-cubes"></i> Arsitektur &amp; Alur Sistem</h4>
                      <p>{portfolio.architecture}</p>
                    </div>
                  )}

                  {portfolio.details && (
                    <div className="portfolio-section-block-unique details-block">
                      <h4><i className="fa fa-tachometer"></i> Skala &amp; Catatan Teknis</h4>
                      <p>{portfolio.details}</p>
                    </div>
                  )}

                  <div className="portfolio-section-block-unique tech-block">
                    <h4><i className="fa fa-code"></i> Teknologi yang Digunakan</h4>
                    <div className="tech-tags-unique">
                      {portfolio.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag-unique">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Docked Action Footer */}
            <div className="portfolio-modal-footer-unique">
              {hasLiveDemo && (
                <a 
                  href={portfolio.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary"
                >
                  <i className="fa fa-external-link"></i> Live Demo
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

              {waNumber ? (
                <a 
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                    hasLiveDemo
                      ? `Halo Mas Imam, saya melihat proyek "${portfolio.title}" di portfolio Anda dan tertarik untuk konsultasi pembuatan proyek serupa.`
                      : `Halo Mas Imam, saya melihat dokumentasi proyek "${portfolio.title}" di portfolio Anda dan tertarik untuk request demo privat / diskusi proyek serupa.`
                  )}`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-consult-unique"
                  title="Konsultasi Proyek Serupa"
                >
                  <i className="fa fa-whatsapp"></i> {hasLiveDemo ? 'Konsultasi Proyek' : 'Request Demo / Diskusi'}
                </a>
              ) : (
                <a 
                  href={`mailto:imamariadi775@gmail.com?subject=${encodeURIComponent(`Konsultasi Proyek: ${portfolio.title}`)}&body=${encodeURIComponent(`Halo Mas Imam, saya melihat proyek "${portfolio.title}" di portfolio Anda dan tertarik untuk berdiskusi.`)}`}
                  className="btn btn-consult-unique"
                  title="Konsultasi Proyek via Email"
                >
                  <i className="fa fa-envelope"></i> Diskusi Proyek
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Card komponen untuk setiap portfolio item (Hanya 1 Gambar Cover Utama)
const PortfolioCard = ({ portfolio, onClick }) => {
  const [imageAspectRatio, setImageAspectRatio] = useState('unknown');
  const [imageError, setImageError] = useState(false);

  const images = portfolio.images || [portfolio.image];
  const coverImage = portfolio.image || (portfolio.images && portfolio.images[0]?.url) || (portfolio.images && portfolio.images[0]);
  const hasLiveDemo = Boolean(portfolio.demoUrl && portfolio.demoUrl !== '#');

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
    <div className="portfolio-card-unique" onClick={() => onClick(portfolio)}>
      <div className={`portfolio-card-image-unique ${imageAspectRatio}`}>
        {!imageError ? (
          <img 
            src={coverImage} 
            alt={portfolio.title}
            onLoad={handleImageLoad}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="image-placeholder-unique">
            <i className="fa fa-image"></i>
          </div>
        )}

        {/* Badge Jumlah Halaman Dokumentasi jika > 1 */}
        {images.length > 1 && (
          <div className="card-doc-count-badge-unique" title={`${images.length} Halaman Dokumentasi Tersedia`}>
            <i className="fa fa-clone"></i>
            <span>{images.length} Halaman</span>
          </div>
        )}
        
        <div className="portfolio-card-overlay-unique">
          <div className="portfolio-card-actions-unique">
            {hasLiveDemo ? (
              <div className="portfolio-type-badge-unique demo">
                <i className="fa fa-external-link"></i>
                <span>Live Demo</span>
              </div>
            ) : (
              <div className="portfolio-type-badge-unique offline">
                <i className="fa fa-camera"></i>
                <span>Dokumentasi SS</span>
              </div>
            )}
            <button className="btn-view-unique">
              <i className="fa fa-eye"></i> Lihat Detail
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
            Portofolio <span>Pilihan</span>
          </h2>
          <div className="portfolio-section-shape wow fadeInDown" data-wow-delay="0.3s"></div>
          <p className="portfolio-section-subtitle">
            Berikut beberapa proyek terbaik yang telah saya selesaikan di berbagai bidang teknologi
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
            <i className="fa fa-th-large"></i>
            <span>Lihat Semua Proyek</span>
            <span className="view-all-badge-unique">{allPortfolioData.length}</span>
            <i className="fa fa-arrow-right view-all-arrow"></i>
          </Link>
        </div>
        
        {filteredPortfolio.length === 0 && (
          <div className="portfolio-empty-unique">
            <i className="fa fa-folder-open"></i>
            <p>Tidak ada proyek pilihan yang ditemukan dalam kategori ini.</p>
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
