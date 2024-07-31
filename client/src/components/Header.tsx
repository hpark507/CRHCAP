import React from "react";

import { signOut } from "next-auth/react";
interface HeaderProps {
  emplid?: string;
  surname?: string;
}

const Header: React.FC<HeaderProps> = ({ emplid, surname}) => {
 
  return (
    <div className="flex justify-between items-center">
      <div>
        emplid: {emplid && <span>{emplid} </span>} |
        surname: {surname && <span>{surname}</span>}
      </div>
      <button
        onClick={() => signOut()}
        className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        <span className="text-sm">Sign Out</span>
      </button>
    </div>
  );
}

export default Header;
