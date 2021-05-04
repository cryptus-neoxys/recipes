import { model, Schema, models } from "mongoose";
import Ingredient from "./Ingredient";

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
    ingredients: [
      {
        type: Schema.Types.ObjectId,
        ref: "Ingredient",
      },
    ],
    instruction: {
      type: String,
      required: [true, "Please specify the instruction of recipe."],
    },
  },
  {
    timestamps: true,
  }
);

// export default models.Recipe || model("Recipe", RecipeSchema);

export default models.Recipe || model("Recipe", RecipeSchema);
