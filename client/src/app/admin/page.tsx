"use client";
import React, { useState, useEffect } from "react";
import UserEditableTable from "@/components/UserEditableTable";
import TicketEditableTable from "@/components/TicketEditableTable";
import CategoryEditableTable from "@/components/CategoriesEditableTable";
import Header from "@/components/Header";
import { getUsers, getSymbols, getCategories } from "@/utils/api";

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
//example data type
export type Person = {
  id: number;
  firstName: string;
  lastName: string;
  company: string;
  city: string;
  country: string;
};

export const data = [
  {
    id: 1,
    firstName: 'Elenora',
    lastName: 'Wilkinson',
    company: 'Feest - Reilly',
    city: 'Hertaland',
    country: 'Qatar',
  },
  {
    id: 2,
    firstName: 'Berneice',
    lastName: 'Feil',
    company: 'Deckow, Leuschke and Jaskolski',
    city: 'Millcreek',
    country: 'Nepal',
  },
  {
    id: 3,
    firstName: 'Frieda',
    lastName: 'Baumbach',
    company: 'Heidenreich, Grady and Durgan',
    city: 'Volkmanside',
    country: 'Croatia',
  },
  {
    id: 4,
    firstName: 'Zachery',
    lastName: 'Brown',
    company: 'Cormier - Skiles',
    city: 'Faychester',
    country: 'Saint Pierre and Miquelon',
  },
  {
    id: 5,
    firstName: 'Kendra',
    lastName: 'Bins',
    company: 'Wehner - Wilderman',
    city: 'New Valentin',
    country: 'Senegal',
  },
  {
    id: 6,
    firstName: 'Lysanne',
    lastName: 'Fisher',
    company: 'Schmidt LLC',
    city: 'Malachitown',
    country: 'Costa Rica',
  },
  {
    id: 7,
    firstName: 'Garrick',
    lastName: 'Ryan',
    company: 'Ryan - Buckridge',
    city: 'East Pearl',
    country: 'Cocos (Keeling) Islands',
  },
  {
    id: 8,
    firstName: 'Hollis',
    lastName: 'Medhurst',
    company: 'Quitzon Group',
    city: 'West Sienna',
    country: 'Papua New Guinea',
  },
  {
    id: 9,
    firstName: 'Arlo',
    lastName: 'Buckridge',
    company: 'Konopelski - Spinka',
    city: 'Chino',
    country: 'Congo',
  },
  {
    id: 10,
    firstName: 'Rickie',
    lastName: 'Auer',
    company: 'Lehner - Walsh',
    city: 'Nyahfield',
    country: 'Sudan',
  },
  {
    id: 11,
    firstName: 'Isidro',
    lastName: 'Larson',
    company: 'Reichert - Paucek',
    city: 'Fort Rosinaside',
    country: 'Belize',
  },
  {
    id: 12,
    firstName: 'Bettie',
    lastName: 'Skiles',
    company: 'Zulauf, Flatley and Rolfson',
    city: 'West Feltonchester',
    country: 'Poland',
  },
] as Person[];


const columnHelper = createMRTColumnHelper<Person>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    size: 40,
  }),
  columnHelper.accessor("firstName", {
    header: "First Name",
    size: 120,
  }),
  columnHelper.accessor("lastName", {
    header: "Last Name",
    size: 120,
  }),
  columnHelper.accessor("company", {
    header: "Company",
    size: 300,
  }),
  columnHelper.accessor("city", {
    header: "City",
  }),
  columnHelper.accessor("country", {
    header: "Country",
    size: 220,
  }),
];

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

// get session.
import { useSession } from "next-auth/react";

const AdminReport: React.FC = () => {
  const [users, setUsers] = useState<{ emplid: string; surname: string }[]>([]);
  const [symbols, setSymbols] = useState<{ ticket: string }[]>([]);
  const [categories, setCategories] = useState<{ name: string }[]>([]);
  const [tabIdx, setTabIdx] = useState<string>("1");
  const handleExportRows = (rows: MRT_Row<Person>[]) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
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

    fetchUsers();
    fetchSymbols();
    fetchCategories();
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
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
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
                  {/* <MaterialReactTable table={table} />
                  <MaterialReactTable table={table} /> */}
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
