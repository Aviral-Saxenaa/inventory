import React, { useState } from 'react';
import styled from 'styled-components';

// Container component for the entire screen
const Container = styled.div`
  background-color: #fbc02d;
  width: 100%; // Ensure it takes full width of the viewport
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  // Media queries for responsiveness
  @media (max-width: 700px) {
    width: 91%;
  }

  @media (max-width: 490px) {
    width: 90%;
  }

  @media (max-width: 412px) {
    padding: 0.5rem;
  }

  @media (max-width: 400px) {
    padding: 0.3rem;
  }
`;

// Card component for the main content
const Card = styled.div`
  background-color: #fff;
  color: #000;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  max-width: 100%; // Ensure card fits within the container
  width: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(-20px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  // Media queries for responsiveness
  @media (max-width: 480px) {
    padding: 1rem;
  }

  @media (max-width: 412px) {
    padding: 0.7rem;
  }
`;

// Inner container for the content
const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
`;

// Image component for the product image
const Image = styled.img`
  max-width: 180px;  // Adjusted for smaller screens
  max-height: 180px; // Adjusted for smaller screens
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: transform 0.3s ease;
  margin-bottom: 1rem;

  // Hover effect for the image
  &:hover {
    transform: scale(1.1);
  }

  // Media queries for responsiveness
  @media (max-width: 400px) {
    max-width: 150px;
    max-height: 150px;
  }
`;

// Details container for the input fields
const DetailsContainer = styled.div`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

// Detail row for each input field
const DetailRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

// Label component for the input fields
const Label = styled.span`
  font-weight: bold;
`;

// Input component for the input fields
const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  text-align: right;
  width: 70%;
  border-width: 1px;
  border-color: blue;

  // Media queries for responsiveness
  @media (max-width: 480px) {
    width: 60%;
  }

  @media (max-width: 400px) {
    width: 55%;
  }
`;

// Button component for the "Add to Cart" button
const Button = styled.button`
  background-color: #7f2800;
  color: #fff;
  border: none;
  padding: 0.7rem 4rem;
  border-radius: 4px;
  margin-top: 1rem;
  cursor: pointer;
  font-size: 18px;

  // Media queries for responsiveness
  @media (max-width: 480px) {
    padding: 0.5rem 2rem;
    font-size: 1rem;
  }

  @media (max-width: 400px) {
    padding: 0.5rem 1.5rem;
    font-size: 0.9rem;
  }
`;

// Background circle component
const BackgroundCircle = styled.div`
  position: absolute;
  bottom: 200px;
  left: -100px;
  width: 300px;
  height: 300px;
  background-color: #fe7a00;
  border-radius: 50%;
  z-index: 0;

  // Media queries for responsiveness
  @media (max-width: 480px) {
    bottom: 150px;
    left: -120px;
    width: 250px;
    height: 250px;
  }

  @media (max-width: 400px) {
    bottom: 120px;
    left: -150px;
    width: 200px;
    height: 200px;
  }
`;

// NewProduct component
const NewProduct = ({ productTitle, productImage }) => {
  // State variables for the input fields
  const [spValue, setSPValue] = useState('');
  const [mrpValue, setMRPValue] = useState('');
  const [weightValue, setWeightValue] = useState('');

  // Event handlers for the input fields
  const handleSPChange = (event) => {
    setSPValue(event.target.value);
  };

  const handleMRPChange = (event) => {
    setMRPValue(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeightValue(event.target.value);
  };

  // Render the NewProduct component
  return (
    <Container>
      <Card>
        <InnerContainer>
          <Image
            src={productImage}  // Use the productImage prop
            alt={productTitle}  // Use the productTitle prop
          />
          <h3 style={{ marginBottom: '1rem', marginLeft: '1rem', marginRight: '1rem' }}>{productTitle}</h3>
          <DetailsContainer>
            <DetailRow>
              <Label>SP:</Label>
              <Input
                type="text"
                value={spValue}
                onChange={handleSPChange}
                placeholder='Enter SP'
              />
            </DetailRow>
            <DetailRow>
              <Label>MRP:</Label>
              <Input
                type="text"
                value={mrpValue}
                onChange={handleMRPChange}
                placeholder='Enter MRP'
              />
            </DetailRow>
            <DetailRow>
              <Label>Weight:</Label>
              <Input
                type="text"
                value={weightValue}
                onChange={handleWeightChange}
                placeholder='Enter Weight'
              />
            </DetailRow>
          </DetailsContainer>
          <Button>Add to Cart</Button>
        </InnerContainer>
        <BackgroundCircle />
      </Card>
    </Container>
  );
};

export default NewProduct;
