import React, { useState, type FC, useCallback } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { useDropzone } from 'react-dropzone';
import * as pdfjs from 'pdfjs-dist';

// Styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PdfUploadViewer: FC = () => {
  const [pdfFile, setPdfFile] = useState<Uint8Array | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const pdfjsVersion = pdfjs.version;

  // FIX: Call the plugin at the top level. 
  // Do NOT wrap this in useMemo, as the plugin itself contains hooks.
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'application/pdf') {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target?.result;
        if (contents instanceof ArrayBuffer) {
          setPdfFile(new Uint8Array(contents));
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false
  });

  const handleRemove = () => {
    setPdfFile(null);
    setFileName("");
  };

  return (
    <div style={containerStyle}>
      {!pdfFile ? (
        <div {...getRootProps()} style={dropzoneStyle(isDragActive)}>
          <input {...getInputProps()} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>📄</div>
            <h3 style={{ margin: '0 0 10px 0' }}>Upload PDF Document</h3>
            <p style={{ color: '#666' }}>Drag & drop your file here, or click to select</p>
            <button style={uploadBtnStyle}>Choose File</button>
          </div>
        </div>
      ) : (
        <div style={viewerWrapperStyle}>
          <div style={headerStyle}>
            <span style={{ fontWeight: 600 }}>{fileName}</span>
            <button onClick={handleRemove} style={removeBtnStyle}>Change File</button>
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}>
              <Viewer 
                fileUrl={pdfFile} 
                plugins={[defaultLayoutPluginInstance]} 
              />
            </Worker>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Styles ---
const containerStyle: React.CSSProperties = {
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f4f7f9',
  fontFamily: 'Inter, system-ui, sans-serif'
};

const dropzoneStyle = (isActive: boolean): React.CSSProperties => ({
  width: '500px',
  height: '300px',
  border: `2px dashed ${isActive ? '#007bff' : '#cbd5e0'}`,
  borderRadius: '12px',
  backgroundColor: isActive ? '#f0f7ff' : '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease'
});

const uploadBtnStyle: React.CSSProperties = {
  marginTop: '15px',
  padding: '10px 24px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 600,
  cursor: 'pointer'
};

const viewerWrapperStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
};

const headerStyle: React.CSSProperties = {
  padding: '12px 20px',
  background: '#fff',
  borderBottom: '1px solid #e2e8f0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const removeBtnStyle: React.CSSProperties = {
  padding: '6px 12px',
  backgroundColor: '#fff',
  border: '1px solid #e2e8f0',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default PdfUploadViewer;