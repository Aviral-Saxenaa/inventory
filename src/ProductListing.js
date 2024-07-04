import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Grid, Card, CardMedia, CardContent, Typography, CardActions, CircularProgress ,TextField, InputAdornment} from '@mui/material';
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
  const [isLoading, setIsLoading] = useState(false); // New loading state
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
    setIsLoading(true); // Start loading

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
        setIsProductsFetchedFromAppwrite(true);

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
    } finally {
      setIsLoading(false); // Stop loading
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
    setIsLoading(true); // Start loading
    setExist(false);
    setIsProductsFetchedFromAppwrite(false);
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
    } finally {
      setIsLoading(false); // Stop loading
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
    setIsProductsFetchedFromAppwrite(false);
    if (nextButtonRef.current) {
      nextButtonRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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

      {isLoading ? ( // Render loading spinner while loading
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress color="error" size={90} thickness={4} /> {/* Update CircularProgress styling */}
      </Box>
      
      ) : exist ? (
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
              <Card sx={{ display: 'flex', maxWidth: 345, backgroundColor: '#fff', borderRadius: 2.4, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', flexDirection: 'row' }}>
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: 100 }}>
    <CardMedia
      component="img"
      height="100"
      image={product.Product_Image}
      alt={product.Product_Name}
      sx={{ objectFit: 'contain' }}
    />
  </Box>
  <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <Typography gutterBottom variant="h7" component="div" sx={{ color: '#333', fontWeight: 'bold', textAlign: 'left' }}>
      {product.Product_Name}
    </Typography>
    {/* Conditionally render details only if fetched from Appwrite */}
    {isProductsFetchedFromAppwrite && (
      <>
        <Box sx={{ textAlign: 'left', marginBottom: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <TextField
              value={appwriteProductDetails.find(details => details.ProductID === product.ProductID)?.Shop_Items_Weight}
              variant="outlined"
              size="small"
              sx={{ width: 80 }}
              
            />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem',marginTop:'1rem' }}>
          <span style={{ color: 'black', fontSize: '1rem', fontSize: "1.2rem",marginRight:'.2rem' }}>
              ₹{appwriteProductDetails.find(details => details.ProductID === product.ProductID)?.Shop_Items_SP}
            </span>
            <span style={{  color: 'grey',textDecoration: 'line-through' }}>₹{appwriteProductDetails.find(details => details.ProductID === product.ProductID)?.Shop_Items_MRP} </span>
            
          </Typography>
          
          
        </Box>
        <Box sx={{ textAlign: 'center',marginTop:'2rem' }}>
          <Button
            size="medium"
            variant="contained"
            sx={{
              backgroundColor: '#4caf50',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#388e3c',
              },
            }}
            onClick={() => handleAddToCart(product, product.ProductID)}
          >
            Confirm
          </Button>
        </Box>
      </>
    )}
  </CardContent>
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
              key={product.id}
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
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button
                    size="medium"
                    variant="contained"
                    sx={{
                      backgroundColor: '#4caf50',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#388e3c',
                      },
                    }}
                    onClick={() => handleAddToCart(product, 'API-ID')}
                  >
                    Confirm
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {isNext && (
        <Button
          ref={nextButtonRef}
          variant="contained"
          size="large"
          sx={{ mt: 4, backgroundColor: '#C62828', color: '#fff', borderRadius: 20, px: 4, '&:hover': { backgroundColor: '#e64a19' } }}
          onClick={handleTotalCategory}
        >
          Next
          <GrLinkNext style={{ marginRight: '10px',marginLeft:"1rem" }} />
        </Button>
      )}

      {isProductsFetchedFromAppwrite && (
        <Button
          variant="contained"
          size="large"
          sx={{ mt: 4, backgroundColor: '#C62828', color: '#fff', borderRadius: 20, px: 4, '&:hover': { backgroundColor: '#ff5722' } }}
          onClick={handleSearch}
        >
          Didn't Find the Product ?
          <FaArrowCircleRight style={{fontSize:"28px",marginLeft:"1rem"}} />
        </Button>
      )}
    </Box>
  );
};

export default ProductListing;
