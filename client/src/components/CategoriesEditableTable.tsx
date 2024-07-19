"use client";
import React, { useState, useEffect } from "react";
import { addCategory, removeCategory} from "@/utils/api";


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

interface CategoryRow {
  name: string;
}

interface EditableTableProps {
  rows: CategoryRow[];
  setRows: React.Dispatch<React.SetStateAction<CategoryRow[]>>;
}

const CategoryEditableTable: React.FC<EditableTableProps> = ({ rows, setRows }) => {
  const [newRow, setNewRow] = useState<CategoryRow>({
    name: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewRow({ ...newRow, [name]: value });
  };

  const handleAddRow = () => {
    setRows([...rows, newRow]);
    setNewRow({
      name: "",
    });

    addCategory( newRow.name);
  };


  const handleDeleteRow = (index: number) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
    removeCategory(rows[index].name);
  };

  return (
    <TableContainer
      style={{ paddingLeft: "16px", paddingRight: "16px" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.name}</TableCell>
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
                name="name"
                value={newRow.name}
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

export default CategoryEditableTable;
