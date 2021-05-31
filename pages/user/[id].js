import { Layout } from "@components/Layout";
import { RecipeCard } from "@components/RecipeCard";
import dbConnect from "../../utils/dbConnect";
import User from "./../../models/User";
import Recipe from "../../models/Recipe";
import { useSession } from "next-auth/client";

export default ({ user, recipes, error }) => {
  const [session, loading] = useSession();
  return error ? (
    <Layout>No such user</Layout>
  ) : (
    <Layout title={user.name}>
      <div className="w-2/3 mx-auto">
        <div>
          <div className="text-4xl">{user.name}</div>

          <div className="mt-4 text-xl">
            Recipes created by {user.email.split("@")[0]}:
          </div>
          <h1 className="text-[#8D3F3F] font-medium text-5xl tracking-wider px-5 lg:pl-36 max-w-2xl mt-16 capitalize">
            Your Recipes
          </h1>
          <div className="flex flex-row flex-wrap mb-6">
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
          <h1 className="text-[#8D3F3F] font-medium text-5xl tracking-wider px-5 lg:pl-36 max-w-2xl mt-16 capitalize">
            Bookmarked Recipes
          </h1>
          <div className="flex flex-row flex-wrap mb-6">
            {user.bookmarks &&
              user.bookmarks.map((recipe, key) => {
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
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  await dbConnect();
  let res = await User.findOne({
    email: `${context.params.id}@gmail.com`,
  }).populate({
    path: "bookmarks",
    populate: { path: "tags" },
  });
  if (!res) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    const user = await JSON.parse(JSON.stringify(res));
    res = await Recipe.find({ author: user._id }).populate("tags");
    const recipes = await JSON.parse(JSON.stringify(res));
    return { props: { user, recipes } };
  }
}
