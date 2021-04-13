import React, { useEffect, useState } from "react";
import ReactTags from "react-tag-autocomplete";
import { useForm } from "react-hook-form";

export function RecipeForm({ recipe }) {
  const [ingredients, setIngredients] = useState({
    tags: [],
    suggestions: [],
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  // console.log(watch("example")); // watch input value by passing the name of it
  // console.log(watch("exampleRequired"));

  const onDelete = (i) => {
    console.log(i);
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
    } catch {
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
      {ingredients.suggestions.length && (
        <>
          {ingredients.tags.reduce((acc, item) => `${acc} ${item.name}`, "")}
          <div className="w-80">
            <ReactTags
              suggestions={ingredients.suggestions}
              noSuggestionsText="No matching ingredients"
              onDelete={onDelete}
              onAddition={onAddition}
            />
          </div>
        </>
      )}
      {/* <input {...register("ingredients", { required: true })} />
      {errors.ingredients && <span>Ingredients is required.</span>} */}
      <br />

      <label>Instruction</label>
      <textarea {...register("instruction", { required: true })} />
      {errors.instruction && <span>Instruction is required.</span>}
      <br />

      <input type="submit" />
    </form>
  );
}
