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

export async function getServerSideProps(context) {
  await dbConnect();
  let res = await User.findOne({ email: `${context.params.id}@gmail.com` });
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
