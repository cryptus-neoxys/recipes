import { useEffect, useState } from "react";
import { Layout } from "@components/Layout";
import { RecipeCard } from "@components/RecipeCard";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

export default () => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [recipes, setRecipes] = useState(false);
  const { id } = router.query;

  const fetchRecipes = async () => {
    try {
      let data = await fetch(`/api/recipe/search`, {
        method: "POST",
        body: JSON.stringify({
          ingredients: ["60860d49f43cb63524e04bfd", "60860d49f43cb63524e04bcc"],
        }),
      });
      data = await data.json();
      console.log(data);
      setRecipes(data.recipes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (session?.user.email.split("@")[0] === id) {
      fetchRecipes();
    } else {
      useRouter.push("/");
    }
  }, []);

  return (
    <Layout>
      <div className="w-2/3 mx-auto">
        <div className="text-4xl">{session?.user.name}</div>
        <div className="mt-4 text-xl">Recipes created by user:</div>
        <div className="flex flex-row flex-wrap mb-6">
          {recipes &&
            recipes.map((recipe, key) => {
              return <RecipeCard recipe={recipe} key={key} />;
            })}
        </div>
      </div>
    </Layout>
  );
};
