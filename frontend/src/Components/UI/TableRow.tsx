import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Bank } from '../../queryHandlers/bankQuery';
import { Client, fetchBankClients } from '../../queryHandlers/clientQuery';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function Row(props: Bank) {
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState<Client[]>()
  const [loading, setLoading] = useState<boolean>(true);
  const clickHandler = async (id: string)=>{
    const response = await fetchBankClients(id);

    setClients(response);
    setLoading(false);
  }


  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open)
              clickHandler(props.id)
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {props.id}
        </TableCell>
        <TableCell align="left">
          {props.bankTitle}
        </TableCell>
        <TableCell align="right">{props.balance}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Clients
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Client Id</TableCell>
                    <TableCell>Client Name</TableCell>
                    <TableCell align="right">Clients email</TableCell>
                    <TableCell align="right">Clients balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!loading ? <>{clients!.length ? <>{clients!.map((clientRow) => (
                    <TableRow key={clientRow.id}>
                      <TableCell component="th" scope="row">
                        {clientRow.id}
                      </TableCell>
                      <TableCell>{clientRow.name}</TableCell>
                      <TableCell align="right">{clientRow.email}</TableCell>
                      <TableCell align="right">{clientRow.balance}</TableCell>
                    </TableRow>
                  ))}</> : <Typography textAlign="right">No clients yet</Typography> }</> : <CircularProgress />}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
export default Row;