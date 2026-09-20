'use client';

import { useState, useRef } from 'react';
import { uploadMedia, deleteMedia } from '../../lib/blob';
import './MediaUploader.css';

export default function MediaUploader({
  onUploadSuccess,
  onDelete,
  accept = 'image/*,application/pdf',
  label = 'Unggah Gambar atau Dokumen',
  defaultUrl = '',
}) {
  const [dragActive, setDragActive] = useState(false);
  const [fileUrl, setFileUrl] = useState(defaultUrl);
  const [fileName, setFileName] = useState(defaultUrl ? defaultUrl.split('/').pop() : '');
  const [fileSize, setFileSize] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const fileInputRef = useRef(null);

  const formatBytes = (bytes) => {
    if (!bytes) return '';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFile = async (file) => {
    if (!file) return;

    setErrorMessage('');
    setCopySuccess(false);

    // Validasi Ukuran (Maks 4.5MB)
    if (file.size > 4.5 * 1024 * 1024) {
      setErrorMessage(`Ukuran file (${formatBytes(file.size)}) melebihi batas 4.5 MB.`);
      return;
    }

    setIsUploading(true);
    setFileName(file.name);
    setFileSize(formatBytes(file.size));

    try {
      const result = await uploadMedia(file);
      setFileUrl(result.url);
      if (onUploadSuccess) {
        onUploadSuccess(result.url, result);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Gagal mengunggah berkas.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleCopy = () => {
    if (fileUrl) {
      navigator.clipboard.writeText(fileUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleDelete = async () => {
    if (!fileUrl) return;
    try {
      await deleteMedia(fileUrl);
      if (onDelete) onDelete(fileUrl);
      setFileUrl('');
      setFileName('');
      setFileSize('');
    } catch (err) {
      setErrorMessage(err.message || 'Gagal menghapus media.');
    }
  };

  return (
    <div className={`media-uploader-container ${dragActive ? 'drag-active' : ''}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="media-uploader-input"
      />

      {!fileUrl && (
        <div
          className="media-uploader-zone"
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="media-uploader-icon">
            <i className={`fa ${isUploading ? 'fa-spinner fa-spin' : 'fa-cloud-upload'}`}></i>
          </div>
          <h4 className="media-uploader-title">
            {isUploading ? 'Mengunggah Berkas...' : label}
          </h4>
          <p className="media-uploader-hint">
            Tarik &amp; lepas file ke sini, atau klik untuk memilih file (Maks 4.5MB, format JPG, PNG, WebP, PDF)
          </p>
        </div>
      )}

      {fileUrl && (
        <div className="media-uploader-preview">
          {fileUrl.endsWith('.pdf') ? (
            <div className="media-uploader-thumb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff6b6b', fontSize: '24px' }}>
              <i className="fa fa-file-pdf-o"></i>
            </div>
          ) : (
            <img src={fileUrl} alt={fileName} className="media-uploader-thumb" />
          )}

          <div className="media-uploader-file-info">
            <p className="media-uploader-filename" title={fileName}>
              {fileName || 'Berkas Terunggah'}
            </p>
            {fileSize && <p className="media-uploader-filesize">{fileSize}</p>}
          </div>

          <div className="media-uploader-actions">
            <button
              type="button"
              className="media-uploader-btn"
              onClick={handleCopy}
              title="Salin URL CDN"
            >
              <i className={`fa ${copySuccess ? 'fa-check' : 'fa-clipboard'}`}></i>
              {copySuccess ? 'Tersalin' : 'Salin URL'}
            </button>

            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="media-uploader-btn"
              title="Buka Berkas"
            >
              <i className="fa fa-external-link"></i>
            </a>

            <button
              type="button"
              className="media-uploader-btn media-uploader-btn-delete"
              onClick={handleDelete}
              title="Hapus Berkas"
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="media-uploader-error">
          <i className="fa fa-exclamation-circle"></i> {errorMessage}
        </div>
      )}
    </div>
  );
}
