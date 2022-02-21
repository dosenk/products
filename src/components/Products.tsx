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
import Table from './modules/Table/Table';
import { navBtn, tableColumns } from './constants/constants';
import { IProduct } from '../models/IProduct';
import NavBtns from './modules/NavBtns';
import { IMenu } from '../models/IMenu';

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
  },
  buttons: {
    // marginRight: '5px',
    '& a': {
      color: '#fff',
      textDecoration: 'none'
    }
  },
  mainBox: {
    padding: '10px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  grid: {
    justifyContent: 'space-around',
    alignItems: 'baseline',
    height: 'calc(100% - 50px)',
    width: '100%'
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
  const [btns, setBtns] = useState<IMenu[]>(navBtn);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [tab, setTab] = React.useState(0);
  // const { products: publicProducts } = useAppSelector((state) => state.productReducer);
  const addedProducts = JSON.parse(localStorage.getItem('products') ?? '[]');
  // const [addedProducts, setAddedProducts] = useState(addedProducts ? JSON.parse(addedProducts) : []);
  // const a = useAppSelector((state) => state.productReducer.products);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const handleTableClick = (row: any) => {
    setSelectedProduct(row.original);
    const { id } = row.original;
    setBtns(
      btns.map((btn) =>
        btn.name !== 'add' ? { ...btn, disabled: false, link: `/products/edit/${id}` } : btn
      )
    );
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
    setSelectedProduct(null);
    setBtns(btns.map((btn) => (btn.name !== 'add' ? { ...btn, disabled: true } : btn)));
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
      <Box className={classes.mainBox}>
        <NavBtns classes={classes.buttons} navBtn={btns} />

        {tab === 0 ? (
          <Grid container item className={classes.grid}>
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
        ) : (
          <Box sx={{ width: '100%', marginLeft: '10px' }}>
            <Table
              columns={tableColumns}
              data={tab === 1 ? addedProducts : listProducts}
              onclick={handleTableClick}
              multipleSelector={false}
              //   selectedId={selectedId}
              sortBy={tableColumns[0].accessor}
              isLoading={isLoading}
              isSearch={false}
            />
          </Box>
        )}
      </Box>

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
          <Tab label="Published Products" {...a11yProps(2)} />
        </Tabs>
      </Box>
    </Box>
  );
};
export default Products;
