import { googleGenAi } from "../config/ai";

export const embedText = async (text: string): Promise<number[]> => {
    const response = await googleGenAi.models.embedContent({
        model: "text-embedding-004",
        contents: [text],
    });

    // Each embedding object contains a 'values' property which is the number[]
    try {
        const vector = response.embeddings?.[0]?.values ?? [];
        console.log("Embedding length:", vector.length);
        return vector;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to generate embedding");
    }
};
