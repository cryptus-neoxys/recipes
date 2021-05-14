import { Layout } from "@components/Layout";
import { RecipeCard } from "@components/RecipeCard";
import dbConnect from "../../utils/dbConnect";
import User from "./../../models/User";
import Recipe from "../../models/Recipe";

export default ({ user, recipes, error }) => {
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
          <div className="flex flex-row flex-wrap mb-6">
            {recipes &&
              recipes.map((recipe, key) => {
                return <RecipeCard recipe={recipe} key={key} />;
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  await dbConnect();
  const res = await User.find();
  const users = JSON.parse(JSON.stringify(res));
  const paths = users.map((user) => ({
    params: { id: user.email.split("@")[0] },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  await dbConnect();
  let res = await User.findOne({ email: `${params.id}@gmail.com` });
  const user = JSON.parse(JSON.stringify(res));

  if (user) {
    let res = await Recipe.find({ author: user._id }).populate("tags");
    const recipes = await JSON.parse(JSON.stringify(res));
    return { props: { user, recipes } };
  }
}
