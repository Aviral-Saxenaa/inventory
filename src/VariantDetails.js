import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Client, Databases, Query } from 'appwrite';
const Container = styled.div`
  background-color: #fcfcfb;
  width: 81%;
  padding: 1rem;
  display: ${({ open }) => (open ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  height: 100%;

  @media (min-width: 576px) {
    display: flex;
  }

  @media (max-width: 2000px) {
    width: 80%;
    padding: 0.5rem;
    height: 104%;
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
  flex-direction: row;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: 576px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

const ImageNameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 576px) {
    flex-direction: row;
    align-items: center;
    // justify-content: space-between;
    width: 100%;
  }
`;

const Image = styled.img`
  max-width: 100px;
  max-height: 100px;
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: transform 0.3s ease;
  margin-right: 0rem;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 576px) {
    margin-right: 0rem;
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
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const Label = styled.span`
  font-family: 'DMSansSB';
  margin-bottom: 0.3rem;

  @media (max-width: 576px) {
    margin-bottom: 0.2rem;
    width:100px;
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  text-align: left;
  width: 70%;
  box-sizing: border-box;

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
  background-color: #385aeb;
  color: #fff;
  border: none;
  padding: 0.7rem 4rem;
  border-radius: 4px;
  margin-top: 1rem;
  cursor: pointer;
  font-size: 18px;
width:100%;
font-family:'DMSansB'
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

const InputWrapper = styled.div`
  display: flex;
  width: 80%;

  @media (max-width: 480px) {
    width: 70%;
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

const NoInfoText = styled.p`
  text-align: center;
  margin: 1rem 0;
`;

const VariantName = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  font-family: 'DMSansSB';
  color: #333;
  margin-top: 0.5rem;
  margin-bottom: 1rem;

  @media (max-width: 576px) {
    margin-left: 0rem;
  }
`;

const VariantDetails = ({ selectedVariant, variantImages, variantInfo, variantName, variantWeights, open ,barcodeName}) => {
  const [spValue, setSPValue] = useState('');
  const [mrpValue, setMRPValue] = useState('');
  const [weightValue, setWeightValue] = useState('');
  const [stocksValue, setStocksValue] = useState('0');
  const [showPopup, setShowPopup] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const [showVariantDetails, setShowVariantDetails] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('GM');

  useEffect(() => {
    if (variantInfo) {
      console.log(barcodeName);
      setSPValue(`${variantInfo.SP}` || '');
      setMRPValue(`${variantInfo.MRP}` || '');
      setWeightValue(variantInfo.Weight || '');
      setShowVariantDetails(true);
    } else {
      setShowVariantDetails(false);
    }
  }, [variantInfo]);

  
  const handleAddToStore = () => {
    // Check if any value is empty or 0
    if (!spValue || parseInt(spValue) <= 0 ||
      !mrpValue || parseInt(mrpValue) <= 0 ||
      !weightValue || parseInt(weightValue) <= 0 ||
      !/\d/.test(weightValue) || !selectedUnit) {
    
    alert('Values cannot be empty, 0, or weight must contain at least one numeric value, and a measurement unit must be selected');
    return;
  }
  
    // Check if SP is greater than MRP
    if (parseInt(spValue) > parseInt(mrpValue)) {
      alert('SP should not be greater than MRP');
      return;
    }
  
    // Set stocksValue to 0 if it's null or undefined
    const stocks = stocksValue || '0';
  
    const isConfirmed = window.confirm('Are you sure you want to add this item to the store?');
    if (isConfirmed) {
      console.log(selectedVariant);
      console.log(spValue);
      console.log(stocks); // Logs 0 if stocksValue is null
      console.log(mrpValue);
      console.log(`Weight: ${weightValue}`);
      // Call your function to add to the store here
      addToShopItemsDB();
      addToGlobalDB();
    }
  };

  const checkBarcodeType = (barcodeName) => {
    const numericBarcode = parseFloat(barcodeName); // Attempt to parse as float
  
    if (!isNaN(numericBarcode)) {
      return 'Number'; // Returns 'Number' if the parsed value is not NaN
    } else {
      return 'String'; // Returns 'String' if it couldn't be parsed as a number
    }
  };


  const addToGlobalDB = async () => {
    console.log(`Selected Variant: ${selectedVariant}`);
    console.log(`Barcode Name: ${barcodeName}`);
  
    const client = new Client();
    client
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('65773c8581b895f83d40'); // Your project ID
  
    const databaseId = 'data-level-1';
    const collectionId = '664f1ca60037dad0be9c';
    const databases = new Databases(client);
  
    try {
      // Search for documents where ProductID matches the selected variant
      const response = await databases.listDocuments(databaseId, collectionId, [
        Query.equal('ProductID', selectedVariant)
      ]);
      const documents = response.documents;
  
      if (documents.length > 0) {
        const existingDocument = documents[0]; // Assuming ProductID is unique, take the first document
        console.log('Existing Document:', existingDocument);
  
        // Determine barcode type and prepare the new barcode value
        const barcodeType = checkBarcodeType(barcodeName);
        let newBarcode;
        if (barcodeType === 'Number') {
          newBarcode = [parseInt(barcodeName)];
        } else {
          newBarcode = [barcodeName];
        }
  
        // Append the new barcode to Product_Barcode array
        const updatedProductBarcode = [...existingDocument.Product_Barcode, ...newBarcode];
  
        // Construct the updated document with only Product_Barcode updated
        const updatedDocument = {
          $id: existingDocument.$id,
          $collection: collectionId,
          $permissions: existingDocument.$permissions,
          // ...existingDocument,
          Product_Barcode: updatedProductBarcode
        };
  
        // Update the document in the collection
        const updateResponse = await databases.updateDocument(
          databaseId,
          collectionId,
          existingDocument.$id,
          updatedDocument
        );
  
        console.log('Product_Barcode updated successfully:', updateResponse);
      } else {
        console.log('Document with selectedVariant not found.');
      }
    } catch (error) {
      console.error('Error updating Product_Barcode in Appwrite:', error);
      // Handle error appropriately
    }
  };

  const addToShopItemsDB = async () => {
    
    const client = new Client();
    client
      .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
      .setProject('65773c8581b895f83d40'); // Your project ID
      const databaseId = 'data-level-1';
      const collectionId = 'Shop_ItemsDB_testing';
  
    const databases = new Databases(client);
      try {
        // Search for documents where SHOP_ID matches '69'
        const response = await databases.listDocuments(databaseId, collectionId, [
          Query.equal('SHOP_ID', '301')
        ]);
        const documents = response.documents;
        console.log('this is document');
        console.log(documents);
        // console.log(`document is ${documents}`);
    
        if (documents.length > 0) {
          // Document with SHOP_ID '69' exists, update its fields
          const existingDocument = documents[0]; // Assuming SHOP_ID is unique, take the first document
  
          console.log(`sp : ${selectedVariant}:${spValue}`);
          console.log(`Stocks : ${selectedVariant}:${stocksValue}`);
          console.log(`MRP : ${selectedVariant}:${mrpValue}`);
          console.log(`Weight : ${selectedVariant}:${weightValue}`);
          console.log(`ProductIDs : ${selectedVariant}`);
    
          const updatedDocument = {
            // ...existingDocument,
            "Shop_Items-SP": [...existingDocument["Shop_Items-SP"], `${selectedVariant}:${spValue}`],
            "Shop_Items-Stocks": [...existingDocument["Shop_Items-Stocks"], `${selectedVariant}:${stocksValue}`],
            "Shop_Items-MRP": [...existingDocument["Shop_Items-MRP"], `${selectedVariant}:${mrpValue}`],
            "Shop_Items-Weight": [...existingDocument["Shop_Items-Weight"], `${selectedVariant}:${weightValue}${selectedUnit}`],
            "ProductIDs": [...existingDocument["ProductIDs"], selectedVariant]
          };
          console.log(`document id ${existingDocument.$id}`);
          const updateResponse = await databases.updateDocument(
            'data-level-1', // Your database ID
            'Shop_ItemsDB_testing', // Your collection ID
            existingDocument.$id, // Document ID to update
            updatedDocument // Updated document data
            // {'SHOP_ID':"301"}
          );
    
          console.log('Document updated successfully:', updateResponse);
        } else {
          console.log('Document with SHOP_ID 300 not found.'); // Optionally log a message if needed
        }
      } catch (error) {
        console.error('Error adding/updating document in Appwrite:', error);
        // Handle error appropriately
      }
    };
    
  
    

 const handleSPChange = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/[^\d]/g, ''); // Remove non-numeric characters
  
    setSPValue(numericValue);
  };

  const handleMRPChange = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/[^\d]/g, ''); // Remove non-numeric characters
  
    setMRPValue(numericValue);
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

  const isSaveDisabled = !spValue || !mrpValue || !weightValue;

  return (
    <Container open={open}>
      {showPopup && (
        <PopupContainer>
          <p>Weight Updated Successfully</p>
        </PopupContainer>
      )}
      <Card>
     

          <ImageNameContainer>
            {variantImages[selectedVariant] && (
              <Image src={variantImages[selectedVariant]} alt="Selected Variant" />
            )}
            <VariantName>{variantName}</VariantName>
          </ImageNameContainer>
          {showVariantDetails ? (
            <DetailsContainer>
              <DetailRow>
              <Label>SP:</Label>
              <InputWrapper small>
              <Prefix>₹</Prefix>
              
                <Input type="text" value={spValue} onChange={handleSPChange} readOnly={!isEditable} />
                </InputWrapper>
              </DetailRow>
              <DetailRow>
              <Label>MRP:</Label>
              <InputWrapper small>
              <Prefix>₹</Prefix>
            
                <Input type="text" value={mrpValue} onChange={handleMRPChange} readOnly={!isEditable} />
                </InputWrapper>
              </DetailRow>
              <DetailRow>
                <Label>Weight:</Label>
                <Input type="text" value={weightValue} onChange={handleWeightChange} readOnly={!isEditable} />
              </DetailRow>
              <UnitButtonContainer>
                {['GM', 'KG', 'ML', 'LTR'].map((unit) => (
                  <UnitButton
                    key={unit}
                    className={selectedUnit === unit ? 'active' : ''}
                    onClick={() => handleUnitSelect(unit)}
                  >
                    {unit}
                  </UnitButton>
                ))}
              </UnitButtonContainer>
              <Button onClick={handleAddToStore} disabled={isSaveDisabled}>
                SUBMIT
              </Button>
            </DetailsContainer>
          ) : (
            <NoInfoText>No information available for the selected variant.</NoInfoText>
          )}
      
      </Card>
    </Container>
  );
};

export default VariantDetails;
