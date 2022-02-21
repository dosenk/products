import React, { FC } from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { IMenu } from '../../models/IMenu';

interface INavBtns {
  classes: any;
  navBtn: IMenu[];
}

export const BackBtn = () => {
  return (
    <Button variant="contained" sx={{ position: 'absolute', left: '10px', top: '80px' }}>
      <NavLink style={{ textDecoration: 'none', color: '#fff' }} to={'/products'}>
        Back
      </NavLink>
    </Button>
  );
};

const NavBtns: FC<INavBtns> = ({ classes, navBtn }) => {
  return (
    <ButtonGroup
      variant="contained"
      orientation="vertical"
      aria-label="outlined button group"
      className={classes}
    >
      {navBtn.map((btn: any) => {
        return (
          <Button key={btn.name} disabled={btn.disabled}>
            <NavLink to={btn.link}>{btn.name}</NavLink>
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default NavBtns;
