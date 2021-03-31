const fauna = require("faunadb");
const faunaClient = new fauna.Client({ secret: process.env.FAUNADB_SECRET });
const q = fauna.query;

const getRecipes = async () => {
  const { data } = await faunaClient.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("recipes"))),
      q.Lambda("ref", q.Get(q.Var("ref")))
    )
  );

  const recipes = data.map((recipe) => {
    recipe.id = recipe.ref.id;
    delete recipe.ref;
    return recipe;
  });

  return recipes;
};

export { getRecipes };
