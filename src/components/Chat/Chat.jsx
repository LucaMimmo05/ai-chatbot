import style from './Chat.module.css'
const Chat = ({ messages }) => {
    const WELCOME_MESSAGE = {
        role: "assistant",
        content: "Hello! How can I assist you today?"
    }
  return (
    <div className={style.Chat}>
      {[WELCOME_MESSAGE, ...messages]?.map(({role,content}, index) => {
          return (
              <div className={style.Message} key={index} data-role={role}>
                  {content}
              </div>
          )
      })}
    </div>
    )  
}

export default Chat