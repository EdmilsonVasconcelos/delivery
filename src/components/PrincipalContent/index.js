import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Header from '../Header';
import Aside from '../Aside';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});

export default function PrincipalContent({ main: Main }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <Aside />
      <Main />
    </div>
  );
}
