import { useEffect, useState } from "react";
import { Layout } from "@components/Layout";
import { RecipeCard } from "@components/RecipeCard";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

export default () => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [recipes, setRecipes] = useState(false);
  const [user, setUser] = useState(false);

  const { id } = router.query;

  const fetchRecipes = async () => {
    try {
      let user = await fetch(`/api/user/${id}`, {
        method: "GET",
      });
      user = await user.json();
      console.log(user);
      if (user.success === true) {
        setUser(user.data);
      }
      // console.log(user);

      if (user) {
        let data = await fetch(`/api/recipe/user/${user.data._id}`, {
          method: "GET",
        });
        data = await data.json();
        console.log(data);
        setRecipes(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const fetchRecipes = async () =>

  useEffect(() => {
    fetchRecipes();
  }, [router.query.id]);

  return (
    <Layout>
      <div className="w-2/3 mx-auto">
        {user ? (
          <div>
            <div className="text-4xl">{user.name}</div>

            <div className="mt-4 text-xl">
              Recipes created by {user.email.split("@")[0]}:
            </div>
            <div className="flex flex-row flex-wrap mb-6">
              {recipes &&
                recipes.map((recipe, key) => {
                  return <RecipeCard recipe={recipe} key={key} />;
                })}
            </div>
          </div>
        ) : (
          <div className="text-4xl"> User not found :( </div>
        )}
      </div>
    </Layout>
  );
};
