import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/client";
import { useRouter } from "next/router";

export const Nav = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  return (
    <div className="flex flex-row justify-between ">
      <div>
        <Link href="/">
          <img src={"/logo.png"} className="h-16 m-6 cursor-pointer" />
        </Link>
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
      <div className="flex items-center p-6">
        {/* <Link href="/recipe/new">
          <button className="px-3 py-2 mx-3 font-bold text-white bg-black border border-black rounded-lg hover:bg-white hover:text-black hover:rounded-lg">
            Create Recipe!
          </button>
        </Link> */}

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
            <img src={session.user.image} className="h-8 mr-2 rounded-full" />
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
