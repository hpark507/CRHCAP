"use client";
// "use server";
import React, { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { getUserData } from "@/utils/api";

import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";


const LoginForm = () => {
  const [emplid, setEmplid] = useState<undefined | string>("");
  const [open, setOpen] = useState(false);
  const [surname, setSurname] = useState<undefined | string>("");


  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Check here if the surname with specific emplid exists.
    const user_data = await getUserData(emplid as string);
    if (!user_data) {
      return;
    }
    if (user_data.surname !== surname) {
      return;
    }


    signIn("credentials", {
      username: surname,
      password: emplid,
    });
    // signIn()
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 p-5 max-w-xs w-full bg-white shadow-lg rounded-lg"
    >
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Incorrect credentials"
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">ID</label>
          <input
            onChange={(e) => setEmplid(e.target.value)}
            value={emplid}
            type="text"
            className="p-3 border border-slate-700 rounded-lg"
            id="name"
            placeholder="23381100"
            required
          />
        </div>
        <div className="flex mt-2 flex-col gap-2">
          <label htmlFor="password">Surname</label>
          <input
            onChange={(e) => setSurname(e.target.value)}
            value={surname}
            type="text"
            id="password"
            className="p-3 border border-slate-700 rounded-lg"
            placeholder="Doe"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500"
      >
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;