import { Request, Response } from "express";
import { processAudioVoice, processTextVoice } from "../services/voice.services";

export const handleVoiceInput = async (req: Request, res: Response) => {
    console.log("AUTH USER:", req.user);
    try {
        const hasAudio = !!req.file;
        const hasText = typeof req.body?.text === "string";

        // ❌ invalid states
        if (hasAudio === hasText) {
            return res.status(400).json({
                success: false,
                message: "Provide exactly one of: audio file OR text"
            });
        }

        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ success: false });
        }

        let transcript: string;

        if (hasAudio) {
            transcript = await processAudioVoice(req.file!, userId);
        } else {
            transcript = await processTextVoice(req.body.text, userId);
        }

        return res.status(200).json({
            success: true,
            transcript
        });

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            message: "Voice processing failed"
        });
    }
};
