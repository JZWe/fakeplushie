import React, { useEffect } from 'react';
import { ImageSlider } from '../../components';
import { Grid, Box, Typography } from '@material-ui/core';

import useStyle from './style';

import { preload, sliderData as images } from '../../helpers';

const Mainpage = () => {
  const classes = useStyle();

  useEffect(() => {
    var perfEntries = performance.getEntriesByType('navigation');
    if (perfEntries[0].type === 'reload') {
      preload(images);
    }
  });

  return (
    <>
      <ImageSlider slides={images} />
      <Grid container spacing={1} className={classes.gridContainer}>
        <Grid
          item
          xs={12}
          md={6}
          className={classes.gridItem}
          style={{ backgroundColor: '#15314b' }}
        >
          <Box className={classes.leftBox}>
            <Typography variant="h5">
              Why should you buy products on our Website ?
            </Typography>
            <p>
              Because we have the multiple kinds of cutest plushies in the world
              !
            </p>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          className={classes.gridItem}
          style={{ backgroundColor: '#088cd3' }}
        >
          <Box className={classes.rightBox}>
            <div>
              <img
                alt="Royal Navy"
                src="https://patchwiki.biligame.com/images/blhx/b/be/ld9w8azov1e5uz2u8egkjjtieptm8r3.png"
                style={{ width: '100px', height: '100px' }}
              />
              <span>Royal Navy</span>
            </div>

            <div>
              <img
                alt="Sakura empire"
                src="https://patchwiki.biligame.com/images/blhx/5/5d/o1yfs39tafpdmw218xxsuukt7st11xp.png"
                style={{ width: '100px', height: '100px' }}
              />
              <span>Sakura Empire</span>
            </div>

            <div>
              <img
                alt="Eagle union"
                src="https://patchwiki.biligame.com/images/blhx/b/be/ld9w8azov1e5uz2u8egkjjtieptm8r3.png"
                style={{ width: '100px', height: '100px' }}
              />
              <span>Eagle union</span>
            </div>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Mainpage;
