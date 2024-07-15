"use client";
import React, { useState, useEffect } from "react";
import UserEditableTable from "@/components/UserEditableTable";

import { getUsers, getSymbols } from "@/utils/api";

const AdminReport: React.FC = () => {
  const [users, setUsers] = useState<{ emplid: string; surname: string }[]>([]);
  
  // get users from api and populate.
  useEffect(() => {
    async function fetchUsers() {
      const users: { emplid: string; surname: string }[] = await getUsers();
      setUsers(users);
    }
    fetchUsers();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full shadow-lg rounded-lg px-5">
        <div className="w-full">
          <h1 className="text-2xl font-bold text-center">Admin Management</h1>
          <br />
          {/* Create edditable table for users: With Surname and EMPLID should have button for downloading the user specific */}
          <h2>User Management</h2>
          <UserEditableTable rows={users} setRows={setUsers} />

          {/* Create editable table for Symbol Stock and id */}
          <h2>Symbol Management</h2>


          {/* Create editable table for categories (that can be modified) */}
          <h2> Categories </h2>
          



        </div>
      </div>
    </main>
  );
};

export default AdminReport;
