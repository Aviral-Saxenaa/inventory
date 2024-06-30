import React from 'react';

const VariantDetails = ({ selectedVariant, variantImages, variantInfo }) => {
  return (
    <div style={{ backgroundColor: '#fbc02d', width: '80%', padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#fff', color: '#000', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', maxWidth: '600px', width: '25%' }}>
        {variantInfo.SP ? (
          <>
            <div style={{ display: 'flex', marginBottom: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <img src={variantImages[selectedVariant]} alt={`Variant ${selectedVariant}`} style={{ maxWidth: '150px', maxHeight: '150px', borderRadius: '8px', border: '1px solid #ddd' }} />
              </div>
              <div style={{ textAlign: 'right', marginLeft: '1rem' }}>
                <p style={{ margin: '0.5rem 0' }}><strong>SP:</strong> ₹{variantInfo.SP}</p>
                <p style={{ margin: '0.5rem 0' }}><strong>Variant ID:</strong> {variantInfo.Variant}</p>
                <p style={{ margin: '0.5rem 0' }}><strong>MRP:</strong> ₹{variantInfo.MRP}</p>
                <p style={{ margin: '0.5rem 0' }}><strong>Stocks:</strong> {variantInfo.Stocks}</p>
                <p style={{ margin: '0.5rem 0' }}><strong>Weight:</strong> {variantInfo.Weight}</p>
              </div>
            </div>
          </>
        ) : (
          <p style={{ textAlign: 'center', margin: '1rem 0' }}>No information available for this variant.</p>
        )}
      </div>
    </div>
  );
};

export default VariantDetails;
