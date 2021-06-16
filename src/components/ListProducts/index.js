import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import NumberFormat from 'react-number-format';

import api from '../../conn';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function ListProducts() {
  const classes = useStyles();

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const getproducts = async () => {
      await api
        .get('/v1/product')
        .then((response) => {
          setRows(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getproducts();
  }, []);

  const handleDeleteClick = () => {
    console.log('Fui clicado');
  };

  return (
    <div className={classes.page}>
      <Box pt={5}>
        <Container>
          <Box mb={5}>
            <Typography
              component="h2"
              variant="h3"
              color="primary"
              gutterBottom
              align="center"
            >
              Selecione o produto
            </Typography>
          </Box>

          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Produto</TableCell>
                  <TableCell align="right">Descrição</TableCell>
                  <TableCell align="right">Valor a vista/débito</TableCell>
                  <TableCell align="right">Valor no crédito</TableCell>
                  <TableCell align="right">Ação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                    <TableCell align="right">
                      <NumberFormat
                        value={row.price.toFixed(2)}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'R$ '}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {row.priceCredit ? (
                        <NumberFormat
                          value={row.priceCredit.toFixed(2)}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'R$ '}
                        />
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                    <TableCell
                      align="right"
                      title={`Pedir produto ${row.name}`}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => {
                          handleDeleteClick(row.id);
                        }}
                      >
                        <Add />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </div>
  );
}
