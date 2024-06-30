import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Grid, Card, CardMedia, CardContent, Typography, CardActions } from '@mui/material';
import { Client, Databases, Query } from 'appwrite';
import { useNavigate } from 'react-router-dom';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductTitle, setSelectedProductTitle] = useState('');
  const [appwriteProductIDs, setAppwriteProductIDs] = useState([]);
  const navigate = useNavigate();

  const barcodeName = 8901058005608;

  const client = new Client();
  client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('65773c8581b895f83d40'); // Your project ID

  const databases = new Databases(client);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://realtime-product-search.p.sulu.sh/v1/search?q=${barcodeName}&country=in&min_price=1`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer sk_live_VBdDJCLPRg1gOZRuIOZv7pG3PxVpDF1F'
        }
      });
      const data = await response.json();
      console.log('Search Response Data:', data); // Log the response data
      setProducts(data.data.slice(0, 6)); // Display only the top 6 results
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleAddToCart = (product) => {
    setSelectedProductTitle(product.product_title);
    console.log('Selected Product Title:', product.product_title); // Log the selected product title
    queryAppwriteProducts(product.product_title);
    console.log('Added to cart:', product.product_title);
    
  };

  const queryAppwriteProducts = async (productTitle) => {
    try {
      const response = await databases.listDocuments(
        'data-level-1', // Replace with your actual database ID
        '664f1ca60037dad0be9c', // Replace with your actual collection ID
        [
          Query.search('Product_Name', productTitle) // Ensure 'Product_Name' is the correct field name in your collection
        ]
      );

      if (response.documents.length > 0) {
        console.log('Appwrite Query Response:', response.documents); // Log the response from Appwrite
        const productIDs = response.documents.map((doc) => doc.ProductID);
        setAppwriteProductIDs(productIDs);
      }
    } catch (error) {
      console.error('Error querying Appwrite:', error);
    }
  };

  const handleTotalCategory = () => {
    navigate('/total-category', { state: { productIDs: appwriteProductIDs } });
  };

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    if (selectedProductTitle) {
      queryAppwriteProducts(selectedProductTitle);
    }
  }, [selectedProductTitle]);

  useEffect(() => {
    console.log('appwriteProductIDs:', appwriteProductIDs);
  }, [appwriteProductIDs]);

  return (
    <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 'bold', mt: 4 }}>
        Product Search
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <TextField
          type="text"
          value={barcodeName}
          readOnly
          placeholder="Enter query"
          variant="outlined"
          sx={{ mr: 1, minWidth: 300, backgroundColor: '#fff', borderRadius: 2 }}
        />
        <Button
          onClick={handleSearch}
          variant="contained"
          sx={{ padding: '10px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#007bff', '&:hover': { backgroundColor: '#0056b3' } }}
        >
          Search
        </Button>
      </Box>
      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.product_id}>
            <Card sx={{ maxWidth: 345, backgroundColor: '#fff', borderRadius: 2, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <CardMedia
                component="img"
                height="140"
                image={product.product_photos[0]}
                alt={product.product_title}
                sx={{ objectFit: 'contain' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h7" component="div" sx={{ color: '#333', fontWeight: 'bold' }}>
                  {product.product_title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
                  Price: {product.offer.price}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => handleAddToCart(product)}
                  sx={{ backgroundColor: '#28a745', '&:hover': { backgroundColor: '#218838' } }}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedProductTitle && (
        <Typography variant="h6" gutterBottom sx={{ color: '#333', fontWeight: 'bold', mt: 2 }}>
          Selected Product: {selectedProductTitle}
        </Typography>
      )}
      {appwriteProductIDs.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleTotalCategory}
            sx={{ backgroundColor: '#007bff', '&:hover': { backgroundColor: '#0056b3' } }}
          >
            View Total Category
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProductListing;