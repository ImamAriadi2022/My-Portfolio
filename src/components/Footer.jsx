

import { useState } from 'react';
import { Link } from 'react-router-dom';
import TermsModal from './TermsModal';
import socialData from '../data/socialData.json';

const Footer = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  // Parsing data sosmed dinamis dari socialData.json
  const socialList = Array.isArray(socialData) 
    ? socialData 
    : (socialData?.socialLinks || socialData?.socials || []);

  // Filter hanya sosmed yang aktif dan memiliki URL valid
  const activeSocialLinks = socialList.filter(item => 
    item && 
    item.enabled !== false && 
    item.url && 
    typeof item.url === 'string' &&
    item.url.trim() !== '' && 
    item.url !== '#'
  );

  // Deteksi spesifik apakah ada entri WhatsApp
  const whatsappItem = activeSocialLinks.find(item => 
    item.id?.toLowerCase() === 'whatsapp' || 
    item.name?.toLowerCase() === 'whatsapp' ||
    (typeof item.url === 'string' && item.url.includes('wa.me'))
  );
  const hasWhatsApp = Boolean(whatsappItem);

  // Helper untuk menentukan icon FontAwesome
  const getSocialIcon = (item) => {
    if (item.icon && item.icon.trim() !== '') {
      return item.icon.startsWith('fa ') ? item.icon : `fa ${item.icon}`;
    }
    const id = (item.id || item.name || '').toLowerCase();
    switch (id) {
      case 'github': return 'fa fa-github';
      case 'linkedin': return 'fa fa-linkedin';
      case 'instagram': return 'fa fa-instagram';
      case 'whatsapp': return 'fa fa-whatsapp';
      case 'facebook': return 'fa fa-facebook';
      case 'twitter':
      case 'x': return 'fa fa-twitter';
      case 'youtube': return 'fa fa-youtube-play';
      case 'telegram': return 'fa fa-telegram';
      case 'tiktok': return 'fa fa-music';
      case 'discord': return 'fa fa-gamepad';
      default: return 'fa fa-globe';
    }
  };

  const handleQuickMessage = (e) => {
    e.preventDefault();
    if (!whatsappItem) return;

    const messageInput = e.target.querySelector('input[type="text"]');
    const message = messageInput.value.trim();
    
    if (message) {
      const whatsappMessage = `Halo Mas Imam! 👋\n\n*Pesan Singkat dari Website:*\n${message}\n\n---\nDikirim melalui formulir kontak footer website`;
      const encodedMessage = encodeURIComponent(whatsappMessage);
      
      let waNumber = '6285788322061';
      if (whatsappItem.number) {
        waNumber = whatsappItem.number.replace(/[^0-9]/g, '');
      } else if (whatsappItem.url && whatsappItem.url.includes('wa.me/')) {
        const parsed = whatsappItem.url.split('wa.me/')[1]?.split('?')[0]?.replace(/[^0-9]/g, '');
        if (parsed) waNumber = parsed;
      }
      
      const whatsappUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
      messageInput.value = ''; // Clear the input
    }
  };

  return (
    <footer className="dark_bg footer-area">
      <div className="footer-background">
        <div className="footer-particles"></div>
      </div>
      
      <div className="container">
        {/* Main Footer Content */}
        <div className="row footer-main">
          <div className="col-lg-4 col-md-6">
            <div className="footer-widget">
              <div className="footer-logo">
                <h3>Imam <span>Ariadi</span></h3>
                <p>Pengembang Web & Mobile</p>
              </div>
              <p className="footer-description">
                Pengembang web dan aplikasi mobile yang berfokus menciptakan solusi digital modern, responsif, dan mudah digunakan. Mari bangun proyek impian Anda bersama saya!
              </p>
              <div className="footer-contact">
                <div className="contact-item">
                  <i className="fa fa-map-marker"></i>
                  <span>Indonesia</span>
                </div>
                {hasWhatsApp && (
                  <div className="contact-item">
                    <i className="fa fa-whatsapp"></i>
                    <a 
                      href={whatsappItem.url || `https://wa.me/${whatsappItem.number?.replace(/[^0-9]/g, '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      <span>{whatsappItem.number || '+62 857-8832-2061'}</span>
                    </a>
                  </div>
                )}
                <div className="contact-item">
                  <i className="fa fa-envelope"></i>
                  <a href="mailto:imamariadi775@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                    imamariadi775@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6">
            <div className="footer-widget">
              <h4 className="widget-title">Tautan Cepat</h4>
              <ul className="footer-links">
                <li><a href="#home">Beranda</a></li>
                <li><a href="#services">Layanan</a></li>
                <li><Link to="/price-list">Daftar Harga</Link></li>
                <li><a href="#portfolio">Portofolio</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#contact">Statistik</a></li>
              </ul>
            </div>
          </div>
          
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <h4 className="widget-title">Layanan</h4>
              <ul className="footer-services">
                <li>
                  <i className="fa fa-code"></i>
                  <span>Pengembangan Frontend</span>
                </li>
                <li>
                  <i className="fa fa-server"></i>
                  <span>Pengembangan Backend</span>
                </li>
                <li>
                  <i className="fa fa-mobile"></i>
                  <span>Aplikasi Mobile</span>
                </li>
                <li>
                  <i className="fa fa-database"></i>
                  <span>Arsitektur Basis Data & API</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <h4 className="widget-title">Mari Terhubung</h4>
              <p className="connect-text">
                Ikuti media sosial saya untuk melihat perkembangan proyek terbaru dan tips teknologi.
              </p>
              {activeSocialLinks.length > 0 && (
                <div className="social-links">
                  {activeSocialLinks.map((item) => {
                    const iconClass = getSocialIcon(item);
                    const platformClass = (item.id || item.name || 'custom').toLowerCase().replace(/\s+/g, '-');
                    return (
                      <a 
                        key={item.id || item.name}
                        href={item.url} 
                        className={`social-link ${platformClass}`} 
                        title={item.name}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className={iconClass}></i>
                        <span>{item.name}</span>
                      </a>
                    );
                  })}
                </div>
              )}
              
              {hasWhatsApp && (
                <div className="quick-whatsapp">
                  <h5><i className="fa fa-whatsapp"></i> Pesan Singkat</h5>
                  <p>Kirim pesan cepat melalui WhatsApp</p>
                  <form className="whatsapp-form" onSubmit={handleQuickMessage}>
                    <div className="whatsapp-input-wrapper">
                      <input 
                        type="text" 
                        placeholder="Ketik pesan Anda..." 
                        required
                        maxLength="200"
                      />
                      <button type="submit" aria-label="Kirim pesan WhatsApp" title="Kirim pesan">
                        <i className="fa fa-whatsapp"></i>
                      </button>
                    </div>
                  </form>
                  <small>
                    <span className="whatsapp-status-dot"></span>
                    Pesan langsung ke WhatsApp
                  </small>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div style={{ marginTop: '30px', borderTop: '1px solid #444', paddingTop: '20px', paddingBottom: '20px' }}>
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <p className="copyright">
                © {currentYear} <span className="brand">Imam Ariadi</span>. Hak cipta dilindungi.
              </p>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="footer-bottom-links">
                <a 
                  href="#terms" 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsTermsOpen(true);
                  }}
                  title="Baca Syarat & Ketentuan Layanan"
                >
                  Syarat & Ketentuan Layanan
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Back to top button */}
      <div className="back-to-top" onClick={scrollToTop}>
        <i className="fa fa-angle-up"></i>
        <span className="back-to-top-text">Atas</span>
      </div>
      
      {/* Decorative Elements */}
      <div className="footer-decoration">
        <div className="decoration-line"></div>
        <div className="decoration-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      
      {/* Terms of Service Modal */}
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </footer>
  );
};

export default Footer;
