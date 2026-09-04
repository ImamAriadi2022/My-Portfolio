import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { allPortfolioData, portfolioCategories } from '../data/portfolioData';
import socialData from '../data/socialData.json';
import './AllProjects.css';

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

  // Normalisasi gambar: mendukung array of string atau array of object { url, caption }
  const rawImages = portfolio.images || (portfolio.image ? [portfolio.image] : []);
  const normalizedImages = rawImages.map(img => {
    if (typeof img === 'string') {
      return { url: img, caption: '' };
    }
    return {
      url: img.url || img,
      caption: img.caption || ''
    };
  });

  const safeIndex = (currentImageIndex >= 0 && currentImageIndex < normalizedImages.length) 
    ? currentImageIndex 
    : 0;
  const currentItem = normalizedImages[safeIndex] || { url: '', caption: '' };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % normalizedImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + normalizedImages.length) % normalizedImages.length);
  };

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

  // Cek apakah proyek memiliki live demo publik yang valid
  const hasLiveDemo = Boolean(portfolio.demoUrl && portfolio.demoUrl !== '#');

  const socialList = Array.isArray(socialData) ? socialData : (socialData?.socialLinks || []);
  const whatsappItem = socialList.find(item => 
    (item.id?.toLowerCase() === 'whatsapp' || item.name?.toLowerCase() === 'whatsapp' || (item.url && item.url.includes('wa.me'))) && 
    item.enabled !== false && item.url
  );
  const waNumber = whatsappItem?.number?.replace(/[^0-9]/g, '') || 
    (whatsappItem?.url?.includes('wa.me/') ? whatsappItem.url.split('wa.me/')[1]?.split('?')[0]?.replace(/[^0-9]/g, '') : null);

  return (
    <div className="all-projects-modal-overlay-unique" onClick={onClose}>
      <div className="all-projects-modal-unique" onClick={(e) => e.stopPropagation()}>
        <button className="all-projects-modal-close-unique" onClick={onClose} title="Tutup Modal">
          <i className="fa fa-times"></i>
        </button>
        
        <div className="all-projects-modal-content-unique">
          {/* Kolom Kiri: Galeri Tangkapan Layar & Navigasi Halaman */}
          <div className="all-projects-modal-gallery-column-unique">
            {/* Top Bar Galeri: Counter Halaman & Tombol Fullscreen */}
            <div className="all-projects-gallery-header-bar-unique">
              <div className="all-projects-gallery-counter-badge-unique">
                <i className="fa fa-clone"></i>
                <span>Halaman {safeIndex + 1} dari {normalizedImages.length}</span>
              </div>
              
              <a 
                href={currentItem.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="all-projects-gallery-btn-fullscreen-unique"
                title="Buka gambar dalam ukuran penuh di tab baru"
              >
                <i className="fa fa-expand"></i> Buka Fullscreen
              </a>
            </div>

            {/* Panggung Gambar Utama */}
            <div className={`all-projects-modal-image-unique ${imageAspectRatio}`}>
              <img 
                src={currentItem.url} 
                alt={`${portfolio.title} - ${currentItem.caption || `Halaman ${safeIndex + 1}`}`}
                onLoad={handleImageLoad}
              />
              
              {normalizedImages.length > 1 && (
                <>
                  <button className="all-projects-image-nav-unique prev" onClick={prevImage} title="Halaman Sebelumnya">
                    <i className="fa fa-chevron-left"></i>
                  </button>
                  <button className="all-projects-image-nav-unique next" onClick={nextImage} title="Halaman Berikutnya">
                    <i className="fa fa-chevron-right"></i>
                  </button>
                </>
              )}

              {/* Keterangan Halaman (Caption) di Bagian Bawah Gambar */}
              {currentItem.caption && (
                <div className="all-projects-gallery-caption-bar-unique">
                  <i className="fa fa-info-circle"></i>
                  <span>{currentItem.caption}</span>
                </div>
              )}
            </div>

            {/* Baris Thumbnail Selector (jika memiliki lebih dari 1 halaman) */}
            {normalizedImages.length > 1 && (
              <div className="all-projects-gallery-thumbnails-strip-unique">
                {normalizedImages.map((imgItem, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`all-projects-gallery-thumbnail-item-unique ${idx === safeIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(idx)}
                    title={imgItem.caption || `Halaman ${idx + 1}`}
                  >
                    <img src={imgItem.url} alt={`Thumbnail ${idx + 1}`} />
                    <span className="all-projects-thumbnail-page-number">P{idx + 1}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Kolom Kanan: Informasi, Tab Switcher & Studi Kasus Proyek */}
          <div className="all-projects-modal-info-unique">
            {/* Header Proyek */}
            <div className="all-projects-modal-header-unique">
              <div className="all-projects-modal-title-row-unique">
                <span className="all-projects-category-badge-unique">
                  {portfolioCategories.find(cat => cat.id === portfolio.category)?.name}
                </span>
                {hasLiveDemo ? (
                  <span className="all-projects-status-pill-unique online">
                    <span className="status-dot"></span> Live Online
                  </span>
                ) : (
                  <span className="all-projects-status-pill-unique offline">
                    <span className="status-dot"></span> Dokumentasi Lengkap
                  </span>
                )}
              </div>
              <h3 className="all-projects-modal-title-unique">{portfolio.title}</h3>
            </div>

            {/* Tab Switcher */}
            <div className="all-projects-modal-tabs-unique">
              <button 
                type="button"
                className={`all-projects-modal-tab-btn-unique ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <i className="fa fa-list-alt"></i> Ringkasan &amp; Fitur
              </button>
              <button 
                type="button"
                className={`all-projects-modal-tab-btn-unique ${activeTab === 'technical' ? 'active' : ''}`}
                onClick={() => setActiveTab('technical')}
              >
                <i className="fa fa-cogs"></i> Arsitektur &amp; Teknis
              </button>
            </div>

            {/* Scrollable Tab Body */}
            <div className="all-projects-modal-body-scroll-unique">
              {activeTab === 'overview' && (
                <div className="all-projects-tab-pane-unique">
                  {/* Status Deployment Banner */}
                  {hasLiveDemo ? (
                    <div className="all-projects-deploy-banner-unique online">
                      <i className="fa fa-globe"></i>
                      <div>
                        <strong>Status Proyek: Live Online</strong>
                        <span>Aplikasi telah terdeploy dan dapat langsung dicoba melalui tombol Live Demo di bawah.</span>
                      </div>
                    </div>
                  ) : (
                    <div className="all-projects-deploy-banner-unique offline">
                      <i className="fa fa-laptop"></i>
                      <div>
                        <strong>Status Proyek: Dokumentasi Halaman</strong>
                        <span>Seluruh antarmuka halaman didokumentasikan lengkap melalui tangkapan layar (screenshot) di samping. Anda juga dapat meminta live demo privat.</span>
                      </div>
                    </div>
                  )}

                  <div className="portfolio-section-block-unique description-block">
                    <h4><i className="fa fa-info-circle"></i> Tentang Proyek</h4>
                    <p className="all-projects-description-unique">{portfolio.description}</p>
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
                <div className="all-projects-tab-pane-unique">
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
                    <div className="all-projects-tech-tags-unique">
                      {portfolio.technologies.map((tech, index) => (
                        <span key={index} className="all-projects-tech-tag-modal-unique">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Docked Action Footer */}
            <div className="all-projects-modal-footer-unique">
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
    <div className="all-projects-card-unique" onClick={() => onClick(portfolio)}>
      <div className={`all-projects-card-image-unique ${imageAspectRatio}`}>
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
          <div className="all-projects-card-doc-badge-unique" title={`${images.length} Halaman Dokumentasi Tersedia`}>
            <i className="fa fa-clone"></i>
            <span>{images.length} Halaman</span>
          </div>
        )}
        
        <div className="all-projects-card-overlay-unique">
          <div className="all-projects-card-actions-unique">
            {hasLiveDemo ? (
              <div className="all-projects-type-badge-unique demo">
                <i className="fa fa-external-link"></i>
                <span>Live Demo</span>
              </div>
            ) : (
              <div className="all-projects-type-badge-unique offline">
                <i className="fa fa-camera"></i>
                <span>Dokumentasi SS</span>
              </div>
            )}
            {portfolio.featured && (
              <div className="portfolio-featured-badge">
                <i className="fa fa-star"></i>
                <span>Unggulan</span>
              </div>
            )}
            <button className="all-projects-btn-view-unique">
              <i className="fa fa-eye"></i> Lihat Detail
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
      {/* Header (Minimalist) */}
      <section className="all-projects-header-unique">
        <div className="container">
          <div className="all-projects-header-top-unique">
            <Link to="/" className="back-btn-unique">
              <i className="fa fa-arrow-left"></i> Kembali ke Beranda
            </Link>
          </div>
          <div className="all-projects-title-unique">
            <h1>Semua Proyek Saya</h1>
            <p>Jelajahi seluruh portofolio pengembangan web, aplikasi mobile, dan sistem backend saya</p>
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
                {activeCategory === 'all' ? 'Total Proyek' : 'Proyek dalam Kategori'}
              </span>
            </div>
            <div className="stat-item-unique">
              <span className="stat-number-unique">
                {filteredPortfolio.filter(p => p.type === 'demo').length}
              </span>
              <span className="stat-label-unique">Demo Online</span>
            </div>
            <div className="stat-item-unique">
              <span className="stat-number-unique">
                {filteredPortfolio.filter(p => p.featured).length}
              </span>
              <span className="stat-label-unique">Proyek Unggulan</span>
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
              <p>Tidak ada proyek yang ditemukan dalam kategori ini.</p>
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
