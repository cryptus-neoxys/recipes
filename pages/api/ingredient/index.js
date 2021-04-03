import dbConnect from "../../../utils/dbConnect";
import Ingredient from "../../../models/Ingredient";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const ingredients = await Ingredient.find(); // Get all recipes

        res.status(200).json({ success: true, data: ingredients });
      } catch (error) {
        console.error(error?.errors);

        res.status(500).json({
          success: false,
          message: "Something went wrong",
          error: error?.errors,
        });
      }
      break;
    case "POST":
      try {
        const ingredient = await Ingredient.create(req.body);

        res.status(201).json({ success: true, data: ingredient });
      } catch (error) {
        console.error(error);

        res
          .status(500)
          .json({ success: false, message: "Something went wrong", error });
      }
      break;
    default:
      res.return(405).json({ success: false, message: "Bad Request" });
  }
}
