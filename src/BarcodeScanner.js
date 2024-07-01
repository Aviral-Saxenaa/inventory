import React, { useState } from 'react';
import styled from 'styled-components';

const BarcodeScanner = () => {
  const [barcodeInput, setBarcodeInput] = useState('');

  const handleInputChange = (event) => {
    setBarcodeInput(event.target.value);
  };

  return (
    <Container>
      <Title>Scan Barcode</Title>
      <RedBox>
        <img
          src="https://cdn.pixabay.com/photo/2014/04/02/16/19/barcode-306926__340.png"
          alt="Barcode"
        />
      </RedBox>
      <OrText>OR</OrText>
      <InputContainer>
        <Input
          type="text"
          placeholder="Enter barcode or name ..."
          value={barcodeInput}
          onChange={handleInputChange}
        />
        <Button>Search</Button>
      </InputContainer>
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

const RedBox = styled.div`
  width: 80%;
  max-width: 500px;
  height: 300px;
  background-color: #f4f6fc;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;

  img {
    max-width: 70%;
    max-height: 80%;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    height: 250px;
  }

  @media (max-width: 480px) {
    height: 200px;
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
  gap: 12px; /* Space between input and button */

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }

  @media (max-width: 400px) {
    width: 80%; /* Full width of 80% for very small screens */
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 1.5rem 2rem;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 3rem;
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

export default BarcodeScanner;
