import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './FontLoader.css';

const ListContainer = styled.div`
  width: 40%;
  padding: 1rem;
  background-color: #f1f1f4;
  border-radius: 0px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const VariantButton = styled.button`
  background: ${(props) => (props.isSelected ? '#f1f1f1' : '#fff')};
  color: ${(props) => (props.isSelected ? '#333' : '#000')};
  border: none;
  padding: 0.5rem;
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
  width: 80px;
  height: 80px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-right: 1rem;
  flex-shrink: 0;
  object-fit: contain;

  @media (max-width: 576px) {
    width: 80px;
    height: 80px;
  }

  @media (max-width: 400px) {
    width: 80px;
    height: 80px;
  }
`;

const VariantInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const VariantTitle = styled.span`
  color: #333;
  margin-bottom: 0.5rem;
  font-size: ${(props) => (props.isMobileView ? '0.8rem' : '1rem')};
`;

const VariantDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const VariantWeight = styled.span`
  font-size: ${(props) => (props.isMobileView ? '0.9rem' : '1rem')};
  color: #212121;
  font-weight: bold;
  text-align: left;
`;

const HighlightedText = styled.span`
  background-color: #f5f6f8;
  border-radius: 1px;
  padding: 2px 10px;
  border: 1px solid #ccc;
`;

const SelectButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color 0.2s;

  &:hover {
    background-color: #45a049;
  }
`;

const AddButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0 0rem; /* Match ListContainer's padding */
  box-sizing: border-box; /* Include padding in width calculation */

  @media (min-width: 601px) {
    width: 40%; /* Match ListContainer's width on larger screens */
  }
`;

const AddButton = styled.button`
  width: 100%;
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 1rem;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.2s;
  margin-top: auto;

  &:hover {
    background-color: #45a049;
  }
`;

const VariantList = ({ variantImages, variantNames, variantWeights, handleVariantClick, handleButtonClick }) => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 615);
  const [showAddButton, setShowAddButton] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 615);
    };

    const checkLocalStorage = () => {
      const inDB = localStorage.getItem('inDB');
      if (inDB === 'false') {
        setShowAddButton(false);
      }
    };

    handleResize();
    checkLocalStorage();

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [selectedVariant, setSelectedVariant] = useState(null);

  const handleClickVariant = (variant) => {
    console.log(`Variant clicked: ${variant}`);
    setSelectedVariant(variant);
    handleVariantClick(variant);
  };

  const handleAddIconClick = () => {
    if (!selectedVariant) {
      alert('Select a Product to add its variant');
      return;
    }
    handleButtonClick();
  };


  return (
    <>
      <ListContainer style={{ width: isMobileView ? '100%' : '50%' }}>
        {Object.keys(variantImages).map((variant) => (
          <VariantButton
            key={variant}
            isSelected={selectedVariant === variant}
            onClick={() => handleClickVariant(variant)}
          >
            <VariantImage src={variantImages[variant]} alt={`Variant ${variant}`} />
            <VariantInfoContainer>
              <VariantTitle style={{ fontFamily: 'DMSans', textAlign: 'left' }}>
                {variantNames[variant]}
              </VariantTitle>
              <VariantDetails>
                <VariantWeight isMobileView={isMobileView} style={{ fontFamily: 'DMSansB', textAlign: 'left' }}>
                  <HighlightedText>{variantWeights[variant]}</HighlightedText>
                </VariantWeight>
                <SelectButton>Select</SelectButton>
              </VariantDetails>
            </VariantInfoContainer>
          </VariantButton>
        ))}
        {showAddButton && (
          <AddButtonContainer>
            <AddButton onClick={handleAddIconClick} style={{ fontFamily: 'DMSansSB' }}>
              Add New Variant
            </AddButton>
          </AddButtonContainer>
        )}
      </ListContainer>
    </>
  );
};

export default VariantList;
