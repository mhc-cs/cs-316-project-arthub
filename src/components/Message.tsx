function Message(): JSX.Element {
    return (
        <div className="message">
            <div className="message__avatar">
                <img src="https://via.placeholder.com/150" alt="User avatar" />
            </div>
            <div className="message__content">
                <div className="message__author">John Doe</div>
                <div className="message__text">Great collab!</div>
            </div>
        </div>
    );
}

export default Message;
