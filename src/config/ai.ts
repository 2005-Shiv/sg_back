import { AssemblyAI } from "assemblyai";
import { GoogleGenAI } from "@google/genai";
import { env } from "./env";

export const assemblyAi = new AssemblyAI({
    apiKey: env.assemblyAiApiKey
});

export const googleGenAi = new GoogleGenAI({
    apiKey: env.googleGenAiApiKey
});