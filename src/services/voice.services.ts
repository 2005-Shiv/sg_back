import fs from "fs";
import { assemblyAi } from "../config/ai";

/* ---------- AUDIO PIPELINE ---------- */
export const processAudioVoice = async (
    file: Express.Multer.File,
    userId: string
): Promise<string> => {

    try {
        const transcript = await transcribeWithAssemblyAI(file.path);

        return transcript;

    } finally {
        // ALWAYS cleanup (even on error)
        fs.unlink(file.path, () => {});
    }
};

/* ---------- TEXT PIPELINE (TEMP) ---------- */
export const processTextVoice = async (
    text: string,
    userId: string
): Promise<string> => {
    return text.trim();
};

/* ---------- ASSEMBLY AI ---------- */
const transcribeWithAssemblyAI = async (filePath: string): Promise<string> => {
    // 1️⃣ Upload audio (returns STRING URL in your SDK)
    const audioUrl: string = await assemblyAi.files.upload(
        fs.createReadStream(filePath)
    );

    // 2️⃣ Create transcription job
    const transcriptResponse = await assemblyAi.transcripts.create({
        audio_url: audioUrl
    });

    const transcriptId = transcriptResponse.id;

    // 3️⃣ Poll until completed
    while (true) {
        const result = await assemblyAi.transcripts.get(transcriptId);

        if (result.status === "completed") {
            return result.text ?? "";
        }

        if (result.status === "error") {
            throw new Error(result.error || "AssemblyAI transcription failed");
        }

        await new Promise(res => setTimeout(res, 1500));
    }
};

