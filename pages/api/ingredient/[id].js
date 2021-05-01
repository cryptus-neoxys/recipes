import dbConnect from "../../../utils/dbConnect";
import Ingredient from "../../../models/Ingredient";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const ingredient = await Ingredient.findById(id);
        if (!ingredient) {
          return res
            .status(404)
            .json({ success: false, message: "No ingredient found" });
        }
        return res.status(200).json({ success: true, data: ingredient });
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
        const ingredient = await Ingredient.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!ingredient) {
          return res
            .status(400)
            .json({ success: false, message: "No Such Ingredient" });
        }
        return res.status(200).json({ success: true, data: ingredient });
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
        const ingredient = await Ingredient.findByIdAndDelete(id);
        if (!ingredient) {
          return res
            .status(400)
            .json({ success: false, message: "No Such Ingredient" });
        }
        return res.status(200).json({ success: true, data: ingredient });
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
