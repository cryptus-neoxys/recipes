import { connect } from "mongoose";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SearchBar } from "./SearchBar";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/client";

export function RecipeForm({ recipe }) {
  const [ingredients, setIngredients] = useState({
    tags: [],
    suggestions: [],
  });

  const router = useRouter();
  const [session, loading] = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onDelete = (i) => {
    let temp = ingredients.tags;
    temp.splice(temp.indexOf(i), 1);
    setIngredients({ suggestions: ingredients.suggestions, tags: temp });
  };

  const onSubmit = async (data) => {
    data["ingredients"] = ingredients.tags.map((item) => item.id);
    data["serves"] = parseInt(data["serves"]);
    console.log(data);

    try {
      const res = await fetch(`/api/recipe`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then((data) => data.json());
      console.log(res);
      if (res.success === true) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchIngridents = async () => {
    try {
      let data = await fetch(`/api/ingredient`, { method: "GET" });
      data = await data.json();
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
    if (!session) {
      console.log({ session });
      signIn("google");
    } else {
      fetchIngridents();
    }
  }, []);

  return !session ? (
    <p>redirecting</p>
  ) : (
    <div className="mx-auto 10">
      <form
        className="max-w-xl p-4 mx-auto bg-gray-100"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="my-3 mb-6 text-4xl text-center">Create a new recipe!</h1>
        <div className="text-lg font-medium">
          <label className="block mx-2">
            Name <span className="text-red-700"> *</span>
          </label>
          <input
            placeholder="Add recipe name"
            className="w-auto p-2 border-gray-400 rounded-md outline-none bg-gray-50"
            {...register("name", { required: true })}
          />
          {errors.name && <span>Name is required</span>}
          <br />
        </div>

        <div className="text-lg font-medium">
          <label className="block mx-2">Image URL</label>
          <input
            placeholder="Add image url"
            className="p-2 border-gray-400 rounded-md outline-none bg-gray-50"
            {...register("imageUrl")}
          />
          <br />
        </div>
        <div className="text-lg font-medium">
          <label className="block mx-2">
            Preparation Time <span className="text-red-700"> *</span>
          </label>
          <input
            placeholder="Add prepartion time"
            className="p-2 border-gray-400 rounded-md outline-none bg-gray-50"
            {...register("prepTime", { required: true })}
          />
          {errors.prepTime && <span>Prep Time is required</span>}
          <br />
        </div>

        <div className="text-lg font-medium">
          <label className="block mx-2">
            Cook Time <span className="text-red-700"> *</span>
          </label>
          <input
            placeholder="Add cook time"
            className="p-2 border-gray-400 rounded-md outline-none bg-gray-50"
            {...register("cookTime", { required: true })}
          />
          {errors.cookTime && <span>Cook time is required</span>}
          <br />
        </div>

        <div className="text-lg font-medium">
          <label className="block mx-2">Difficulty</label>
          <input
            placeholder="Add recipe difficulty"
            className="p-2 border-gray-400 rounded-md outline-none bg-gray-50"
            {...register("difficulty")}
          />
          <br />
        </div>

        <div className="text-lg font-medium">
          <label className="block mx-2">Serves</label>
          <input
            type="number"
            placeholder="Servings"
            className="p-2 border-gray-400 rounded-md outline-none bg-gray-50"
            {...register("serves")}
          />
          <br />
        </div>

        <div className="text-lg font-medium">
          <label className="block mx-2">
            Description <span className="text-red-700"> *</span>
          </label>
          <textarea
            placeholder="Add recipe discription"
            className="p-2 border-gray-400 rounded-md outline-none bg-gray-50 w-max"
            {...register("description", { required: true })}
          />
          {errors.description && <span>Description is required.</span>}
          <br />
        </div>

        <div className="text-lg font-medium">
          <label className="block mx-2">Ingredients: </label>

          <div className="m-2 bg-white border-gray-400 rounded-md outline-none">
            <SearchBar
              ingredients={ingredients}
              setIngredients={setIngredients}
            />
          </div>
          <div className="flex flex-wrap mx-2">
            {ingredients.tags.map((item, key) => {
              return (
                <div
                  key={key}
                  className="box-border flex flex-row items-center justify-center px-3 py-1 mr-2 bg-gray-300 rounded-lg w-max"
                >
                  {item.name}{" "}
                  <span
                    className="text-2xl cursor-pointer "
                    onClick={() => {
                      onDelete(item);
                    }}
                  >
                    &nbsp; &#215;
                  </span>
                </div>
              );
            })}
          </div>

          <br />
        </div>

        <div className="w-full text-lg font-medium">
          <label className="block mx-2">
            Instruction <span className="text-red-700"> *</span>
          </label>
          <textarea
            placeholder="Add instructions"
            className="p-2 border-gray-400 rounded-md outline-none bg-gray-50 w-max"
            {...register("instruction", { required: true })}
          />
          {errors.instruction && <span>Instruction is required.</span>}
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
