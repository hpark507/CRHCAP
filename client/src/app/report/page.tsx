"use client";
import React, { useState } from "react";
import Report from "@/components/report_component";
import { useSession } from "next-auth/react";
interface Row {
  keyword: string;
  reason: string;
  categories: string[];
  quote: string;
  weight: number;
}

const ReportExport: React.FC = async () => {
  const { data: session , status} = useSession();
  const user = session?.user;


  return (
    <Report
      reportProps={{
        user_id: user?.email as string,
        table_id: "1",
      }}
    ></Report>
  );
};

export default ReportExport;
