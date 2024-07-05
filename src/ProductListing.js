import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Grid, Card, CardMedia, CardContent, Typography, CardActions, CircularProgress ,TextField, InputAdornment} from '@mui/material';
import { Client, Databases, Query } from 'appwrite';
import { useNavigate, useLocation } from 'react-router-dom';
import { GrLinkNext } from "react-icons/gr";
import { useMediaQuery, useTheme } from '@mui/material';
import { FaArrowCircleRight } from "react-icons/fa";
import './FontLoader.css'

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
        barcodeName:barcodeName,
      },
    });
  };

  useEffect(() => {
    handleCheck();
    console.log(barcodeName);
  }, []);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(530));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between(530, 790));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      
  

        backgroundColor: '#f5f5f5',
        minHeight: '100vh'
      }}
    >
   
   <div style={{
  color: '#fff',
  fontFamily: "DMSansSB",
  fontSize: 18,
  width: '100%',
  backgroundColor: '#000125',
  paddingTop: 20,
  paddingBottom: 20,
  paddingLeft: 10,
  position: 'fixed',
  top: 0,
  zIndex: 1000  // Ensures it's above other content
}}>
  SELECT  PRODUCT
</div>


      {isLoading ? ( // Render loading spinner while loading
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress color="error" size={90} thickness={4} /> {/* Update CircularProgress styling */}
      </Box>
      
      ) : exist ? (
        <Grid container spacing={0} sx={{ justifyContent: 'center', width: '100%', marginTop:10,backgroundColor:'transparent'
         }}>
  {selectedProduct.map((product) => (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      key={product.ProductID}
      sx={{
        display: 'flex',
        justifyContent: 'center', // Center align the Grid item horizontally
        maxWidth: isSmallScreen ? '100%' : isMediumScreen ?  '50%' : 'auto',
        marginBottom: 3, 
      }}
    >
      <Card sx={{ display: 'flex', width: '100%', backgroundColor: '#fff', borderRadius: 2.4, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', flexDirection: 'row',justifyContent:'flex-start' }}>
        <div style={{width:90,height:100}}>
          <CardMedia
            component="img"
            height="100"
            image={product.Product_Image}
            alt={product.Product_Name}
            sx={{ objectFit: 'contain',alignSelf:'flex-start',backgroundColor:'transparent',width:100,height:100,marginTop:2 }}
          />
      </div>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' ,width:'100%'}}>
          <Typography gutterBottom variant="h7" component="div" sx={{ color: '#333', textAlign: 'left',fontFamily:"DMSansSB",backgroundColor:'transparent',letterSpacing:-0.2 }}>
            {product.Product_Name}
          </Typography>
          {/* Conditionally render details only if fetched from Appwrite */}
          {isProductsFetchedFromAppwrite && (
            <>
            <div style={{display:'flex',flexDirection:'row'}}>
              <Box sx={{ textAlign: 'left', backgroundColor:'transparent',width:'60%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0' }}>
                      <Typography color="text.secondary" sx={{ fontSize: '1rem', marginTop: '0rem',backgroundColor:"#f5f6f8",borderRadius:1,paddingInline:2,color:"#212121" ,borderWidth:1,borderColor:"#ccc",borderStyle:"solid"}}>

                    {appwriteProductDetails.find(details => details.ProductID === product.ProductID)?.Shop_Items_Weight}
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem', marginTop: '0.2rem' }}>
                  <span style={{ color: 'black', fontSize: "1.2rem", marginRight: '.2rem',fontFamily:"DMSans" }}>
                    ₹{appwriteProductDetails.find(details => details.ProductID === product.ProductID)?.Shop_Items_SP}
                  </span>
                  <span style={{ color: 'grey', textDecoration: 'line-through' ,fontFamily:"DMSans"}}>₹{appwriteProductDetails.find(details => details.ProductID === product.ProductID)?.Shop_Items_MRP} </span>
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', marginTop: '0.5rem',display:'flex',flexDirection:'column',backgroundColor:"transparent",flex:1 }}>
                <div style={{flex:1,display:'flex'}}></div>
                <Button
                  size="medium"
                  // variant="contained"
                  sx={{
                    backgroundColor: '#4caf50',
                    color: '#fff',
                    fontFamily:"DMSansSB",
                    '&:hover': {
                      backgroundColor: '#388e3c',alignSelf:'flex-end',paddingLeft:5,paddingRight:5

                    },
                  }}
                  onClick={() => handleAddToCart(product, product.ProductID)}
                >
                  SELECT
                </Button>
              </Box>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>
      ) : (
        <Grid container spacing={0} sx={{ justifyContent: 'center', width: '100%', marginTop:10,backgroundColor:'transparent'
        }}>
          {products.map((product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={product.id}
              sx={{
                display: 'flex',
                justifyContent: 'center', // Center align the Grid item horizontally
                maxWidth: isSmallScreen ? '100%' : isMediumScreen ?  '50%' : 'auto',
                marginBottom: 3, 
              }}
            >
             <Card sx={{ display: 'flex', width: '100%', backgroundColor: '#fff', borderRadius: 2.4, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', flexDirection: 'row',justifyContent:'flex-start' }}>
             <div style={{width:90,height:100}}>
                <CardMedia
                  component="img"
                  height="100"
                  image={product.product_photos[0]}
                  alt={product.product_title}
                  sx={{ objectFit: 'contain',alignSelf:'flex-start',backgroundColor:'transparent',width:100,height:100,marginTop:0 }}
          />
                 </div>
                <CardContent>
                  <Typography gutterBottom variant="h7" component="div" sx={{ color: '#333', fontFamily:"DMSansB" }}>
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
                      fontFamily:"DMSansSB",
                      '&:hover': {
                        backgroundColor: '#388e3c',
                      },
                    }}
                    onClick={() => handleAddToCart(product, 'API-ID')}
                  >
                    SELECT
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
          sx={{ mt: 4, backgroundColor: '#C62828', color: '#fff',fontFamily:"DMSansB", borderRadius: 20, px: 4, '&:hover': { backgroundColor: '#e64a19' } }}
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
     sx={{
       mt: 4,
       backgroundColor: '#C62828',
       color: '#fff',
       borderRadius: 0,
      //  px: 4,
       fontFamily: "DMSansSB",
       position: 'fixed',
       bottom: 0,  // You can adjust this value as needed
       left: '50%',
       transform: 'translateX(-50%)',
       '&:hover': { backgroundColor: '#ff5722' },width:'100%',py:2
     }}
     onClick={handleSearch}
   >
     Didn't Find the Product?
     <FaArrowCircleRight style={{ fontSize: "28px", marginLeft: "1rem" }} />
   </Button>
   
      )}
    </Box>
  );
};

export default ProductListing;