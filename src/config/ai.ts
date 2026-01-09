import { AssemblyAI } from "assemblyai";
import { env } from "./env";

export const assemblyAi = new AssemblyAI({
    apiKey: env.assemblyAiApiKey
});
