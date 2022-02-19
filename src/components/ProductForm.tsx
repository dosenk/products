import { Box, TextField, Grid, Button } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { productFormInputs } from './constants/constants';
import { FileInput } from './modules/FileInput';

const ProductForm = () => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>,
    name: string
  ) => {
    const { value, type, files } = e.target;
    setProduct({ ...product, [name]: type === 'file' ? files[0].name : value });
  };

  const handleSave = () => {
    console.log(product);
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
              error={error}
              setError={setError}
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
