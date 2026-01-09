import fs from "fs";

/* ---------- AUDIO PIPELINE ---------- */
export const processAudioVoice = async (
    file: Express.Multer.File,
    userId: string
): Promise<string> => {

    const transcript = await mockSpeechToText(file.path);

    fs.unlink(file.path, () => {}); // cleanup

    return transcript;
};

/* ---------- TEXT PIPELINE (TEMP) ---------- */
export const processTextVoice = async (
    text: string,
    userId: string
): Promise<string> => {
    return text.trim();
};

/* ---------- MOCK STT ---------- */
const mockSpeechToText = async (_path: string): Promise<string> => {
    await new Promise(res => setTimeout(res, 200));
    return "mocked voice transcript";
};
