import React, { useState, useEffect } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Container, Box } from '@material-ui/core';
import useStyles from './styles';

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const classes = useStyles();

  useEffect(() => {
    const intervalID = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => {
      clearInterval(intervalID);
    };
  });

  if (!Array.isArray(slides) || slides.length <= 0) return null;

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));

  return (
    <Container className={classes.slider}>
      <ArrowBackIcon className={classes['left-arrow']} onClick={prevSlide} />
      <ArrowForwardIcon
        className={classes['right-arrow']}
        onClick={nextSlide}
      />

      {slides.map((slide, index) => {
        return (
          <Box
            className={
              current === index
                ? `${classes.slide} ${classes['slide-active']}`
                : classes['slide']
            }
            key={index}
          >
            {index === current && (
              <img src={slide} className={classes.img} alt="azurlane img" />
            )}
          </Box>
        );
      })}
      <Box className={classes['container-dots']}>
        {Array.from({ length }).map((item, index) => (
          <Box
            onClick={() => setCurrent(index)}
            key={index}
            className={
              current === index
                ? `${classes.dot} ${classes['dot-active']}`
                : classes.dot
            }
          ></Box>
        ))}
      </Box>
    </Container>
  );
};

export default ImageSlider;
