import React, { FC } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { IMenu } from '../../models/IMenu';

interface INavBtns {
  classes: any;
  navBtn: IMenu[];
  actions: any;
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

const NavBtns: FC<INavBtns> = ({ classes, navBtn, actions }) => {
  return (
    <ButtonGroup
      variant="contained"
      orientation="vertical"
      aria-label="outlined button group"
      className={classes}
    >
      {navBtn.map((btn: any) => {
        return (
          <Button
            key={btn.name}
            disabled={btn.disabled}
            sx={{ padding: btn.link ? '0px' : '6px 16px' }}
            onClick={async (e) => {
              e.preventDefault();
              if (btn.action) await actions[btn.action]();
            }}
          >
            {btn.link ? (
              <NavLink to={btn.link} style={{ padding: '6px 16px', width: '100%' }}>
                {btn.name}
              </NavLink>
            ) : (
              btn.name
            )}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default NavBtns;
