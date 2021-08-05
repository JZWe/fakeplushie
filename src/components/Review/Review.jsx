import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

const renderProducts = (line_items) => {
  return line_items.map((product) => (
    <ListItem style={{ padding: '10px 0' }} key={product.name}>
      <ListItemText
        primary={product.name}
        secondary={`Quantity: ${product.quantity}`}
      />
      <Typography variant="body2">
        {product.line_total.formatted_with_symbol}
      </Typography>
    </ListItem>
  ));
};

const Review = ({ checkoutToken }) => {
  const { line_items, subtotal } = checkoutToken.live;
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {renderProducts(line_items)}
        <ListItem style={{ padding: '10px 0' }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {subtotal.formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;
