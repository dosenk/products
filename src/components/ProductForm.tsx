import { Box, TextField, Grid, Button, CircularProgress } from '@mui/material';
import React, { FC, useState } from 'react';
import { saveProduct, useAddProductMutation } from '../services/ProducService';
import { productFormInputs } from './constants/constants';
import { FileInput } from './modules/FileInput';
import { IProduct } from '../models/IProduct';
import { useAppDispatch } from '../hooks/redux';
import { useParams } from 'react-router-dom';
import { IParams } from './Product';
import { BackBtn } from './modules/NavBtns';

const ProductForm = () => {
  const { id } = useParams<IParams>();
  console.log(id);
  const [product, setProduct] = useState<IProduct>({});
  const [errors, setErrors] = useState(false);
  const [addProduct, { data: products, isLoading, error }] = useAddProductMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    name: string
  ) => {
    const { value, type } = e.target; // e.target.files
    const image = 'https://i.pravatar.cc'; // files[0] - img
    setProduct({ ...product, [name]: type === 'file' ? image : value });
  };

  const handleSave = async () => {
    const res = await addProduct(product).unwrap();
    setProduct({});
    saveProduct(res);
  };

  return (
    <Grid
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <BackBtn />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ width: '500px' }} component="form">
          {productFormInputs.map((input) => {
            return input.type === 'text' ? (
              <TextField
                key={input.name}
                required
                label={input.name}
                fullWidth
                onChange={(e) => handleChange(e, input.name)}
                sx={{ marginBottom: '15px' }}
                multiline={!!input.multiline}
                rows={!!input.multiline ? input.multiline : 1}
              />
            ) : (
              <FileInput
                key={input.name}
                {...input}
                errors={errors}
                setErrors={setErrors}
                handleChange={handleChange}
              />
            );
          })}
          <Button variant="contained" sx={{ float: 'right' }} onClick={handleSave}>
            Save
          </Button>
        </Box>
      )}
    </Grid>
  );
};

export default ProductForm;
