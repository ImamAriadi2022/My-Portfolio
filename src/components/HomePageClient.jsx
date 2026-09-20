'use client';

import { useEffect, useState } from 'react';
import Preloader from './Preloader';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import Portfolio from './Portfolio';
import BlogSection from './BlogSection';
import StatisticsSection from './ContactSection';
import Footer from './Footer';

export default function HomePageClient({ initialProjects, initialAllProjects, initialBlogs }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
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
        if (typeof window !== 'undefined' && !window.particlesJS) {
          await loadScript('/assets/js/particles.min.js');
        }

        const otherScripts = [
          '/assets/js/wow.js',
          '/assets/js/jquery-3.2.1.min.js',
          '/assets/js/bootstrap.min.js'
        ];

        for (const script of otherScripts) {
          await loadScript(script);
        }

        document.body.classList.add('scripts-loaded');

        if (typeof window !== 'undefined' && window.WOW) {
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

    // Initialize AOS (Animate On Scroll)
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
      <Portfolio initialProjects={initialProjects} initialAllProjects={initialAllProjects} />
      <BlogSection initialBlogs={initialBlogs} />
      <StatisticsSection />
      <Footer />
    </div>
  );
}
