import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCartQuantity, removeFromCart } from '../../actions';
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id, quantity } = item;
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const textFieldOnChange = (e) => {
    // 如果是非數字的字串 或是 為數字的字串但小於等於 0，不更新數值
    if (!+e.target.value) {
      return;
    }
    setItemQuantity(e.target.value);
  };

  const textFieldOnBlur = (e) => {
    if (+e.target.value < 0) {
      return;
    }
    if (itemQuantity !== +e.target.value) {
      dispatch(updateCartQuantity(id, itemQuantity));
    }
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        image={item.media.source}
        alt={item.name}
        className={classes.media}
      ></CardMedia>
      <CardContent className={classes.cardContent}>
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="h6">
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <div className={classes.inputField}>
          <TextField
            id="outlined-number"
            label="Amount"
            type="number"
            value={itemQuantity}
            variant="outlined"
            onChange={textFieldOnChange}
            onBlur={textFieldOnBlur}
          />
        </div>

        <div className={classes.buttons}>
          <Button
            className="removeButton"
            variant="contained"
            type="button"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => dispatch(removeFromCart(id))}
          >
            Remove
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default CartItem;
