import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductListing from './ProductListing';
import NewInventory from './NewInventory';
import BarcodeScanner from './BarcodeScanner';
import ProductCard from './PresentDB';
import EstimatedProduct from './EstimatedProduct';
import TotalCategory from './TotalCategory';
import Test from './Test';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/barcode-scanner" element={<BarcodeScanner />} />
        <Route path="/product-listing" element={<ProductListing />} />
        <Route path="/new-inventory" element={<NewInventory />} />
        <Route path="/presentdb" element={< ProductCard/>} />
        <Route path="/estimatedpr" element={< EstimatedProduct/>} />
        <Route path="/total-category" element={<TotalCategory />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
};

export default App;