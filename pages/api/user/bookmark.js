import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case "POST": {
      try {
        let body = req.body;
        if (typeof body !== "object") {
          body = JSON.parse(req.body);
        }
        console.log(body);

        const { recipeId, email } = body;

        const user = await User.findOne({ email: email });

        if (!user) {
          return res.status(204).json({ success: false });
        }

        console.log(user);
        let recipeIndex = user.bookmarks.indexOf(recipeId);
        if (recipeIndex !== -1) {
          user.bookmarks.splice(recipeIndex, 1);
        } else {
          user.bookmarks.unshift(recipeId);
        }
        await user.save();

        return res.status(200).json({ success: true, data: user });
      } catch (err) {
        console.error(err);
        return res
          .return(500)
          .json({ success: false, error: "Something went wrong" });
      }
    }
    default:
      return res.status(405).json({ success: false, message: "Bad Request" });
  }
}
