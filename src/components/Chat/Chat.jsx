import Markdown from "react-markdown";
import styles from "./Chat.module.css";
import { useRef, useEffect, useMemo } from "react";
const WELCOME_MESSAGE_GROUP = [
    {
        role: "assistant",
        content: "Hello! How can I assist you right now?",
    },
];
const Chat = ({ messages }) => {
    const messageEndRef = useRef(null);

    const messagesGroups = useMemo(
        () =>
            messages.reduce((groups, message) => {
                if (message.role === "user") groups.push([]);
                groups[groups.length - 1].push(message);
                return groups;
            }, []),
        [messages]
    );

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    return (
        <div className={styles.Chat}>
            {[WELCOME_MESSAGE_GROUP, ...messagesGroups].map(
                (messages, groupsIndex) => (
                    <div key={groupsIndex} className={styles.Group}>
                        {messages.map(({ role, content }, index) => {
                            return (
                                <div
                                    className={styles.Message}
                                    key={index}
                                    data-role={role}
                                >
                                    <Markdown>{content}</Markdown>
                                </div>
                            );
                        })}
                    </div>
                )
            )}

            <div ref={messageEndRef} />
        </div>
    );
};

export default Chat;
