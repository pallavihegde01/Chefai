import React from "react";
import ReactMarkdown from "react-markdown";
import "./Recipe.css"; 

const Recipe = ({ ref,recipeMarkdown }) => {
  
  const cleanedMarkdown = recipeMarkdown.replace(/^.*?(?=###|####)/s, "");

  return (
    <>
      <div  ref={ref}>
        <h2 className="pt-5 pl-5 flex justify-center items-center recipe-title">Suggested Recipe: </h2>
        <div className="recipe-container">
          <ReactMarkdown>{cleanedMarkdown}</ReactMarkdown>
        </div>
      </div>
    </>
  );
};

export default Recipe;
