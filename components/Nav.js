import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/client";

export const Nav = () => {
  const [session, loading] = useSession();

  return (
    <div className="flex flex-row justify-between p-3">
      <div>LOGO</div>
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
      <div>
        {session ? (
          <>
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <>
            Not signed in <br />
            <button onClick={() => signIn("google")}>Google Sign in</button>
          </>
        )}
      </div>
    </div>
  );
};
