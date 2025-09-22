import React from "react";
import ReactMarkdown from "react-markdown";
import "./Recipe.css"; 

const Recipe = ({ recipeMarkdown }) => {
  
  const cleanedMarkdown = recipeMarkdown.replace(/^.*?(?=###|####)/s, "");

  return (
    <>
      <h2 className="pt-5 pl-5 flex justify-center items-center recipe-title">Suggested Recipe: </h2>
      <div className="recipe-container">
        <ReactMarkdown>{cleanedMarkdown}</ReactMarkdown>
      </div>
    </>
  );
};

export default Recipe;
