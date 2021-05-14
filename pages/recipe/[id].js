import { Layout } from "@components/Layout";
import dbConnect from "../../utils/dbConnect";
import Recipe from "../../models/Recipe";

export default ({ recipe }) => {
  console.log(recipe);
  return (
    <Layout title={recipe.name}>
      <div className="p-3">
        <div>
          <h1 className="text-2xl">{recipe.name}</h1>
          <img src={recipe.image} className="h-[300px]" />
          <div>
            <div>Method:</div>
            <div>{recipe.directions.join(" ")}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  await dbConnect();

  const res = await Recipe.find().populate("tags");
  const recipes = JSON.parse(JSON.stringify(res));

  const paths = recipes.map((recipe) => ({
    params: { id: recipe._id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  await dbConnect();
  const res = await Recipe.findById(params.id);
  const recipe = JSON.parse(JSON.stringify(res));
  return { props: { recipe } };
}
