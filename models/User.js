import { model, Schema, models } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please specify the name of the user."],
  },
  email: {
    type: String,
    required: [true, "Please specify the email of the user."],
  },
  image: String,
});

export default models.User || model("User", UserSchema);
