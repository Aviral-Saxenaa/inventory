// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ProductListing from './ProductListing';
import BarcodeScanner from './BarcodeScanner';
import TotalCategory from './TotalCategory';
import Test from './Test';

// Define route configuration
const routes = [
  { path: '/barcode-scanner', element: <BarcodeScanner />, label: 'Barcode Scanner' },
  { path: '/product-listing', element: <ProductListing />, label: 'Product Listing' },
  { path: '/total-category', element: <TotalCategory />, label: 'Total Category' },
  { path: '/test', element: <Test />, label: 'Test' },
];

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {routes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Routes>
      </Router>
    </>
  );
};

export default App;
