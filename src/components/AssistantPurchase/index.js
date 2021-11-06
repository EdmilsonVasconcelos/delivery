import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import api from '../../conn';

import usePrepareToCart from '../../hooks/usePrepareToCart';

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  contentAssistant: {
    background: '#fafafa',
  },
  floatCenterSteps: {
    display: 'flex',
    justifyContent: 'center',
  },
  main: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    padding: '30px',
    flexDirection: 'column',
    alignItems: 'flex-stretch',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function getSteps() {
  return ['Dados do produto', 'Endereço', 'Finalizar pedido'];
}

export default function AssistantPurchase() {
  const classes = useStyles();
  const { idProduct } = useParams();

  const { prepareToCart, updatePrepareToCart } = usePrepareToCart();

  const [activeStep, setActiveStep] = useState(0);
  const [product, setProduct] = useState({});

  const [quantity, setQuantity] = useState(prepareToCart.product.quantity);
  const [payment, setPayment] = useState(prepareToCart.payment);
  const [address, setAddress] = useState(prepareToCart.address);
  const [phoneNumber, setPhoneNumber] = useState(prepareToCart.phoneNumber);

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinishRequest = () => {
    console.log(prepareToCart);
  };

  const validateButtonNextDataDelivery = () => {
    if (activeStep === 1) {
      return (
        !address.street ||
        !address.number ||
        !address.neighborhood ||
        !phoneNumber ||
        phoneNumber.length < 8 ||
        phoneNumber.length > 15
      );
    }
  };

  const getValueProductByMethodPayment = (method) => {
    if (method === 'IN_CASH') {
      return `R$: ${prepareToCart.product.price * quantity}`;
    } else if (method === 'CREDIT') {
      return `R$: ${prepareToCart.product.priceCredit * quantity}`;
    } else if (method === 'DEBIT') {
      return `R$: ${prepareToCart.product.priceDebit * quantity}`;
    }
  };

  const getMethodPayment = (method) => {
    if (method === 'IN_CASH') {
      return 'À vista';
    } else if (method === 'CREDIT') {
      return 'Cartão de crédito';
    } else if (method === 'DEBIT') {
      return 'Cartão de débito';
    }
  };

  useEffect(() => {
    const getproduct = async () => {
      await api
        .get(`/v1/product/${idProduct}`)
        .then((response) => {
          setProduct(response.data);
          prepareToCart.product = response.data;
          prepareToCart.product.quantity = 1;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getproduct();
  }, []);

  return (
    <div className={classes.root}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        className={classes.contentAssistant}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className={classes.main}>
        {activeStep === 0 && (
          <div>
            <Typography variant="h4">{product.name}</Typography>

            <Box mb={5} mt={3}>
              <FormControl className={classes.formControl}>
                <InputLabel id="quantity-label">Quantidade</InputLabel>
                <Select
                  required
                  labelId="quantity-label"
                  id="select-quantity"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                    prepareToCart.product.quantity = e.target.value;
                    updatePrepareToCart(prepareToCart);
                  }}
                >
                  <MenuItem value={1}>Um</MenuItem>
                  <MenuItem value={2}>Dois</MenuItem>
                  <MenuItem value={3}>Três</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box mt={3}>
              <Typography variant="h6">
                <InputLabel id="method-payment-label">
                  Forma de pagamento
                </InputLabel>
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="method-payment-label"
                    id="method-payment"
                    value={payment}
                    onChange={(e) => {
                      setPayment(e.target.value);
                      prepareToCart.payment = e.target.value;
                      updatePrepareToCart(prepareToCart);
                    }}
                  >
                    <MenuItem value={'IN_CASH'}>À vista</MenuItem>
                    <MenuItem value={'CREDIT'}>Cartão de crédito</MenuItem>
                    <MenuItem value={'DEBIT'}>Cartão de débito</MenuItem>
                  </Select>
                </FormControl>
              </Typography>
            </Box>
          </div>
        )}

        {activeStep === 1 && (
          <div>
            <Typography variant="h4">Dados para entrega</Typography>

            <Box marginBottom={2} marginTop={2}>
              <TextField
                id="outlined-basic"
                label="Rua"
                variant="outlined"
                value={address.street}
                onChange={(e) => {
                  setAddress({ ...address, street: e.target.value });
                  prepareToCart.address.street = e.target.value;
                  updatePrepareToCart(prepareToCart);
                }}
                fullWidth
              />
            </Box>

            <Box marginBottom={2}>
              <TextField
                id="outlined-basic"
                label="Número da casa"
                variant="outlined"
                value={address.number}
                onChange={(e) => {
                  setAddress({ ...address, number: e.target.value });
                  prepareToCart.address.number = e.target.value;
                  updatePrepareToCart(prepareToCart);
                }}
                fullWidth
              />
            </Box>

            <Box marginBottom={2}>
              <TextField
                id="outlined-basic"
                label="Bairro"
                variant="outlined"
                value={address.neighborhood}
                onChange={(e) => {
                  setAddress({ ...address, neighborhood: e.target.value });
                  prepareToCart.address.neighborhood = e.target.value;
                  updatePrepareToCart(prepareToCart);
                }}
                fullWidth
              />
            </Box>

            <Box>
              <TextField
                id="outlined-basic"
                label="Telefone para contato"
                variant="outlined"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  prepareToCart.phoneNumber = e.target.value;
                  updatePrepareToCart(prepareToCart);
                }}
                fullWidth
              />
            </Box>
          </div>
        )}

        {activeStep === steps.length - 1 && (
          <div>
            <Box mt={2}>
              <Typography variant="h4">Finalizar pedido</Typography>
            </Box>

            <Box mt={2}>
              <Typography variant="body1">
                Produto: {prepareToCart.product?.name}
              </Typography>
            </Box>

            <Box mt={2}>
              <Typography variant="body1">
                Quantidade: {prepareToCart.product?.quantity}
              </Typography>
            </Box>

            <Box mt={2}>
              <Typography variant="body1">
                Forma de pagamento: {getMethodPayment(prepareToCart.payment)}
              </Typography>
            </Box>

            <Box mt={2}>
              <Typography variant="body1">
                Endereço de entrega: Rua {prepareToCart.address.street}, nº{' '}
                {prepareToCart.address.number},{' '}
                {prepareToCart.address.neighborhood}
              </Typography>
            </Box>

            <Box mt={2}>
              <Typography variant="body1">
                Telefone para contato: {phoneNumber}
              </Typography>
            </Box>
            <Box mt={2}>
              <Typography variant="body1">
                Valor: {getValueProductByMethodPayment(prepareToCart.payment)}
              </Typography>
            </Box>
          </div>
        )}
      </div>

      <div className={classes.floatCenterSteps}>
        <div>
          <div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}
            >
              Voltar
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleFinishRequest}
                className={classes.finishButton}
              >
                Finalizar pedido
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.nextButton}
                disabled={validateButtonNextDataDelivery()}
              >
                Próximo
              </Button>
            )}
          </div>
        </div>
      </div>

      <Box mt={5} align="center">
        <Button color="primary">
          Além desse produto, você deseja adicionar outro?
        </Button>
      </Box>
    </div>
  );
}
