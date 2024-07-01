import React from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f4f3ee;
  width: 15%;
  overflow-y: auto; // Allow vertical scrolling
  overflow-x: hidden; // Hide horizontal scrollbar
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 1px;
  border: 1px solid grey;

  @media (max-width: 480px) {
    padding: 1.5rem 0.5rem;
    width: 30%; // Adjust width for smaller screens
  }

  @media (max-width: 490px) {
    padding: 1rem 0.5rem;
    width: 30%; // Adjust width for slightly larger screens
  }

  @media (max-width: 400px) {
    font-size: 2.2rem;
  }

  // Hide scrollbar but keep functionality
  &::-webkit-scrollbar {
    width: 0;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const VariantItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  cursor: pointer;
`;

const VariantImage = styled.img`
  max-width: 100%;
  max-height: 120px;
  object-fit: contain;
  border-radius: 4px;
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    max-height: 100px;
  }

  @media (max-width: 490px) {
    max-height: 100px;
  }
`;

const AddIcon = styled(IoIosAddCircle)`
  color: #4caf50;
  font-size: 4rem;
  cursor: pointer;
  margin-top: 1rem; // Add space above the icon
  transition: color 0.2s;

  @media (max-width: 480px) {
    font-size: 3rem;
  }

  @media (max-width: 490px) {
    font-size: 3rem;
  }

  @media (max-width: 400px) {
    font-size: 2.2rem;
  }
`;

const VariantList = ({ variantImages, handleVariantClick, handleButtonClick }) => {
  return (
    <Container>
      {Object.keys(variantImages).map((id) => (
        <VariantItem key={id} onClick={() => handleVariantClick(id)}>
          <VariantImage src={variantImages[id]} alt={`Variant ${id}`} />
        </VariantItem>
      ))}
      <AddIcon onClick={handleButtonClick} />
    </Container>
  );
};

export default VariantList;
