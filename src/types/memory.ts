export interface MemoryRow {
    id: string;
    user_id: string;
    content: string;
    embedding: number[];
    source: "voice" | "text";
    created_at: string;
}
