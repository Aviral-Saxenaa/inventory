import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Client, Databases, Query } from 'appwrite';
import ProductSelector from './ProductSelector';
import VariantList from './VariantList';
import VariantDetails from './VariantDetails';
import NewProduct from './NewProduct';
import NewProductType from './NewProductType'; // Import NewProductType component
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress from Material-UI
import { Sheet } from 'react-modal-sheet';
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { RxLetterSpacing } from 'react-icons/rx';
const TotalCategory = () => {
    const location = useLocation();
    const { productIDs, productTitle, productImage,barcodeName } = location.state || {};
    const navigate = useNavigate(); // Corre
    const [loading, setLoading] = useState(true); // State to track loading state
    const [productImages, setProductImages] = useState({});
    const [variantImages, setVariantImages] = useState({});
    const [variantNames, setVariantNames] = useState({});
    const [variantWeights, setVariantWeights] = useState({});
    const [selectedProductID, setSelectedProductID] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [variantInfo, setVariantInfo] = useState({});
    const [documents, setDocuments] = useState([]);
    const [showAddScreenType, setShowAddScreenType] = useState(null); // State to track which add screen to show
    const [uniqueProductIDs, setUniqueProductIDs] = useState([]); // State to store uniqueProductIDs
    const [isOpen, setOpen] = useState(false);
    const [variantListMessage, setVariantListMessage] = useState('');


    const handleShowAddScreen = (type) => {

        // if(type==='variant'){
            setOpen(true);
        // }

        setShowAddScreenType(type); // Set the type of add screen to show
    };

    const handleClick = () => {
        navigate('/'); // Use navigate to go to a different route
      };


    useEffect(() => {
        const client = new Client();
        const databases = new Databases(client);
        const databaseId = 'data-level-1';
        const collectionId = '664f1ca60037dad0be9c';

        client.setEndpoint('https://cloud.appwrite.io/v1').setProject('65773c8581b895f83d40');

        const fetchProductImages = async () => {
            const uniqueProductIDs = Array.from(new Set(productIDs.map((id) => parseInt(id.split('.')[0]))));
            console.log('Unique Product IDs:', uniqueProductIDs); // Log uniqueProductIDs
            setUniqueProductIDs(uniqueProductIDs); // Store uniqueProductIDs in state

            const promises = uniqueProductIDs.map(async (id) => {
                try {
                    const response = await databases.listDocuments(databaseId, collectionId, [
                        Query.equal('ProductID', `${id}.1`),
                    ]);
                    if (response.documents.length > 0) {
                        const { Product_Image, ProductName } = response.documents[0];
                        return { [id]: { image: Product_Image, name: ProductName } };
                    }
                } catch (error) {
                    console.error(`Error fetching product image from collection ${collectionId}:`, error);
                }
                return { [id]: { image: null, name: null } };
            });

            const results = await Promise.all(promises);
            const productData = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
            setProductImages(productData);
            setSelectedProductID(uniqueProductIDs[0]);
            setSelectedVariant(`${uniqueProductIDs[0]}.1`);
            setLoading(false); // Set loading state to false once data is fetched
        };

        if (productIDs) {
            fetchProductImages();
        }
    }, [productIDs]);

    useEffect(() => {
        console.log(barcodeName)
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
                    const names = response.documents.reduce((acc, doc) => {
                        if (doc.ProductName) {
                            acc[doc.ProductID] = doc.ProductName;
                        }
                        return acc;
                    }, {});
                    setVariantImages(images);
                    setVariantNames(names);
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
                
                const weights = response.documents.reduce((acc, doc) => {
                    doc['Shop_Items-Weight'].forEach(item => {
                        const [variant, weight] = item.split(':');
                        acc[variant] = weight;
                    });
                    return acc;
                }, {});
                setVariantWeights(weights);
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };

        if (productIDs) {
            fetchDocuments();
        }
    }, [productIDs]);

    const handleVariantClick = (variant) => {
        setOpen(true)
        setSelectedVariant(variant);
        setShowAddScreenType(null); // Reset add screen type when variant is clicked
    
        const prioritizeDocuments = (documents) => {
            return documents.sort((a, b) => {
                return b.SHOP_ID - a.SHOP_ID;
            });
        };
    
        const prioritizedDocuments = prioritizeDocuments(documents);
    
        let foundItemInfo = null;
    
        for (const shopItem of prioritizedDocuments) {
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
    
            if (itemInfo.SP || itemInfo.Stocks || itemInfo.MRP || itemInfo.Weight) {
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

    if (!productIDs || loading) {
        return (
            <div style={styles.loadingContainer}>
                <h2 style={styles.heading}>Total Category</h2>
                <CircularProgress style={{ color: '#2196f3' }} /> {/* Display a CircularProgress */}
            </div>
        );
    }

    return (
        <>
        <div style={styles.topbar}>
        <IoArrowBack 
          style={styles.backButton} 
          onClick={handleClick} 
          size={23} // Adjust icon size as needed 
        />
        <div style={{...styles.title,letterSpacing:0.5,marginLeft:2}}>Select Product</div>
      </div>
        <div style={styles.container}>
        
            <ProductSelector
                productImages={productImages}
                productNames={Object.fromEntries(Object.entries(productImages).map(([id, data]) => [id, data.name]))}
                setSelectedProductID={setSelectedProductID}
                setSelectedVariant={setSelectedVariant}
                handleButtonClick={() => handleShowAddScreen('type')}
            />
            <div style={styles.mainContent}>
                <VariantList
                    variantImages={variantImages}
                    variantNames={variantNames}
                    variantWeights={variantWeights}
                    handleVariantClick={handleVariantClick}
                    handleButtonClick={() => handleShowAddScreen('variant')}
                />
                {showAddScreenType === 'type' ? (
                    <NewProductType
                        productTitle={productTitle}
                        productImage={productImage}
                        variantWeights={variantWeights}
                        uniqueProductIDs={uniqueProductIDs} 
                        barcodeName={barcodeName}
                        // productImages={productImages}
                    />
                ) : showAddScreenType === 'variant' ? (
                    <NewProduct
                        productTitle={productTitle}
                        productImage={productImage}
                        variantWeights={variantWeights}
                        selectedProductID={selectedProductID} 
                        barcodeName={barcodeName}
                        // variantImages={variantImages}
                        // uniqueProductIDs={uniqueProductIDs} // Pass uniqueProductIDs to NewProduct
                        // productImages={productImages}
                    />
                ) : (
                    <VariantDetails
                        selectedVariant={selectedVariant}
                        variantImages={variantImages}
                        variantInfo={variantInfo}
                        variantName={variantNames[selectedVariant]}
                        variantWeights={variantWeights}
                        open={false}
                        barcodeName={barcodeName}
                        
                    />
                )}

<Sheet isOpen={isOpen}  snapPoints={[0.7]} onClose={() => setOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
    
          
          {showAddScreenType === 'type' ? (
                    <NewProductType
                        productTitle={productTitle}
                        productImage={productImage}
                        variantWeights={variantWeights}
                        uniqueProductIDs={uniqueProductIDs} 
                        open={true}
                        barcodeName={barcodeName}
                        // productImages={productImages}
                    />
                ) : showAddScreenType === 'variant' ? (
                    <NewProduct
                        productTitle={productTitle}
                        productImage={productImage}
                        variantWeights={variantWeights}
                        selectedProductID={selectedProductID} 
                        open={true}
                        barcodeName={barcodeName}
                        // variantImages={variantImages}
                        // uniqueProductIDs={uniqueProductIDs} // Pass uniqueProductIDs to NewProduct
                        // productImages={productImages}
                    />
                ) : (
                    <VariantDetails
                        selectedVariant={selectedVariant}
                        variantImages={variantImages}
                        variantInfo={variantInfo}
                        variantName={variantNames[selectedVariant]}
                        variantWeights={variantWeights}
                        open={true}
                        barcodeName={barcodeName}
                        
                    />
                )}
            
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
            </div>
        </div>
        
      </>
    );
};

const styles = {
    topbar: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#1a1c1e',
        padding: 0, // Remove default padding
        paddingHorizontal: '0.2rem',
paddingTop:'1rem',
paddingBottom:'1rem',        color: '#fff',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        position: 'fixed', // Fix the topbar to the top
        top: 0, 
        left: 0,
        width: '100%', // Make it span the full width
        zIndex: 100 // Ensure it stays on top of other elements
        
      },
      backButton: {
        cursor: 'pointer',
        marginRight: '0.5rem',
        fontSize: '1rem', 
        marginLeft: '0.3rem'  // Add left margin to move the icon 
      },
      title: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        fontFamily: 'DMSans',
      },
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#00356A',
        color: '#fff',
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
    },
    heading: {
        color: '#333',
    },
    loadingText: {
        color: '#666',
        marginTop: '1rem',
    },
    mainContent: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
    },
};

export default TotalCategory;
