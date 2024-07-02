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
    padding: 0.3rem;
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
  margin-bottom: 0.5rem;

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

  @media (max-width: 400px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Label = styled.span`
  font-weight: bold;
  margin-bottom: 0.3rem;

  @media (max-width: 400px) {
    margin-bottom: 0.2rem;
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  text-align: right;
  width: 70%;
  box-sizing: border-box;

  @media (max-width: 480px) {
    width: 60%;
  }

  @media (max-width: 400px) {
    width: 100%;
    margin-top: 0.3rem;
  }
`;

const Button = styled.button`
  background-color: #2A518B;
  color: #fff;
  border: none;
  padding: 0.7rem 4rem;
  border-radius: 4px;
  margin-top: 1rem;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    background-color: #1E3E6B;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 2rem;
    font-size: 1rem;
  }

  @media (max-width: 400px) {
    padding: 0.5rem 1.5rem;
    font-size: 0.9rem;
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

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #F3ECDE;
  color: black;
  padding: 2rem;
  border-radius: 8px;
  z-index: 999;
  opacity: 0.9;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
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
  margin-bottom: 1rem;
`;

const ChangeButton = styled.button`
  background-color: #2A518B;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: 0.5rem;

  &:hover {
    background-color: #1E3E6B;
  }

  @media (max-width: 400px) {
    margin-left: 0;
    margin-top: 0.3rem;
  }
`;

const VariantDetails = ({ selectedVariant, variantImages, variantInfo, variantName, variantWeights }) => {
  const [spValue, setSPValue] = useState('');
  const [mrpValue, setMRPValue] = useState('');
  const [weightValue, setWeightValue] = useState('');
  const [showPopup, setShowPopup] = useState(false);

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

  const handleWeightUpdate = () => {
    const uniqueIditis = parseInt(selectedVariant);

    const weightAlreadyPresent = Object.entries(variantWeights)
      .filter(([key]) => key.startsWith(`${uniqueIditis}.`))
      .some(([_, value]) => value === weightValue);

    if (weightAlreadyPresent) {
      setShowPopup(true);
      console.log(`Weight ${weightValue} is already present in variant list.`);
    } else {
      const existingSuffixes = Object.keys(variantWeights)
        .filter(key => key.startsWith(`${uniqueIditis}.`))
        .map(key => parseInt(key.split('.')[1]));

      const maxSuffix = existingSuffixes.length > 0 ? Math.max(...existingSuffixes) : 0;
      const newProductId = `${uniqueIditis}.${maxSuffix + 1}`;
      
      console.log(`New Product ID: ${newProductId}`);

      setWeightValue(weightValue);
      setShowPopup(false);
      console.log(`Updated weight to ${weightValue}`);
    }
  };

  const handleAddToStore = () => {
    const uniqueIditis = parseInt(selectedVariant);

    const existingSuffixes = Object.keys(variantWeights)
      .filter(key => key.startsWith(`${uniqueIditis}.`))
      .map(key => parseInt(key.split('.')[1]));

    const maxSuffix = existingSuffixes.length > 0 ? Math.max(...existingSuffixes) : 0;
    const newProductId = `${uniqueIditis}.${maxSuffix + 1}`;
    
    console.log(`New Product ID on Add to Store: ${newProductId}`);
    // Implement your logic to add the product to the store
  };

  const closePopup = () => {
    setShowPopup(false);
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
              <VariantName>{variantName}</VariantName>
              <DetailsContainer>
                <DetailRow>
                  <Label>SP:</Label>
                  <Input
                    type="text"
                    value={spValue}
                    onChange={handleSPChange}
                    style={{ fontSize: "1.2rem", color: "green" }}
                  />
                </DetailRow>
                <DetailRow>
                  <Label>MRP:</Label>
                  <Input
                    type="text"
                    value={mrpValue}
                    onChange={handleMRPChange}
                    style={{ fontSize: "1.2rem", color: "green" }}
                  />
                </DetailRow>
                <DetailRow>
                  <Label>Weight:</Label>
                  <Input
                    type="text"
                    value={weightValue}
                    onChange={handleWeightChange}
                    style={{ fontSize: "1.2rem", color: "red" }}
                  />
                  <ChangeButton onClick={handleWeightUpdate}>Change</ChangeButton>
                </DetailRow>
              </DetailsContainer>
              <Button onClick={handleAddToStore}>Add to Store</Button>
            </InnerContainer>
            <BackgroundCircle />
            {showPopup && (
              <PopupContainer>
                <p>Weight is already present. Go to desired variant to edit SP and MRP.</p>
                <Button onClick={closePopup} style={{ alignSelf: "center" }}>Close</Button>
              </PopupContainer>
            )}
          </>
        ) : (
          <NoInfoText>No information available for this variant.</NoInfoText>
        )}
      </Card>
    </Container>
  );
};

export default VariantDetails;
