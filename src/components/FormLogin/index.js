import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { useHistory } from 'react-router';
import useToken from '../../hooks/useToken';
import { isValidText } from '../../utils/ValitTextInput';
import api from '../../conn';

import AlertMessage from '../AlertMessage';

export default function FormLogin() {
  const history = useHistory();
  const { updateToken } = useToken();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [alert, setAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('Preencha os campos');
  const [classAlert, setClassAlert] = useState('error');

  const handleLogin = (evt) => {
    evt.preventDefault();
    const isValidEmail = isValidText(3, 55, email);
    const isValidPassword = isValidText(3, 55, password);

    !isValidEmail || !isValidPassword ? setAlert(true) : login();
  };

  const login = async () => {
    await api
      .post('/v1/auth', {
        email: email,
        password: password,
      })
      .then((response) => {
        const { token } = response.data;
        updateToken(token);
        history.push('/purchases');
      })
      .catch((error) => {
        setAlert(true);
        setMessageAlert('Informações de e-mail e senha incorretas');
        setClassAlert('error');
      });
  };

  const resetAlerts = () => {
    setAlert(false);
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h2" gutterBottom align="center">
          Bem vindo ao VSC Delivery
        </Typography>
      </Box>

      {alert && (
        <AlertMessage
          classAlert={classAlert}
          text={messageAlert}
        ></AlertMessage>
      )}

      <form onSubmit={handleLogin}>
        <TextField
          id="email"
          type="email"
          label="E-mail"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          onClick={resetAlerts}
        />
        <TextField
          id="password"
          type="password"
          label="Senha"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          onClick={resetAlerts}
        />
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            margin="normal"
            type="submit"
          >
            Entrar
          </Button>
        </Box>
      </form>
    </Container>
  );
}
