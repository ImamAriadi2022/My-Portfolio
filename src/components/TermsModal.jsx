'use client';

import { useEffect } from 'react';
import termsData from '../data/termsData.json';
import './TermsModal.css';

const TermsModal = ({ isOpen, onClose }) => {
  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="terms-modal-overlay-unique" onClick={onClose}>
      <div 
        className="terms-modal-unique" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-modal-title"
      >
        {/* Header */}
        <div className="terms-modal-header-unique">
          <div className="terms-header-title-group">
            <div className="terms-header-icon">
              <i className="fa fa-file-text-o"></i>
            </div>
            <div>
              <h3 id="terms-modal-title">{termsData.title}</h3>
              {termsData.subtitle && <p className="terms-subtitle">{termsData.subtitle}</p>}
            </div>
          </div>
          <button 
            className="terms-modal-close-unique" 
            onClick={onClose}
            aria-label="Close Terms of Service"
            title="Tutup"
          >
            <i className="fa fa-times"></i>
          </button>
        </div>

        {/* Meta info bar */}
        <div className="terms-meta-bar-unique">
          <span className="terms-meta-badge">
            <i className="fa fa-calendar-check-o"></i> Terakhir diperbarui: {termsData.lastUpdated}
          </span>
          {termsData.effectiveDate && (
            <span className="terms-meta-badge">
              <i className="fa fa-clock-o"></i> Berlaku: {termsData.effectiveDate}
            </span>
          )}
        </div>

        {/* Scrollable Content Body */}
        <div className="terms-modal-body-unique">
          {/* Introduction Card */}
          {termsData.introduction && (
            <div className="terms-intro-card-unique">
              <i className="fa fa-quote-left terms-quote-icon"></i>
              <p>{termsData.introduction}</p>
            </div>
          )}

          {/* Sections List */}
          <div className="terms-sections-list-unique">
            {termsData.sections && termsData.sections.map((section) => (
              <div key={section.id} className="terms-section-card-unique">
                <div className="terms-section-heading">
                  {section.icon && (
                    <div className="terms-section-icon">
                      <i className={`fa ${section.icon}`}></i>
                    </div>
                  )}
                  <h4>{section.title}</h4>
                </div>
                
                <p className="terms-section-text">{section.content}</p>

                {section.points && section.points.length > 0 && (
                  <ul className="terms-points-list">
                    {section.points.map((point, idx) => (
                      <li key={idx}>
                        <i className="fa fa-angle-right point-bullet"></i>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Footer Note */}
          {termsData.footerNote && (
            <div className="terms-note-banner-unique">
              <i className="fa fa-info-circle"></i>
              <p>{termsData.footerNote}</p>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="terms-modal-footer-unique">
          <p className="terms-footer-brand">
            © {new Date().getFullYear()} Imam Ariadi Portfolio
          </p>
          <button 
            type="button" 
            className="terms-btn-understand-unique"
            onClick={onClose}
          >
            <i className="fa fa-check"></i>
            <span>Saya Mengerti</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
