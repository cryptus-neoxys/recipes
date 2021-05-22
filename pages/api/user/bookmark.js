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
        const body = JSON.parse(req.body);

        const { recipeId, email } = body;

        const user = User.find({ email: email });

        if (!user) {
          return res.return(204).json({ success: false });
        }

        user.update({ $push: { bookmarks: recipeId } });

        return res.status(200).json({ success: true, data: user });
      } catch (err) {
        console.error(err);
      }
    }
    default:
      res.return(405).json({ success: false, message: "Bad Request" });
  }
}
