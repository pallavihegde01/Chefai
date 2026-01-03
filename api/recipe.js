import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients and generates a recipe strictly in the language requested by the user.

Follow these rules:

- Do not add greetings, explanations, or conversational lines.
- Start the response directly with the recipe title or a main headings.
- Title, heading, sub-headings should be in bold.
- Use clean Markdown formatting suitable for rendering on a webpage.
- The recipe may use some or all of the given ingredients.
- You may include a few additional ingredients if necessary, but keep them minimal.
- Do not mix multiple languages under any circumstance.
- End the response with a bold sentence that means: "If you want another recipe, click Get a Recipe again." 
  The wording of that sentence must change in every response while keeping the same meaning.

`;

export default async function getRecipeFromAi(req, res) {
  if (
    !req.body ||
    !req.body.ingredients ||
    !Array.isArray(req.body.ingredients)
  ) {
    return res.status(400).json({ error: "Missing or invalid ingredients" });
  }

  try {
    const { ingredients, language } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
      ${SYSTEM_PROMPT}

      User ingredients: ${ingredients.join(", ")}
      Language for the recipe: ${language}
      Please generate ONE recipe in ${language}. Ensure the full response is in ${language}.
          `;
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    res.status(200).json({ recipe: responseText });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: err.message });
  }
}
