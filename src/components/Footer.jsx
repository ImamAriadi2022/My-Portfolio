

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="dark_bg footer-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="footer-content">
              <div className="social-links">
                <a href="#" className="social-link">
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fa fa-twitter"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fa fa-linkedin"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fa fa-github"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fa fa-instagram"></i>
                </a>
              </div>
              <p className="copyright">
                © 2025 Imam Ariadi. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to top button */}
      <div className="back-to-top" onClick={scrollToTop}>
        <i className="fa fa-angle-up"></i>
      </div>
    </footer>
  );
};

export default Footer;
