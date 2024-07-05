import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #fcfcfb;
  width: 81%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height:100%;

  @media (max-width: 2000px) {
    width: 80%;
    padding: 0.5rem;
    height:104%;
  }



  @media (max-width: 576px) {
    width: 95%;
    padding: 0.3rem;
  }
`;

const Card = styled.div`
  background-color: #f4f6fc;
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

  @media (max-width: 1050px) {
    width: 100%;
    padding: .5rem;
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
  max-width: 100px;
  max-height: 100px;
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

  @media (max-width: 650px) {
    padding: 0rem;
  }
`;

const DetailRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Label = styled.span`
  font-weight: bold;
  margin-bottom: 0.3rem;

  @media (max-width: 576px) {
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
  text-align:left;

  @media (max-width: 576px) {
    width: 100%;
    margin-top: 0.3rem;
  }
`;

const UnitButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 0.5rem;
  width: 100%;

  @media (min-width: 576px) and (max-width: 736px) {
    justify-content: center;
  }
`;

const UnitButton = styled.button`
  background-color: #2A518B;
  color: #fff;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  flex: 1;
  margin: 0.2rem;

  &:hover {
    background-color: #1E3E6B;
  }

  &.active {
    background-color: #1E3E6B;
  }

  @media (min-width: 576px) and (max-width: 736px) {
    width: calc(33.33% - 0.4rem);
  }

  @media (max-width: 575px) {
    margin: 0.1rem;
    width: calc(50% - 0.2rem);
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

  @media (max-width: 724px) {
    padding: 1rem 2rem;
    font-size: 1rem;
  }

  @media (max-width: 576px) {
    padding: .8rem 2rem;
    font-size: 1rem;
  }

  @media (max-width: 400px) {
    padding: 0.3rem 1.5rem;
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
    bottom: 280px;
    left: -120px;
    width: 300px;
    height: 300px;
  }
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f3ecde;
  color: black;
  padding: 2rem;
  border-radius: 8px;
  z-index: 999;
  opacity: 0.9;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 480px) {
    padding: 1rem;
  }
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

const VariantDetails = ({ selectedVariant, variantImages, variantInfo, variantName, variantWeights,barcodeName }) => {
  const [spValue, setSPValue] = useState('');
  const [mrpValue, setMRPValue] = useState('');
  const [weightValue, setWeightValue] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const [showVariantDetails, setShowVariantDetails] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('GM');

  useEffect(() => {
    if (variantInfo) {
      console.log(barcodeName);
      setSPValue(`₹ ${variantInfo.SP}` || '');
      setMRPValue(`₹ ${variantInfo.MRP}` || '');
      setWeightValue(variantInfo.Weight || '');
      setShowVariantDetails(true);
    } else {
      setShowVariantDetails(false);
    }
  }, [variantInfo]);

  const handleSPChange = (event) => {
    const value = event.target.value;
    if (parseInt(value) <= parseInt(mrpValue.replace('₹ ', ''))) {
      setSPValue(value);
    } else {
      alert('SP should not be greater than MRP');
    }
  };

  const handleMRPChange = (event) => {
    setMRPValue(event.target.value);
  };

  const handleWeightChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, ''); // Only allow numbers
    setWeightValue(value);
  };

  const handleUnitSelect = (unit) => {
    setSelectedUnit(unit);
    setWeightValue((prevValue) => {
      const numericValue = prevValue.replace(/[^\d]/g, ''); // Remove any non-numeric characters
      return `${numericValue}${unit}`; // Concatenate the numeric value with the selected unit
    });
  };
  

  const handleWeightUpdate = () => {
    const uniqueId = parseInt(selectedVariant);
    const weightAlreadyPresent = Object.entries(variantWeights)
      .filter(([key]) => key.startsWith(`${uniqueId}.`))
      .some(([_, value]) => value === `${weightValue}${selectedUnit}`);
  
    if (!weightAlreadyPresent) {
      setShowPopup(false);
      setIsEditable(true);
      console.log(`You can edit weight because weight is not present: ${weightValue}`);
    } else {
      const canEditMRPSP = variantWeights[selectedVariant] === variantInfo.Weight;
      if (canEditMRPSP) {
        setShowPopup(true);
        setWeightValue(variantWeights[selectedVariant]);
        setIsEditable(true);
        console.log(`You can edit weight to: ${weightValue}`);
      }
    }
  };
  
  const closePopup = () => {
    setShowPopup(false);
    setShowVariantDetails(false); // Adjusted to ensure the variant details are also hidden when closing popup
  };
  
  const handleAddToStore = () => {
    console.log(selectedVariant);
    const isConfirmed = window.confirm('Are you sure you want to add this item to the store?');
    if (isConfirmed) {
      console.log(`Weight: ${weightValue}`);
      // Add any additional logic for adding to the store here
    }
  };
  
  
  return (
    <Container>
      <Card>
        {showVariantDetails && variantInfo && variantInfo.SP ? (
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
                    style={{ fontSize: "1rem" }}
                    disabled={!isEditable}
                  />
                </DetailRow>
                <DetailRow>
                  <Label>MRP:</Label>
                  <Input
                    type="text"
                    value={mrpValue}
                    onChange={handleMRPChange}
                    style={{ fontSize: "1rem" }}
                    disabled={!isEditable}
                  />
                </DetailRow>
                <DetailRow>
                  <Label>Weight:</Label>
                  <Input
                    type="text"
                    value={weightValue}
                    onChange={handleWeightChange}
                    onBlur={handleWeightUpdate}
                    style={{ fontSize: "1rem" }}
                  />
                </DetailRow>
                <UnitButtonContainer>
                  {['GM', 'KG', 'L', 'ML', 'PCS'].map(unit => (
                    <UnitButton
                      key={unit}
                      className={selectedUnit === unit ? 'active' : ''}
                      onClick={() => handleUnitSelect(unit)}
                    >
                      {unit}
                    </UnitButton>
                  ))}
                </UnitButtonContainer>
              </DetailsContainer>
              <Button onClick={handleAddToStore}>Add to Store</Button>
            </InnerContainer>
            <BackgroundCircle />
            {showPopup && (
              <PopupContainer>
                <p>Weight is already present. Go to desired variant to edit SP and MRP.</p>
                <Button onClick={closePopup}>Close</Button>
              </PopupContainer>
            )}
          </>
        ) : (
          <NoInfoText>Choose Products from dash-catalogue :)</NoInfoText>
        )}
      </Card>
    </Container>
  );
};

export default VariantDetails;

