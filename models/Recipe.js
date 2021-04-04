import { model, Schema, models } from "mongoose";

const RecipeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please specify the name of recipe."],
    },
    image: {
      type: String,
    },
    prepTime: {
      type: String,
      required: [true, "Please specify the prep time of recipe."],
    },
    cookTime: {
      type: String,
      required: [true, "Please specify the cook time of recipe."],
    },
    serves: Number,
    difficulty: {
      type: String,
      required: [true, "Please specify the difficulty of recipe."],
    },
    description: {
      type: String,
      required: [true, "Please specify the description of recipe."],
    },
    ingredients: {
      type: [Schema.Types.ObjectId],
      ref: "ingredients",
    },
    preperation: {
      type: String,
      required: [true, "Please specify the preperation of recipe."],
    },
  },
  {
    timestamps: true,
  }
);

export default models.Recipe || model("Recipe", RecipeSchema);
