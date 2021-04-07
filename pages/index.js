import { useEffect } from "react";
import Head from "next/head";
import { Layout } from "../components/Layout";
import { useSession } from "next-auth/client";

export default function Home() {
  const [session, loading] = useSession();

  useEffect(() => {
    console.log({ session });
  }, [session]);

  return (
    <Layout title={"HOME"}>
      <div className="flex justify-center">
        <h1 className="text-9xl">hello world</h1>
      </div>
    </Layout>
  );
}
