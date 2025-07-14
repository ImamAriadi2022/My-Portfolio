import { useEffect, useState } from 'react';

const ParticlesBackground = () => {
  const [useCSS, setUseCSS] = useState(false);

  useEffect(() => {
    // Check if particles.js loaded successfully
    const checkParticles = () => {
      const canvas = document.querySelector('#particles-js canvas');
      if (!canvas) {
        setUseCSS(true);
      }
    };

    // Check after particles.js should have loaded
    const timer = setTimeout(checkParticles, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  if (useCSS) {
    return (
      <div className="css-particles">
        {/* Generate CSS particles */}
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="css-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
        
        {/* Connecting lines */}
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={`line-${i}`}
            className="css-particle-line"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${Math.random() * 15}s`
            }}
          />
        ))}
      </div>
    );
  }

  return null;
};

export default ParticlesBackground;
