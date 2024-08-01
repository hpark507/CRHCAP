"use client";
import React, { useState, useEffect } from "react";
import EditableTable from "@/components/EditableTable";
import { Button, Box } from "@mui/material";

import { getUser, update_user_stock, getSymbols } from "@/utils/api";

import { authOptions } from "@/configs/next-auth";
import { signOut } from "next-auth/react";
import Header from "./Header";

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
  const [symbols, setSymbols] = useState<string[]>([]);
  const [currentSymbolNumber, setCurrentSymbol] = useState<number>(0);
  const [toAdd, setToAdd] = useState<string>("");
  const [session, setSession] = useState<any>(null);
  const [elegibleSymbols, setElegibleSymbols] = useState<string[]>([]);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const session = await getUser(user_id);
      setSession(session);
      const stock_names = session?.stock_names;
      if (stock_names) {
        setSymbols(stock_names);
      }
      const symbolsRes = await getSymbols();
      const reselegibleSymbols = symbolsRes.map(
        (res: { id: string; ticket: string }) => res.ticket
      );
      setElegibleSymbols(reselegibleSymbols);

      if (reselegibleSymbols.length > 0) {
        setToAdd(reselegibleSymbols[0]);
      }
    };
    fetchData();
  }, []);

  const [tables, setTables] = useState<{ [key: string]: Row[] }>({
    0: [],
    1: [],
    2: [],
  });

  return (
    <div>
      <br />
      <main className="flex min-h-screen items-center justify-center">
        <br />
        <div className="flex flex-col items-center justify-center w-full shadow-lg rounded-lg px-5 py-5">
          <div className="w-full">
            <br />
            <Header emplid={session?.emplid} surname={session?.surname} />
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* Select Dropdown */}
                <select
                  onChange={(e) => {
                    setToAdd(elegibleSymbols[parseInt(e.target.value)]);
                  }}
                  // value={toAdd}
                  style={{ marginRight: "10px" }}
                >
                  {elegibleSymbols.map((symbol, index) => (
                    <option key={symbol} value={index}
                    // onSelect={() => setToAdd(symbol)}
                    >
                      {symbol}
                    </option>
                  ))}
                </select>

                {/* Add Stock Symbol Button */}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    const newSymbols = [...symbols, toAdd];
                    update_user_stock(newSymbols, user_id);
                    setSymbols(newSymbols);
                    setTables((prevTables) => ({
                      ...prevTables,
                      [symbols.length]: [],
                    }));
                  }}
                  style={{ marginRight: "10px" }}
                >
                  Add Stock Symbol
                </Button>
              </div>

              {/* Remove Stock Symbol Button */}
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  const newSymbols = symbols.filter(
                    (symbol) => symbol !== symbols[currentSymbolNumber]
                  );
                  update_user_stock(newSymbols, user_id);
                  setSymbols(newSymbols);
                  setTables((prevTables) => {
                    const newTables = { ...prevTables };
                    delete newTables[currentSymbolNumber];
                    return newTables;
                  });
                }}
              >
                Remove Stock Symbol
              </Button>
            </div>
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
              table_name={`${user_id}${symbols[currentSymbolNumber]}`}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Report;
