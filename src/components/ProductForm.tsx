import { Box, TextField, Grid, Button } from '@mui/material';
import React, { ChangeEvent, useState, useEffect } from 'react';
import { useAddProductMutation } from '../services/ProducService';
import { productFormInputs } from './constants/constants';
import { FileInput } from './modules/FileInput';
import { IProduct } from '../models/IProduct';

const ProductForm = () => {
  const [product, setProduct] = useState<IProduct>({});
  const [errors, setErrors] = useState(false);
  const [addProduct, {}] = useAddProductMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const { value, type, files } = e.target;
    setProduct({ ...product, [name]: type === 'file' ? files?[0].name : value });
  };

  const handleSave = async () => {
    const res = await addProduct(product);
    console.log(res);
    console.log(product);
  };

  useEffect(() => {}, [product]);

  return (
    <Grid
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
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
    </Grid>
  );
};

export default ProductForm;
