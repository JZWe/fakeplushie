import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Button,
  Typography,
} from '@material-ui/core';

import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/azurlane.png';
import { Link, NavLink } from 'react-router-dom';

import useStyles from './styles';
import NavbarClasses from './Navbar.module.css';

const Navbar = ({ totalItem }) => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            <img
              src={logo}
              alt="Commerce.js"
              height="25px"
              className={classes.image}
            />
            Fake Plushie shop
          </Typography>
          <div className={classes.grow} />

          <div className={NavbarClasses['links-container']}>
            <Button
              component={NavLink}
              to="/"
              exact
              activeClassName={NavbarClasses.activeLink}
              color="inherit"
            >
              Home
            </Button>

            <Button
              component={NavLink}
              to="/products"
              exact
              activeClassName={NavbarClasses.activeLink}
              color="inherit"
            >
              PRODUCTS
            </Button>

            <IconButton
              component={Link}
              to="/cart"
              aria-label="Show cart items"
              color="inherit"
            >
              <Badge badgeContent={totalItem} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
