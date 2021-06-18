import React from 'react';

import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import AssistantPurchase from '../AssistantPurchase';

export default function AddToCart() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box mt={3}>
          <Typography
            component="h2"
            variant="h4"
            color="primary"
            gutterBottom
            align="center"
          >
            Efetuar pedido
          </Typography>

          <AssistantPurchase />
        </Box>
      </Container>
    </>
  );
}
