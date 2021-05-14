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

export async function getServerSideProps(context) {
  await dbConnect();
  const res = await Recipe.findById(context.params.id);
  if (!res) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    const recipe = JSON.parse(JSON.stringify(res));
    return { props: { recipe } };
  }
}
