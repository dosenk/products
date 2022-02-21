import { Box, TextField, Grid, Button, CircularProgress } from '@mui/material';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { saveProduct, useAddProductMutation } from '../services/ProducService';
import { productFormInputs } from './constants/constants';
import { IProduct } from '../models/IProduct';
import { IParams } from './Product';
import { useParams, RouteComponentProps } from 'react-router-dom';
import { BackBtn } from './modules/NavBtns';

const ProductForm = ({ history }: RouteComponentProps) => {
  const { id } = useParams<IParams>();
  const [product, setProduct] = useState<IProduct>({});
  const [productNotValidated, setProductNotValidated] = useState<IProduct>({});
  const [errors, setErrors] = useState(true);
  const [addProduct, { data: products, isLoading, error }] = useAddProductMutation();

  const validator = (value: string, pattern: string | undefined) => {
    if (pattern !== 'undefined') {
      const regExp = new RegExp(pattern as string);
      return regExp.test(value) ? value : 'error';
    }

    return value;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    name: string
  ) => {
    const { value, type, pattern } = e.target as HTMLInputElement;
    setProduct({ ...product, [name]: validator(value, pattern) });
    setProductNotValidated({ ...product, [name]: value });
  };

  const fieldValidator = useCallback(
    (field) => {
      return product[field as keyof IProduct] === 'error';
    },
    [product]
  );

  useEffect(() => {
    const keys: string[] = Object.keys(product).filter(
      (field) => field !== 'id' && field !== 'rating'
    );
    const allRequiredFilds: boolean = productFormInputs.length === keys.length;
    if (keys.some((key) => product[key as keyof IProduct] === 'error') || !allRequiredFilds) {
      setErrors(true);
      return;
    }
    setErrors(false);
  }, [product]);

  const handleSave = async () => {
    const res = await addProduct(product).unwrap();
    setProduct({});
    setProductNotValidated({});
    saveProduct(res, Number(id));
    if (id) history.goBack();
  };

  useEffect(() => {
    if (id) {
      const productsFromLocalStorage = JSON.parse(localStorage.getItem('products') ?? '[]')
        .filter((localStorageProduct: IProduct) => localStorageProduct.id === Number(id))
        .at(0);
      const serverProducts = JSON.parse(localStorage.getItem('serverProducts') ?? '[]')
        .filter((localStorageProduct: IProduct) => localStorageProduct.id === Number(id))
        .at(0);
      setProduct(productsFromLocalStorage ?? serverProducts);
      setProductNotValidated(productsFromLocalStorage ?? serverProducts);
    }
  }, [id]);

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
            const value = productNotValidated[input.name as keyof IProduct];
            return (
              <TextField
                value={value || ''}
                error={fieldValidator(input.name)}
                key={input.name}
                required
                label={input.name}
                fullWidth
                onChange={(e) => handleChange(e, input.name)}
                sx={{ marginBottom: '15px' }}
                multiline={!!input.multiline}
                rows={!!input.multiline ? input.multiline : 1}
                inputProps={{
                  pattern: `${input.pattern}`,
                  title: ''
                }}
              />
            );
          })}
          <Button
            disabled={errors}
            variant="contained"
            sx={{ float: 'right' }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      )}
    </Grid>
  );
};

export default ProductForm;
