"use client";
import React, { useState, useEffect } from "react";
import UserEditableTable from "@/components/UserEditableTable";
import TicketEditableTable from "@/components/TicketEditableTable";
import CategoryEditableTable from "@/components/CategoriesEditableTable";
import Header from "@/components/Header";
import {
  getUsers,
  getSymbols,
  getCategories,
  getAllPhrases,
} from "@/utils/api";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_Row,
  createMRTColumnHelper,
} from "material-react-table";

import { Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here
import { PhrasesCSV, SamplePhrasesCSV } from "@/utils/models";

const columnHelper = createMRTColumnHelper<PhrasesCSV>();

const columns = [
  columnHelper.accessor("keyword", {
    header: "Keyword",
    size: 100,
  }),
  columnHelper.accessor("reason", {
    header: "Reason",
    size: 200,
  }),
  columnHelper.accessor("categories", {
    header: "Categories",
    size: 200,
    // cell: (info: { getValue: () => any[]; }) => info.getValue().join(", "), // Convert array to comma-separated string
  }),
  columnHelper.accessor("quote", {
    header: "Quote",
    size: 300,
  }),
  columnHelper.accessor("weight", {
    header: "Weight",
    size: 50,
  }),
  columnHelper.accessor("symbol", {
    header: "Symbol",
    size: 60,
  }),
  columnHelper.accessor("emplid", {
    header: "EMPLID",
    size: 100,
  }),
];

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});



// get session.
import { useSession } from "next-auth/react";

const convertJsonToCsvFriendlyJson = (json: any) => {
  /**
   *{
//   "keyword": "asdasd",
//   "reason": "asdas",
//   "weight": 3,
//   "table_name": "23881381AAPL",
//   "id": "8c29b43a-e0bd-4a91-bf12-04351af35b5b",
//   "categories": [
//       "Healthcare"
//   ],
//   "quote": "asdasd",
//   "symbol": "AAPL"
// }

// To:
*{
//   "keyword": "asdasd",
//   "reason": "asdas",
//   "weight": 3,
//   "categories": "Healthcare",
//   "quote": "asdasd",
//   "symbol": "AAPL"
//  "emplid": "23881381" 
// }
   * @returns {json} json with categories as string.
   */

  const categories = json.categories.join(", ");
  const emplid = json.table_name.split(json.symbol)[0];
  const newJson = {
    keyword: json.keyword,
    reason: json.reason,
    weight: json.weight,
    categories: categories,
    quote: json.quote,
    symbol: json.symbol,
    emplid: emplid,
  };
  return newJson;
};

const convertListJsonTOFriendly = (json: any[]) => {
  for (let i = 0; i < json.length; i++) {
    json[i] = convertJsonToCsvFriendlyJson(json[i]);
  }
  return json;
};
const AdminReport: React.FC = () => {
  const [users, setUsers] = useState<{ emplid: string; surname: string }[]>([]);
  const [symbols, setSymbols] = useState<{ ticket: string }[]>([]);
  const [categories, setCategories] = useState<{ name: string }[]>([]);
  const [tabIdx, setTabIdx] = useState<string>("1");
  const [data, setData] = useState<PhrasesCSV[]>(SamplePhrasesCSV);
  const handleExportRows = (rows: MRT_Row<PhrasesCSV>[]) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(
      rowData.map((row) => ({ ...row, ...row }))
    );
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(
      data.map((row) => ({ ...row, categories: categories.join("") }))
    );
    download(csvConfig)(csv);
  };

  // get users from api and populate.
  useEffect(() => {
    async function fetchUsers() {
      const users: { emplid: string; surname: string }[] = await getUsers();
      setUsers(users);
    }

    async function fetchSymbols() {
      const symbols: { ticket: string }[] = await getSymbols();
      setSymbols(symbols);
    }

    async function fetchCategories() {
      const categories: { name: string }[] = await getCategories();
      setCategories(categories);
    }

    async function fetchPhrases() {
      const phrases: PhrasesCSV[] = await getAllPhrases();
      const newdata = convertListJsonTOFriendly(phrases);
      // console.log("raw phrases", phrases);
      // console.log("data phrases", newdata);
      // console.log("data phrases existent", data);
      setData(newdata);
    }

    fetchUsers();
    fetchSymbols();
    fetchCategories();
    fetchPhrases();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabIdx(newValue as string);
  };

  const { data: session, status } = useSession();
  const user = session?.user;

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
          Export All Data
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full shadow-lg rounded-lg px-5">
        <div>
          <br />
          <Header
            emplid={user?.email ?? ""}
            surname={user?.name ?? ""}
            verifyForSurname={["admin"]}
          />
          <br />
          <h1 className="text-2xl font-bold text-center">Admin Management</h1>
          <br />
          {/* Create edditable table for users: With Surname and EMPLID should have button for downloading the user specific */}
          {user &&
          user.name !== "" &&
          user.email !== "" &&
          ["admin"].includes(user?.name ?? "") ? (
            <div className="tab-window">
              <TabContext value={tabIdx}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Users" value="1" />
                    <Tab label="Symbols" value="2" />
                    <Tab label="Categories" value="3" />
                    <Tab label="Phrases" value="4" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <UserEditableTable rows={users} setRows={setUsers} />
                </TabPanel>
                <TabPanel value="2">
                  <TicketEditableTable rows={symbols} setRows={setSymbols} />
                </TabPanel>
                <TabPanel value="3">
                  <CategoryEditableTable
                    rows={categories}
                    setRows={setCategories}
                  />
                </TabPanel>
                <TabPanel value="4">
                  <p>Phrases</p>
                  <MaterialReactTable table={table} />
                </TabPanel>
              </TabContext>
            </div>
          ) : (
            <div className="tab-window flex justify-center ">
              <p>Requires to be admin to view this page.</p>
            </div>
          )}

          <br />
        </div>
      </div>
    </main>
  );
};

export default AdminReport;
