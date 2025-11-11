import styles from "./App.module.css";
import Chat from "./components/Chat/Chat";
import { useState } from "react";
import Controls from "./components/Controls/Controls";
import { Assistant } from "./assistants/openai";
import Loader from "./components/Loader/Loader";

const App = () => {
    const assistant = new Assistant();
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const[isStreaming, setIsStreaming] = useState(false);

    const addMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const updateLastMessage = (updatedContent) => {
        setMessages((prevMessages) =>
            prevMessages.map((message, index) =>
                index === prevMessages.length - 1
                    ? {
                          ...message,
                          content: `${message.content}${updatedContent}`,
                      }
                    : message
            )
        );
    };

    const handleContentSend = async (content) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { content, role: "user" },
        ]);
        setIsLoading(true);

        try {
            const result = assistant.chatStream(content, messages);
            let isFirstChunk = false;

            for await (const chunk of result) {
                if (!isFirstChunk) {
                    isFirstChunk = true;
                    addMessage({ content: chunk, role: "assistant" });
                    setIsLoading(false);
                    setIsStreaming(true);
                }
                updateLastMessage(chunk);
            }
            setIsStreaming(false);
        } catch (error) {
            console.log(error);

            addMessage({
                content:
                    "Sorry i couldn't process your request. Please try again",
                role: "system",
            });
            setIsLoading(false);
            setIsStreaming(false);
        }
    };

    return (
        <div className={styles.App}>
            {isLoading && <Loader />}
            <header className={styles.Header}>
                <img src="/bot.png" alt="" className={styles.Logo} />
                <h2 className={styles.Title}>Ai chatbot</h2>
            </header>
            <div className={styles.ChatContainer}>
                <Chat messages={messages} />
            </div>
            <Controls onSend={handleContentSend} isDisabled={isLoading || isStreaming} />
        </div>
    );
};

export default App;
