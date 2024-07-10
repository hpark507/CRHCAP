"use server";
import React, { useState } from "react";
import EditableTable from "@/components/EditableTable";
import { Button, TextField, Box } from "@mui/material";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/configs/next-auth";

interface Row {
  keyword: string;
  reason: string;
  categories: string[];
  quote: string;
  weight: number;
}

const Report: React.FC = async () => {
  const [symbols, setSymbols] = useState<string[]>(['AAPL', 'GOOGL','MSFT']);
  const [currentSymbolNumber, setCurrentSymbol] = useState<number>(1);
  
  const session = await getServerSession(authOptions);
  console.log("session", session);

  const user_id = session?.user;
  const [tables, setTables] = useState<{ [key: string]: Row[] }>({
    0: [],
    1: [],
    2: [],
  });
  

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full shadow-lg rounded-lg px-5">
        <div className="w-full">
          <h1 className="text-2xl font-bold text-center">Report</h1>
          <br />
          <Box display="flex" justifyContent="center" mb={2}>
            {symbols.map(symbol => (
              <Button key={symbol} variant={symbol === symbols[currentSymbolNumber] ? "outlined" : "text"} onClick={() => setCurrentSymbol(
                symbols.findIndex(s => s === symbol)
              )} style={{ margin: '0 5px' }}>
                {symbol}
              </Button>
            ))}
          </Box>
          <p>Please download the 10k report from the stock symbol mentioned and provide 10 keywords research</p>
          <br />
          <br />
          <hr />
          <br />
          
          <EditableTable 
            rows={tables[currentSymbolNumber]} 
            setRows={(rows) => setTables({ ...tables, [currentSymbolNumber]: rows })} 
            stockSymbol={symbols[currentSymbolNumber]}
            user_id={user_id as string}
            table_id={`${user_id}${symbols[currentSymbolNumber]}`}
          />
        </div>
      </div>
    </main>
  );
};

export default Report;
