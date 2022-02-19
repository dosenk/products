import { Grid } from '@mui/material';
import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
const Products = lazy(() => import('./Products'));
const Product = lazy(() => import('./Product'));
const Routes = () => {
  return (
    <Grid className="routes">
      <Suspense fallback="">
        <Switch>
          <Route path="/products" exact component={Products} />
          <Route path="/product/:id" component={Product} />
          <Route exact path="*">
            <Redirect to="/products" />
          </Route>
        </Switch>
      </Suspense>
    </Grid>
  );
};

export default Routes;
