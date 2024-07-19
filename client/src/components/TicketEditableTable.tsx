"use client";
import React, { useState, useEffect } from "react";
import { addSymbol, removeSymbol } from "@/utils/api";


import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

interface TicketRow {
  ticket: string;
}

interface EditableTableProps {
  rows: TicketRow[];
  setRows: React.Dispatch<React.SetStateAction<TicketRow[]>>;
}

const TicketEditableTable: React.FC<EditableTableProps> = ({ rows, setRows }) => {
  const [newRow, setNewRow] = useState<TicketRow>({
    ticket: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewRow({ ...newRow, [name]: value });
  };

  const handleAddRow = () => {
    setRows([...rows, newRow]);
    setNewRow({
      ticket: "",
    });

    addSymbol( newRow.ticket);
  };


  const handleDeleteRow = (index: number) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
    removeSymbol(rows[index].ticket);
  };

  return (
    <TableContainer
      style={{ paddingLeft: "16px", paddingRight: "16px" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.ticket}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleDeleteRow(index)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <TextField
                name="ticket"
                value={newRow.ticket}
                onChange={handleInputChange}
              />
            </TableCell>
            
            <TableCell>
              <Button onClick={handleAddRow} startIcon={<AddIcon />}>
                Add
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TicketEditableTable;
