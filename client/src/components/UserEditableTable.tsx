"use client";
import React, { useState, useEffect } from "react";
import { addUser, removeUser } from "@/utils/api";


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

interface Row {
  emplid: string;
  surname: string;
}

interface EditableTableProps {
  rows: Row[];
  setRows: React.Dispatch<React.SetStateAction<Row[]>>;
}

const UserEditableTable: React.FC<EditableTableProps> = ({ rows, setRows }) => {
  const [newRow, setNewRow] = useState<Row>({
    emplid: "",
    surname: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewRow({ ...newRow, [name]: value });
  };

  const handleAddRow = () => {
    setRows([...rows, newRow]);
    setNewRow({
      emplid: "",
      surname: "",
    });

    addUser({
      emplid: newRow.emplid,
      surname: newRow.surname,
    });
  };


  const handleDeleteRow = (index: number) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
    removeUser(rows[index].emplid);
  };

  return (
    <TableContainer
      component={Paper}
      style={{ minHeight: "30em", paddingLeft: "16px", paddingRight: "16px" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Emplid</TableCell>
            <TableCell>Surname</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.emplid}</TableCell>
              <TableCell>{row.surname}</TableCell>
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
                name="surname"
                value={newRow.surname}
                onChange={handleInputChange}
              />
            </TableCell>
            <TableCell>
              <TextField
                name="emplid"
                value={newRow.emplid}
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

export default UserEditableTable;
