import styles from "./App.module.css";
import Chat from "./components/Chat/Chat";
import { useState } from "react";
import Controls from "./components/Controls/Controls";
import { Assistant } from "./assistants/googleai";
import Loader from "./components/Loader/Loader";

const App = () => {
    const assistant = new Assistant();
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const addMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleContentSend = async (content) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { content, role: "user" },
        ]);
        setIsLoading(true);

        try {
            const result = await assistant.chat(content);

            addMessage({ content: result, role: "assistant" });
        } catch (error) {
            console.log(error);

            addMessage({
                content:
                    "Sorry i couldn't process your request. Please try again",
                role: "system",
            });
        } finally {
            setIsLoading(false);
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
            <Controls onSend={handleContentSend} isDisabled={isLoading} />
        </div>
    );
};

export default App;
