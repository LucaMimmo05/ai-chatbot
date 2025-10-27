import styles from "./App.module.css";
import Chat from "./components/Chat/Chat";
import { useState } from "react";
import Controls from "./components/Controls/Controls";
import { Assistant } from "./assistants/googleai";


function App() {
    const assistant = new Assistant();
    const [messages, setMessages] = useState([]);

    const addMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleContentSend = async (content) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { content, role: "user" },
        ]);

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
        }
    };

    return (
        <div className={styles.App}>
            <header className={styles.Header}>
                <img src="/bot.png" alt="" className={styles.Logo} />
                <h2 className={styles.Title}>Ai chatbot</h2>
            </header>
            <div className={styles.ChatContainer}>
                <Chat messages={messages} />
            </div>
            <Controls onSend={handleContentSend} />
        </div>
    );
}

export default App;
