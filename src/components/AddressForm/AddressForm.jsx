import React, { useState, useEffect } from 'react';
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';

import { CustomTextField as FormInput } from '../index';

import { Link } from 'react-router-dom';
import { useCountries, useSubdivisions } from '../../custom-hooks';
import { commerce } from '../../lib/commerce';

// 透過 countries, subdivisions 渲染 <MenuItem> 的邏輯是一致的
// 抽取出來做為 function
const renderList = (items) => {
  return items.map((item) => (
    <MenuItem key={item.id} value={item.id}>
      {item.label}
    </MenuItem>
  ));
};

const AddressForm = ({ checkoutToken, next, isDisabled }) => {
  const [countries, defaultCountry] = useCountries(checkoutToken);
  const [shippingCountry, setShippingCountry] = useState('');

  const [subdivisions, defaultSubdivision] = useSubdivisions(shippingCountry);
  const [shippingSubdivision, setShippingSubdivision] = useState('');

  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');

  const methods = useForm();

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    stateProvince = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region: stateProvince }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  // 如果有透過 useCountries 抓到 countries，就會有預設值
  // 有預設值時就能夠設定目前的 country 是誰
  useEffect(() => {
    if (defaultCountry) {
      setShippingCountry(defaultCountry);
    }
  }, [defaultCountry]);

  useEffect(() => {
    if (defaultSubdivision) {
      setShippingSubdivision(defaultSubdivision);
    }
  }, [defaultSubdivision]);

  useEffect(() => {
    let tokenId;
    if (checkoutToken) {
      tokenId = checkoutToken.id;
    }
    if (shippingSubdivision)
      fetchShippingOptions(tokenId, shippingCountry, shippingSubdivision);
  }, [checkoutToken, shippingCountry, shippingSubdivision]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({
              ...data,
              shippingCountry,
              shippingSubdivision,
            })
          )}
        >
          <Grid container spacing={3}>
            <FormInput name="firstName" label="First name" />
            <FormInput name="lastName" label="Last name" />
            <FormInput name="address1" label="Address" />
            <FormInput name="email" label="Email" />
            <FormInput name="City" label="City" />
            <FormInput name="ZIP" label="ZIP / Postal Code" />

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => {
                  setShippingCountry(e.target.value);
                }}
              >
                {countries ? renderList(countries) : null}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => {
                  setShippingSubdivision(e.target.value);
                }}
              >
                {subdivisions ? renderList(subdivisions) : null}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {shippingOptions
                  .map((sO) => ({
                    id: sO.id,
                    label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
                  }))
                  .map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} to="/cart" variant="outlined">
              Back to Cart
            </Button>
            <Button
              disabled={isDisabled}
              type="submit"
              variant="contained"
              color="primary"
            >
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
