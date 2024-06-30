import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Client, Databases, Query } from 'appwrite';
import { IoIosAddCircle } from 'react-icons/io';

const TotalCategory = () => {
  const location = useLocation();
  const { productIDs } = location.state || {};
  const [productImages, setProductImages] = useState({});
  const [variantImages, setVariantImages] = useState({});
  const [selectedProductID, setSelectedProductID] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [variantInfo, setVariantInfo] = useState({});

  useEffect(() => {
    const client = new Client();
    const databases = new Databases(client);
    const databaseId = 'data-level-1';
    const collectionId = '664f1ca60037dad0be9c'; // Collection to fetch product images

    client.setEndpoint('https://cloud.appwrite.io/v1').setProject('65773c8581b895f83d40');

    const fetchProductImages = async () => {
      const uniqueProductIDs = Array.from(new Set(productIDs.map((id) => parseInt(id.split('.')[0]))));
      console.log('Unique Product IDs:', uniqueProductIDs); // Debugging log
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
        return { [id]: null }; // Return null if no image is found
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
      const collectionId = '664f1ca60037dad0be9c'; // Collection to fetch variant images

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
    const handleSearch = async () => {
      const client = new Client();
      const databases = new Databases(client);
      const databaseId = 'data-level-1';
      const collectionId = 'Shop_ItemsDB_testing'; // Collection to search for product IDs

      client.setEndpoint('https://cloud.appwrite.io/v1').setProject('65773c8581b895f83d40');

      try {
        console.log('Searching for product IDs:', productIDs); // Debugging log
        const response = await databases.listDocuments(databaseId, collectionId, [
          Query.contains('ProductIDs', '10.1'),
        ]);
        console.log('Search results:', response.documents);
      } catch (error) {
        console.error('Error searching for products:', error);
      }
    };

    if (productIDs) {
      handleSearch();
    }
  }, [productIDs]);

  const handleVariantClick = async (variant) => {
    console.log('variant has clicked');
    setSelectedVariant(variant);

    const client = new Client();
    const databases = new Databases(client);
    const databaseId = 'data-level-1';
    const collectionId = 'Shop_ItemsDB_testing';

    client.setEndpoint('https://cloud.appwrite.io/v1').setProject('65773c8581b895f83d40');

    try {
      const response = await databases.listDocuments(databaseId, collectionId, [
        Query.contains('ProductIDs', '10.1'),
      ]);
      console.log(response.documents);
      if (response.documents.length > 0) {
        const shopItem = response.documents[0];
        const itemInfo = {
          SP: shopItem['Shop_Items-SP'].find((item) => item.startsWith(variant))?.split(':')[1],
          Stocks: shopItem['Shop_Items-Stocks'].find((item) => item.startsWith(variant))?.split(':')[1],
          MRP: shopItem['Shop_Items-MRP'].find((item) => item.startsWith(variant))?.split(':')[1],
          Weight: shopItem['Shop_Items-Weight'].find((item) => item.startsWith(variant))?.split(':')[1],
        };
        setVariantInfo(itemInfo);
      }
    } catch (error) {
      console.error('Error fetching variant info:', error);
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
      <div
        style={{
          backgroundColor: '#d32f2f',
          height: '20%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1rem',
          overflowX: 'auto',
        }}
      >
        {Object.keys(productImages).map((id) => (
          <div
            key={id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginRight: '1rem',
              marginLeft: '1rem',
              cursor: 'pointer',
            }}
            onClick={() => {
              setSelectedProductID(id);
              setSelectedVariant(`${id}.1`);
            }}
          >
            <img
              src={productImages[id]}
              alt={`Product ${id}`}
              style={{ maxWidth: '150px', maxHeight: '150px', marginBottom: '0.5rem' }}
            />
            <p style={{ fontSize: '0.875rem', marginBottom: 0 }}>{`${id}.1`}</p>
          </div>
        ))}
        <IoIosAddCircle
          style={{ color: '#4CAF50', fontSize: '4rem', cursor: 'pointer' }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '80%' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#388e3c',
            width: '20%',
            overflowY: 'auto',
            alignItems: 'center',
            padding: '1rem 0',
          }}
        >
          {Object.keys(variantImages).map((id) => (
            <div
              key={id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '100%',
                maxHeight: '140px',
                marginBottom: '1rem',
                borderRadius: '4px',
                cursor: 'pointer',
                padding: '0.5rem',
              }}
              onClick={() => handleVariantClick(id)}
            >
              <img src={variantImages[id]} alt={`Variant ${id}`} style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: '#fbc02d', width: '80%', padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#fff', color: '#000', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', maxWidth: '600px', width: '25%' }}>
            {variantInfo.SP ? (
              <>
                <div style={{ display: 'flex', marginBottom: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <img src={variantImages[selectedVariant]} alt={`Variant ${selectedVariant}`} style={{ maxWidth: '150px', maxHeight: '150px', borderRadius: '8px', border: '1px solid #ddd' }} />
                  </div>
                  <div style={{ textAlign: 'right', marginLeft: '1rem' }}>
                    <p style={{ margin: '0.5rem 0' }}><strong>SP:</strong> ₹{variantInfo.SP}</p>
                    <p style={{ margin: '0.5rem 0' }}><strong>MRP:</strong> ₹{variantInfo.MRP}</p>
                    <p style={{ margin: '0.5rem 0' }}><strong>Stocks:</strong> {variantInfo.Stocks}</p>
                    <p style={{ margin: '0.5rem 0' }}><strong>Weight:</strong> {variantInfo.Weight}</p>
                  </div>
                </div>
              </>
            ) : (
              <p style={{ textAlign: 'center', margin: '1rem 0' }}>No information available for this variant.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalCategory;
