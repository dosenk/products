import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { menu } from '../constants/constants';
import { IMenu } from '../../models/IMenu';
import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

export const navLinkStyle = makeStyles(() => ({
  navlinks: {
    textDecoration: 'none',
    marginRight: '15px',
    '&:hover': {
      opacity: 0.7
    }
  }
}));

const Header = () => {
  const classes = navLinkStyle();

  return (
    <AppBar position="static" className="header">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'flex', alignItems: 'center' }
            }}
          >
            {menu.map((page: IMenu) => (
              <NavLink className={classes.navlinks} key={page.name} to={page.link}>
                <Typography sx={{ color: 'white', textTransform: 'capitalize' }} textAlign="center">
                  {page.name}
                </Typography>
              </NavLink>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
