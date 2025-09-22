import React, { useState } from 'react'
import Header from '../Pages/Header';
import Ingredients from '../Pages/Ingredients';
import Recipe from './AiRecipe';
import { Plus } from 'lucide-react';

const HomePage = () => {

  const [list,setList] = useState([]);
  const [inputValue,setInputValue] = useState("");
  const [recipeMarkdown, setRecipeMarkdown] = useState("");
  const [loading, setLoading] = useState(false);

    const handleSubmit = (e) =>{
      e.preventDefault();
      if(inputValue.trim()==="")return;
      setList([...list,inputValue.trim()]);
      setInputValue("");
    }

  

  async function getRecipe() {
    setLoading(true);
    try {
      const res = await fetch("/api/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: list }),
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


  return (
    <div>
        <Header/>
        <form className="flex flex-col items-center p-7 sm:p-12 gap-3" onSubmit={handleSubmit}>
          <div className='flex w-full max-w-xl gap-3'>
            <input
              type="text"
              placeholder="e.g., rice"
              value={inputValue}
              onChange={(e)=>{setInputValue(e.target.value)}}
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
            {list.length  ? <div className='w-full max-w-xl pl-5'>
            <h3 className='text-xl font-semibold'>Ingredients on hand: </h3>
            <ul className='list-disc pl-5 pt-2'>
                {list.map((item,index)=>(
                <li key={index}
                    className='text-lg'
                >
                    {item}
                </li>
                ))}
            </ul>
        </div> : null}
        </form>
        <Ingredients listIngredient={list} showRecipe={getRecipe}/>

        {loading && (
          <div className="flex justify-center items-center mt-6 text-blue-800 font-semibold">
            Generating recipe...
          </div>
        )}

        {!loading && recipeMarkdown && <Recipe recipeMarkdown={recipeMarkdown} />}
    </div>
  )
}

export default HomePage