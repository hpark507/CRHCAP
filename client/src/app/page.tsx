"use client"
import Link from "next/link";
import { useSession, SessionProvider } from "next-auth/react";
import Report from "@/components/report_component";
import { useEffect } from "react";

export default function Home() {
  // const session = await getServerSession(authOptions);
  const { data: session , status} = useSession();
  // let user = "";
  // useEffect(() => {
  //   console.log("Session: ", session);
  //   cons user = session?.user;
  // }, [session]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      {session?.user ? (
        // <UserInfo user={user} />
        <Report
          reportProps={{
            user_id: session?.user?.email as string,
            table_id: "1",
          }}
        />
      ) : (
        <div
          className="flex flex-col justify-center gap-2 p-5 w-fit shadow-lg rounded-lg"
          style={{ minHeight: "25em" }}
        >
          <h1 className="items-center text-2xl font-bold">
            Crowd Learning Human Capita Innovative
          </h1>
          <p className="flex gap-2"></p>
          <div className="flex justify-between">
            <div>
              <Link href="/about">
                <span className="float-right text-blue-500 cursor-pointer hover:underline ml-4">
                  About
                </span>
              </Link>
            </div>
            <Link href="/signin">
              <span className="text-blue-500 cursor-pointer hover:underline">
                Sign In
              </span>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
