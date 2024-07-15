"use client";
// "use server";
import React, { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { Icons } from "@/components/Icons";

const LoginForm = () => {
  const [emplid, setEmplid] = useState<undefined | string>("");
  const [surname, setSurname] = useState<undefined | string>("");
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    signIn("credentials", {
      username: surname,
      password: emplid,
    });
    signIn()
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 p-5 max-w-xs w-full bg-white shadow-lg rounded-lg"
    >
      {/* <button
        onClick={() => signIn("github")}
        type="button"
        className="flex justify-center gap-4 bg-slate-800 my-4 text-white p-3 rounded-lg hover:bg-slate-700"
      >
        <Icons.github />
        <span> Sign in with Github</span>
      </button>
      <div className="relative my-3">
        <hr />
        <small className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white w-8 text-center">
          Or
        </small>
      </div> */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">EMPLID</label>
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