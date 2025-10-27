import { GoogleGenerativeAI } from "@google/generative-ai";

const googleAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);

export class Assistant {
    #chat;
    constructor(model = "gemini-2.5-flash") {
        const gemini = googleAI.getGenerativeModel({
            model,
        });
        this.#chat = gemini.startChat({ history: [] });
    }

    chat = async (content) => {
        try {
            const result = await this.#chat.sendMessage(content);
            return result.response.text();
        } catch (error) {
            console.log(error);
        }
    };
}
