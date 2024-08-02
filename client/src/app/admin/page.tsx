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

// get session.
import { useSession } from "next-auth/react";

const AdminReport: React.FC = () => {
  const [users, setUsers] = useState<{ emplid: string; surname: string }[]>([]);
  const [symbols, setSymbols] = useState<{ ticket: string }[]>([]);
  const [categories, setCategories] = useState<{ name: string }[]>([]);
  const [tabIdx, setTabIdx] = useState("1");

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIdx(newValue);
  };

  const { data: session, status } = useSession();
  const user = session?.user;

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
