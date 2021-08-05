import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

const FormInput = ({ name, label }) => {
  const { control } = useFormContext();

  const isError = false;

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        as={TextField}
        defaultValue=""
        name={name}
        control={control}
        label={label}
        fullWidth
        required
        error={isError}
        render={({ field: { onChange } }) => {
          return (
            <TextField
              onChange={onChange}
              fullWidth
              name={name}
              label={label}
              required
            />
          );
        }}
      />
    </Grid>
  );
};

export default FormInput;
