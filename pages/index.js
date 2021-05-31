import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { useSession } from "next-auth/client";
import { SearchBar } from "./../components/SearchBar";
import { RecipeCard } from "@components/RecipeCard";
import Link from "next/link";

export default function Home() {
  const [session, loading] = useSession();
  const [recipes, setRecipes] = useState(false);
  const [ingredients, setIngredients] = useState({
    tags: [],
    suggestions: [],
  });

  const onDelete = (i) => {
    let temp = ingredients.tags;
    temp.splice(temp.indexOf(i), 1);
    setIngredients({ suggestions: ingredients.suggestions, tags: temp });
  };

  const search = async () => {
    const ingredientsId = ingredients.tags.map((item) => item.id);
    console.log(ingredientsId);
    try {
      let data = await fetch(`/api/recipe/search`, {
        method: "POST",
        body: JSON.stringify({
          ingredients: ingredientsId,
        }),
      });
      data = await data.json();
      console.log(data);
      console.log(session, "Index");
      setRecipes(data.recipes);
    } catch (err) {
      console.log(err);
    }
  };

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
    fetchIngridents();
  }, []);

  useEffect(() => {
    search();
  }, [ingredients]);

  return (
    <Layout title={"HOME"}>
      <div className="flex flex-col items-center justify-center">
        <div className=" flex flex-row items-center justify-center w-1/2">
          <div className="w-full">
            <SearchBar
              ingredients={ingredients}
              setIngredients={setIngredients}
            />
          </div>
          <button
            id="search-button"
            onClick={search}
            className="hover:bg-white hover:text-black hover:rounded-lg px-3 py-2 mx-3 font-bold text-white bg-black border border-black rounded-lg">
            SEARCH
          </button>
          <Link href="/recipe/new">
            <button
              id="create-button"
              className="hover:bg-white hover:text-black hover:rounded-lg self-center px-3 py-2 mr-3 font-bold text-white bg-black border border-black rounded-lg">
              CREATE
            </button>
          </Link>
        </div>
        <div className=" flex flex-row flex-wrap justify-start w-1/2">
          {ingredients.tags.map((item, key) => {
            return (
              <div
                key={key}
                className="w-max box-border flex flex-row items-center justify-center px-3 py-1 my-2 mr-2 bg-gray-300 rounded-lg">
                {item.name}{" "}
                <span
                  className="text-2xl cursor-pointer"
                  onClick={() => {
                    onDelete(item);
                  }}>
                  &#215;
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex flex-row flex-wrap justify-center w-2/3 mb-6">
          {recipes &&
            recipes.map((recipe, key) => {
              return (
                <RecipeCard
                  recipe={recipe}
                  key={key}
                  id={`recipe-${key}-link`}
                  bookmark={session?.user.bookmarks.indexOf(recipe._id)}
                  email={session?.user.email}
                />
              );
            })}
        </div>
      </div>
    </Layout>
  );
}

// export const getServerSideProps = withPageAuthRequired();
