import { useState } from 'react';
import { useScrollPosition } from '../hooks/useScrollEffects';

const Navbar = ({ isLoading }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollPosition = useScrollPosition();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav 
      className={`navbar navbar-toggleable-sm navbar-light bg-faded site-navigation dark_bg_menu react-navbar ${scrollPosition > 100 ? 'scrolled menu-bg' : ''}`}
      style={{
        opacity: isLoading ? 0 : 1,
        visibility: isLoading ? 'hidden' : 'visible',
        transition: 'opacity 0.5s ease 0.3s, visibility 0.5s ease 0.3s'
      }}
    >
      <div className="container">
        <a 
          className="navbar-brand" 
          href="#home" 
          onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
        >
          <p 
            style={{ 
              margin: 0, 
              color: scrollPosition > 100 ? '#ffffff' : 'var(--primary-color)',
              transition: 'color 0.3s ease'
            }}
          >
            Imam
          </p>
        </a>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse justify-content-end ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="#home"
                onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="#services"
                onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
              >
                Services
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="#portfolio"
                onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }}
              >
                Portfolio
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="#blog"
                onClick={(e) => { e.preventDefault(); scrollToSection('blog'); }}
              >
                Blog
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="#statistics"
                onClick={(e) => { e.preventDefault(); scrollToSection('statistics'); }}
              >
                Statistics
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
