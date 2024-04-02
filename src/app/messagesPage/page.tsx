'use client'

import React, { useState, KeyboardEvent } from 'react';
import styles from './page.module.css';

import SearchBar from '../../components/SearchBar';


{/* <div 
key={message.id} 
style={{ 
  margin: '10px', 
  textAlign: index === 0 ? 'left' : 'right' 
  
}}
> */}

interface User {
  id: number;
  name: string;
}

interface Message {
  id: number;
  text: string;
  //fromMe: boolean;
}

// Define the structure for the messages object
interface Messages {
  [key: number]: Message[];
}

const users: User[] = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Olga Gol' },
  { id: 3, name: 'Celia' },
];

const initialMessages: Messages = {
  1: [{ id: 1, text: 'Great collab!'}],
  2: [{ id: 1, text: 'Hi! How are you?'}],
  3: [{ id: 1, text: 'Good morning!'}],
};

const MessagesPage: React.FC = () => {
  //const [activeUser, setActiveUser] = useState<number>(users[0].id);
  
    const [activeUser, setActiveUser] = useState<number>(users[0].id);
    const [userMessages, setUserMessages] = useState<Messages>({...initialMessages});
    const [newMessage, setNewMessage] = useState<string>('');
  
    const handleSendMessage = () => {
      if (!newMessage.trim()) return; // Ignore empty messages
  
      const newMessageObj: Message = {
        id: Math.random(), 
        text: newMessage,
        //fromMe: true,
      };
  
      const updatedMessages = {...userMessages, [activeUser]: [...userMessages[activeUser], newMessageObj]};
      setUserMessages(updatedMessages);
      setNewMessage(''); // Reset input field
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleSendMessage();
      }
    };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.searchBarContainer}>
          <SearchBar />
        </div>
        <button className={styles.topBarButton}>
          <i className={`fas fa-user-friends ${styles.icon}`}></i> My Network
        </button>
        <button className={styles.topBarButton}>
          <i className={`fa-solid fa-message ${styles.icon}`}></i> Messages
        </button>
        <button className={styles.topBarButton}>
          <i className={`fa-solid fa-bell ${styles.icon}`}></i> Notifications
        </button>
      </div>

      <div className={styles.layoutContainer}>
        <aside className={styles.sidebar}>
          <div className={styles.messagingSidebar}>
            <h2>Messaging</h2>
            <ul>
              {users.map((user) => (
                <li key={user.id} onClick={() => setActiveUser(user.id)} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ccc' }}>
                  {user.name}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className={styles.mainContent}>
          <div className={styles.messagesContainer}>
          {userMessages[activeUser]?.map((message, index) => (
            <div 
            key={message.id} 
            className={`${styles.message} ${index === 0 ? styles.messageReceived : styles.messageSent}`}
          >
            <p>{message.text}</p>
          </div>
            ))}
          </div>

          <div className={styles.messageInputContainer}>
            <input
              className={styles.messageInput}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
            />
            <button className={styles.sendButton} onClick={handleSendMessage}>Send</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
