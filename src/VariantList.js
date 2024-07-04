import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosAddCircle } from 'react-icons/io';
import { FaArrowCircleDown } from "react-icons/fa";

const ListContainer = styled.div`
  width: 40%;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  height: 100%;
  max-height: 80vh;

  @media (max-width: 1200px) {
    width: 50%;
  }

  @media (max-width: 900px) {
    width: 60%;
  }

  @media (max-width: 721px) {
    width: 80%;
  }

  @media (max-width: 600px) {
    width: 90%;
  }
`;

const VariantButton = styled.button`
  background: ${props => (props.isSelected ? '#f0f0f0' : '#fff')};
  color: ${props => (props.isSelected ? '#333' : '#000')};
  border: none;
  padding: .5rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;

  &:hover {
    background: #f5f5f5;
  }
`;

const VariantImage = styled.img`
  width: 60px;
  height: 80px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-right: 1rem;
  flex-shrink: 0;
`;

const VariantInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const VariantTitle = styled.span`
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const VariantWeight = styled.span`
  font-size: 0.9rem;
  color: red;
  font-weight: bold;
  background-color: #f0f0f0;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
`;

const AddButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const AddIcon = styled(IoIosAddCircle)`
  color: #4caf50;
  font-size: 4rem;
  cursor: pointer;
  margin-left: 1rem;
  transition: color 0.2s;
  flex-shrink: 0;

  @media (max-width: 1200px) {
    font-size: 3.5rem;
  }

  @media (max-width: 900px) {
    font-size: 3rem;
  }

  @media (max-width: 721px) {
    font-size: 2.5rem;
  }

  @media (max-width: 600px) {
    font-size: 2.5rem;
  }

  @media (max-width: 400px) {
    font-size: 2.2rem;
  }

  &:hover {
    color: darkgreen;
  }
`;

const EnterNewVariantWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  cursor: pointer;
  background-color: #405D72;
`;

const VariantList = ({ variantImages, variantNames, variantWeights, handleVariantClick, handleButtonClick }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);

  const handleClickVariant = (variant) => {
    console.log(`Variant clicked: ${variant}`);
    setSelectedVariant(variant);
    handleVariantClick(variant);
  };

  return (
    <ListContainer>
      <EnterNewVariantWrapper>
        <FaArrowCircleDown style={{ fontSize: "32px", color: "#FE7A00" }} />
        <p style={{ marginLeft: '0.5rem', color: "white", fontWeight: "bold" }}>New Variant</p>
      </EnterNewVariantWrapper>
      {Object.keys(variantImages).map((variant) => (
        <VariantButton
          key={variant}
          isSelected={selectedVariant === variant}
          onClick={() => handleClickVariant(variant)}
        >
          <VariantImage src={variantImages[variant]} alt={`Variant ${variant}`} />
          <VariantInfoContainer>
            <VariantTitle>{variantNames[variant]}</VariantTitle>
            <VariantWeight>Weight: {variantWeights[variant]}</VariantWeight>
          </VariantInfoContainer>
        </VariantButton>
      ))}
      <AddButtonContainer>
        <AddIcon onClick={handleButtonClick} />
      </AddButtonContainer>
    </ListContainer>
  );
};

export default VariantList;
