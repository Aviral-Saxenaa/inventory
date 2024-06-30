import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Client, Query, Databases } from 'appwrite';

const Test = () => {

  useEffect(() => {
    const client = new Client();
    const databaseId = 'data-level-1';
    const collectionId = 'Shop_ItemsDB_testing';

    client
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('65773c8581b895f83d40');

    const databases = new Databases(client);

    databases
      .listDocuments(databaseId, collectionId, [
        Query.contains('ProductIDs', ['45.1','45.2']),
      ])
      .then((response) => {
        if (response.documents.length > 0) {
        //   setProduct(response.documents[0]);
          console.log(response.documents);
        }
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  }, []);

  
    return (
      <>
      <p>Hello</p>
      </>
  );
};

export default Test;