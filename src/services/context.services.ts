import { vectorDb } from "../config/vector";
import { MemoryRow } from "../types/memory";
import { embedText } from "./embedding.services";

const TOP_K = 5;

export const buildContext = async (
    userId: string,
    query: string
): Promise<string> => {

    const queryEmbedding = await embedText(query);

    const { data, error } = await vectorDb.rpc(
        "match_memories",
        {
            query_embedding: queryEmbedding,
            match_count: TOP_K,
            uid: userId
        }
    );

    if (error) throw error;

    return data.map((m: MemoryRow) => m.content).join("\n");
};
