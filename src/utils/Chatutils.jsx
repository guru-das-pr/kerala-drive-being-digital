import { useState, useEffect, useRef } from 'react';
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";
import { FaUser } from "react-icons/fa";



export const faqData = [
  {
    question: "What types of tour packages do you offer?",
    answer: "We offer a wide range of packages, including cultural, adventure, eco-tourism, and cruise options to showcase the beauty of Kerala and beyond.",
    keywords: ["tour", "package", "packages", "cultural", "adventure", "eco-tourism", "cruise", "options"]
  },
  {
    question: "Do your packages include food?",
    answer: "Yes! Our packages include delicious local and international cuisine to give you a taste of Kerala's rich flavors.",
    keywords: ["food", "meal", "cuisine", "eat", "dining", "taste", "flavors", "restaurant"]
  },
  {
    question: "What types of accommodations do you provide?",
    answer: "We offer everything from cozy guest houses to luxurious resorts, ensuring comfort and relaxation throughout your stay.",
    keywords: ["accommodation", "stay", "hotel", "resort", "guesthouse", "room", "lodging", "comfort"]
  },
  {
    question: "What adventure activities do you have available?",
    answer: "We offer trekking, cycling, water sports, and more! Each activity is designed to immerse you in the beauty of nature.",
    keywords: ["adventure", "activities", "trekking", "cycling", "sports", "water sports", "nature", "outdoor"]
  },
  {
    question: "What types of vehicles can I choose for my trip?",
    answer: "We offer hatchbacks, sedans, SUVs, Tempo Travellers, mini buses, and luxury buses to accommodate groups of any size.",
    keywords: ["vehicle", "car", "transport", "bus", "suv", "sedan", "hatchback", "tempo"]
  },
  {
    question: "Are guided tours available?",
    answer: "Absolutely! Our experienced guides provide insightful and fun tours to ensure a memorable experience.",
    keywords: ["guide", "guided", "experience", "expert", "local", "insight"]
  },
  {
    question: "Do you have cruise packages?",
    answer: "Yes, we offer relaxing and scenic cruise packages to enjoy Kerala's waterways and coastal beauty.",
    keywords: ["cruise", "boat", "water", "waterway", "coastal", "backwater", "river"]
  },
  {
    question: "What eco-tourism experiences do you offer?",
    answer: "We provide eco-friendly tours focusing on Kerala's natural landscapes, including wildlife reserves, nature hikes, and more.",
    keywords: ["eco", "nature", "wildlife", "hike", "reserve", "environment", "landscape", "sustainable"]
  },
  {
    question: "Do you cater to large groups?",
    answer: "Yes, we cater to groups, families, colleges, and friends, providing tailored itineraries and transportation options.",
    keywords: ["group", "family", "college", "crowd", "bulk", "team", "party", "corporate"]
  },
  {
    question: "Can I book a massage or beauty treatment during my stay?",
    answer: "Certainly! We offer relaxing massage and beauty treatments to enhance your travel experience.",
    keywords: ["massage", "spa", "treatment", "beauty", "wellness", "relax", "ayurveda", "therapy"]
  },
  {
    question: "Are your tours suitable for families?",
    answer: "Yes, we have family-friendly packages with activities suitable for all ages, ensuring a memorable trip for everyone.",
    keywords: ["family", "children", "kids", "child", "age", "friendly", "group"]
  },
  {
    question: "Do you offer airport pickup and drop-off?",
    answer: "Yes, we provide convenient airport transfer services for a smooth start and end to your journey.",
    keywords: ["airport", "pickup", "drop", "transfer", "transport", "arrival", "departure"]
  },
  {
    question: "Do you cater to international travelers?",
    answer: "Yes, we welcome international guests and provide personalized experiences for a seamless travel experience in Kerala.",
    keywords: ["international", "foreign", "tourist", "traveler", "overseas", "global", "visitor"]
  },
  {
    question: "Do you offer wildlife tours?",
    answer: "Yes, our wildlife tours take you to some of Kerala's best nature reserves and parks to experience local flora and fauna.",
    keywords: ["wildlife", "animal", "nature", "park", "reserve", "sanctuary", "forest", "safari"]
  },
  {
    question: "Do your packages include travel insurance?",
    answer: "We can arrange travel insurance upon request to ensure your peace of mind during the trip.",
    keywords: ["insurance", "coverage", "protection", "safety", "secure", "policy"]
  }
];

