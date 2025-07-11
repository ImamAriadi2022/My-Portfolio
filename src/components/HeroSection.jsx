import { useEffect, useRef } from 'react';

const HeroSection = () => {
  const particlesRef = useRef(null);

  useEffect(() => {
    // Initialize particles.js
    if (window.particlesJS) {
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
    }

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
          }, 100); // Faster initialization
          
          const showNextWord = () => {
            if (!isAnimating) {
              current = (current + 1) % words.length;
              showWord(current);
            }
          };
          
          // Start animation dengan timing yang sinkron dengan CSS cursor animation
          const intervalId = setInterval(showNextWord, 3000); // Sama dengan animation duration cursor
          
          // Store interval ID for cleanup
          headline.animationInterval = intervalId;
        }
      });
    };

    const timer = setTimeout(initAnimatedHeadline, 500); // Faster initialization
    
    return () => {
      clearTimeout(timer);
      // Cleanup intervals
      const headlines = document.querySelectorAll('.cd-headline');
      headlines.forEach(headline => {
        if (headline.animationInterval) {
          clearInterval(headline.animationInterval);
        }
        // Also remove transitioning class on cleanup
        const wordsWrapper = headline.querySelector('.cd-words-wrapper');
        if (wordsWrapper) {
          wordsWrapper.classList.remove('transitioning');
        }
      });
    };
  }, []);

  return (
    <section id="home" className="dark_bg">
      <div id="particles-js" ref={particlesRef}></div>
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
              <p>
                I'm a Web Developer with extensive experience for over 2 years. 
                My expertise is to create and Websites design, graphic design and many more...
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
