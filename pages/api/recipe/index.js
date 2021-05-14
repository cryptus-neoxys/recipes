import dbConnect from "../../../utils/dbConnect";
import Recipe from "../../../models/Recipe";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const recipes = await Recipe.find().populate("tags"); // Get all recipes

        res.status(200).json({ success: true, data: recipes });
      } catch (error) {
        console.error(error);

        res
          .status(500)
          .json({ success: false, message: "Something went wrong" });
      }
      break;
    case "POST":
      try {
        const recipe = await Recipe.create(JSON.parse(req.body));

        res.status(201).json({ success: true, data: recipe });
      } catch (error) {
        console.error(error);

        res
          .status(500)
          .json({ success: false, message: "Something went wrong" });
      }
      break;
    default:
      res.return(405).json({ success: false, message: "Bad Request" });
  }
}
