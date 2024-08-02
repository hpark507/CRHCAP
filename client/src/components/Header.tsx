import React from "react";

import Button from "@mui/material/Button";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { useEffect, useState } from "react";

import { signOut } from "next-auth/react";
interface HeaderProps {
  emplid?: string;
  surname?: string;
  verifyForSurname?: string[];
}

const Header: React.FC<HeaderProps> = ({ emplid, surname, verifyForSurname }) => {
  const [called, setCalled] = useState(false);


  useEffect(() =>  {
    new Promise((resolve) => setTimeout(resolve, 2000));
    const timer = setTimeout(() => {
      if ((!emplid && !surname) || (emplid === "" && surname === "")) {
        if (!called) {
          setCalled(true);
          return;
        }
        setOpen(true);
        signOut();
      }
      if (verifyForSurname && verifyForSurname.length > 0) {
        // console.log("verifyForSurname", verifyForSurname, surname, verifyForSurname.includes(surname ?? ""));
        if (!verifyForSurname.includes(surname ?? "")) {
          console.log("surname is not valid");
          setOpen(true);
          signOut();
          // go to /
          window.location.href = "/";
        }
      }
    }, 1000);

    // Cleanup function to clear the timeout if component unmounts or values change
    return () => clearTimeout(timer);
  }, [emplid, surname]);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        emplid: {emplid && <span>{emplid} </span>} | surname:{" "}
        {surname && <span>{surname}</span>}
      </div>
      {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Logging Out"
      />
      <button
        onClick={() => signOut()}
        className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        <span className="text-sm">Sign Out</span>
      </button>
    </div>
  );
};

export default Header;