// utils/chatUtils.js
export const calculateSimilarity = (str1, str2) => {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  const intersection = new Set([...s1].filter(char => s2.includes(char)));
  const union = new Set([...s1, ...s2]);
  return intersection.size / union.size;
};

export const extractKeywords = (input) => {
  const stopWords = new Set(['a', 'an', 'the', 'is', 'are', 'was', 'were', 'do', 'does', 'did', 'have', 'has', 'had', 'i', 'you', 'he', 'she', 'it', 'we', 'they']);
  return input
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => !stopWords.has(word) && word.length > 2);
};

// components/Message.js
const Message = ({ message }) => (
  <div className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
    <div className={`max-w-3/4 rounded-lg p-3 ${message.isBot ? 'bg-gray-100 text-gray-800' : 'bg-blue-500 text-white'}`}>
      {message.text}
    </div>
  </div>
);

// components/TypingIndicator.js
const TypingIndicator = () => (
  <div className="flex items-center text-gray-500 mb-4">
    <div className="w-2 h-2 bg-gray-500 rounded-full mr-1 animate-bounce"></div>
    <div className="w-2 h-2 bg-gray-500 rounded-full mr-1 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
  </div>
);

const ChatBotModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState([{ id: 1, text: "Hello! I'm your Kerala travel assistant. How can I help you plan your perfect trip?", isBot: true }]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const findBestMatch = (input) => {
    const inputKeywords = extractKeywords(input);
    let bestMatch = { faq: null, score: 0 };

    faqData.forEach(faq => {
      let score = 0;
      if (faq.question.toLowerCase().includes(input.toLowerCase())) score += 2;

      inputKeywords.forEach(keyword => {
        if (faq.keywords.includes(keyword)) score += 1;
        faq.keywords.forEach(faqKeyword => {
          const similarity = calculateSimilarity(keyword, faqKeyword);
          if (similarity > 0.7) score += similarity;
        });
      });

      const questionSimilarity = calculateSimilarity(input, faq.question);
      score += questionSimilarity * 2;

      if (score > bestMatch.score) bestMatch = { faq, score };
    });

    return bestMatch;
  };

  const generateResponse = (input) => {
    const greetings = ['hello', 'hi', 'hey', 'greetings'];
    const goodbyes = ['bye', 'goodbye', 'see you', 'farewell'];
    const thanks = ['thank', 'thanks', 'appreciate'];

    if (greetings.some(greeting => input.toLowerCase().includes(greeting))) return "Hello! How can I help you plan your Kerala adventure today?";
    if (goodbyes.some(goodbye => input.toLowerCase().includes(goodbye))) return "Goodbye! Feel free to return when you're ready to plan your Kerala journey!";
    if (thanks.some(thank => input.toLowerCase().includes(thank))) return "You're welcome! Is there anything else you'd like to know about Kerala tourism?";

    const match = findBestMatch(input);
    if (match.score > 1.5) return match.faq.answer;
    else if (match.score > 0.8) return `${match.faq.answer}\n\nIs this what you were looking for? Feel free to ask for more specific details!`;
    else return "I'm not quite sure about that. Could you rephrase your question? You can ask about our tour packages, accommodations, activities, or specific destinations in Kerala.";
  };

  const simulateTyping = (response) => {
    setIsTyping(true);
    return new Promise(resolve => {
      const delay = Math.min(Math.max(response.length * 20, 1000), 3000);
      setTimeout(() => {
        setIsTyping(false);
        resolve(response);
      }, delay);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages(prev => [...prev, { id: messages.length + 1, text: inputText, isBot: false }]);
    setInputText('');

    const response = generateResponse(inputText);
    await simulateTyping(response);

    setMessages(prev => [...prev, { id: messages.length + 2, text: response, isBot: true }]);
  };

  const toggleChat = () => {
    setIsOpen(prev => !prev);
    setIsVisible(prev => !prev);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleChat}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-all duration-300"
        aria-label="Toggle chat"
      >
        <IoChatbubbleEllipses size={24} />
      </button>

      {isOpen && (
        <div className={`fixed bottom-20 right-4 w-96 bg-white rounded-lg shadow-xl transition-all duration-300 transform ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`} role="dialog" aria-label="Chat window">
          <div className="flex items-center justify-between p-4 border-b bg-blue-600">
            <h3 className="text-lg text-white font-semibold">Travel Assistant</h3>
            <button onClick={toggleChat} className="text-gray-400 hover:text-gray-600" aria-label="Close chat">
              <IoMdClose size={20} />
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4" role="log">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t p-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                aria-label="Message input"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <IoSend size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBotModal;