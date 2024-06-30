import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Pages
import ProductListing from './ProductListing';
import NewInventory from './NewInventory';
import BarcodeScanner from './BarcodeScanner';
import ProductCard from './PresentDB';
import EstimatedProduct from './EstimatedProduct';
import TotalCategory from './TotalCategory';
import Test from './Test';

// Define route configuration
const routes = [
  { path: '/barcode-scanner', element: <BarcodeScanner />, label: 'Barcode Scanner' },
  { path: '/product-listing', element: <ProductListing />, label: 'Product Listing' },
  { path: '/new-inventory', element: <NewInventory />, label: 'New Inventory' },
  { path: '/presentdb', element: <ProductCard />, label: 'Present DB' },
  { path: '/estimatedpr', element: <EstimatedProduct />, label: 'Estimated Product' },
  { path: '/total-category', element: <TotalCategory />, label: 'Total Category' },
  { path: '/test', element: <Test />, label: 'Test' },
];

const App = () => {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
