import React, { useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { FaArrowCircleRight } from "react-icons/fa";
import styled, { css } from 'styled-components';

const Container = styled.div`
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  padding: 1rem;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  position: relative;
  height: 100px; /* Ensure it takes the full height of the parent */

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

  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar */
  }
`;

const ProductList = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  border-radius: 8px;
  padding: 0.2rem;
  width:10rem;

  ${(props) =>
    props.isSelected &&
    css`
      background-color: #f5f5f5;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      padding: 0.2rem;
      border: .5px solid grey;
    `}

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  max-width: 200px;
  max-height: 80px;
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

const ProductName = styled.p`
  font-size: 0.9rem;
  color: #333;
  text-align: center;
  margin-top: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%; /* Ensure the text doesn't overflow out of the container */

  @media (max-width: 1200px) {
    font-size: 0.85rem;
  }

  @media (max-width: 900px) {
    font-size: 0.8rem;
  }

  @media (max-width: 700px) {
    font-size: 0.75rem;
  }

  @media (max-width: 490px) {
    font-size: 0.7rem;
  }

  @media (max-width: 400px) {
    font-size: 0.65rem;
  }
`;


const AddIcon = styled(IoIosAddCircle)`
  color: #4caf50;
  font-size: 4rem;
  cursor: pointer;
  margin-left: 1rem;
  transition: color 0.2s;

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

  &:hover {
    color: darkgreen;
  }
`;

const EnterNewProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  width: 130px;
  height: 100%;
  background-color: #405D72; /* New background color */
  margin-right: 1rem;
  
  padding: 1rem;
  // color:#fff

  @media (max-width: 1200px) {
    font-size: 0.85rem;
    padding: 1rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-right:1.2rem;
    margin-left:0rem;
  }

  @media (max-width: 900px) {
    font-size: 0.85rem;
    padding: 1rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-right:1.2rem;
    margin-left:0rem;
  }

  @media (max-width: 700px) {
    font-size: 0.75rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-right:1.2rem;
    margin-left:0rem;
  }

  @media (max-width: 490px) {
    font-size: 0.7rem;
    padding-top: 1.7rem;
    padding-bottom: 1.6rem;
    padding-right:1.2rem;
    margin-left:0rem;
    
  }
`;

const ProductSelector = ({ productImages, productNames, setSelectedProductID, setSelectedVariant, handleButtonClick }) => {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleProductClick = (id) => {
    setSelectedProductId(id);
    setSelectedProductID(id);
    setSelectedVariant(`${id}.1`);
  };

  return (
    <Container>
      <EnterNewProductWrapper>
        <FaArrowCircleRight style={{ fontSize: "32px", color: "#F5F5F5" }} />
        <p style={{ marginLeft: '0.5rem', color: "white" }}>New Product</p>
      </EnterNewProductWrapper>
      <ProductList>
        {Object.keys(productImages).map((id) => (
          <ProductContainer
            key={id}
            onClick={() => handleProductClick(id)}
            isSelected={selectedProductId === id}
          >
            <ProductImage
              src={productImages[id].image}
              alt={`Product ${id}`}
            />
            <ProductName>{productNames[id]}</ProductName>
          </ProductContainer>
        ))}
      </ProductList>
      <AddIcon onClick={handleButtonClick} />
    </Container>
  );
};

export default ProductSelector;
