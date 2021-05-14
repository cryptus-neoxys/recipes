import { Layout } from "@components/Layout";
import { RecipeCard } from "@components/RecipeCard";

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
  const res = await fetch("http://localhost:3000/api/user");
  const data = await res.json();
  const users = data.data;
  const paths = users.map((user) => ({
    params: { id: user.email.split("@")[0] },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  let res = await fetch(`http://localhost:3000/api/user/${params.id}`);
  let data = await res.json();
  if (data.success) {
    const user = data.data;
    res = await fetch(`http://localhost:3000/api/recipe/user/${user._id}`);
    data = await res.json();

    const recipes = data.data;
    return { props: { user, recipes } };
  }

  return { props: { error: true } };
}
