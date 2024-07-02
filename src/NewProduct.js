import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #fbc02d;
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;

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

const Card = styled.div`
  background-color: #fff;
  color: #000;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  width: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(-20px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }

  @media (max-width: 412px) {
    padding: 0.7rem;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const Image = styled.img`
  max-width: 110px;
  max-height: 110px;
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: transform 0.3s ease;
  margin-bottom: .3rem;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 400px) {
    max-width: 150px;
    max-height: 150px;
  }
`;

const DetailsContainer = styled.div`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const DetailRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: .5rem;
`;

const Label = styled.span`
  font-weight: bold;
  margin-bottom: 0.3rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 0.4rem;
  }
`;

const Button = styled.button`
  background-color: #7f2800;
  color: #fff;
  border: none;
  padding: 0.7rem 4rem;
  border-radius: 4px;
  margin-top: 1rem;
  cursor: pointer;
  font-size: 18px;

  @media (max-width: 480px) {
    padding: 0.5rem 2rem;
    font-size: 1rem;
  }

  @media (max-width: 400px) {
    padding: 0.5rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const ProductNamePlaceholder = styled.span`
  color: red;
  font-weight: normal;
  font-size: 0.8rem;
`;

const BackgroundCircle = styled.div`
  position: absolute;
  bottom: 200px;
  left: -100px;
  width: 300px;
  height: 300px;
  background-color: #fe7a00;
  border-radius: 50%;
  z-index: 0;

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

const NewProduct = ({ productTitle, productImage ,variantWeights}) => {
  const [spValue, setSPValue] = useState('');
  const [mrpValue, setMRPValue] = useState('');
  const [weightValue, setWeightValue] = useState('');
  const [title, setTitle] = useState(productTitle);

  const handleSPChange = (event) => {
    setSPValue(event.target.value);
  };

  const handleMRPChange = (event) => {
    setMRPValue(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeightValue(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAddToCart=()=>{
    console.log(variantWeights);
  }

  useEffect(() => {
    setTitle(productTitle);
  }, [productTitle]);

  return (
    <Container>
      <Card>
        <InnerContainer>
          <Image src={productImage} alt={title} />
          <DetailsContainer>
            <DetailRow>
              <Label>Name of Product:</Label>
              <Input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder={`${title} (Enter your product name)`}
                
              />
              <ProductNamePlaceholder>( *Enter your own title )</ProductNamePlaceholder>
            </DetailRow>
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
              <ProductNamePlaceholder>( *Enter in CAPS in format e.g., 10KG, 2ML )</ProductNamePlaceholder>
            </DetailRow>
          </DetailsContainer>
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </InnerContainer>
        <BackgroundCircle />
      </Card>
    </Container>
  );
};

export default NewProduct;
