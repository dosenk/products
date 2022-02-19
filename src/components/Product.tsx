import { Box, CircularProgress, Grid } from '@mui/material';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { IProduct } from '../models/IProduct';
import { useFethAppProductQuery } from '../services/ProducService';

interface IParams {
  id: string;
}

const Product: FC<IProduct> = () => {
  const { id } = useParams<IParams>();
  const { data: products, isLoading, error } = useFethAppProductQuery(id);

  return (
    <Box>
      <Grid>
        {isLoading ? <CircularProgress /> : ''}
        {products ? <Box>{products.category}</Box> : ''}
        {error ? 'Sorry. Server is not responding...' : ''}
      </Grid>
    </Box>
  );
};

export default Product;
