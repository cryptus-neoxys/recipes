import dbConnect from "../../../utils/dbConnect";
import Recipe from "../../../models/Recipe";

export default async function handler(req, res) {
  const {
    method,
    body: { ingredientIds },
  } = req;

  try {
    if (method !== "GET") {
      return res
        .status(405)
        .json({ success: false, message: "Method not allowed" });
    }
    await dbConnect();
    const Recipes = await Recipe.find({ ingredients: ingredientIds });
    if (!Recipes) {
      return res
        .status(404)
        .json({ success: false, message: "No recipes found" });
    }

    return res.status(200).json({ success: true, recipes: Recipes });
  } catch (error) {
    console.error(error);

    res.status(500).json({ success: false, message: "Something went wrong" });
  }
}
