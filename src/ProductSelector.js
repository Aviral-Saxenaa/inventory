import React from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const ProductSelector = ({ productImages, setSelectedProductID, setSelectedVariant ,handleButtonClick}) => {
        const navigate = useNavigate();

        // const handleButtonClick = () => {
        //         // Navigate to TotalCategory and pass productIDs as state
        //         const newModal=true;
        //         navigate('/total-category', { state: { newModal } });
        //       };
            
  return (
    <div
      style={{
        backgroundColor: '#d32f2f',
        height: '20%',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1rem',
        overflowX: 'auto',
      }}
    >
      {Object.keys(productImages).map((id) => (
        <div
          key={id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: '1rem',
            marginLeft: '1rem',
            cursor: 'pointer',
          }}
          onClick={() => {
            setSelectedProductID(id);
            setSelectedVariant(`${id}.1`);
          }}
        >
          <img
            src={productImages[id]}
            alt={`Product ${id}`}
            style={{ maxWidth: '150px', maxHeight: '150px', marginBottom: '0.5rem' }}
          />
          <p style={{ fontSize: '0.875rem', marginBottom: 0 }}>{`${id}.1`}</p>
        </div>
      ))}
      <IoIosAddCircle
        style={{ color: '#4CAF50', fontSize: '4rem', cursor: 'pointer' }}
        onClick={handleButtonClick}
      />
    </div>
  );
};

export default ProductSelector;
