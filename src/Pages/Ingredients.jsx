import React from 'react'
import { Plus } from 'lucide-react'


const Ingredients = ({listIngredient,showRecipe}) => {

    

  return (
    <>
        {listIngredient.length > 3 ? <div className="flex justify-center w-full px-7 sm:px-12">
          <div className="flex justify-between items-center w-full max-w-xl border border-gray-400 p-4 rounded-xl bg-gray-200 shadow-md">
            <div>
              <h3 className="text-lg font-semibold">Ready for a recipe?</h3>
              <p className="text-sm text-gray-600">Generate a recipe from list of ingredients.</p>
            </div>
            <button onClick={showRecipe} className="bg-blue-800 hover:bg-blue-950 text-white rounded-lg px-4 py-2 transition">
              Get a Recipe
            </button>
          </div>
        </div> : null }
    </>
  )
}

export default Ingredients

