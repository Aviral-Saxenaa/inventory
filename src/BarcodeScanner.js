import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import './FontLoader.css'

const BarcodeScanner = () => {
  const [barcodeInput, setBarcodeInput] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const scanner = new Html5QrcodeScanner('reader', {
  //     qrbox: {
  //       width: 250,
  //       height: 250,
  //     },
  //     fps: 5,
  //   });

  //   scanner.render(success, error);

  //   function success(result) {
  //     setScanResult(result);
  //     setIsModalOpen(true);
  //   }

  //   function error(err) {
  //     console.warn(err);
  //   }
  // }, []);

  const handleInputChange = (event) => {
    setBarcodeInput(event.target.value);
  };

  const navigateToProductListing = (value) => {
    navigate('/product-listing', { state: { barcodeName: value } });
  };

  const handleSearch = () => {
    navigateToProductListing(barcodeInput);
  };

  const handleContinue = () => {
    setIsModalOpen(false);
    if (scanResult) {
      navigateToProductListing(scanResult);
    }
  };

  const handleBack = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Title style={{fontFamily:"DMSansB"}}>Scan Barcode</Title>
      <div id="reader"></div>
      <OrText style={{fontFamily:"DMSansB"}}>OR</OrText>
      <InputContainer>
      <Input
  type="text"
  placeholder="Enter barcode or name ..."
  value={barcodeInput}
  onChange={handleInputChange}
  style={{fontFamily:"DMSans"}}
  onKeyDown={(event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }}
/>

        <Button onClick={handleSearch} style={{fontFamily:"DMSansSB"}}>Search</Button>
      </InputContainer>
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <p>Barcode: {scanResult}</p>
            <ButtonContainer>
              <ModalButton onClick={handleBack}>Back</ModalButton>
              <ModalButton onClick={handleContinue}>Continue</ModalButton>
            </ButtonContainer>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.25rem;
  }
`;

const Title = styled.h1`
  color: #058689;
  margin-bottom: 1.5rem;
  font-size: 2.2rem;
  font-family: "DM Sans", sans-serif;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const OrText = styled.h1`
  margin: 20px 0;
  color: #333;
  font-weight: bold;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const InputContainer = styled.div`
  width: 80%;
  max-width: 500px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }

  @media (max-width: 400px) {
    width: 80%;
  }
`;

const Input = styled.input`
  flex: 2;
  padding: 1rem;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;

  @media (max-width: 768px) {
    padding: 0.75rem;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const Button = styled.button`
  background-color: #c62828;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;

  &:hover {
    background-color: #b71c1c;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 12px;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  background-color: #058689;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;

  &:hover {
    background-color: #04656d;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 12px;
  }
`;

export default BarcodeScanner;
