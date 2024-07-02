import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #fbc02d;
  width: 81%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 700px) {
    width: 91%;
  }

  @media (max-width: 490px) {
    width: 90%;
  }

  @media (max-width: 400px) {
    padding: .3rem;
  }
`;

const Card = styled.div`
  background-color: #fff;
  color: #000;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 60%;
  position: relative;
  overflow: hidden;
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(-20px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 1rem;
  }

  @media (max-width: 490px) {
    width: 100%;
    padding: 1rem;
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
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: transform 0.3s ease;
  margin-bottom: 0.5rem;  /* Reduced margin for better alignment */

  &:hover {
    transform: scale(1.1);
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
`;

const DetailRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  text-align: right;
  width: 70%;
  border-width: 1px;
  border-color: blue;

  @media (max-width: 480px) {
    width: 60%;
  }

  @media (max-width: 490px) {
    width: 60%;
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

  @media (max-width: 490px) {
    padding: 0.5rem 2rem;
    font-size: 1rem;
  }
`;

const BackgroundCircle = styled.div`
  position: absolute;
  bottom: 250px;
  left: -100px;
  width: 300px;
  height: 300px;
  background-color: #fe7a00;
  border-radius: 50%;
  z-index: 0;
`;

const CurrencySymbol = styled.div`
  font-weight: bold;
  margin-right: 0.5rem;
`;

const NoInfoText = styled.p`
  text-align: center;
  margin: 1rem 0;
`;

const VariantName = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-top: 0.5rem;
  margin-bottom: 1rem;  /* Added margin for better spacing */
`;

const VariantDetails = ({ selectedVariant, variantImages, variantInfo, variantName }) => {
  const [spValue, setSPValue] = useState('');
  const [mrpValue, setMRPValue] = useState('');
  const [weightValue, setWeightValue] = useState('');

  useEffect(() => {
    if (variantInfo) {
      setSPValue(`₹ ${variantInfo.SP}` || '');
      setMRPValue(`₹ ${variantInfo.MRP}` || '');
      setWeightValue(variantInfo.Weight || '');
    }
  }, [variantInfo]);

  const handleSPChange = (event) => {
    setSPValue(event.target.value);
  };

  const handleMRPChange = (event) => {
    setMRPValue(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeightValue(event.target.value);
  };

  return (
    <Container>
      <Card>
        {variantInfo && variantInfo.SP ? (
          <>
            <InnerContainer>
              <Image
                src={variantImages[selectedVariant]}
                alt={`Variant ${selectedVariant}`}
              />
              <VariantName>{variantName}</VariantName>  {/* Display the variant name below the image */}
              <DetailsContainer>
                <DetailRow>
                  <Label>SP:</Label>
                  <Input
                    type="text"
                    value={spValue}
                    onChange={handleSPChange}
                    style={{fontSize:"1.2rem",color:"green"}}
                  />
                </DetailRow>
                <DetailRow>
                  <Label>MRP:</Label>
                  <Input
                    type="text"
                    value={mrpValue}
                    onChange={handleMRPChange}
                    style={{fontSize:"1.2rem",color:"green"}}
                  />
                </DetailRow>
                <DetailRow>
                  <Label>Weight:</Label>
                  <Input
                    type="text"
                    value={weightValue}
                    onChange={handleWeightChange}
                    style={{fontSize:"1.2rem",color:"red"}}
                  />
                </DetailRow>
              </DetailsContainer>
              <Button>Add to Cart</Button>
            </InnerContainer>
            <BackgroundCircle />
          </>
        ) : (
          <NoInfoText>No information available for this variant.</NoInfoText>
        )}
      </Card>
    </Container>
  );
};

export default VariantDetails;
