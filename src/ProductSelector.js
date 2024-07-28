import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import styled, { css } from 'styled-components';
import './FontLoader.css';
import { Alert } from '@mui/material';

const Container = styled.div`
  background-color: #fafaf8;
  display: flex;
  margin-top: 3.7rem;
  align-items: center;
  height: 110px;

  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  position: relative;
  box-shadow: 0px 4px 6px -6px rgba(0, 0, 0, 0.2);
  @media (max-width: 1200px) {
    padding: 1.6rem 0.5rem;
  }

  @media (max-width: 721px) {
    padding: 0rem 0rem;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ProductList = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0rem;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  border-radius: 5px;
  padding: 0rem;
  width: 110px;
  margin: 0.2rem;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  border: 0.1px solid grey;
  ${(props) =>
    props.isSelected &&
    css`
      background-color: #bbd6ff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border: 0.5px solid grey;
    `}

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  width: 40px;
  height: 40px;
  margin-top: 0.2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProductName = styled.p`
  font-size: 15px;
  text-align: center;
  margin-top: 0.2rem;
  margin-bottom: 0; /* Remove bottom margin */
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: normal;
  word-wrap: break-word;
  color: black;

  @media (max-width: 1200px) {
    font-size: 0.85rem;
  }

  @media (max-width: 900px) {
    font-size: 0.85rem;
  }

  @media (max-width: 721px) {
    font-size: 0.8rem;
  }

  @media (max-width: 600px) {
    font-size: 0.78rem;
  }

  @media (max-width: 400px) {
    font-size: 0.65rem;
  }
`;

const AddIcon = styled(IoIosAddCircle)`
  color: #1f8cdc;
  font-size: 5rem;
  cursor: pointer;
  transition: color 0.2s;
  margin-right: 1.1rem;
  margin-left: 0.2rem;

  @media (max-width: 1200px) {
    font-size: 3.5rem;
  }

  @media (max-width: 900px) {
    font-size: 4rem;
  }

  @media (max-width: 721px) {
    font-size: 4rem;
  }

  @media (max-width: 600px) {
    font-size: 3rem;
  }

  @media (max-width: 400px) {
    font-size: 2rem;
  }

  &:hover {
    color: darkgreen;
  }
`;

const ProductSelector = ({ productImages, productNames, setSelectedProductID, setSelectedVariant, handleButtonClick }) => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const addIconRef = useRef(null);

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
  useEffect(() => {
    if (localStorage.getItem('inDB') === 'false') {
      handleButtonClick();
    }
  }, []);

  return (
    <Container>
      <ProductList>
        <AddIcon ref={addIconRef} onClick={handleAddButtonClick} />
        {Object.keys(productImages).map((id) => {
          const name = productNames[id];
          const truncatedName = name.length > 15 ? name.substring(0, 10) + '...' : name;
          return (
            <ProductContainer
              key={id}
              onClick={() => handleProductClick(id)}
              isSelected={selectedProductId === id}
            >
              <ProductImage src={productImages[id].image} alt={`Product ${id}`} />
              <ProductName style={{ fontFamily: 'DMSans', alignSelf: 'center', marginLeft: 2, marginRight: 2 }}>
                {truncatedName}
              </ProductName>
            </ProductContainer>
          );
        })}
      </ProductList>
    </Container>
  );
};

export default ProductSelector;
