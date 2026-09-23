'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import ParticlesBackground from './ParticlesBackground';
import { useAudienceMode } from '../hooks/useAudienceMode';

const HeroSection = ({ onOpenContact }) => {
  const { mode, toggleMode, isHrdMode, isClientMode } = useAudienceMode();
  const particlesRef = useRef(null);
  const [particlesLoaded, setParticlesLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    let intervalId = null;
    let isCancelled = false;

    const initParticles = () => {
      if (typeof window !== 'undefined' && window.particlesJS && particlesRef.current) {
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
          
          setTimeout(() => {
            if (isCancelled) return;
            const canvas = document.querySelector('#particles-js canvas');
            if (canvas) {
              setParticlesLoaded(true);
              setShowFallback(false);
            }
          }, 200);

          return true;
        } catch (error) {
          console.warn('Particles.js failed to initialize:', error);
          return false;
        }
      }
      return false;
    };

    // Try immediately
    if (!initParticles()) {
      let attempts = 0;
      intervalId = setInterval(() => {
        attempts++;
        if (initParticles() || attempts >= 40) {
          clearInterval(intervalId);
          if (attempts >= 40 && !isCancelled) {
            setShowFallback(true);
          }
        }
      }, 100);
    }

    return () => {
      isCancelled = true;
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  // Rotating titles: Imam Ariadi & Software Engineer
  const titles = [
    'Imam Ariadi',
    'Software Engineer'
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
              {/* Audience Mode Switcher (HRD Mode vs Client Mode) */}
              <div className="hero-mode-toggle-wrapper">
                <span className="hero-mode-caption">Mode:</span>
                <button
                  type="button"
                  className={`hero-mode-pill-toggle ${isClientMode ? 'is-client' : 'is-hrd'}`}
                  onClick={toggleMode}
                  role="switch"
                  aria-checked={isClientMode}
                  aria-label={`Ganti mode ke ${isHrdMode ? 'Client Mode' : 'HRD Mode'}`}
                  title="Klik untuk beralih antara Mode HRD dan Mode Client"
                >
                  <span className="toggle-pill-knob"></span>
                  <span className="toggle-pill-text">
                    {isHrdMode ? 'HRD' : 'CLIENT'}
                  </span>
                  <span className="toggle-tap-hint">TAP</span>
                </button>
                <div className="hero-mode-status-badge">
                  <i className={isHrdMode ? "fa fa-briefcase" : "fa fa-user-circle"}></i>
                  <span>{isHrdMode ? 'HRD Mode' : 'Client Mode'}</span>
                </div>
              </div>

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
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-secondary banner_btn"
                  onClick={onOpenContact}
                  style={{
                    background: isClientMode
                      ? 'linear-gradient(135deg, #c99700, #8a6700)'
                      : 'linear-gradient(135deg, #28a745, #1e7e34)',
                    borderColor: isClientMode ? '#c99700' : '#28a745',
                    color: '#ffffff',
                    cursor: 'pointer',
                    boxShadow: isClientMode
                      ? '0 4px 15px rgba(201, 151, 0, 0.35)'
                      : '0 4px 15px rgba(40, 167, 69, 0.35)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Hubungi Saya
                </button>
                <a 
                  href="/cv" 
                  className="btn btn-secondary banner_btn"
                  target="_blank" 
                  rel="noopener noreferrer" 
                >
                  Unduh CV
                </a>
                {isClientMode && (
                  <Link 
                    href="/admin/login" 
                    className="btn btn-secondary banner_btn btn-hero-client-login"
                  >
                    <i className="fa fa-sign-in" style={{ marginRight: '6px' }}></i>
                    Login Portal
                  </Link>
                )}
              </div>
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
