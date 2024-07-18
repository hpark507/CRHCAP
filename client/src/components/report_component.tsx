"use client";
import React, { useState, useEffect } from "react";
import EditableTable from "@/components/EditableTable";
import { Button, Box } from "@mui/material";

import { authOptions } from "@/configs/next-auth";
import { signOut } from "next-auth/react";

interface Row {
  keyword: string;
  reason: string;
  categories: string[];
  quote: string;
  weight: number;
}

interface ReportProps {
  reportProps: {
    user_id: string;
    table_id: string;
  };
}

const Report: React.FC<ReportProps> = ({ reportProps }) => {
  const { user_id, table_id } = reportProps;
  const elegibleSymbols = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA"];
  const [symbols, setSymbols] = useState<string[]>(["AAPL",]);
  const [currentSymbolNumber, setCurrentSymbol] = useState<number>(1);
  const [toAdd, setToAdd] = useState<string>("");
  const [session, setSession] = useState<any>(null);


  const [tables, setTables] = useState<{ [key: string]: Row[] }>({
    0: [],
    1: [],
    2: [],
  });

  return (
    <div>
      <button
        onClick={() => signOut()}
        className="float-right px-5 text-sm text-danger"
        // focus:outline-none text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2
      >
        <span className="text-sm">Sign Out</span>
      </button>
      <br />
      <main className="flex min-h-screen items-center justify-center">
        <br />
        <div className="flex flex-col items-center justify-center w-full shadow-lg rounded-lg px-5 py-5">
          <div className="w-full">
            <h1 className="text-2xl font-bold text-center">Report</h1>
            <br />
            <Box display="flex" justifyContent="center" mb={2}>
              {symbols.map((symbol) => (
                <Button
                  key={symbol}
                  variant={
                    symbol === symbols[currentSymbolNumber]
                      ? "outlined"
                      : "text"
                  }
                  onClick={() =>
                    setCurrentSymbol(symbols.findIndex((s) => s === symbol))
                  }
                  style={{ margin: "0 5px" }}
                >
                  {symbol}
                </Button>
              ))}
            </Box>

            {/* Select Dropdown. */}
            <select
              onChange={(e) => {
                setToAdd(elegibleSymbols[parseInt(e.target.value)]);
              }}
            >
              {elegibleSymbols.map((symbol, index) => (
                <option key={symbol} value={index}>
                  {symbol}
                </option>
              ))}
            </select>

            <Button
              variant="outlined"
              onClick={() => {
                setSymbols([...symbols, toAdd]);
                setTables({ ...tables, [symbols.length]: [] });

              }}
            >
              Add Stock Symbol
            </Button>

            <Button
              variant="outlined"
              onClick={() => {
                setSymbols(symbols.filter((s) => s !== symbols[currentSymbolNumber]));
                setTables({ ...tables, [currentSymbolNumber]: [] });
              }}
            >
              Remove Stock Symbol
            </Button>

            <br />
            <p>
              Please download the 10k report from the stock symbol mentioned and
              provide 10 keywords research
            </p>
            <br />
            <br />
            <hr />
            <br />

            <EditableTable
              rows={tables[currentSymbolNumber]}
              setRows={(rows) =>
                setTables({ ...tables, [currentSymbolNumber]: rows })
              }
              stockSymbol={symbols[currentSymbolNumber]}
              user_id={user_id}
              table_id={`${user_id}${symbols[currentSymbolNumber]}`}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Report;
