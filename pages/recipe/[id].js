import Header from "@components/Header";
import Recipe from "@components/Recipe";
import { Layout } from "@components/Layout";

const sq = [
  "Orange Juice",
  "Soy Sauce",
  "Lemon Juice",
]

export default ({ recipe }) => {
  console.log(recipe);
  return (
    <Layout title={recipe.name}>
      <div>
        <Header />
        <Recipe recipe={recipe} sq={sq} />
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/recipe");

  const data = await res.json();
  const recipes = data.data;
  const paths = recipes.map((recipe) => ({
    params: { id: recipe._id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/recipe/${params.id}`);
  const data = await res.json();
  const recipe = data.data;

  return { props: { recipe } };
}
