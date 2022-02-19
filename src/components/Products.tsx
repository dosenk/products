import { Box, CircularProgress, Grid, TablePagination } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useMemo, useState } from 'react';
import { useFetchAppProductsQuery } from '../services/ProducService';
import { sliceProduct } from '../utils/utils';
import MediaCard from './MediaCard';

const useStyles = makeStyles(() => ({
  paginator: {
    position: 'absolute',
    height: '55px',
    bottom: 0,
    right: 0
  }
}));

const Products = () => {
  const classes = useStyles();
  const { data: products, isLoading, error } = useFetchAppProductsQuery('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const listProducts = useMemo(
    () => sliceProduct(products, page, rowsPerPage),
    [page, rowsPerPage, products]
  );

  return (
    <Box sx={{ height: '100%' }}>
      <Grid
        container
        item
        justifyContent="space-around"
        alignItems="center"
        height="calc(100% - 55px)"
        fontSize={15}
      >
        {isLoading ? <CircularProgress /> : ''}
        {listProducts?.map((product) => (
          <MediaCard key={product.title} product={product} />
        ))}
        {error ? 'Sorry. Server is not responding...' : ''}
      </Grid>
      <TablePagination
        className={classes.paginator}
        SelectProps={{ disabled: isLoading || !products?.length }}
        component="div"
        count={products?.length || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Items per page:"
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[8, 16, 20]}
      />
    </Box>
  );
};
export default Products;
