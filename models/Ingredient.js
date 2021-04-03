import { model, models, Schema } from "mongoose";

const IngredientSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please specify the name of the ingredient"],
  },
  ingredientType: {
    type: String,
    required: [true, "Please specify the type of the ingredient"],
  },
});

export default models.Ingredient || model("Ingredient", IngredientSchema);
