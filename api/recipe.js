
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. 
You don't need to use every ingredient they mention in your recipe. 
The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. 
Format your response in markdown to make it easier to render to a web page.
`;


export default async function getRecipeFromAi(req, res) {
   

  if (!req.body || !req.body.ingredients || !Array.isArray(req.body.ingredients)) {
    return res.status(400).json({ error: "Missing or invalid ingredients" });
  }

  try {
    const { ingredients } = req.body;
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `
      ${SYSTEM_PROMPT}

      User ingredients: ${ingredients.join(", ")}
      Please suggest one recipe I can make.
          `;
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    res.status(200).json({ recipe: responseText });
    // res.status(200).json({ recipe: response.choices[0].message.content });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: err.message });
  }
}
