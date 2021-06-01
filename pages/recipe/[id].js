import { Layout } from "@components/Layout";
import dbConnect from "../../utils/dbConnect";
import Recipe from "../../models/Recipe";
import Header from "@components/Header";
import Recipes from "@components/Recipe";
const sq = ["Orange Juice", "Soy Sauce", "Lemon Juice"];
export default ({ recipe }) => {
  console.log(recipe);
  return (
    <Layout title={recipe.name}>
      {/* <Header/> */}
      <Recipes recipe={recipe} sq={sq} />
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
