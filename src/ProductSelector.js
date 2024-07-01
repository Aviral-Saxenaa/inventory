import React from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #c3edd5;
  display: flex;
  align-items: center;
  padding: 1rem 1rem;
  overflow-x: auto; // Enable horizontal scrolling
  overflow-y: hidden; // Prevent vertical scrollbar
  white-space: nowrap; // Prevent wrapping of children

  @media (max-width: 1200px) {
    padding: 1.6rem 0.5rem;
  }

  @media (max-width: 900px) {
    padding: 2rem 0.2rem;
  }

  @media (max-width: 700px) {
    padding: 1.1rem 0.5rem;
  }

  @media (max-width: 490px) {
    padding: 1.7rem 0.5rem;
  }

  @media (max-width: 400px) {
    padding: 1.7rem 0.5rem;
  }

  // Hide scrollbar but keep functionality
  &::-webkit-scrollbar {
    height: 0;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1rem;
  cursor: pointer;
  transition: transform 0.2s;
  margin-left: 1rem;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  max-width: 200px;
  max-height: 100px;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 1200px) {
    max-width: 180px;
    max-height: 90px;
  }

  @media (max-width: 900px) {
    max-width: 160px;
    max-height: 80px;
  }

  @media (max-width: 700px) {
    max-width: 200px;
    max-height: 100px;
  }

  @media (max-width: 490px) {
    max-width: 140px;
    max-height: 80px;
  }

  @media (max-width: 400px) {
    max-width: 200px;
    max-height: 80px;
  }
`;

const AddIcon = styled(IoIosAddCircle)`
  color: #4caf50;
  font-size: 4rem;
  cursor: pointer;
  margin-left: 1rem;
  transition: color 0.2s;
  flex-shrink: 0; // Prevent the icon from shrinking

  @media (max-width: 1200px) {
    font-size: 3.5rem;
  }

  @media (max-width: 900px) {
    font-size: 3rem;
  }

  @media (max-width: 700px) {
    font-size: 2.5rem;
  }

  @media (max-width: 490px) {
    font-size: 2.5rem;
  }

  @media (max-width: 400px) {
    font-size: 2.2rem;
  }
`;

const ProductSelector = ({ productImages, setSelectedProductID, setSelectedVariant, handleButtonClick }) => {
  return (
    <Container>
      <ProductList>
        {Object.keys(productImages).map((id) => (
          <ProductContainer
            key={id}
            onClick={() => {
              setSelectedProductID(id);
              setSelectedVariant(`${id}.1`);
            }}
          >
            <ProductImage
              src={productImages[id]}
              alt={`Product ${id}`}
            />
          </ProductContainer>
        ))}
      </ProductList>
      <AddIcon onClick={handleButtonClick} />
    </Container>
  );
};

export default ProductSelector;
