import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #fbc02d;
  width: 81%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  // height:auto;

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
  border-color: blue;

  @media (max-width: 480px) {
    width: 60%;
  }

  @media (max-width: 400px) {
    width: 100%;
    margin-top: 0.3rem;
  }
`;

const UnitButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  width: 100%;
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
  margin: 0 0.2rem;

  &:hover {
    background-color: #1E3E6B;
  }

  &.active {
    background-color: #1E3E6B;
  }

  @media (max-width: 400px) {
    margin: 0.1rem 0.1rem;
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
  opacity:.9;
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

const VariantDetails = ({ selectedVariant, variantImages, variantInfo, variantName, variantWeights }) => {
  const [spValue, setSPValue] = useState('');
  const [mrpValue, setMRPValue] = useState('');
  const [weightValue, setWeightValue] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const [showVariantDetails, setShowVariantDetails] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('GM');

  useEffect(() => {
    if (variantInfo) {
      console.log(' length badi hai');
      console.log('VARIANT INFO:::: '+ {variantInfo});
      // console.log(`det: ${variantInfo}`);
      console.log(`selectedVariant: ${selectedVariant}`);
      console.log(variantWeights);
      console.log(`variantInfo.Weight: ${variantInfo.Weight}`);
      setSPValue(`₹ ${variantInfo.SP}` || '');
      setMRPValue(`₹ ${variantInfo.MRP}` || '');
      setWeightValue(variantInfo.Weight || '');
      setShowVariantDetails(true); 
    } else {
      console.log(' length choti hai');
      setShowVariantDetails(false);
    }
  }, [variantInfo]);

  const handleSPChange = (event) => {
    const value = event.target.value;
    if (parseInt(value) <= parseInt(mrpValue.replace('₹ ', ''))) {
      setSPValue(value);
    } else {
      // Display alert when SP exceeds MRP
      alert('SP should not be greater than MRP');
      // Optionally, you can keep the current value of SP or reset it to MRP:
      // setSPValue(mrpValue);
    }
  };
  

  const handleMRPChange = (event) => {
    setMRPValue(event.target.value);
  };

  const handleWeightChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, ''); // Only allow numbers
    setWeightValue(value);
  
    // Check if the backspace key is pressed
    if (event.nativeEvent.inputType === 'deleteContentBackward') {
      setWeightValue(''); // Clear the weight value
    }
  };
  

  const handleUnitSelect = (unit) => {
    setSelectedUnit(unit);
  };

  const handleWeightUpdate = () => {
    const uniqueId = parseInt(selectedVariant);
    
    const weightAlreadyPresent = Object.entries(variantWeights)
      .filter(([key]) => key.startsWith(`${uniqueId}.`))
      .some(([_, value]) => value === `${weightValue}${selectedUnit}`);
    
      console.log(weightAlreadyPresent);
  
    if (!weightAlreadyPresent) {
      setShowPopup(false);
      setIsEditable(true);
      console.log(`You can edit weight bcoz weight is not present to ${weightValue}`);
    } else {

      const canEditMRPSP = variantWeights[selectedVariant] === variantInfo.Weight;
      console.log(`1 :${variantInfo.Weight}`);
      console.log(`2 : ${variantWeights[selectedVariant]}`);
      console.log('ye kya hai'+canEditMRPSP);
      if (canEditMRPSP) {
        setShowPopup(true);
        setWeightValue(variantWeights[selectedVariant]);
        setIsEditable(true);
        console.log(`You can edit weight to ${weightValue}`);
      } 
    }
  };
  
  const closePopup = () => {
    setShowPopup(false);
    console.log(variantInfo.SP);
    setShowVariantDetails(false);
  };

  const handleAddToStore = () => {
    console.log(`Weight: ${weightValue}${selectedUnit}`);
    // Add any additional logic for adding to the store here
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
                    style={{ fontSize: "1.2rem", color: "green" }}
                    disabled={!isEditable}
                  />
                </DetailRow>
                <DetailRow>
                  <Label>MRP:</Label>
                  <Input
                    type="text"
                    value={mrpValue}
                    onChange={handleMRPChange}
                    style={{ fontSize: "1.2rem", color: "green" }}
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
                    style={{ fontSize: "1.2rem", color: "red" }}
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
                <Button onClick={closePopup} style={{alignSelf:"center"}}>Close</Button>
              </PopupContainer>
            )}
          </>
        ) : (
          <NoInfoText>Choose Products from dash-catalogue :) </NoInfoText>
        )}
      </Card>
    </Container>
  );
};

export default VariantDetails;
