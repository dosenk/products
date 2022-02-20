import { Box, CircularProgress, Grid, TablePagination } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useMemo, useState } from 'react';
import { useFetchAppProductsQuery } from '../services/ProducService';
import { sliceProduct } from '../utils/utils';
import MediaCard from './modules/MediaCard';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import ProductTable from './modules/ProductTable';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addProducts } from '../store/reducers/ProductSlice';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const useStyles = makeStyles(() => ({
  paginator: {
    backgroundColor: '#fff',
    position: 'absolute',
    height: '55px',
    width: '100%',
    bottom: 0,
    right: 0
  }
}));

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const Products = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { data: products, isLoading, error } = useFetchAppProductsQuery('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [tab, setTab] = React.useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

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

  useEffect(() => {
    dispatch(addProducts(products));
  }, [products]);

  return (
    <Box>
      <TabPanel value={tab} index={0}>
        <Grid
          container
          item
          justifyContent="space-around"
          alignItems="baseline"
          height="calc(100% - 55px)"
        >
          {isLoading ? (
            <CircularProgress
              sx={{ position: 'absolute', top: '50%', transform: 'translate(0,-50%)' }}
            />
          ) : (
            ''
          )}
          {listProducts?.map((product) => (
            <MediaCard key={product.title} product={product} />
          ))}
          {error ? 'Sorry. Server is not responding...' : ''}
        </Grid>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <ProductTable />
      </TabPanel>
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
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          position: 'absolute',
          left: '20px',
          bottom: '5px'
        }}
      >
        <Tabs value={tab} onChange={handleChangeTab} aria-label="basic tabs example">
          <Tab label="Products" {...a11yProps(0)} />
          <Tab label="Created Products" {...a11yProps(1)} />
        </Tabs>
      </Box>
    </Box>
  );
};
export default Products;
