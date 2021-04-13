import React from "react";
import { RecipeForm } from "@components/RecipeForm";
import { Layout } from "@components/Layout";

export default function Home() {
  return (
    <Layout title={"New"}>
      <RecipeForm />
    </Layout>
  );
}
