import React, { useState, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

import classes from './CustomTextField.module.css';

const validationRules = [
  {
    name: 'email',
    rule: '^[^s@]+@([^s@.,]+.)+[^s@.,]{2,}$',
  },
  {
    name: 'zip',
    rule: '^[0-9]{5}(?:-[0-9]{4})?$',
  },
];

const validationMessages = [
  {
    name: 'email',
    message: 'Please enter your email address in format: abc@exam.com',
  },
  {
    name: 'zip',
    message: 'Please enter your zip code in format: 55555 or 11111-2222',
  },
];

const FormInput = ({ name, label, type }) => {
  const formContext = useFormContext();
  const { control } = formContext;
  const [errorMessage, setErrorMessage] = useState('123');

  const [rule, setRule] = useState('');

  const isError = false;

  // if type is passed into this component,get custom rule
  useEffect(() => {
    if (type) {
      const validationRule = validationRules.find(
        (validRule) => validRule.name === type
      ).rule;

      setRule(validationRule);
    }
  }, [type]);

  const validateFunc = (value) => {
    const rgx = new RegExp(rule);
    return rgx.test(value);
  };

  useEffect(() => {
    if (!type) {
      setErrorMessage(`${label} is required`);
    }
    if (type) {
      const validationMessage = validationMessages.find(
        (message) => message.name === type
      ).message;
      setErrorMessage(validationMessage);
    }
  }, [type, label]);

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        as={TextField}
        defaultValue=""
        name={name}
        control={control}
        label={label}
        fullWidth
        rules={rule ? { validate: validateFunc } : { required: true }}
        error={isError}
        render={({ field: { onChange }, fieldState: { invalid } }) => {
          return (
            <>
              <TextField
                error={invalid}
                onChange={onChange}
                fullWidth
                name={name}
                label={label}
              />
              {invalid && (
                <span className={classes['error-message']}>{errorMessage}</span>
              )}
            </>
          );
        }}
      />
    </Grid>
  );
};

export default FormInput;

