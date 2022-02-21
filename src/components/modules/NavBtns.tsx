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
    <NavLink style={{ textDecoration: 'none', color: '#fff' }} to={'/products'}>
      <Button variant="contained" sx={{ position: 'absolute', left: '10px', top: '80px' }}>
        Back
      </Button>
    </NavLink>
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
          <Button key={btn.name} disabled={btn.disabled} sx={{ padding: '0px' }}>
            <NavLink to={btn.link} style={{ padding: '6px 16px', width: '100%' }}>
              {btn.name}
            </NavLink>
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default NavBtns;
