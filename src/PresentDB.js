import React from 'react';

const ProductCard = () => {
  const cardStyle = {
    display: 'flex',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    margin: '10px',
    width: '300px',
  };

  const imageStyle = {
    width: '60%',
    objectFit: 'cover',
    height:"50%"
  };

  const detailsStyle = {
    padding: '10px',
    width: '60%',
  };

  const titleStyle = {
    fontSize: '1.2em',
    marginBottom: '10px',
  };

  const priceStyle = {
    color: '#888',
    marginBottom: '10px',
  };

  const weightStyle = {
    color: '#555',
  };

  // Default values
  const image = "https://i5.walmartimages.com/asr/cf16c90d-f4ae-4d5e-acfc-50840ce4a99b_1.30e4c19f0aa1564bcee2ba96d5a5b9e9.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff";
  const title = "Dortitod chips Dortitod chipsDortitod chipsDortitod chips ";
  const mrp = "1000";
  const sp = "900";
  const weight = "500g";

  return (
    <div style={cardStyle}>
      <div style={imageStyle}>
        <img src={image} alt={title} style={{ width: '100%', height: '100%' }} />
      </div>
      <div style={detailsStyle}>
        <h2 style={titleStyle}>{title}</h2>
        <p style={priceStyle}>MRP: {mrp}</p>
        <p style={priceStyle}>SP: {sp}</p>
        <p style={weightStyle}>Weight: {weight}</p>
      </div>
    </div>
  );
};

export default ProductCard;
