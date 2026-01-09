import { vectorDb } from "../config/vector";
import { embedText } from "./embedding.services";
import { MemoryRow } from "../types/memory";

export const createMemory = async (
    userId: string,
    content: string,
    source: "voice" | "text"
): Promise<void> => {
    const embedding = await embedText(content);

    try {
      await vectorDb.from("memories").insert({
        user_id: userId,
        content,
        embedding,
        source
      });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create memory");
    }
};

export const getMemories = async (userId: string): Promise<MemoryRow[]> => {
    const { data, error } = await vectorDb.from("memories").select("*").eq("user_id", userId);
    if (error) {
      console.error(error);
      throw new Error("Failed to get memories");
    }
    return data as MemoryRow[];
};