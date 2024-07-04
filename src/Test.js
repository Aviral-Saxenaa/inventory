import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Grid, Card, CardMedia, CardContent, Typography, CardActions } from '@mui/material';
import { Client, Databases, Query } from 'appwrite';
import { useNavigate, useLocation } from 'react-router-dom';
import { GrLinkNext } from "react-icons/gr";
import { useMediaQuery, useTheme } from '@mui/material';
import { FaArrowCircleRight } from "react-icons/fa";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [exist, setExist] = useState(false);
  const [appwriteProductDetails, setAppwriteProductDetails] = useState([]);
  const [appwriteProductIDs, setAppwriteProductIDs] = useState([]);
  const [isProductsFetchedFromAppwrite, setIsProductsFetchedFromAppwrite] = useState(false);
  const navigate = useNavigate();
  const nextButtonRef = useRef(null);
  const [isNext, setIsNext] = useState(false);

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
          Query.or([
            Query.contains('Product_Barcode', [barcodeName]),
            Query.search('Product_Name', barcodeName)
          ])
        ]
      );
      console.log('Appwrite check response:', response);

      if (response.documents.length > 0) {
        setExist(true);
        setIsProductsFetchedFromAppwrite(true); // Set to true when products are fetched from Appwrite

        // Process all matching documents
        const selectedProducts = response.documents.map((productData) => ({
          ProductID: productData.ProductID,
          Product_Name: productData.Product_Name,
          Product_Image: productData.Product_Image,
        }));

        // Set all selected products
        setSelectedProduct(selectedProducts);

        // Fetch attributes for each product
        selectedProducts.forEach((product) => fetchProductAttributes(product.ProductID));
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

        const extractValueByProductID = (array) => {
          const item = array.find(entry => entry.startsWith(`${productID}:`));
          return item ? item.split(':')[1] : null;
        };

        setAppwriteProductDetails((prevDetails) => [
          ...prevDetails,
          {
            ProductID: productID,
            Shop_Items_SP: extractValueByProductID(productDetails['Shop_Items-SP']),
            Shop_Items_MRP: extractValueByProductID(productDetails['Shop_Items-MRP']),
            Shop_Items_Weight: extractValueByProductID(productDetails['Shop_Items-Weight']),
          }
        ]);
      }
    } catch (error) {
      console.error('Error querying Appwrite for product attributes:', error);
    }
  };

  const handleSearch = async () => {
    setExist(false);
    setIsProductsFetchedFromAppwrite(false); // Set to false when products are fetched from the API
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

  const handleAddToCart = (product, id) => {
    setSelectedProduct([product]); // Set the selected product as an array

    setIsNext(true); // Show the next button

    if (id === 'API-ID') {
      console.log('API ID BUTTON');
      queryAppwriteProducts(product.product_title);
      console.log('Added to cart:', product.product_title);
    } else {
      console.log('APPWRITE ID BUTTON');
      queryAppwriteProducts(product.Product_Name);
      console.log('Added to cart:', product.Product_Name);
    }
    setIsProductsFetchedFromAppwrite(false); // Hide the "Doesn't Find Product" button
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
    let productTitle, productImage;

    if (Array.isArray(selectedProduct) && selectedProduct.length > 0) {
      productTitle = selectedProduct[0].product_title || selectedProduct[0].Product_Name;
      productImage = selectedProduct[0].product_photos ? selectedProduct[0].product_photos[0] : selectedProduct[0].Product_Image;
    } else {
      productTitle = selectedProduct.product_title || selectedProduct.Product_Name;
      productImage = selectedProduct.product_photos ? selectedProduct.product_photos[0] : selectedProduct.Product_Image;
    }

    // alert(productTitle);
    console.log('PRODUCT TITLE:', productTitle);
    console.log('PRODUCT IMAGE:', productImage);

    navigate('/total-category', {
      state: {
        productIDs: appwriteProductIDs,
        productTitle: productTitle,
        productImage: productImage,
      },
    });
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
      <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 'bold', mt: 4 }}>
        Add Similar Product
      </Typography>

      {exist ? (
        <Grid container spacing={3} sx={{ justifyContent: 'center', width: '100%', maxWidth: 1200 }}>
          {selectedProduct.map((product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={product.ProductID}
              sx={{
                maxWidth: isSmallScreen ? '100%' : isMediumScreen ? '50%' : 'auto'
              }}
            >
              <Card sx={{ maxWidth: 345, backgroundColor: '#fff', borderRadius: 2, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.Product_Image}
                  alt={product.Product_Name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div" sx={{ color: '#333', fontWeight: 'bold' }}>
                    {product.Product_Name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => handleAddToCart(product, 'APPWRITE-ID')}
                    variant="contained"
                    sx={{
                      backgroundColor: '#2196f3',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#1976d2',
                      }
                    }}
                  >
                    Confirm
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
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
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div" sx={{ color: '#333', fontWeight: 'bold' }}>
                    {product.product_title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => handleAddToCart(product, 'API-ID')}
                    variant="contained"
                    sx={{
                      backgroundColor: '#2196f3',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#1976d2',
                      }
                    }}
                  >
                    Confirm
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {isProductsFetchedFromAppwrite && (
        <Button
          onClick={handleSearch}
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: '#f44336',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#d32f2f',
            }
          }}
        >
          Doesn't Find Product
        </Button>
      )}

      {isNext && (
        <Button
          ref={nextButtonRef}
          onClick={handleTotalCategory}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-end',
            backgroundColor: '#2196f3',
            color: '#fff',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#1976d2',
            },
            mt: 2,
            mr: 2,
          }}
        >
          <FaArrowCircleRight size={40} />
        </Button>
      )}
    </Box>
  );
};

export default ProductListing;
