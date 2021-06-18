import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import HeaderDashboard from '../HeaderDashboard';
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
      <HeaderDashboard />
      <Aside />
      <Main />
    </div>
  );
}
