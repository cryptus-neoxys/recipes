import Link from "next/link";
import Head from "next/head";

import { Nav } from "./Nav";

export function Layout({ children, title = "This is the default title" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="header">
        <Nav />
      </div>

      <div className="main">{children}</div>

      {/* <footer>{"I`m here to stay"}</footer> */}
    </>
  );
}
