import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const users = await User.find();
        return res.status(200).json({ success: true, data: users });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ success: false, message: "Something went wrong" });
      }
      break;
    case "POST":
      try {
        const body = JSON.parse(req.body);
        const { name, email } = body;
        const user = await User.create({ name, email });

        res.status(201).json({ success: true, data: user });
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
