import { ChefHat } from 'lucide-react'
import React from 'react'


const Header = () => {
  return (
    <header className="flex justify-center items-center border shadow-xl gap-2 h-16">
        <ChefHat size={48} />
        <h1 className="text-3xl font-semibold">Chefai</h1>
    </header>
  )
}

export default Header