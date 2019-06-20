import React from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Button, FormControl, Grid } from '@material-ui/core';
import {  WithStyles, Theme, withStyles, createStyles } from '@material-ui/core/styles';

import { Validator } from '../../utils/forms';

const styles = (theme: Theme) => createStyles({
  field: {
    marginBottom: theme.spacing(3)
  },
  button: {
    marginTop: theme.spacing(3)
  }
});

interface FormField {
  name: string;
  label: string;
  initial?: string;
  validator?: Validator;
  width?: number;
  type?: string;
}

interface Props extends WithStyles<typeof styles> {
  fields: FormField[];
  initialValues: {[fieldName: string]: string};
  onSubmit: (values: {[fieldName: string]: any}) => void;
  disabled?: boolean;
  submitLabel?: string;
}

const FormComponent : React.FC<Props> = ({fields, initialValues, onSubmit, disabled, submitLabel, classes}) => {
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({handleSubmit, invalid}) => (
        <form onSubmit={handleSubmit}
        >
          <Grid container spacing={3}>
          {fields.map(({name, label, validator, width, type}) => (
            <Grid item key={name}  xs={width ? width as any : 12}>
              <FormControl  fullWidth>
                <Field
                  className={classes.field}
                  name={name}
                  validate={validator}
                  render={({input, meta: {error, touched}}) => {
                  return (
                    <TextField {...input}
                      label={label}
                      InputLabelProps={{
                        shrink: true
                      }}
                      type={type}
                      error={touched && !!error}
                      helperText={touched ? error : undefined}></TextField>
                  )}}
                />
              </FormControl>
            </Grid>
          ))}
          </Grid>
          <Button
            type='submit' disabled={invalid || disabled}
            className={classes.button}
            variant='contained' color='secondary'
          >{submitLabel ? submitLabel : 'Submit'}</Button>
        </form>
      )}
    >
    </Form>
  );
}

export default withStyles(styles)(FormComponent);
