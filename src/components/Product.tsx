import {
  Box,
  Card,
  CardHeader,
  CircularProgress,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Rating,
  Chip
} from '@mui/material';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { IProduct } from '../models/IProduct';
import { useFetchAppProductQuery } from '../services/ProducService';
import StarIcon from '@mui/icons-material/Star';

interface IParams {
  id: string;
}

const Product: FC<IProduct> = () => {
  const { id } = useParams<IParams>();
  const { data: product, isLoading, error } = useFetchAppProductQuery(id);
  console.log(product);

  return (
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {error ? 'Sorry. Server is not responding...' : ''}
      {isLoading ? (
        <CircularProgress />
      ) : product ? (
        <Card sx={{ maxWidth: 545 }}>
          <CardHeader title={product.title} subheader={`${product.price}$`} />
          <CardMedia
            component="img"
            height="300"
            image={product.image}
            alt={product.title}
            sx={{ objectFit: 'scale-down' }}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Rating
              name="raiting"
              value={product.rating!.rate}
              readOnly
              precision={0.1}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <Chip label={`count: ${product.rating!.count}`} />
          </CardActions>
        </Card>
      ) : (
        ''
      )}
    </Box>
  );
};

export default Product;
