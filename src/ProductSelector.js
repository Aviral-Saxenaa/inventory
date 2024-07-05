import React, { useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { FaArrowCircleRight } from "react-icons/fa";
import styled, { css } from 'styled-components';
import './FontLoader.css'

const Container = styled.div`
  background-color: #000125;
  display: flex;
  align-items: center;
  padding: .1rem;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  position: relative;
  height: 100px;

  @media (max-width: 1200px) {
    padding: 1.6rem 0.5rem;
  }

  @media (max-width: 900px) {
    padding: 2rem 0.2rem;
  }

  @media (max-width: 721px) {
    padding: 1.1rem 0.5rem;
  }

  @media (max-width: 600px) {
    padding: 1.7rem 0.5rem;
  }

  @media (max-width: 400px) {
    padding: 1.7rem 0.5rem;
  }

  &::-webkit-scrollbar {
    display: none;
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
  width: 10rem;

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
  max-width: 100px;
  max-height: 60px;
  margin-bottom: 0.5rem;
  margin-top: 0.8rem;
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

  @media (max-width: 721px) {
    max-width: 140px;
    max-height: 70px;
  }

  @media (max-width: 600px) {
    max-width: 120px;
    max-height: 60px;
  }

  @media (max-width: 400px) {
    max-width: 150px;
    max-height: 70px;
  }
`;

const ProductName = styled.p`
  font-size: 0.9rem;
  color: whitesmoke;
  text-align: center;
  margin-top: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;

  @media (max-width: 1200px) {
    font-size: 0.85rem;
  }

  @media (max-width: 900px) {
    font-size: 0.8rem;
  }

  @media (max-width: 721px) {
    font-size: 0.75rem;
  }

  @media (max-width: 600px) {
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
  transition: color 0.2s;
  margin-right:1.5rem;

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
    font-size: 2.2rem;
  }

  @media (max-width: 400px) {
    font-size: 2rem;
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
  background-color: #405D72;
  margin-right: 1rem;
  padding: 1rem;

  @media (max-width: 1200px) {
    font-size: 0.85rem;
    padding-top: 2rem;
  }

  @media (max-width: 900px) {
    font-size: 0.8rem;
    padding: 2rem;
  }

  @media (max-width: 721px) {
    font-size: 0.75rem;
        padding-bottom: 2rem;
  }

  @media (max-width: 600px) {
    font-size: 0.7rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  @media (max-width: 400px) {
    font-size: 0.65rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
`;

const ProductSelector = ({ productImages, productNames, setSelectedProductID, setSelectedVariant, handleButtonClick }) => {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleProductClick = (id) => {
    setSelectedProductId(id);
    setSelectedProductID(id);
    setSelectedVariant(`${id}.1`);
  };

  const handleAddButtonClick = () => {
    setSelectedProductId(null);
    setSelectedProductID(null);
    setSelectedVariant(null);
    handleButtonClick();
  };

  return (
    <Container>
      <EnterNewProductWrapper>
        <FaArrowCircleRight style={{ fontSize: "32px", color: "#F5F5F5" }} />
        <p style={{ marginLeft: '0.5rem', color: "white" ,fontFamily:"DMSansB"}}>New Product</p>
      </EnterNewProductWrapper>
      <ProductList>
      <AddIcon onClick={handleAddButtonClick} />
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
            <ProductName style={{fontFamily:"DMSansSB"}}>{productNames[id]}</ProductName>
          </ProductContainer>
        ))}
        
      </ProductList>
    </Container>
  );
};

export default ProductSelector;
