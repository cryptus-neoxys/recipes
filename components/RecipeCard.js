import React from "react";
import { useState } from "react";

const Tag = ({ ingredient }) => {
  return (
    <p className="p-1 px-2 mb-2 mr-2 text-xs font-bold text-gray-600 bg-white rounded-md">
      {ingredient}
    </p>
  );
};

export const RecipeCard = ({ recipe }) => {
  return (
    <div className="flex flex-col m-4">
      <div
        className="h-[250px] w-[250px]  bg-cover bg-center bg-no-repeat  rounded-t-3xl"
        style={{
          backgroundImage: `url(${recipe.imageUrl || "/fallback.png"})`,
        }}
      ></div>
      <div className="flex flex-col p-3 text-white bg-black ">
        <div className="flex flex-row items-center justify-between">
          <div className="font-bold text-1xl w-[150px] break-words">
            {recipe.name}
          </div>

          <div className="text-xs ">{recipe.cookTime}</div>
        </div>

        <div className="flex flex-row flex-wrap mt-4 text-sm text-left text-wrap w-[200px]">
          {/* {recipe.ingredients.slice(0, 3).join(", ")} */}
          {recipe.ingredients.map((ingredient, key) => {
            return <Tag ingredient={ingredient.name} key={key} />;
          })}
        </div>
      </div>
    </div>
  );
};