import React from 'react'
import Message from './Message'

const ChatBox = () => {
    const messages = [
        {
            id: 1,
            message: "Hello",
            name: "Jane Doe "
        },
        {
            id: 2,
            message: "How are you?",
            name: "John "
        }
    ]
    return (
        <div className="pb-44 pt-20 containerWrap">
            {messages.map((message) => (
                <Message key={message.id} message={message} /> // Fix: Pass 'message.id' instead of 'messages.id'
            ))}
        </div>
    )
}

export default ChatBox