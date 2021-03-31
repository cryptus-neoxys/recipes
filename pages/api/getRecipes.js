import { getRecipes } from "../../utils/Fauna";
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405);
  }

  try {
    const recipes = await getRecipes();

    return res.status(200).json(recipes);
  } catch (err) {
    console.error(err);
  }
}
