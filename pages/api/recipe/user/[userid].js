import dbConnect from "../../../../utils/dbConnect";
import Recipe from "../../../../models/Recipe";

export default async function handler(req, res) {
  const {
    query: { userid },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const recipe = await Recipe.find({ author: userid }).populate("tags");
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

    default:
      return res.status(405).json({ success: false });
  }
}
