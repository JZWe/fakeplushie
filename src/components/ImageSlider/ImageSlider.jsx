import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Box, Typography, Button } from '@material-ui/core';

import useStyles from './styles';

const ImageSlider = ({ slides }) => {
  const history = useHistory();
  const [current, setCurrent] = useState(0);
  const { length } = slides;
  const classes = useStyles();

  useEffect(() => {
    const intervalID = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearInterval(intervalID);
    };
  });

  if (!Array.isArray(slides) || slides.length <= 0) return null;

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));

  const moveToProductsPage = () => {
    history.push('/products');
  };

  const renderSlides = () => {
    return slides.map((slide, index) => {
      return (
        <Box
          className={
            current === index
              ? `${classes.slide} ${classes['slide-active']}`
              : classes['slide']
          }
          key={index}
          style={
            current === index
              ? {
                  backgroundImage: `url(${slide})`,
                }
              : null
          }
        >
          <Box className={classes.colorOverlay} />
        </Box>
      );
    });
  };

  const renderDots = () => {
    const dots = Array.from({ length }).map((item, index) => (
      <Box
        onClick={() => setCurrent(index)}
        key={index}
        className={
          current === index
            ? `${classes.dot} ${classes['dot-active']}`
            : classes.dot
        }
      ></Box>
    ));
    return dots;
  };

  return (
    <Box className={classes.slider}>
      <ArrowBackIcon className={classes['left-arrow']} onClick={prevSlide} />
      <ArrowForwardIcon
        className={classes['right-arrow']}
        onClick={nextSlide}
      />
      {renderSlides()}
      <Typography className={classes.title}>
        Welcome to Fake Plushies Shop!
      </Typography>

      <p className={classes.paragraph}>
        <Button className={classes.whiteButton} onClick={moveToProductsPage}>
          CHECK PRODUCTS
        </Button>
      </p>
      <Box className={classes['container-dots']}>{renderDots()}</Box>
    </Box>
  );
};

export default ImageSlider;
