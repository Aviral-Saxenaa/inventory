import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Client, Databases, Query } from 'appwrite';
import ProductSelector from './ProductSelector';
import VariantList from './VariantList';
import VariantDetails from './VariantDetails';
import { Alert } from '@mui/material';
import NewProduct from './NewProduct';

const TotalCategory = ({ newModal }) => {

        const location = useLocation();

        useEffect(() => {
                if (newModal) {
                  alert('Hello');
                }
              }, [newModal]);
  
  const { productIDs } = location.state || {};
  const [productImages, setProductImages] = useState({});
  const [variantImages, setVariantImages] = useState({});
  const [selectedProductID, setSelectedProductID] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [variantInfo, setVariantInfo] = useState({});
  const [documents, setDocuments] = useState([]);
  const[showAddScreen,setShowAddScreen] = useState(false);

        const handleShowAddScreen=()=>{
                console.log('object');
                setShowAddScreen(true);
        }

  useEffect(() => {
    const client = new Client();
    const databases = new Databases(client);
    const databaseId = 'data-level-1';
    const collectionId = '664f1ca60037dad0be9c';

    client.setEndpoint('https://cloud.appwrite.io/v1').setProject('65773c8581b895f83d40');

    const fetchProductImages = async () => {
      const uniqueProductIDs = Array.from(new Set(productIDs.map((id) => parseInt(id.split('.')[0]))));
      const promises = uniqueProductIDs.map(async (id) => {
        try {
          const response = await databases.listDocuments(databaseId, collectionId, [
            Query.equal('ProductID', `${id}.1`),
          ]);
          if (response.documents.length > 0 && response.documents[0].Product_Image) {
            return { [id]: response.documents[0].Product_Image };
          }
        } catch (error) {
          console.error(`Error fetching product image from collection ${collectionId}:`, error);
        }
        return { [id]: null };
      });

      const results = await Promise.all(promises);
      const images = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      setProductImages(images);
      setSelectedProductID(uniqueProductIDs[0]);
      setSelectedVariant(`${uniqueProductIDs[0]}.1`);
    };

    if (productIDs) {
      fetchProductImages();
    }
  }, [productIDs]);

  useEffect(() => {
    if (selectedProductID !== null) {
      const client = new Client();
      const databases = new Databases(client);
      const databaseId = 'data-level-1';
      const collectionId = '664f1ca60037dad0be9c';

      client.setEndpoint('https://cloud.appwrite.io/v1').setProject('65773c8581b895f83d40');

      const fetchVariantImages = async () => {
        try {
          const response = await databases.listDocuments(databaseId, collectionId, [
            Query.startsWith('ProductID', `${selectedProductID}`),
          ]);
          const images = response.documents.reduce((acc, doc) => {
            if (doc.Product_Image) {
              acc[doc.ProductID] = doc.Product_Image;
            }
            return acc;
          }, {});
          setVariantImages(images);
        } catch (error) {
          console.error(`Error fetching variant images from collection ${collectionId}:`, error);
        }
      };

      fetchVariantImages();
    }
  }, [selectedProductID]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const client = new Client();
      const databases = new Databases(client);
      const databaseId = 'data-level-1';
      const collectionId = 'Shop_ItemsDB_testing';

      client.setEndpoint('https://cloud.appwrite.io/v1').setProject('65773c8581b895f83d40');

      try {
        const response = await databases.listDocuments(databaseId, collectionId, [
          Query.contains('ProductIDs', productIDs),
        ]);
        setDocuments(response.documents);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    if (productIDs) {
      fetchDocuments();
    }
  }, [productIDs]);

  const handleVariantClick = (variant) => {
    setSelectedVariant(variant);
        setShowAddScreen(false);
    let foundItemInfo = null;

    for (const shopItem of documents) {
      const extractDetail = (field, variant) => {
        const item = shopItem[field].find(item => item.startsWith(variant + ':'));
        return item ? item.split(':')[1] : null;
      };

      const itemInfo = {
        Variant: variant,
        SP: extractDetail('Shop_Items-SP', variant),
        Stocks: extractDetail('Shop_Items-Stocks', variant),
        MRP: extractDetail('Shop_Items-MRP', variant),
        Weight: extractDetail('Shop_Items-Weight', variant),
      };

      if (itemInfo.SP && itemInfo.Stocks && itemInfo.MRP && itemInfo.Weight) {
        foundItemInfo = itemInfo;
        break;
      }
    }

    if (foundItemInfo) {
      setVariantInfo(foundItemInfo);
    } else {
      setVariantInfo({ SP: null, Stocks: null, MRP: null, Weight: null });
    }
  };

  if (!productIDs) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#f5f5f5',
        }}
      >
        <h2 style={{ color: '#333' }}>Total Category</h2>
        <p style={{ color: '#666', marginTop: '1rem' }}>Loading...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#00356A',
        color: '#fff',
      }}
    >
      <ProductSelector
        productImages={productImages}
        setSelectedProductID={setSelectedProductID}
        setSelectedVariant={setSelectedVariant}
        handleButtonClick={handleShowAddScreen}
      />
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '80%' }}>
        <VariantList
          variantImages={variantImages}
          handleVariantClick={handleVariantClick}
        />
        {showAddScreen ? <NewProduct/> :<VariantDetails
          selectedVariant={selectedVariant}
          variantImages={variantImages}
          variantInfo={variantInfo}
        />}
        
      </div>
    </div>
  );
};

export default TotalCategory;
