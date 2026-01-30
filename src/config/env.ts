import "dotenv/config";

export const env = {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
};

if (!env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY");
}
