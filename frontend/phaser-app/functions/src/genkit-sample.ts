import {genkit, z} from "genkit";
import {vertexAI, gemini15Flash} from "@genkit-ai/vertexai";
import {onCallGenkit} from "firebase-functions/https";
import {defineSecret} from "firebase-functions/params";

const apiKey = defineSecret("GOOGLE_GENAI_API_KEY");

const ai = genkit({
  plugins: [
    vertexAI({location: "us-central1"}),
  ],
});

// Define a simple flow that prompts an LLM to generate menu suggestions.
const menuSuggestionFlow = ai.defineFlow(
  {
    name: "menuSuggestionFlow",
    inputSchema: z.string().describe("A restaurant theme").default("seafood"),
    outputSchema: z.string(),
    streamSchema: z.string(),
  },
  async (subject, {sendChunk}) => {
    // eslint-disable-next-line max-len
    const prompt = `Suggest an item for the menu of a ${subject} themed restaurant`;

    const {response, stream} = ai.generateStream({
      model: gemini15Flash,
      prompt,
      config: {temperature: 1},
    });

    for await (const chunk of stream) {
      sendChunk(chunk.text);
    }

    return (await response).text;
  },
);

export const menuSuggestion = onCallGenkit(
  {
    // Uncomment to enable AppCheck:
    // enforceAppCheck: true,

    // Uncomment to enforce auth:
    // authPolicy: hasClaim("email_verified"),

    secrets: [apiKey],
  },
  menuSuggestionFlow,
);
