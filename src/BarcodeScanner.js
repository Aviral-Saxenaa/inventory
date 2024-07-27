import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import beepSound from './audio/beep-sound-8333.mp3';
import './FontLoader.css'

const BarcodeScanner = () => {
  const [scannedCode, setScannedCode] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const scannerRef = useRef(null);
  const scannerStyle = useRef({
    border: '5px solid transparent',
    transition: 'border-color 0.3s'
  });

  const navigate = useNavigate();

  useEffect(() => {
    const setupScanner = async () => {
      try {
        const devices = await Html5Qrcode.getCameras();
        if (devices && devices.length) {
          if (!scannerRef.current) {
            scannerRef.current = new Html5QrcodeScanner(
              "reader",
              { fps: 5, qrbox: { width: 250, height: 250 }, flip: false },
              false
            );

            const onScanSuccess = (decodedText, decodedResult) => {
              setScannedCode(decodedText);
              const audio = new Audio(beepSound);
              audio.play();
              setShowModal(true);
              scannerStyle.current.border = '5px solid green';
              
            };

            scannerRef.current.render(onScanSuccess);
          }
        } else {
          setError('No camera devices found.');
        }
      } catch (err) {
        setError(`Error initializing scanner: ${err.message}`);
      }
    };

    setupScanner();
  }, []);

  const isMobile = window.innerWidth <= 768;

  const handleOk = () => {
    setShowModal(false);
    scannerRef.current.clear();
    navigate('/product-listing', { state: { barcodeName: scannedCode } });
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleSearch = () => {
    navigate('/product-listing', { state: { barcodeName: inputValue } });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: isMobile ? '10%' : '1%' }}>
      <h1 style={{fontFamily:"DMSansB"}}>SCAN BARCODE</h1>
      <div
        id="reader"
        style={{
          width: isMobile ? '70%' : '40%',
          height: isMobile ? '60%' : '20%',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          ...scannerStyle.current
        }}
      ></div>
      <p style={orStyle}>OR</p>
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'center', alignItems: 'center', marginTop: isMobile ? '20px' : '2px' }}>
        <input
          type="text"
          placeholder="Enter Barcode or Name"
          style={inputStyle}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          
        />
        <button style={{ ...buttonStyle, marginTop: isMobile ? '10px' : '0' }} onClick={handleSearch}>Search</button>
      </div>
      {error && (
        <p style={{ fontSize: '18px', color: 'red', textAlign: 'center' }}>{error}</p>
      )}

      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h2>Scanned Result</h2>
            <p>{scannedCode}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <button onClick={handleOk} style={modalButtonStyle}>OK</button>
              <button onClick={handleCancel} style={{ ...modalButtonStyle, backgroundColor: '#CE2E27' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const orStyle = {
  fontSize: '18px',
  margin: '20px 0',
};

const inputStyle = {
  fontSize: '18px',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  marginRight: '10px',
  transition: 'border-color 0.3s',
  width: '300px', 
  fontFamily:"DMSans"
};

const buttonStyle = {
  fontSize: '18px',
  padding: '10px 20px',
  cursor: 'pointer',
  borderRadius: '5px',
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  transition: 'background-color 0.3s',
  marginLeft: '10px',
  fontFamily:"DMSansSB"
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '5px',
  width: '80%',
  maxWidth: '500px',
  textAlign: 'center',
};

const modalButtonStyle = {
  fontSize: '18px',
  padding: '10px 20px',
  cursor: 'pointer',
  borderRadius: '5px',
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  transition: 'background-color 0.3s',
  width: '100px', // Adjust width as needed
};

export default BarcodeScanner;