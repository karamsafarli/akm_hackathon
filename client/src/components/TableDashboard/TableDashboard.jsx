import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

const TableDashboard = ({ rows, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} style={{ marginTop: '50px', padding: '0 20px' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontSize: '20px', fontWeight: '600' }}>Username</TableCell>
            <TableCell align="left" style={{ fontSize: '20px', fontWeight: '600' }}>Email</TableCell>
            <TableCell align="left" style={{ fontSize: '20px', fontWeight: '600' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" style={{ fontSize: '16px', fontWeight: '500' }}>
                {row.name}
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">
                <Button onClick={() => onEdit(row)} variant="contained"  style={{ marginRight: '10px', background:"#66CDAA" }}>
                  Edit
                </Button>
                <Button onClick={() => onDelete(row._id)} variant="contained" style={{ marginRight: '10px', background:"#CE5353FF" }}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableDashboard;
