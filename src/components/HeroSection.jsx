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

    // Animated headline effect
    const initAnimatedHeadline = () => {
      const headlines = document.querySelectorAll('.cd-headline');
      headlines.forEach(headline => {
        const words = headline.querySelectorAll('.cd-words-wrapper b');
        if (words.length > 0) {
          let current = 0;
          let isAnimating = false;
          
          // Completely clear all states first
          words.forEach(word => {
            word.classList.remove('is-visible');
            word.style.opacity = '0';
            word.style.visibility = 'hidden';
            word.style.position = 'absolute';
          });
          
          // Function to show specific word
          const showWord = (index) => {
            if (isAnimating) return;
            isAnimating = true;
            
            const wordsWrapper = headline.querySelector('.cd-words-wrapper');
            
            // Add transitioning class untuk pause cursor animation
            wordsWrapper.classList.add('transitioning');
            
            // Hide all words first
            words.forEach(word => {
              word.classList.remove('is-visible');
              word.style.opacity = '0';
              word.style.visibility = 'hidden';
              word.style.position = 'absolute';
            });
            
            // Show target word setelah transition selesai
            setTimeout(() => {
              const targetWord = words[index];
              targetWord.classList.add('is-visible');
              targetWord.style.opacity = '1';
              targetWord.style.visibility = 'visible';
              targetWord.style.position = 'relative';
              
              // Remove transitioning class setelah kata baru tampil
              setTimeout(() => {
                wordsWrapper.classList.remove('transitioning');
                isAnimating = false;
              }, 100);
            }, 50);
          };
          
          // Show first word dengan timing yang pas
          setTimeout(() => {
            showWord(0);
          }, 100);
          
          const showNextWord = () => {
            if (!isAnimating) {
              current = (current + 1) % words.length;
              showWord(current);
            }
          };
          
          // Start animation dengan timing yang sinkron dengan CSS cursor animation
          const intervalId = setInterval(showNextWord, 3000);
          
          // Store interval ID for cleanup
          headline.animationInterval = intervalId;
        }
      });
    };

    const timer = setTimeout(initAnimatedHeadline, 500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimeout);
      
      // Cleanup intervals
      const headlines = document.querySelectorAll('.cd-headline');
      headlines.forEach(headline => {
        if (headline.animationInterval) {
          clearInterval(headline.animationInterval);
        }
        const wordsWrapper = headline.querySelector('.cd-words-wrapper');
        if (wordsWrapper) {
          wordsWrapper.classList.remove('transitioning');
        }
      });
    };
  }, [particlesLoaded]);

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
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="banner_content" data-aos="fade-right">
              <h3>Hi There,</h3>
              <h1 className="cd-headline clip">
                <span className="fw_600" style={{ marginRight: '15px' }}>I Am </span>
                <span className="cd-words-wrapper">
                  <b className="fw_600">Imam Ariadi</b>
                  <b className="fw_600">Web Developer</b>
                </span>
              </h1>
              <p> I'm a Web Developer with over 3 years of experience, specializing in backend, frontend, and fullstack development for both mobile and web applications
              </p>
              <a 
                href="/komponen/Final Portfolio_Imam Ariadi.pdf" 
                className="btn btn-secondary banner_btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
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
    </section>
  );
};

export default HeroSection;
