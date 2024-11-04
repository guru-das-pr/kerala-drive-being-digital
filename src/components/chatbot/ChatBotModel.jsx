import { useState } from 'react';
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const ChatBotModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", isBot: true }
  ]);
  const [inputText, setInputText] = useState('');

  const botResponses = {
    "hello": "Hi there! How are you?",
    "how are you": "I'm doing well, thanks for asking!",
    "bye": "Goodbye! Have a great day!",
    "help": "I can help answer basic questions. Try asking me something!",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      isBot: false
    };

    const response = getBotResponse(inputText.toLowerCase());
    const botMessage = {
      id: messages.length + 2,
      text: response,
      isBot: true
    };

    setMessages([...messages, userMessage, botMessage]);
    setInputText('');
  };

  const getBotResponse = (input) => {
    for (const [key, value] of Object.entries(botResponses)) {
      if (input.includes(key)) {
        return value;
      }
    }
    return "I'm not sure how to respond to that. Could you try rephrasing?";
  };

  return (
    <>
      {/* Floating chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        aria-label="Open chat"
      >
        <IoChatbubbleEllipses size={24} />
      </button>

      {/* Chat panel */}
      <div 
        className={`fixed bottom-24 right-0 w-full sm:w-[400px] h-[80dvh] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10"
          aria-label="Close chat"
        >
          <IoMdClose size={24} />
        </button>

        {/* Chat header */}
        <div className="bg-blue-600 text-white px-4 py-3 flex items-center">
          <FaRobot className="mr-2 text-xl" />
          <h1 className="text-xl font-semibold">Chat Bot</h1>
        </div>

        {/* Messages container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100%-8rem)]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-2 ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              {message.isBot && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaRobot className="text-blue-600" />
                </div>
              )}
              <div
                className={`max-w-[70%] px-4 py-2 rounded-lg ${
                  message.isBot
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-blue-600 text-white order-1'
                }`}
              >
                {message.text}
              </div>
              {!message.isBot && (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center order-2">
                  <FaUser className="text-white" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <span>Send</span>
              <IoSend />
            </button>
          </div>
        </form>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default ChatBotModal;