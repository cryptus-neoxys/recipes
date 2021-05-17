import React from "react";
import ReactTags from "react-tag-autocomplete";

export const SearchBar = ({ ingredients, setIngredients }) => {
  const onDelete = (i) => {
    let temp = ingredients.tags;
    temp.splice(temp.indexOf(i), 1);
    setIngredients({ suggestions: ingredients.suggestions, tags: temp });
  };

  const onAddition = (tag) => {
    if (ingredients.tags.indexOf(tag) == -1) {
      setIngredients({
        suggestions: ingredients.suggestions,
        tags: [].concat(ingredients.tags, tag),
      });
    }
  };
  return (
    <ReactTags
      id={"id"}
      className=""
      suggestions={ingredients?.suggestions}
      noSuggestionsText={
        ingredients?.suggestions.length !== 0
          ? "No matching ingredients"
          : "Ingredients Loading"
      }
      onDelete={onDelete}
      onAddition={onAddition}
      placeholderText={"Add New"}
    />
  );
};
