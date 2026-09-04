import { useEffect, useRef, useState } from 'react';
import ParticlesBackground from './ParticlesBackground';

const HeroSection = () => {
  const particlesRef = useRef(null);
  const [particlesLoaded, setParticlesLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Check if particles.js is available and initialize
    const initParticles = () => {
      if (window.particlesJS && particlesRef.current) {
        try {
          window.particlesJS('particles-js', {
            particles: {
              number: { value: 80, density: { enable: true, value_area: 800 } },
              color: { value: "#ffffff" },
              shape: { type: "circle" },
              opacity: { value: 0.5, random: false },
              size: { value: 3, random: true },
              line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
              },
              move: {
                enable: true,
                speed: 6,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false
              }
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
              }
            },
            retina_detect: true
          });
          
          // Check if canvas was actually created
          setTimeout(() => {
            const canvas = document.querySelector('#particles-js canvas');
            if (canvas) {
              setParticlesLoaded(true);
              console.log('Particles.js loaded successfully');
            } else {
              setShowFallback(true);
              console.log('Particles.js canvas not created, using CSS fallback');
            }
          }, 500);
          
        } catch (error) {
          console.warn('Particles.js failed to initialize:', error);
          setShowFallback(true);
        }
      } else {
        console.warn('Particles.js library not found, using CSS fallback');
        setShowFallback(true);
      }
    };

    // Try to initialize particles immediately
    initParticles();

    // If not loaded after delay, show fallback
    const fallbackTimeout = setTimeout(() => {
      if (!particlesLoaded) {
        setShowFallback(true);
      }
    }, 2000);

    return () => {
      clearTimeout(fallbackTimeout);
    };
  }, []);

  // Professional rotating titles (English as requested)
  const titles = [
    'Imam Ariadi',
    'Fullstack Developer',
    'Web Developer',
    'Mobile App Developer',
    'Backend Specialist'
  ];

  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState(titles[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let timeout;

    if (!isDeleting) {
      if (displayText.length < currentTitle.length) {
        // Typing characters smoothly
        timeout = setTimeout(() => {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        }, 75);
      } else {
        // Finished typing full word - pause for 2.2 seconds so it is completely readable
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayText.length > 0) {
        // Deleting characters quickly and cleanly
        timeout = setTimeout(() => {
          setDisplayText(currentTitle.slice(0, displayText.length - 1));
        }, 35);
      } else {
        // Finished deleting - brief natural pause before typing next title
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }, 300);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex]);

  return (
    <section id="home" className="dark_bg hero-section">
      <div 
        id="particles-js" 
        ref={particlesRef}
        className={`particles-container ${showFallback ? 'fallback-bg' : ''}`}
      ></div>
      
      {/* CSS Fallback Particles */}
      {showFallback && <ParticlesBackground />}
      
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6">
            <div className="banner_content" data-aos="fade-right">
              <h3>Halo Semuanya,</h3>
              <h1 className="hero-headline">
                <span className="hero-static-text">I Am </span>
                <span className="hero-dynamic-wrapper">
                  <span className="hero-typed-text">{displayText}</span>
                  <span className="hero-cursor" aria-hidden="true">|</span>
                </span>
              </h1>
              <p>Saya seorang Web &amp; Mobile Developer berpengalaman lebih dari 3 tahun, berfokus pada pengembangan backend, frontend, dan fullstack untuk aplikasi web dan mobile modern.
              </p>
              <a 
                href="/komponen/Final Portfolio_Imam Ariadi.pdf" 
                className="btn btn-secondary banner_btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Unduh CV
              </a>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="banner-images" data-aos="fade-left">
              <img src="/assets/img/hero-section.png" alt="Imam Ariadi" />
            </div>
          </div>
        </div>
      </div>

      {/* Soft Bottom Gradient Transition */}
      <div className="hero-bottom-gradient"></div>

      {/* Scroll Down Indicator */}
      <a 
        href="#services" 
        className="hero-scroll-indicator"
        onClick={(e) => {
          e.preventDefault();
          const target = document.getElementById('services');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }}
        title="Gulir ke Bawah"
      >
        <span>Gulir</span>
        <i className="fa fa-angle-down"></i>
      </a>
    </section>
  );
};

export default HeroSection;
