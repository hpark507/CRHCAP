"use client";
import React, { useState, useEffect } from "react";

import { addToReport, getPhrases, removePhraseKeywordAndTable } from "@/utils/api";
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
  keyword: string;
  reason: string;
  categories: string[];
  quote: string;
  weight: number;
}

interface EditableTableProps {
  rows: Row[];
  setRows: React.Dispatch<React.SetStateAction<Row[]>>;
  stockSymbol: string;
  user_id: string;
  table_id: string;
}

const EditableTable: React.FC<EditableTableProps> = ({
  rows,
  setRows,
  stockSymbol,
  user_id,
  table_id,
}) => {
  const [newRow, setNewRow] = useState<Row>({
    keyword: "",
    reason: "",
    categories: [],
    quote: "",
    weight: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewRow({ ...newRow, [name]: value });
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNewRow({ ...newRow, categories: event.target.value as string[] });
  };

  const handleAddRow = () => {
    setRows([...rows, newRow]);
    setNewRow({
      keyword: "",
      reason: "",
      categories: [],
      quote: "",
      weight: 0,
    });
    // console.log(newRow)

    addToReport({
      keyword: newRow.keyword,
      quote: newRow.quote,
      reason: newRow.reason,
      categories: newRow.categories,
      weight: newRow.weight,
      user_id: user_id,
      symbol: stockSymbol,
      table_id: table_id,
    });
  };

  const handleReceiveData = async () => {
    const data = await getPhrases(table_id);
    // console.log("Data: ", data)
    const newsRowsData = [];
    for (const row of data) {
      newsRowsData.push({
        keyword: row?.keyword ?? "",
        reason: row?.reason ?? "",
        categories: row?.categories ?? "",
        quote: row?.quote ?? "",
        weight: row?.weight ?? 0,
      });
    }
    setRows( newsRowsData);
  };

  useEffect(() => {
    handleReceiveData();
  }, [table_id, user_id, stockSymbol]);

  const handleDeleteRow = (index: number) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
    removePhraseKeywordAndTable(rows[index].keyword, table_id);
  };

  return (
    <TableContainer
      component={Paper}
      style={{ minHeight: "30em", paddingLeft: "16px", paddingRight: "16px" }}
    >
      <h2>{stockSymbol}</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Keyword</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Categories</TableCell>
            <TableCell>Quote</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.keyword}</TableCell>
              <TableCell>{row.reason}</TableCell>
              <TableCell>{row.categories.join(", ")}</TableCell>
              <TableCell>{row.quote}</TableCell>
              <TableCell>{row.weight}</TableCell>
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
                name="keyword"
                value={newRow.keyword}
                onChange={handleInputChange}
              />
            </TableCell>
            <TableCell>
              <TextField
                name="reason"
                value={newRow.reason}
                onChange={handleInputChange}
              />
            </TableCell>
            <TableCell>
              <FormControl>
                <InputLabel>Categories</InputLabel>
                <Select
                  multiple
                  value={newRow.categories}
                  style={{ minWidth: "10em" }}
                  onChange={(e) => {
                    console.log("changed");

                    if (e.target.value) {
                      setNewRow({
                        ...newRow,
                        categories: e.target.value as string[],
                      });
                    }
                  }}
                  renderValue={(selected) => (selected as string[]).join(", ")}
                >
                  <MenuItem value="Leadership">
                    <Checkbox
                      checked={newRow.categories.indexOf("Leadership") > -1}
                    />
                    <ListItemText primary="Leadership" />
                  </MenuItem>
                  <MenuItem value="Culture">
                    <Checkbox
                      checked={newRow.categories.indexOf("Culture") > -1}
                    />
                    <ListItemText primary="Culture" />
                  </MenuItem>
                  {/* Add more categories as needed */}
                </Select>
              </FormControl>
            </TableCell>
            <TableCell>
              <TextField
                style={{ minWidth: "10em" }}
                multiline
                name="quote"
                value={newRow.quote}
                onChange={handleInputChange}
              />
            </TableCell>
            <TableCell>
              <TextField
                name="weight"
                type="number"
                value={newRow.weight}
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

export default EditableTable;
