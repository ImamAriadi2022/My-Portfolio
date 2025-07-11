import { useEffect, useState } from 'react';

const Preloader = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Notify parent component that loading is complete
      if (onLoadingComplete) {
        onLoadingComplete();
      }
    }, 2000); // Increased to 2 seconds for better UX

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className={`preloader ${!isLoading ? 'fade-out' : ''}`} style={{
      opacity: isLoading ? 1 : 0,
      visibility: isLoading ? 'visible' : 'hidden',
      transition: 'opacity 0.5s ease, visibility 0.5s ease'
    }}>
      <div className="loader">
        <div className="loader-outter"></div>
        <div className="loader-inner"></div>
        <span>i</span>
      </div>
    </div>
  );
};

export default Preloader;
