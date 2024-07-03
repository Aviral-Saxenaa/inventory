import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Grid, Card, CardMedia, CardContent, Typography, CardActions } from '@mui/material';
import { Client, Databases, Query } from 'appwrite';
import { useNavigate, useLocation } from 'react-router-dom';
import { GrLinkNext } from "react-icons/gr";
import { useMediaQuery, useTheme } from '@mui/material';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [exist, setExist] = useState(false);
  const [appwriteProductIDs, setAppwriteProductIDs] = useState([]);
  const [appwriteProductDetails, setAppwriteProductDetails] = useState(null);
  const navigate = useNavigate();
  const nextButtonRef = useRef(null);

  const { state } = useLocation();
  const { barcodeName } = state;

  const client = new Client();
  client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('65773c8581b895f83d40'); // Your project ID

  const databases = new Databases(client);

  const handleCheck = async () => {
    console.log('Checking for barcode:', barcodeName);

    try {
      const response = await databases.listDocuments(
        'data-level-1', // Replace with your actual database ID
        '664f1ca60037dad0be9c', // Replace with your actual collection ID
        [
          Query.contains('Product_Barcode', [barcodeName]) // Ensure 'Product_Barcode' is the correct field name in your collection
        ]
      );
      console.log('Appwrite check response:', response);

      if (response.documents.length > 0) {
        setExist(true);
        const productData = response.documents[0];
        setSelectedProduct({
          ProductID: productData.ProductID,
          Product_Name: productData.Product_Name,
          Product_Image: productData.Product_Image
        });
        fetchProductAttributes(productData.ProductID);
      } else {
        handleSearch();
      }
    } catch (error) {
      console.error('Error querying Appwrite:', error);
      handleSearch();
    }
  };

  const fetchProductAttributes = async (productID) => {
    try {
      const response = await databases.listDocuments(
        'data-level-1', // Replace with your actual database ID
        'Shop_ItemsDB_testing', // Replace with your actual collection ID
        [
          Query.equal('ProductIDs', productID) // Ensure 'ProductIDs' is the correct field name in your collection
        ]
      );

      if (response.documents.length > 0) {
        console.log('Appwrite Product Details Response:', response.documents); // Log the response from Appwrite
        const productDetails = response.documents[0];
        setAppwriteProductDetails({
          Shop_Items_SP: productDetails['Shop_Items-SP'],
          Shop_Items_MRP: productDetails['Shop_Items-MRP'],
          Shop_Items_Weight: productDetails['Shop_Items-Weight'],
        });
      }
    } catch (error) {
      console.error('Error querying Appwrite for product attributes:', error);
    }
  };

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
      console.log('Search API response:', data); // Log the response data
      setProducts(data.data.slice(0, 6)); // Display only the top 6 results
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleAddToCart = (product) => {
    setSelectedProduct({
      ProductID: product.product_id,
      Product_Name: product.product_title,
      Product_Image: product.product_photos[0]
    });
    console.log('Selected Product:', product); // Log the selected product
    queryAppwriteProducts(product.product_title);
    console.log('Added to cart:', product.product_title);
    showNextButton();
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
    navigate('/total-category', {
      state: {
        productIDs: appwriteProductIDs,
        productTitle: selectedProduct.Product_Name,
        productImage: selectedProduct.Product_Image
      }
    });
  };

  const showNextButton = () => {
    if (nextButtonRef.current) {
      nextButtonRef.current.style.display = 'flex';
    }
  };

  useEffect(() => {
    handleCheck();
  }, []);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(409));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between(410, 590));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        backgroundColor: '#f5f5f5',
        minHeight: '100vh'
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 'bold', mt: 4, fontWeight: "600" }}>
        Add Similar Product
      </Typography>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          maxWidth: 600
        }}
      >
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

      {exist ? (
        <Grid container spacing={3} sx={{ justifyContent: 'center', width: '100%', maxWidth: 1200 }}>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={selectedProduct.ProductID}
            sx={{
              maxWidth: isSmallScreen ? '100%' : isMediumScreen ? '50%' : 'auto'
            }}
          >
            <Card sx={{ maxWidth: 345, backgroundColor: '#fff', borderRadius: 2, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <CardMedia
                component="img"
                height="140"
                image={selectedProduct.Product_Image}
                alt={selectedProduct.Product_Name}
                sx={{ objectFit: 'contain' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h7" component="div" sx={{ color: '#333', fontWeight: 'bold' }}>
                  {selectedProduct.Product_Name}
                </Typography>
                {appwriteProductDetails && (
                  <>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
                      <span style={{ fontWeight: 'bold', color: '#000' }}>SP: </span>
                      <span style={{ color: 'green', fontSize: '1.4rem' }}>{appwriteProductDetails.Shop_Items_SP}</span>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
                      <span style={{ fontWeight: 'bold', color: '#000' }}>MRP: </span>
                      <span style={{ color: 'green', fontSize: '1.4rem' }}>{appwriteProductDetails.Shop_Items_MRP}</span>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
                      <span style={{ fontWeight: 'bold', color: '#000' }}>Weight: </span>
                      <span style={{ color: 'green', fontSize: '1.4rem' }}>{appwriteProductDetails.Shop_Items_Weight}</span>
                    </Typography>
                  </>
                )}
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => handleAddToCart(selectedProduct)}
                  sx={{ backgroundColor: '#28a745', '&:hover': { backgroundColor: '#218838' } }}
                >
                  Confirm
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      ) :  (
        <Grid container spacing={3} sx={{ justifyContent: 'center', width: '100%', maxWidth: 1200 }}>
          {products.map((product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={product.product_id}
              sx={{
                maxWidth: isSmallScreen ? '100%' : isMediumScreen ? '50%' : 'auto'
              }}
            >
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
                    <span style={{ fontWeight: 'bold', color: '#000' }}>MRP: </span>
                    <span style={{ color: '#ff0000', fontSize: "1.4rem", color: "green" }}>{product.offer.price}</span>
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() => handleAddToCart(product)}
                    sx={{ backgroundColor: '#28a745', '&:hover': { backgroundColor: '#218838' } }}
                  >
                    Confirm
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {appwriteProductIDs.length > 0 && (
        <Box
          sx={{
            mt: 2,
            display: 'none',
            justifyContent: 'center',
            width: '100%',
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
            p: 2
          }}
          ref={nextButtonRef}
        >
          <Button
            variant="contained"
            onClick={handleTotalCategory}
            sx={{ backgroundColor: '#007bff', '&:hover': { backgroundColor: '#0056b3' } }}
            style={{ padding: "10px 80px" }}
          >
            <Typography style={{ fontSize: "18px", marginRight: 20 }}>Next</Typography>
            <GrLinkNext style={{ fontSize: '23px', color: "#00356A" }} />
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProductListing;
