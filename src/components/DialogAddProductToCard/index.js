import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';

export default function DialogAddProductToCard({ setOpenDialog }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick={true}
      >
        <DialogTitle id="form-dialog-title">Finalizar pedido</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para finalizar o pedido, preencha seu nome, telefone e endereço e
            deixa que entregamos para você :)
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome"
            type="text"
            fullWidth
            required
          />
          <TextField
            margin="dense"
            id="phone"
            label="Telefone"
            type="text"
            fullWidth
            required
          />
          <TextField
            margin="dense"
            id="address"
            label="Endereço"
            type="text"
            fullWidth
            required
          />
          <TextField
            margin="dense"
            id="observation"
            label="Alguma observação?"
            type="text"
            fullWidth
          />
        </DialogContent>
        <Box mt={3}>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenDialog(false);
              }}
              variant="contained"
              color="secondary"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                setOpenDialog(false);
              }}
              variant="contained"
              color="primary"
            >
              Finalizar pedido
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
