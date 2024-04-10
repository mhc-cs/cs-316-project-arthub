type MessageProps = {
    message: {
        id: number;
        message: string;
        name: string;
    };
};

const Message: React.FC<MessageProps> = ({ message }) => {
    return <div><div className="chat chat-start">
        <div className="chat-image avatar">
            {/* <div className="w-10 rounded-full">
                <Image alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div> */}
        </div>
        <div className="chat-header">
            {message.name}
            <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble">You were the Chosen One!</div>
        <div className="chat-footer opacity-50">
            Delivered
        </div>
    </div>
    </div>

};

export default Message;