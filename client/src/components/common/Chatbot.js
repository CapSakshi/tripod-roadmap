import React, { useState, useEffect, useRef } from 'react';
import api from '../../utils/api';
import styles from './Chatbot.module.css';

export default function Chatbot({ roadmapTitle, topic }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: "Hi! I'm Tripod AI. I can help you understand the topics in this roadmap. What would you like to learn about?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    
    // Add user message to UI immediately
    const newHistory = [...messages, { role: 'user', text: userText }];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const response = await api.post('/chat', {
        message: userText,
        history: messages,
        context: { roadmapTitle, topic }
      });

      if (response.data.success) {
        setMessages(prev => [...prev, { role: 'model', text: response.data.reply }]);
      } else {
        throw new Error(response.data.message || 'Failed to get response');
      }
    } catch (error) {
      setMessages(prev => [
        ...prev, 
        { role: 'model', text: `Sorry, there was an error processing your request. Make sure the GEMINI_API_KEY is configured in the backend .env file. Details: ${error.message}` }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Simple Markdown formatter for bold and code blocks
  const formatText = (text) => {
    const parts = text.split(/(```[\s\S]*?```|\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        return <pre key={index}><code>{part.slice(3, -3).replace(/^[\w]+\n/, '')}</code></pre>;
      } else if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      } else if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={index} style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 4px', borderRadius: '4px' }}>{part.slice(1, -1)}</code>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={styles.chatbotContainer}>
      {isOpen ? (
        <div className={styles.chatPanel}>
          <div className={styles.chatHeader}>
            <div className={styles.chatTitle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              Tripod AI Tutor
            </div>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          
          <div className={styles.chatBody}>
            {messages.map((msg, idx) => (
              <div key={idx} className={msg.role === 'user' ? styles.messageUser : styles.messageModel}>
                <div className={styles.message}>
                  {formatText(msg.text)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className={styles.typingIndicator}>
                <div className={styles.typingDot} />
                <div className={styles.typingDot} />
                <div className={styles.typingDot} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className={styles.chatFooter} onSubmit={handleSend}>
            <input
              type="text"
              className={styles.chatInput}
              placeholder="Ask about this topic..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button type="submit" className={styles.sendBtn} disabled={!input.trim() || isLoading}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </form>
        </div>
      ) : (
        <button className={styles.chatBubble} onClick={() => setIsOpen(true)}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            <path d="M8 10h.01"></path>
            <path d="M12 10h.01"></path>
            <path d="M16 10h.01"></path>
          </svg>
        </button>
      )}
    </div>
  );
}
