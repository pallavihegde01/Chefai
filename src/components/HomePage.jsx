import React, { useEffect, useRef, useState } from "react";
import Header from "../Pages/Header";
import Ingredients from "../Pages/Ingredients";
import Recipe from "./AiRecipe";
import { Plus } from "lucide-react";
import { LANGUAGES } from "../constants/languages";

const HomePage = () => {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [recipeMarkdown, setRecipeMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("English");
  const recipeContent = useRef(null);

  useEffect(() => {
    if (recipeMarkdown != "" && recipeContent != null) {
      recipeContent.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipeMarkdown]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    setList([...list, inputValue.trim()]);
    setInputValue("");
  };

  async function getRecipe() {
    setLoading(true);
    try {
      const res = await fetch("/api/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: list, language }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setRecipeMarkdown(data.recipe);
    } catch (err) {
      console.error("Failed to get recipe:", err.message);
    } finally {
      setLoading(false);
    }
  }

  const removeIngredient = (indexToRemove) => {
    setList(list.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <Header />
      <form
        className="flex flex-col items-center p-7 sm:p-12 gap-3"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 py-3">
          <label className="text-gray-700 font-medium text-lg sm:mr-2">
            Language of your choice:
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-1 focus:ring-black focus:border-black bg-white text-gray-800 shadow-sm transition"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        <div className="flex w-full max-w-xl gap-3">
          <input
            type="text"
            placeholder="e.g., rice"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            className="flex-grow min-w-9 max-w-xl rounded-md border border-black shadow-md text-base p-2"
          />
          <button
            type="submit"
            className="flex justify-center items-center bg-black text-white p-2 rounded-md sm:px-4 hover:bg-gray-800 transition"
          >
            <Plus size={17} className="hidden sm:inline mr-1" />
            <span className="text-sm sm:text-base">Add Ingredients</span>
          </button>
        </div>
        {list.length ? (
          <div className="w-full max-w-xl pl-5">
            <h3 className="text-xl font-semibold">Ingredients on hand: </h3>
            <ul className="list-disc pl-5 pt-2">
              {list.map((item, index) => (
                <li key={index} className="text-lg">
                  <span>{item}</span>
                  {!loading && !recipeMarkdown && (
                    <button
                      onClick={() => removeIngredient(index)}
                      className="ml-4 text-red-600 hover:text-red-800 font-bold"
                      title="Remove ingredient"
                    >
                      ✕
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </form>
      <Ingredients listIngredient={list} showRecipe={getRecipe} />

      {loading && (
        <div className="flex justify-center items-center mt-6 text-blue-800 font-semibold">
          Generating recipe...
        </div>
      )}

      {!loading && recipeMarkdown && (
        <Recipe ref={recipeContent} recipeMarkdown={recipeMarkdown} />
      )}
    </div>
  );
};

export default HomePage;
