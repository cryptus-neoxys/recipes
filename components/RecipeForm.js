import React, { useEffect, useState } from "react";
import ReactTags from "react-tag-autocomplete";
import { useForm, Controller } from "react-hook-form";
import { Checkbox } from "@material-ui/core";

export function RecipeForm({ recipe }) {
  const [ingredients, setIngredients] = useState({
    tags: [],
    suggestions: [],
  });

  const [, rerender] = useState();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data["ingredients"] = ingredients.tags;
    console.log(data);

    //SEND TO data to Mongo
  };

  const onDelete = (i) => {
    let temp = ingredients.tags;
    temp.splice(temp.indexOf(i), 1);
    setIngredients({ suggestions: ingredients.suggestions, tags: temp });
  };

  const onAddition = (tag) => {
    setIngredients({
      suggestions: ingredients.suggestions,
      tags: [].concat(ingredients.tags, tag),
    });
  };

  const fetchIngridents = async () => {
    try {
      let data = await fetch(`/api/ingredient`, { method: "GET" });
      data = await data.json();
      console.log(data.data);
      let suggestionsList = data.data.map((item) => {
        return { id: item["_id"], name: item["name"] };
      });
      setIngredients({
        suggestions: suggestionsList,
        tags: [],
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchIngridents();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <input {...register("name", { required: true })} />
      {errors.name && <span>Name is required</span>}
      <br />

      <label>Image</label>
      <input {...register("imageUrl")} />
      <br />

      <label>Prep Time</label>
      <input {...register("prepTime", { required: true })} />
      {errors.prepTime && <span>Prep Time is required</span>}
      <br />

      <label>Cook Time</label>
      <input {...register("cookTime", { required: true })} />
      {errors.cookTime && <span>Cook time is required</span>}
      <br />

      <label>Difficulty</label>
      <input {...register("difficulty")} />
      <br />

      <label>Serves</label>
      <input {...register("serves")} />
      <br />

      <label>Description</label>
      <textarea {...register("description", { required: true })} />
      {errors.description && <span>Description is required.</span>}
      <br />

      <label>Ingredients: </label>

      {/* {ingredients.tags.reduce((acc, item) => `${acc},${item.name}`, "")} */}
      <ul>
        {ingredients.tags.map((item, key) => {
          return (
            <li
              className="cursor-pointer"
              onClick={() => {
                onDelete(item);
              }}
            >
              {key + 1} {item.name}
            </li>
          );
        })}
      </ul>

      <div className="w-80">
        <ReactTags
          suggestions={ingredients?.suggestions}
          noSuggestionsText={
            ingredients?.suggestions.length !== 0
              ? "No matching ingredients"
              : "Ingredients Loading"
          }
          onDelete={onDelete}
          onAddition={onAddition}
        />
      </div>

      <br />

      <label>Instruction</label>
      <textarea {...register("instruction", { required: true })} />
      {errors.instruction && <span>Instruction is required.</span>}
      <br />

      <input type="submit" />
    </form>
  );
}
