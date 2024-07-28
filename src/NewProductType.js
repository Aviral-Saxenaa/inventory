import React, { useState, useEffect } from 'react';
import { Client, Databases ,Query} from 'appwrite';
import styled from 'styled-components';
import './FontLoader.css'

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
const Card = styled.div`
  background-color: #f4f6fc;
  color: #000;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 100%;
  position: relative;
  overflow: hidden;
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(-20px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 1050px) {
    padding: 0.5rem;
  }
`;

const ImageTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 576px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const WidthSetter = styled.div`
  width:65%;
  margin-right:5rem;

  @media (max-width: 576px) {
    width:70%;
    margin-right:0rem;
  }
`;
const Image = styled.img`
  max-width: 100px;
  max-height: 100px;
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: transform 0.3s ease;

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
    width: 100px;
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  text-align: left;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 576px) {
    width: 100%;
    margin-top: 0.3rem;
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


const NewProductType = ({ productTitle, productImage ,open,barcodeName}) => {
  const client = new Client();
  const databases = new Databases(client);
  const databaseId = 'data-level-1';
  const collectionId = 'AdminDB';

  client.setEndpoint('https://cloud.appwrite.io/v1').setProject('65773c8581b895f83d40');

  const [spValue, setSPValue] = useState('');
  const [mrpValue, setMRPValue] = useState('');
  const [weightValue, setWeightValue] = useState('');
  const [title, setTitle] = useState(productTitle);
  const [productKey, setProductKey] = useState('');
  const [isMeasurementSelected, setIsMeasurementSelected] = useState(false);
  const [uniqueId, setUniqueId] = useState('');
  const [stocksValue, setStocksValue] = useState('0');


  useEffect(() => {
    console.log(barcodeName);
const fetchProductKey = async () => {
  try {
    const response = await databases.listDocuments(databaseId, collectionId);
    console.log(response);
    if (response.documents.length > 0) {
      const productKey = response.documents[0]['Product-Key'];
      console.log(productKey);
      setProductKey(productKey);
    }
  } catch (error) {
    console.error('Error fetching Product-Key:', error);
  }
};
fetchProductKey();
setTitle(removeWeightFromTitle(productTitle));
}, [productTitle]);

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

  const checkBarcodeType = (barcodeName) => {
    const numericBarcode = parseFloat(barcodeName); // Attempt to parse as float
  
    if (!isNaN(numericBarcode)) {
      return 'Number'; // Returns 'Number' if the parsed value is not NaN
    } else {
      return 'String'; // Returns 'String' if it couldn't be parsed as a number
    }
  };

  const handleWeightChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, ''); // Only allow numbers
    setWeightValue(value);
  };

  const handleStocksChange = (event) => {
    setStocksValue(event.target.value.toUpperCase());
  };

  const handleMeasurementClick = (unit) => {
    setWeightValue(`${weightValue.replace(/[a-zA-Z]/g, '')}${unit}`);
    setIsMeasurementSelected(true);
  };

  const handleTitleChange = (event) => {
    // Allow only alphabetic input for Title
    const value = event.target.value.replace(/[^a-zA-Z\s]/g, ''); // Replace non-alphabetic characters
    setTitle(value);
  };

  const removeWeightFromTitle = (title) => {
    // Define patterns to match weight formats like "90 g", "90GM", "90 Kg", etc.
    const patterns = [
      /\s*\d+\s*(g|gm|kg|ml|l|pcs)\s*/gi,
      /\s*\d+\s*(g|gm|kg|ml|l|pcs)\.*$/gi,
    ];
  
    // Replace the matched patterns with an empty string
    patterns.forEach((pattern) => {
      title = title.replace(pattern, '');
    });
  
    return title.trim(); // Trim any leading or trailing spaces
  };
      

  const handleAddToCart = () => {
    if (!spValue || parseFloat(spValue) <= 0) {
      alert('SP value must be greater than 0.');
      return;
    }
    
    if (!mrpValue || parseFloat(mrpValue) <= 0) {
      alert('MRP value must be greater than 0.');
      return;
    }

    // Check if SP is greater than MRP
    if (parseInt(spValue) > parseInt(mrpValue)) {
      alert('SP should not be greater than MRP');
      return;
    }
    
    // Validate Weight has numeric value and measurement is selected
    const numericWeight = parseFloat(weightValue.replace(/[a-zA-Z]/g, ''));
    if (!numericWeight || isNaN(numericWeight) || !isMeasurementSelected) {
      alert('Please enter a numeric value and select a measurement for Weight.');
      return;
    }
  
    // Validate Title (accepts only alphabets and should have at least 2 alphabets)
    if (!/^[a-zA-Z].*[a-zA-Z]/.test(title)) {
      alert('Title should contain at least 2 alphabets and cannot be empty or just spaces.');
      return;
    }
  
    // Treat Stocks as '0' if null
    const stocks = stocksValue || '0';
    console.log(`${productKey}`);
    const initialProductID = 10;
    
    const confirmAdd = window.confirm(`Do you want to add the product: ${title} to the cart?`);
    if (confirmAdd) {
        // Log the new unique product ID
        const updatedProductID = `${parseInt(initialProductID) + parseInt(productKey)}.1`;
        setUniqueId(updatedProductID);
        console.log(updatedProductID);
        console.log('Image:',productImage);
      console.log('Weight:', weightValue);
      console.log('MRP:', mrpValue);
      console.log('SP:', spValue);
      console.log('Stocks:', stocks);
      console.log('Title:', title);
        alert('Added to cart successfully!');
      
    }
  };


  useEffect(() => {
    if (uniqueId) {
      addToShopItemsDB();
      addToGlobalDB();
      updateProductKey();
    }
  }, [uniqueId]);

  const addToShopItemsDB = async () => {
    // if(uniqueId) console.log(uniqueId);
    // else console.log('hehe');

    const client = new Client();
    client
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('65773c8581b895f83d40'); // Your project ID

    const databaseId = 'data-level-1';
    const collectionId = 'Shop_ItemsDB_testing';

    const databases = new Databases(client);

    try {
      const response = await databases.listDocuments(databaseId, collectionId, [
        Query.equal('SHOP_ID', '301')
      ]);

      const documents = response.documents;

      if (documents.length > 0) {
        const existingDocument = documents[0];
        
        console.log(`sp : ${uniqueId}:${spValue}`);
        console.log(`Stocks : ${uniqueId}:${stocksValue}`);
        console.log(`MRP : ${uniqueId}:${mrpValue}`);
        console.log(`Weight : ${uniqueId}:${weightValue}`);
        console.log(`ProductIDs : ${uniqueId}`);

        const updatedDocument = {
          'Shop_Items-SP': [...existingDocument['Shop_Items-SP'], `${uniqueId}:${spValue}`],
          'Shop_Items-Stocks': [...existingDocument['Shop_Items-Stocks'], `${uniqueId}:${stocksValue}`],
          'Shop_Items-MRP': [...existingDocument['Shop_Items-MRP'], `${uniqueId}:${mrpValue}`],
          'Shop_Items-Weight': [...existingDocument['Shop_Items-Weight'], `${uniqueId}:${weightValue}`],
          'ProductIDs': [...existingDocument['ProductIDs'], uniqueId]
        };

        const updateResponse = await databases.updateDocument(
          databaseId,
          collectionId,
          existingDocument.$id,
          updatedDocument
        );

        console.log('Document updated successfully:', updateResponse);
      } else {
        console.log('Document with SHOP_ID 301 not found.');
      }
    } catch (error) {
      console.error('Error adding/updating document in Appwrite:', error);
    }
  };

  const addToGlobalDB = async () => {
  const client = new Client();
  client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65773c8581b895f83d40'); // Your project ID

  const databaseId = 'data-level-1';
  const collectionId = '664f1ca60037dad0be9c';

  const databases = new Databases(client);

  const barcodeType = checkBarcodeType(barcodeName);

  const newDocument = {
    ProductID: uniqueId,
    ProductName: title,
    Product_Image: productImage,
    Product_Category: 'Snacks',
    'Category-Image': productImage,
    Product_Barcode: barcodeType === 'Number' 
      ? [barcodeName] 
      : [uniqueId]
  };

  try {
    const createResponse = await databases.createDocument(
      databaseId,
      collectionId,
      uniqueId,
      newDocument
    );

    console.log('New document created successfully:', createResponse);
  } catch (error) {
    console.error('Error creating document in Appwrite:', error);
  }
};

const updateProductKey = async () => {
  const client = new Client();
  client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65773c8581b895f83d40'); // Your project ID

  const databaseId = 'data-level-1';
  const collectionId = 'AdminDB';

  const databases = new Databases(client);
  try {
    // Fetch all documents in the collection
    const response = await databases.listDocuments(databaseId, collectionId);

    if (response.documents.length > 0) {
      // Extract the first document
      const document = response.documents[0];
      console.log(document);
      const documentId = document.$id;
      const currentProductKey = document['Product-Key'];

      // Prepare the updated Product-Key value
      const updatedProductKey = currentProductKey + 1;

      // Construct the update payload
      const updatedDocument = {
        'Product-Key': updatedProductKey,
      };

      // Update the document with the new Product-Key value
      const updateResponse = await databases.updateDocument(
        databaseId,
        collectionId,
        documentId,
        updatedDocument
      );

      console.log('Product-Key updated successfully:', updateResponse);
    } else {
      console.log('No documents found in collection', collectionId);
    }
  } catch (error) {
    console.error('Error updating Product-Key in AdminDB:', error);
  }
};
  return (
    <Container open={open}>
      
      <Card>
  
      <ImageTitleContainer>
          <Image src={productImage} alt={title} />
          <WidthSetter>
            <DetailRow style={{display:'flex',flexDirection:'column'}}>
              {/* <Label style={{ fontFamily: 'DMSansB' }}>
                Title
              </Label> */}
              <Input type="text" value={title} onChange={handleTitleChange} style={{fontStyle:"DMSansR"}}/>
            </DetailRow>
          </WidthSetter>
        </ImageTitleContainer>
          <DetailsContainer>
     
<DetailRow>
            <Label style={{ fontFamily: 'DMSansB' }}>SP:</Label>
            <InputWrapper small>
            
            <Input
      type="text"
      className="sp-input"
      value={spValue}
      onChange={handleSPChange}
      small
      placeholder='₹'
      style={{fontSize:"18px",fontFamily:"DMSans"}}
    />
            </InputWrapper>
          </DetailRow>

<DetailRow>
  <Label style={{fontFamily:"DMSansB"}}>MRP:</Label>
  <InputWrapper small>
    
    <Input
      type="text"
      className="mrp-input"
      value={mrpValue}
      onChange={handleMRPChange}
      small
      placeholder='₹'
      style={{fontSize:"18px",fontFamily:"DMSans"}}
    />
  </InputWrapper>
</DetailRow>
<DetailRow>
  <Label style={{fontFamily:"DMSansB"}}>Stocks:</Label>
  <InputWrapper small>
    
    <Input
      type="text"
      className="weight-input"
      value={stocksValue}
      onChange={handleStocksChange}
      small
      
    />
  </InputWrapper>
</DetailRow>


<DetailRow>
  <Label style={{fontFamily:"DMSansB"}}>Weight:</Label>
  <InputWrapper small>
    
    <Input
      type="text"
      className="weight-input"
      value={weightValue}
      onChange={handleWeightChange}
      small
    />
  </InputWrapper>
</DetailRow>

<UnitButtonContainer>
                {['GM', 'KG', 'ML', 'LTR'].map((unit) => (
                  <UnitButton
                    key={unit}
                    // className={selectedUnit === unit ? 'active' : ''}
                    onClick={() =>  handleMeasurementClick(unit)}
                  >
                    {unit}
                  </UnitButton>
                ))}
              </UnitButtonContainer>


            
          </DetailsContainer>
          <Button onClick={handleAddToCart} disabled={!isMeasurementSelected} style={{fontFamily:"DMSansB",marginBottom:"1rem"}}>SUBMIT</Button>

       
      </Card>
    </Container>
  );
};

export default NewProductType;
