import { Layout } from "@components/Layout";

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
