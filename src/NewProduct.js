import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './FontLoader.css'

const Container = styled.div`
  background-color: #fcfcfb;
  width: 100%;
  padding: .5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
//   background-color:black;

  @media (max-width: 2000px) {
    width: 80%;
    padding: 0.5rem;
    height:104%;
  }

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
  background-color: #f4f6fb;
  color: #000;
  padding: 0.5rem;
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
//   background-color:red;
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
//   background-color:red;

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
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
  width: 35%; // Adjust width to your liking
//   background-color:red;

  @media (max-width: 400px) {
    margin-bottom: 0.2rem;
    width: 100%;
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  text-align: right;
  width: ${(props) => (props.small ? '40%' : '70%')};
  box-sizing: border-box;
  border-color: blue;
  align-self: center;
  text-align:left;

  @media (max-width: 480px) {
   width: ${(props) => (props.small ? '55%' : '100%')};
    margin-top: 0.3rem;
  }

`;


const InputWrapper = styled.div`
  display: flex;
  width: 70%; // Match this width with the div wrapping the weight input

  @media (max-width: 480px) {
    width: 60%;
  }

  @media (max-width: 400px) {
    width: 100%;
    margin-top: 0.3rem;
  }
`;


const Prefix = styled.span`
  padding: 0.5rem;
  background-color: #fff;
  border: 1px solid black;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
  border-right: none;
  color: black;
  background-color: whitesmoke;
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

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
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

const MeasurementButton = styled.button`
  background-color: #fbc02d;
  color: #000;
  border: 1px solid #ccc;
  padding: 0.5rem;
  margin: 0.3rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;

  &:hover {
    background-color: #f1a303;
  }

  @media (max-width: 480px) {
    padding: 0.2rem;
    margin: 0.2rem;
    
  }

  @media (max-width: 400px) {
    padding: 0.2rem;
    margin: 0.1rem;
    font-size: 0.9rem;
    
  }
`;


const MeasurementButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
`;


const BackgroundCircle = styled.div`
  position: absolute;
  bottom: 300px;
  left: -20px;
  width: 400px;
  height: 400px;
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

const NewProduct = ({ productTitle, productImage ,variantWeights ,selectedProductID}) => {
  const [spValue, setSPValue] = useState('');
  const [mrpValue, setMRPValue] = useState('');
  const [weightValue, setWeightValue] = useState('');
  const [title, setTitle] = useState(productTitle);
  const [isMeasurementSelected, setIsMeasurementSelected] = useState(false);

  const handleSPChange = (event) => {
    setSPValue(event.target.value);
  };

  const handleMRPChange = (event) => {
    setMRPValue(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeightValue(event.target.value.toUpperCase());
  };

  const handleMeasurementClick = (unit) => {
    setWeightValue(`${weightValue.replace(/[a-zA-Z]/g, '')}${unit}`);
    setIsMeasurementSelected(true);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAddToCart = () => {

    if (!isMeasurementSelected) {
      alert('Select any measurement to add to cart');
      return;
    }

    console.log(selectedProductID);
    console.log(variantWeights);
    // Check if SP is greater than MRP
  if (parseFloat(spValue) > parseFloat(mrpValue)) {
    alert('SP cannot be greater than MRP. Please correct your entries.');
    return; // Exit function if SP is greater than MRP
  }

  // Find all keys in variantWeights that start with selectedProductID
  const keysStartingWithSelectedID = Object.keys(variantWeights).filter(key =>
    key.startsWith(`${selectedProductID}.`)
  );

  // Count the total number of keys starting with selectedProductID
  const totalNos = keysStartingWithSelectedID.length;

  

  const confirmAdd = window.confirm(`Do you want to add the product: ${title} to the cart?`);
    if (confirmAdd) {
      // Construct the unique product ID by appending totalNos to selectedProductID
  const uniqueProductID = `${selectedProductID}.${totalNos + 1}`;
// Log the new unique product ID
  console.log('Unique Product ID for NewProduct:', uniqueProductID);
        
      alert('Added to cart successfully!');
      setSPValue('');
      setMRPValue('');
      setWeightValue('');
      setTitle('');
    }
  
  };
  
  

  useEffect(() => {
    console.log(`hi ${selectedProductID}`);
    setTitle(productTitle);
  }, [productTitle]);

  return (
    <Container>
      <h3 style={{fontFamily:"DMSansB",color:"#000356a"}}>ENTER NEW VARIANT</h3>
      <Card>
        <InnerContainer>
          <Image src={productImage} alt={title} />
          <DetailsContainer>
            <DetailRow>
              <Label style={{fontFamily:"DMSansB"}}>Title: <span style={{color:"red"}}>(*edit)</span></Label>
              <Input
                type="text"
                value={title}
                onChange={handleTitleChange}
                
                
              />
              {/* <ProductNamePlaceholder>( *Enter your own title )</ProductNamePlaceholder> */}
            </DetailRow>
            <DetailRow>
  <Label style={{fontFamily:"DMSansB"}}>SP:</Label>
  <InputWrapper small>
    <Prefix>₹</Prefix>
    <Input
      type="text"
      className="sp-input"
      value={spValue}
      onChange={handleSPChange}
      small
    />
  </InputWrapper>
</DetailRow>
<DetailRow>
  <Label style={{fontFamily:"DMSansB"}}>MRP:</Label>
  <InputWrapper small>
    <Prefix>₹</Prefix>
    <Input
      type="text"
      className="mrp-input"
      value={mrpValue}
      onChange={handleMRPChange}
      small
    />
  </InputWrapper>
</DetailRow>
<DetailRow>
  <Label style={{fontFamily:"DMSansB"}}>Weight:</Label>
  <div style={{ width: '70%' }}> 
    <Input
      type="text"
      className="weight-input"
      value={weightValue}
      onChange={handleWeightChange}
      small
    />
  </div>
</DetailRow>
<p style={{marginRight:"1rem",fontFamily:"DMSansSB"}}>Select Any One :)</p>
<MeasurementButtonContainer>
              <MeasurementButton onClick={() => handleMeasurementClick('KG')} style={{fontFamily:"DMSans"}}>KG</MeasurementButton>
              <MeasurementButton onClick={() => handleMeasurementClick('GM')} style={{fontFamily:"DMSans"}}>GM</MeasurementButton>
              <MeasurementButton onClick={() => handleMeasurementClick('L')} style={{fontFamily:"DMSans"}}>L</MeasurementButton>
              <MeasurementButton onClick={() => handleMeasurementClick('ML')} style={{fontFamily:"DMSans"}}>ML</MeasurementButton>
              <MeasurementButton onClick={() => handleMeasurementClick('PCS')} style={{fontFamily:"DMSans"}}>PCS</MeasurementButton>
            </MeasurementButtonContainer>

          </DetailsContainer>
          <Button onClick={handleAddToCart} disabled={!isMeasurementSelected} style={{fontFamily:"DMSans"}}>Add to Cart</Button>
        </InnerContainer>
        <BackgroundCircle />
      </Card>
    </Container>
  );
};

export default NewProduct;