import React from 'react';

const VariantList = ({ variantImages, handleVariantClick }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#388e3c',
        width: '20%',
        overflowY: 'auto',
        alignItems: 'center',
        padding: '1rem 0',
      }}
    >
      {Object.keys(variantImages).map((id) => (
        <div
          key={id}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '100%',
            maxHeight: '140px',
            marginBottom: '1rem',
            borderRadius: '4px',
            cursor: 'pointer',
            padding: '0.5rem',
          }}
          onClick={() => handleVariantClick(id)}
        >
          <img src={variantImages[id]} alt={`Variant ${id}`} style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </div>
      ))}
    </div>
  );
};

export default VariantList;
