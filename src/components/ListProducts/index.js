import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
import Skeleton from '@material-ui/lab/Skeleton';

import api from '../../conn';

import SkeletonTable from '../SkeletonTable';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
  },
  skeletonTitleContent: {
    width: '100%',
  },
  skeletonTitle: {
    width: 400,
    margin: '0 auto',
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
  return (
    <div className={classes.page}>
      <Box pt={5}>
        <Container>
          <Box mb={5}>
            {rows.length ? (
              <Typography
                component="h2"
                variant="h3"
                color="primary"
                gutterBottom
                align="center"
              >
                Selecione o produto
              </Typography>
            ) : (
              <div className={classes.skeletonTitleContent}>
                <div className={classes.skeletonTitle}>
                  <Skeleton height={100} />
                </div>
              </div>
            )}
          </Box>

          <TableContainer component={Paper}>
            {rows.length ? (
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Produto</TableCell>
                    <TableCell align="center">Descrição</TableCell>
                    <TableCell align="center">Valor a vista/débito</TableCell>
                    <TableCell align="center">Valor no crédito</TableCell>
                    <TableCell align="center">Ação</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell align="center">
                        <NumberFormat
                          value={row.price.toFixed(2)}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'R$ '}
                        />
                      </TableCell>
                      <TableCell align="center">
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
                        align="center"
                        title={`Pedir produto ${row.name}`}
                      >
                        <Link to={`add-to-cart/${row.id}`}>
                          <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                          >
                            <Add />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <SkeletonTable />
            )}
          </TableContainer>
        </Container>
      </Box>
    </div>
  );
}
