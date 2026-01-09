import dotenv from 'dotenv';

dotenv.config();

export const env = {
    // Port
    port: process.env.PORT || 5000,
    // Supabase
    supabaseUrl: process.env.SUPABASE_URL!,
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    // Assembly AI
    assemblyAiApiKey: process.env.ASSEMBLY_AI_API_KEY!,
    // Google Gen AI
    googleGenAiApiKey: process.env.GOOGLE_GEN_AI_API_KEY!,
};