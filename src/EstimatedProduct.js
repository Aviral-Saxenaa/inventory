import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Client, Query, Databases } from 'appwrite';

const EstimatedProduct = ({productID}) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const client = new Client();
    const databaseId = 'data-level-1';
    const collectionId = 'Shop_ItemsDB_testing';

    client
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('65773c8581b895f83d40');

    const databases = new Databases(client);

    databases
      .listDocuments(databaseId, collectionId, [
        Query.contains('ProductIDs', ['45.1']),
      ])
      .then((response) => {
        if (response.documents.length > 0) {
          setProduct(response.documents[0]);
        }
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  }, []);

  if (!product) {
    return (
      <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'black', borderRadius: 2, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', mt: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
          Estimated Product
        </Typography>
        
        <Typography variant="body1" sx={{ color: '#666', mt: 1 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'black', borderRadius: 2, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', mt: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
        Estimated Product
      </Typography>
      <Typography variant="body1" sx={{ color: '#666', mt: 1 }}>
        ShopId: {product.SHOP_ID}
      </Typography>
      <Typography variant="body1" sx={{ color: '#666', mt: 1 }}>
        highestSimilarityProductID: {productID}
      </Typography>
      {/* <Typography variant="body1" sx={{ color: '#666', mt: 1 }}>
        MRP: {product.mrp}
      </Typography>
      <Typography variant="body1" sx={{ color: '#666', mt: 1 }}>
        SP: {product.sp}
      </Typography>
      <Typography variant="body1" sx={{ color: '#666', mt: 1 }}>
        Weight: {product.weight}
      </Typography> */}
    </Box>
  );
};

export default EstimatedProduct;