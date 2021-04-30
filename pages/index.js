import { useEffect, useState } from "react";
import Head from "next/head";
import { Layout } from "../components/Layout";
import { useSession } from "next-auth/client";
import { SearchBar } from "./../components/SearchBar";

export default function Home() {
  const [session, loading] = useSession();
  const [ingredients, setIngredients] = useState({
    tags: [],
    suggestions: [],
  });

  const fetchIngridents = async () => {
    try {
      let data = await fetch(`/api/ingredient`, { method: "GET" });
      data = await data.json();
      let suggestionsList = data.data.map((item) => {
        return { id: item["_id"], name: item["name"] };
      });
      setIngredients({
        suggestions: suggestionsList,
        tags: [],
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log({ session });
    fetchIngridents();
  }, [session]);

  return (
    <Layout title={"HOME"}>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-9xl">Find your recipie!</h1>
        <div className="flex items-center justify-center w-1/2 m-5">
          <div className="w-full">
            <SearchBar
              ingredients={ingredients}
              setIngredients={setIngredients}
            />
          </div>
          <button className="px-3 py-2 mx-3 font-bold text-white bg-black border border-black rounded-lg hover:bg-white hover:text-black hover:rounded-lg">
            SEARCH
          </button>
        </div>
        <div className="flex flex-row flex-wrap justify-start w-1/2 mx-2">
          {ingredients.tags.map((item, key) => {
            return (
              <div
                key={key}
                className="box-border flex flex-row items-center justify-center px-3 py-1 my-2 mr-2 bg-gray-300 rounded-lg w-max"
              >
                {item.name}{" "}
                <span
                  className="text-2xl cursor-pointer"
                  onClick={() => {
                    onDelete(item);
                  }}
                >
                  &#215;
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
