import React from 'react';
import Alert from '@material-ui/lab/Alert';

export default function AlertMessage({ classAlert, text }) {
  return (
    <Alert severity={classAlert ? classAlert : 'error'}>
      {text ? text : 'Preencha os campos'}
    </Alert>
  );
}
