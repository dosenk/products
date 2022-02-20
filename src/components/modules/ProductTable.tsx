import React, { FC, useState } from 'react';
import { IProduct } from '../../models/IProduct';
import { Box } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';

const ProductTable: FC = () => {
  const { products: publicProducts } = useAppSelector((state) => state.productReducer);
  const addedProducts = localStorage.getItem('products') ?? '';
  // const [addedProducts, setAddedProducts] = useState(addedProducts ? JSON.parse(addedProducts) : []);
  const a = useAppSelector((state) => state.productReducer.products);
  console.log(publicProducts, JSON.parse(addedProducts));
  return (
    <Box>
      <Table />
    </Box>
  );
};

export default ProductTable;
