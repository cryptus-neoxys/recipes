import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        let email = `${id}@gmail.com`;

        const user = await User.findOne({ email: email });
        if (!user) {
          return res
            .status(400)
            .json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, data: user });
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
