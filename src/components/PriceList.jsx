'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import pricingData from '../data/pricingData.json';
import './PriceList.css';

const PriceList = ({ initialPackages }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { pageHeader, categories, packages: defaultPackages, customProjectCta, faqs, contactInfo } = pricingData;
  const packages = initialPackages && initialPackages.length > 0 ? initialPackages : defaultPackages;

  const filteredPackages = activeCategory === 'all'
    ? packages
    : packages.filter(pkg => pkg.category === activeCategory);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const getWhatsAppUrl = (message) => {
    return `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="price-list-page-unique">
      <div className="price-list-bg-glow"></div>

      {/* Header */}
      <header className="price-list-header-unique">
        <div className="container">
          <div className="price-list-top-nav-unique">
            <Link href="/" className="price-list-back-btn-unique">
              <i className="fa fa-arrow-left"></i> Kembali ke Beranda
            </Link>
            <div className="price-list-badge-pill-unique">
              <i className="fa fa-shield"></i> {pageHeader.badge}
            </div>
          </div>

          <div className="price-list-title-wrap-unique">
            <h1>
              Daftar Harga &amp; <span>Paket Layanan</span>
            </h1>
            <p className="price-list-subtitle-unique">
              {pageHeader.subtitle}
            </p>
          </div>
        </div>
      </header>

      <main className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Category Filter - 1 Row Clean (Swipeable on mobile, Centered on desktop) */}
        <div className="price-list-filter-wrap-unique">
          {categories.map((cat) => {
            const count = cat.id === 'all'
              ? packages.length
              : packages.filter(p => p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                className={`price-list-filter-btn-unique ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <i className={`fa ${cat.icon}`}></i>
                <span>{cat.name}</span>
                <span className="filter-count-badge">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Pricing Cards Grid */}
        <div className="price-list-grid-unique">
          {filteredPackages.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`price-card-unique ${pkg.isPopular ? 'is-popular' : ''}`}
            >
              {pkg.isPopular && (
                <div className="popular-ribbon-unique">
                  <i className="fa fa-star"></i> {pkg.badge}
                </div>
              )}

              <div>
                <div className="price-card-header-unique">
                  <span className="price-card-category-badge">
                    {categories.find(c => c.id === pkg.category)?.name || pkg.category}
                  </span>
                  <h3 className="price-card-title">{pkg.name}</h3>
                  <p className="price-card-description">{pkg.description}</p>
                </div>

                <div className="price-box-unique">
                  <span className="price-amount">{pkg.price}</span>
                  <span className="price-period">{pkg.pricePeriod}</span>
                  {pkg.timeline && (
                    <div>
                      <span className="price-timeline-badge">
                        <i className="fa fa-clock-o"></i> Estimasi: {pkg.timeline}
                      </span>
                    </div>
                  )}
                </div>

                <div className="price-card-features-unique">
                  <h4>Fitur &amp; Keuntungan</h4>
                  <ul className="price-features-list-unique">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx}>
                        <i className="fa fa-check-circle"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {pkg.technologies && pkg.technologies.length > 0 && (
                  <div className="price-card-tech-unique">
                    {pkg.technologies.map((tech, idx) => (
                      <span key={idx} className="price-tech-tag-unique">{tech}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="price-card-action-unique">
                <a
                  href={getWhatsAppUrl(pkg.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="price-btn-whatsapp-unique"
                  title={`Pilih paket ${pkg.name}`}
                >
                  <i className="fa fa-whatsapp"></i>
                  <span>Pilih Paket Ini</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Project CTA Banner */}
        {customProjectCta && (
          <div className="price-custom-banner-unique">
            <div className="price-custom-content">
              <h3>{customProjectCta.title}</h3>
              <p>{customProjectCta.description}</p>
            </div>
            <a
              href={getWhatsAppUrl(customProjectCta.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="price-custom-btn-unique"
            >
              <i className="fa fa-comments"></i>
              <span>{customProjectCta.buttonText}</span>
            </a>
          </div>
        )}

        {/* FAQ Section */}
        {faqs && faqs.length > 0 && (
          <section className="price-faq-section-unique">
            <div className="price-faq-header-unique">
              <h2>Pertanyaan yang Sering Diajukan (FAQ)</h2>
              <p>Informasi seputar sistem kerja, alur pembayaran, dan jaminan kualitas proyek</p>
            </div>

            <div className="price-faq-grid-unique">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div 
                    key={index} 
                    className={`price-faq-card-unique ${isOpen ? 'open' : ''}`}
                  >
                    <button
                      className="price-faq-question-btn"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <i className="fa fa-chevron-down"></i>
                    </button>
                    {isOpen && (
                      <p className="price-faq-answer">{faq.answer}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>

      {/* Page Footer */}
      <footer className="price-list-footer-unique">
        <div className="container">
          <p>© {new Date().getFullYear()} Imam Ariadi Portfolio. Seluruh hak cipta dilindungi.</p>
        </div>
      </footer>
    </div>
  );
};

export default PriceList;
