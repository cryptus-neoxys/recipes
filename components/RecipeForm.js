import React from "react";
import { useForm } from "react-hook-form";

export function RecipeForm({ recipe }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it
  console.log(watch("exampleRequired"));

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

      <label>Ingredients</label>
      <input {...register("ingredients", { required: true })} />
      {errors.ingredients && <span>Ingredients is required.</span>}
      <br />

      <label>Instruction</label>
      <textarea {...register("instruction", { required: true })} />
      {errors.instruction && <span>Instruction is required.</span>}
      <br />

      <input type="submit" />
    </form>
  );
}
