import React from "react";

import { signOut } from "next-auth/react";

function Header() {
  return (
    <div className="">
      <button
        onClick={() => signOut()}
        className="float-right px-5 text-sm text-danger"
        // focus:outline-none text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2
      >
        <span className="text-sm">Sign Out</span>
      </button>
    </div>
  );
}

export default Header;
