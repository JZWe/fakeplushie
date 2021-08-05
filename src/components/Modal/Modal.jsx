import React from 'react';
import ReactDOM from 'react-dom';

import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Typography,
} from '@material-ui/core';

import classes from './Modal.module.css';
import useStyles from './styles';

const Backdrop = (props) => {
  const styles = useStyles();
  return <Box className={styles.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  const styles = useStyles();
  return (
    <Card className={classes.modal}>
      <CardHeader
        className={styles.header}
        variant="h1"
        title={props.title}
      ></CardHeader>
      <CardContent className={styles.content}>
        <Typography component="p">{props.message}</Typography>
      </CardContent>
      <CardActions className={styles.actions}>
        <Button variant="outlined" color="secondary" onClick={props.onConfirm}>
          Okay
        </Button>
      </CardActions>
    </Card>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById('overlay-root')
      )}
    </>
  );
};

export default Modal;
