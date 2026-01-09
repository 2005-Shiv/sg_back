import dotenv from 'dotenv';

dotenv.config();

export const env = {
    port: process.env.PORT || 5000,
    supabaseUrl: process.env.SUPABASE_URL!,
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    assemblyAiApiKey: process.env.ASSEMBLY_AI_API_KEY!,
};