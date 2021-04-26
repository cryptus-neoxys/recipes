import React, { useEffect, useState } from "react";
import ReactTags from "react-tag-autocomplete";
import { useForm, Controller } from "react-hook-form";
import { Checkbox } from "@material-ui/core";
import { Layout } from "./Layout";

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
    } catch (error) {}
  };

  useEffect(() => {
    fetchIngridents();
  }, []);

  return (
    <div className="10 mx-auto">
      <form
        className="max-w-xl mx-auto bg-gray-100"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="text-lg font-medium">
          <label className="block mx-2">
            Name <span className="text-red-700"> *</span>
          </label>
          <input
            className="bg-gray-50 p-2 border-gray-400 rounded-md outline-none"
            {...register("name", { required: true })}
          />
          {errors?.name}
          <br />
        </div>

        <div className="text-lg font-medium">
          <label className="block mx-2">Image URL</label>
          <input
            className="bg-gray-50 p-2 border-gray-400 rounded-md outline-none"
            {...register("imageUrl")}
          />
          <br />
        </div>
        <div className="text-lg font-medium">
          <label className="block mx-2">
            Prep Time <span className="text-red-700"> *</span>
          </label>
          <input
            className="bg-gray-50 p-2 border-gray-400 rounded-md outline-none"
            {...register("prepTime", { required: true })}
          />
          {errors?.prepTime}
          <br />
        </div>

        <div className="text-lg font-medium">
          <label className="block mx-2">
            Cook Time <span className="text-red-700"> *</span>
          </label>
          <input
            className="bg-gray-50 p-2 border-gray-400 rounded-md outline-none"
            {...register("cookTime", { required: true })}
          />
          {errors?.cookTime}
          <br />
        </div>

        <div className="text-lg font-medium">
          <label className="block mx-2">Difficulty</label>
          <input
            className="bg-gray-50 p-2 border-gray-400 rounded-md outline-none"
            {...register("difficulty")}
          />
          <br />
        </div>

        <div className="text-lg font-medium">
          <label className="block mx-2">Serves</label>
          <input
            className="bg-gray-50 p-2 border-gray-400 rounded-md outline-none"
            {...register("serves")}
          />
          <br />
        </div>

        <div className="text-lg font-medium">
          <label className="block mx-2">
            Description <span className="text-red-700"> *</span>
          </label>
          <textarea
            className="bg-gray-50 w-max p-2 border-gray-400 rounded-md outline-none"
            {...register("description", { required: true })}
          />
          {errors?.description}
          <br />
        </div>

        <div className="text-lg font-medium">
          <label>Ingredients: </label>

          {/* {ingredients.tags.reduce((acc, item) => `${acc},${item.name}`, "")} */}
          <div className="flex flex-wrap">
            {ingredients.tags.map((item, key) => {
              return (
                <div className="w-max box-border px-3 py-1 mr-2 bg-gray-300 rounded-lg">
                  {item.name}{" "}
                  <span
                    className="text-2xl cursor-pointer"
                    onClick={() => {
                      onDelete(item);
                    }}>
                    &#215;
                  </span>
                </div>
              );
            })}
          </div>

          <div className="m-2 bg-white border-gray-400 rounded-md outline-none">
            <ReactTags
              className=""
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
        </div>

        <div className="dw-full text-lg font-medium">
          <label className="block mx-2">
            Instruction <span className="text-red-700"> *</span>
          </label>
          <textarea
            className="bg-gray-50 w-full m-2 border-gray-400 rounded-md outline-none"
            {...register("instruction", { required: true })}
          />
          {errors?.instruction}
          <br />
        </div>

        <input
          type="submit"
          className="px-4 py-2 text-lg font-bold border-4 border-gray-400 rounded-lg"
        />
      </form>
    </div>
  );
}
