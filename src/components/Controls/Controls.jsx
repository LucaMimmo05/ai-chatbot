import { useState } from "react";
import style from "./Controls.module.css";
import TextareaAutoSize from "react-textarea-autosize";
import { useRef } from "react";
import { useEffect } from "react";
const Controls = ({ onSend, isDisabled = false }) => {
    const textareaRef = useRef(null);
    const [content, setContent] = useState("");

    useEffect(() => {
        if (!isDisabled) {
            textareaRef.current.focus();
        }
    }, [isDisabled]);

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleContentSend = () => {
        if (content.length > 0) {
            onSend(content);
            setContent("");
        }
    };

    const handleEnterPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleContentSend();
        }
    };
    return (
        <div className={style.Controls}>
            <div className={style.TextAreaContainer}>
                <TextareaAutoSize
                    ref={textareaRef}
                    className={style.TextArea}
                    placeholder="Type your message here..."
                    name="userMessage"
                    id="userMessage"
                    value={content}
                    onChange={handleContentChange}
                    onKeyDown={handleEnterPress}
                    minRows={1}
                    maxRows={4}
                    disabled={isDisabled}
                ></TextareaAutoSize>
            </div>
            <button className={style.Button} onClick={handleContentSend}>
                <SendIcon />
            </button>
        </div>
    );
};

const SendIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
        >
            <path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z" />
        </svg>
    );
};

export default Controls;
