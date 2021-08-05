import React from 'react';
import {
  Typography,
  CircularProgress,
  Divider,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const Confirmation = ({ order, error }) => {
  const classes = useStyles();

  if (error) {
    return (
      <>
        <Typography variant="h5"></Typography>
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to Home
        </Button>
      </>
    );
  }

  // 檢查是否為空物件，是空物件的話表示還沒拿到資料，繼續 loading
  if (Object.entries(order).length === 0) {
    return (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  } else {
    const { customer, customer_reference } = order;
    const { firstname, lastname } = customer;

    return (
      <>
        <div>
          <Typography variant="h5">
            Thank you for your purchase, {firstname} {lastname}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">
            Order ref: {customer_reference}
          </Typography>
        </div>
        <br></br>
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to Home
        </Button>
      </>
    );
  }
};

export default Confirmation;
