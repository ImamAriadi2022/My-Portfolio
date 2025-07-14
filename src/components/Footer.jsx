

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const handleQuickMessage = (e) => {
    e.preventDefault();
    const messageInput = e.target.querySelector('input[type="text"]');
    const message = messageInput.value.trim();
    
    if (message) {
      const whatsappMessage = `Hello Imam! 👋

*Quick Message from your website:*
${message}

---
Sent from footer contact form`;

      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/6285788322061?text=${encodedMessage}`;
      
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
                <p>Web Developer</p>
              </div>
              <p className="footer-description">
                Passionate web developer creating modern, responsive, and user-friendly applications. 
                Let's build something amazing together!
              </p>
              <div className="footer-contact">
                <div className="contact-item">
                  <i className="fa fa-map-marker"></i>
                  <span>Indonesia</span>
                </div>
                <div className="contact-item">
                  <i className="fa fa-whatsapp"></i>
                  <span>+62 857-8832-2061</span>
                </div>
                <div className="contact-item">
                  <i className="fa fa-envelope"></i>
                  <span>imam.ariadi@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6">
            <div className="footer-widget">
              <h4 className="widget-title">Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <h4 className="widget-title">Services</h4>
              <ul className="footer-services">
                <li>
                  <i className="fa fa-code"></i>
                  <span>Frontend Development</span>
                </li>
                <li>
                  <i className="fa fa-server"></i>
                  <span>Backend Development</span>
                </li>
                <li>
                  <i className="fa fa-mobile"></i>
                  <span>Mobile Apps</span>
                </li>
                <li>
                  <i className="fa fa-database"></i>
                  <span>Database Design</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <h4 className="widget-title">Let's Connect</h4>
              <p className="connect-text">
                Follow me on social media for updates and latest projects
              </p>
              <div className="social-links">
                <a href="#" className="social-link facebook" title="Facebook">
                  <i className="fa fa-facebook"></i>
                  <span>Facebook</span>
                </a>
                <a href="#" className="social-link twitter" title="Twitter">
                  <i className="fa fa-twitter"></i>
                  <span>Twitter</span>
                </a>
                <a href="#" className="social-link linkedin" title="LinkedIn">
                  <i className="fa fa-linkedin"></i>
                  <span>LinkedIn</span>
                </a>
                <a href="#" className="social-link github" title="GitHub">
                  <i className="fa fa-github"></i>
                  <span>GitHub</span>
                </a>
                <a href="#" className="social-link instagram" title="Instagram">
                  <i className="fa fa-instagram"></i>
                  <span>Instagram</span>
                </a>
              </div>
              
              <div className="quick-whatsapp">
                <h5><i className="fa fa-whatsapp"></i> Quick Message</h5>
                <p>Send me a quick message via WhatsApp</p>
                <form className="whatsapp-form" onSubmit={handleQuickMessage}>
                  <input 
                    type="text" 
                    placeholder="Type your message here..." 
                    required
                    maxLength="200"
                  />
                  <button type="submit">
                    <i className="fa fa-whatsapp"></i>
                  </button>
                </form>
                <small>Direct WhatsApp message</small>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div style={{ marginTop: '30px', borderTop: '1px solid #444', paddingTop: '20px', paddingBottom: '20px' }}>
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <p className="copyright">
                © {currentYear} <span className="brand">Imam Ariadi</span>. All rights reserved.
              </p>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="footer-bottom-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Back to top button */}
      <div className="back-to-top" onClick={scrollToTop}>
        <i className="fa fa-angle-up"></i>
        <span className="back-to-top-text">Top</span>
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
    </footer>
  );
};

export default Footer;
