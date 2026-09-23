'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AudienceModeContext = createContext({
  mode: 'hrd',
  isHrdMode: true,
  isClientMode: false,
  setMode: () => {},
  toggleMode: () => {},
});

export const AudienceModeProvider = ({ children }) => {
  const [mode, setModeState] = useState('hrd');

  // Initialize from localStorage if available, default to 'hrd'
  useEffect(() => {
    try {
      const savedMode = localStorage.getItem('imam_audience_mode');
      if (savedMode === 'client' || savedMode === 'hrd') {
        setModeState(savedMode);
      }
    } catch {
      // Ignore localStorage read errors in private browsing / SSR
    }
  }, []);

  // Synchronize data attribute and class on <html> and <body> for global CSS palette theming
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-audience-mode', mode);
      if (mode === 'client') {
        document.body.classList.add('client-theme');
        document.body.classList.remove('hrd-theme');
      } else {
        document.body.classList.add('hrd-theme');
        document.body.classList.remove('client-theme');
      }
    }
  }, [mode]);

  const setMode = (newMode) => {
    if (newMode === 'client' || newMode === 'hrd') {
      setModeState(newMode);
      try {
        localStorage.setItem('imam_audience_mode', newMode);
      } catch {
        // Ignore localStorage write errors
      }
    }
  };

  const toggleMode = () => {
    setModeState((prev) => {
      const next = prev === 'hrd' ? 'client' : 'hrd';
      try {
        localStorage.setItem('imam_audience_mode', next);
      } catch {
        // Ignore localStorage write errors
      }
      return next;
    });
  };

  const value = {
    mode,
    isHrdMode: mode === 'hrd',
    isClientMode: mode === 'client',
    setMode,
    toggleMode,
  };

  return (
    <AudienceModeContext.Provider value={value}>
      {children}
    </AudienceModeContext.Provider>
  );
};

export const useAudienceMode = () => {
  const context = useContext(AudienceModeContext);
  if (!context) {
    throw new Error('useAudienceMode must be used within an AudienceModeProvider');
  }
  return context;
};

export default AudienceModeContext;
