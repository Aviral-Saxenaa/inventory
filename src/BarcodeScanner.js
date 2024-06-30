import React from 'react';

const BarcodeScanner = () => {
  return (
    <div style={styles.container}>
      <div style={styles.redBox}>
        <p style={styles.whiteText}>Enter the barcode image</p>
      </div>
      <div style={styles.orText}>
        <h1>OR</h1>
      </div>
      <div style={styles.inputContainer}>
        <input type="text" placeholder="Enter barcode" style={styles.input} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5'
  },
  redBox: {
    width: 500,
    height: 200,
    backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  whiteText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  orText: {
    marginVertical: 20
  },
  inputContainer: {
    width: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: '100%',
    padding: 10,
    fontSize: 16,
    border: '1px solid #ccc',
    borderRadius: 4
  }
};

export default BarcodeScanner;