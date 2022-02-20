import React from 'react';
import { navBtn } from '../constants/constants';
import { Box, Button, ButtonGroup } from '@mui/material';
import { NavLink } from 'react-router-dom';

const NavBtns = ({ classes }: any) => {
  return (
    <ButtonGroup
      variant="contained"
      orientation="vertical"
      aria-label="outlined button group"
      className={classes}
    >
      {navBtn.map((btn) => {
        return (
          <Button>
            <NavLink to={btn.link}>{btn.name}</NavLink>
          </Button>
        );
      })}
    </ButtonGroup>
  );
};
// <Button disabled={!selectedProduct}>
//     <NavLink to={`/products/edit/${selectedProduct?.id ?? ''}`}>Edit</NavLink>
// </Button>

export default NavBtns;
