"use client";
import React, { useState, useEffect } from "react";
import UserEditableTable from "@/components/UserEditableTable";
import TicketEditableTable from "@/components/TicketEditableTable";
import CategoryEditableTable from "@/components/CategoriesEditableTable";
import Header from "@/components/Header";

import { getUsers, getSymbols, getCategories } from "@/utils/api";
import { signOut } from "next-auth/react";

// get session.
import { useSession } from "next-auth/react";

const AdminReport: React.FC = () => {
  const [users, setUsers] = useState<{ emplid: string; surname: string }[]>([]);
  const [symbols, setSymbols] = useState<{ ticket: string }[]>([]);
  const [categories, setCategories] = useState<{ name: string }[]>([]);

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

  const { data: session, status } = useSession();
  
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full shadow-lg rounded-lg px-5">
        <div>
          <br />
          <Header />
          <br />
          <h1 className="text-2xl font-bold text-center">Admin Management</h1>
          <br />
          {/* Create edditable table for users: With Surname and EMPLID should have button for downloading the user specific */}

          <UserEditableTable rows={users} setRows={setUsers} />
          <br />
          {/* Create editable table for Symbol Stock and id */}

          <TicketEditableTable rows={symbols} setRows={setSymbols} />
          <br />
          {/* Create editable table for categories (that can be modified) */}

          <CategoryEditableTable rows={categories} setRows={setCategories} />
          <br />
        </div>
      </div>
    </main>
  );
};

export default AdminReport;
