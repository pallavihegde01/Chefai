// test-hf.js
import 'dotenv/config';
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_ACCESS_TOKEN);

async function test() {
  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [{ role: "user", content: "Say hello" }],
      max_tokens: 10,
    });
    console.log(response.choices[0].message.content);
  } catch (err) {
    console.error("HF test failed:", err);
  }
}

test();
