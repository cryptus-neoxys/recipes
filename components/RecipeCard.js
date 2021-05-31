import { useRouter } from "next/router";
import React from "react";
import { signIn, useSession } from "next-auth/client";

const Tag = ({ ingredient }) => {
  return (
    <p className="p-1 px-2 mb-2 mr-2 text-xs font-bold text-gray-600 bg-white rounded-md">
      {ingredient}
    </p>
  );
};

export const RecipeCard = ({ recipe, id, bookmark, email }) => {
  const router = useRouter();
  const [session, loading] = useSession();

  const handleBookmark = async () => {
    console.log(email, bookmark, recipe._id);
    if (email) {
      const res = await fetch("/api/user/bookmark", {
        body: JSON.stringify({
          email: email,
          recipeId: recipe._id,
        }),
        method: "POST",
      });
      console.log(res);
      router.push(`/user/${session.user.email.split("@")[0]}`);
    } else {
      signIn("google");
    }
  };

  return (
    <div className="flex flex-col m-4">
      <div
        className="h-[250px] w-[250px]  bg-cover bg-center bg-no-repeat  rounded-t-3xl"
        style={{
          backgroundImage: `url(${recipe.image || "/fallback.png"})`,
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
          {recipe.tags.slice(0, 5).map((ingredient, key) => {
            return <Tag ingredient={ingredient.name} key={key} />;
          })}
        </div>

        <div className="flex flex-row-reverse justify-between mt-5">
          <img
            id={id}
            src="/arrow.png"
            className="h-[20px] self-end cursor-pointer recipe-select"
            onClick={() => {
              router.push(`/recipe/${recipe._id}`);
            }}
          />

          <div onClick={() => handleBookmark()} className="cursor-pointer">
            {email ? (
              bookmark === -1 ? (
                <img src="/no-bookmark.png" className="h-[25px]" />
              ) : (
                <img src="/bookmark.png" className="h-[25px]" />
              )
            ) : (
              <img src="/no-bookmark.png" className="h-[25px]" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
