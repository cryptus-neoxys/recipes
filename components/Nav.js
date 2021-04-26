import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/client";

export const Nav = () => {
  const [session, loading] = useSession();

  return (
    <div className="flex flex-row justify-between ">
      <div>
        <img src={"/logo.jpg"} className="h-32" />
      </div>
      {/* <div className="flex">
        <div className="mx-2">
          <Link href={"/"}>Home</Link>
        </div>
        <div className="mx-2">
          <Link href={"/about"}>About</Link>
        </div>
        <div className="mx-2">
          <Link href={"/team"}>Team</Link>
        </div>
      </div> */}
      <div className="p-3">
        {session ? (
          <div
            className="flex flex-row items-center justify-center p-1 px-2 border border-black rounded-lg cursor-pointer"
            onClick={() => {
              let r = confirm("Do you want to logout?");
              if (r) {
                signOut();
              }
            }}
          >
            <img src={session.user.image} className="h-8 rounded-full" />
            {session.user.name} <br />
            {/* <button onClick={() => signOut()}>Sign out</button> */}
          </div>
        ) : (
          <div
            className="flex flex-row items-center justify-center p-1 px-2 border border-black rounded-lg cursor-pointer"
            onClick={() => signIn("google")}
          >
            <img src="/google_logo.png" className="pr-2 h-7" />
            Sign in
          </div>
        )}
      </div>
    </div>
  );
};
