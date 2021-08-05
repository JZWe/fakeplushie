import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  CssBaseline,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from '@material-ui/core';

import useStyles from './styles';
import {
  Modal,
  Confirmation,
  AddressForm,
  PaymentForm,
} from '../../components';
import { commerce } from '../../lib/commerce';
import { useHistory } from 'react-router-dom';
const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ order, onCaptureCheckout, error }) => {
  const cart = useSelector((state) => state.cart);

  let history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const [modalProps, setModalProps] = useState({
    title: '',
    message: '',
    onConfirm: null,
  });

  const classes = useStyles();

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  // 等待資料進來
  useEffect(() => {
    if (order) {
      setIsLoading(false);
    }
  }, [order]);

  // 根據 cart.id 來觸發 sideEffect
  // 沒拿到 cart.id 會進入 catch block
  // 有拿到 cart.id 就可以設定 token
  useEffect(() => {
    const generateToken = async () => {
      if (!cart.id) {
        return;
      }

      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: 'cart',
        });
        setCheckoutToken(token);
      } catch (error) {
        console.log('error in Checkout');
      }
    };
    generateToken();

    return () => {};
  }, [cart.id]);

  const modalOnConfirm = useCallback(() => {
    history.push('/products');
  }, [history]);

  // 檢查購物車有沒有商品，沒商品就設定有錯誤發生，不能讓使用者操作 Form 上面的按鈕
  useEffect(() => {
    if (cart.total_items === 0) {
      setIsFormDisabled(true);
      setModalProps({
        title: 'ERROR, CART IS EMPTY !',
        message:
          'You should add some items into cart, click button on the modal or background to leave this page',
        onConfirm: modalOnConfirm,
      });
    }
  }, [cart.total_items, modalOnConfirm]);

  const Form = ({ isDisabled }) => {
    return activeStep === 0 ? (
      <>
        <AddressForm
          isDisabled={isDisabled}
          checkoutToken={checkoutToken}
          next={next}
        />
      </>
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        backStep={backStep}
        nextStep={nextStep}
        onCaptureCheckout={onCaptureCheckout}
      />
    );
  };

  return (
    <>
      {isFormDisabled && (
        <Modal
          title={modalProps.title}
          message={modalProps.message}
          onConfirm={modalProps.onConfirm}
        />
      )}
      {isLoading && <p>Loading....</p>}
      {!isLoading && (
        <>
          <CssBaseline />
          <div className={classes.toolbar} />
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography variant="h4" align="center">
                Checkout
              </Typography>
              <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map((step) => {
                  return (
                    <Step key={step}>
                      <StepLabel>{step}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <Confirmation order={order} error={error} />
              ) : (
                <Form isDisabled={isFormDisabled} />
              )}
            </Paper>
          </main>
        </>
      )}
    </>
  );
};

export default Checkout;
