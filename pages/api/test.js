export default async function handler(req, res) {
  try {
    return res.status(200).json({ success: true, message: "Next is CoOool" });
  } catch (err) {
    res.return(500).json({ success: false, message: "Something went wrong" });
  }
}
