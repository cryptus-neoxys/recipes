import { model, Schema, models } from "mongoose";
import Ingredient from "./Ingredient";
import User from "./User";

const RecipeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please specify the name of recipe."],
    },
    video: {
      type: String,
    },
    image: {
      type: String,
    },
    ingredients: [{ type: String }],
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Ingredient",
      },
    ],
    prepTime: {
      type: String,
      required: [true, "Please specify the prep time of recipe."],
    },
    cookTime: {
      type: String,
      required: [true, "Please specify the cook time of recipe."],
    },
    serves: Number,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    directions: [
      {
        type: String,
        required: [true, "Please specify the instruction of recipe."],
      },
    ],
    nutrition: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// export default models.Recipe || model("Recipe", RecipeSchema);

export default models.Recipe || model("Recipe", RecipeSchema);

/* 
_id
video
images
ingredients
tags
directions
nutrition
name
cook
prep
serves
author
*/
