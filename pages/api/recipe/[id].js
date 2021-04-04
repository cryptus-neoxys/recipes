import dbConnect from "../../../utils/dbConnect";
import Recipe from "../../../models/Recipe";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const recipe = await Recipe.findById(id);
        if (!recipe) {
          return res
            .status(400)
            .json({ success: false, message: "No such Recipe" });
        }
        return res.status(200).json({ success: true, data: recipe });
      } catch (error) {
        console.error(error);

        return res.status(500).json({
          success: false,
          message: "Something went wrong",
          error: error.errors,
        });
      }

    case "PUT":
      try {
        const recipe = await Recipe.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!recipe) {
          return res
            .status(400)
            .json({ success: false, message: "No Such Recipe" });
        }
        return res.status(200).json({ success: true, data: recipe });
      } catch (error) {
        console.error(error);

        return res.status(500).json({
          success: false,
          message: "Something went wrong",
          error: error.errors,
        });
      }
    case "DELETE":
      try {
        const recipe = await Recipe.findByIdAndDelete(id);
        if (!recipe) {
          return res
            .status(400)
            .json({ success: false, message: "No Such Recipe" });
        }
        return res.status(200).json({ success: true, data: recipe });
      } catch (error) {
        console.error(error);

        return res.status(500).json({
          success: false,
          message: "Something went wrong",
          error: error.errors,
        });
      }
  }
}
