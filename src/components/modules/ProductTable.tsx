import React, { FC, useState } from 'react';
import { IProduct } from '../../models/IProduct';
import { Box } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { tableColumns } from '../constants/constants';
import Table from './Table/Table';

const ProductTable: FC = () => {
  const { products: publicProducts } = useAppSelector((state) => state.productReducer);
  const addedProducts = localStorage.getItem('products') ?? '';
  // const [addedProducts, setAddedProducts] = useState(addedProducts ? JSON.parse(addedProducts) : []);
  const a = useAppSelector((state) => state.productReducer.products);
  console.log(publicProducts, JSON.parse(addedProducts));
  return (
    <Box>
      <Table
        columns={tableColumns}
        data={publicProducts}
        //   skipPageReset={skipPageReset}
        //   resetPage={resetPage}
        onclick={() => {}}
        multipleSelector={false}
        //   selectedId={selectedId}
        sortBy={tableColumns[0].accessor}
        rowsPerPageOptions={[7]}
        isResetSelectedRow={false}
        isDescSortDirection={true}
        isLoading={false}
        isSearch={false}
      />
    </Box>
  );
};

export default ProductTable;
