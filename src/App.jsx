import { useEffect, useState } from 'react';
import BlogSection from './components/BlogSection';
import StatisticsSection from './components/ContactSection';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import Portfolio from './components/Portfolio';
import Preloader from './components/Preloader';
import ServicesSection from './components/ServicesSection';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // Load external scripts that are needed
    const scripts = [
      '/assets/js/particles.min.js',
      '/assets/js/wow.js',
      '/assets/js/jquery-3.2.1.min.js',
      '/assets/js/bootstrap.min.js',
      '/assets/js/animated-headline.js'
    ];

    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    // Load scripts sequentially
    const loadScripts = async () => {
      try {
        // Load particles.js first since it's critical for hero section
        console.log('Loading particles.js...');
        await loadScript('/assets/js/particles.min.js');
        
        // Load other scripts
        const otherScripts = [
          '/assets/js/wow.js',
          '/assets/js/jquery-3.2.1.min.js',
          '/assets/js/bootstrap.min.js',
          '/assets/js/animated-headline.js'
        ];
        
        for (const script of otherScripts) {
          await loadScript(script);
        }
        
        console.log('All scripts loaded successfully');
        
        // Add a class to indicate scripts are loaded
        document.body.classList.add('scripts-loaded');
        
        // Initialize WOW.js after scripts are loaded
        if (window.WOW) {
          const wow = new window.WOW({
            mobile: false
          });
          wow.init();
        }
      } catch (error) {
        console.error('Error loading scripts:', error);
      }
    };

    loadScripts();

    // Initialize AOS (Animate On Scroll) alternative
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const animationType = target.getAttribute('data-aos');
          const delay = target.getAttribute('data-aos-delay') || 0;
          
          setTimeout(() => {
            target.classList.add('aos-animate');
            if (animationType) {
              target.classList.add(animationType);
            }
          }, parseInt(delay));
        }
      });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <Preloader onLoadingComplete={handleLoadingComplete} />
      <Navbar isLoading={isLoading} />
      <HeroSection isLoading={isLoading} />
      <ServicesSection />
      <Portfolio />
      <BlogSection />
      <StatisticsSection />
      <Footer />
    </div>
  );
}

export default App;
