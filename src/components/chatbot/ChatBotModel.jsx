import { useState, useEffect, useRef } from 'react';
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";



export const faqData = [
  {
    question: "What types of tour packages do you offer?",
    answer: "We offer a wide range of packages, including cultural, adventure, eco-tourism, and cruise options to showcase the beauty of Kerala and beyond.",
    keywords: ["tour packages", "cultural tours", "adventure tours", "eco-tourism", "cruise options", "Kerala travel"]
  },
  {
    question: "Do your packages include food?",
    answer: "Yes! Our packages include delicious local and international cuisine to give you a taste of Kerala’s rich flavors.",
    keywords: ["food included", "meals", "cuisine", "Kerala flavors", "local food"]
  },
  {
    question: "What types of accommodations do you provide?",
    answer: "We offer everything from cozy guest houses to luxurious resorts, ensuring comfort and relaxation throughout your stay.",
    keywords: ["accommodations", "guest houses", "resorts", "comfort", "luxury stay"]
  },
  {
    question: "What adventure activities do you have available?",
    answer: "We offer trekking, cycling, water sports, and more! Each activity is designed to immerse you in the beauty of nature.",
    keywords: ["adventure activities", "trekking", "cycling", "water sports", "outdoor"]
  },
  {
    question: "What types of vehicles can I choose for my trip?",
    answer: "We offer hatchbacks, sedans, SUVs, Tempo Travellers, mini buses, and luxury buses to accommodate groups of any size.",
    keywords: ["vehicle options", "transportation", "SUVs", "mini buses", "luxury buses"]
  },
  {
    question: "Are guided tours available?",
    answer: "Absolutely! Our experienced guides provide insightful and fun tours to ensure a memorable experience.",
    keywords: ["guided tours", "tour guide", "insightful tours", "memorable experience"]
  },
  {
    question: "Do you have cruise packages?",
    answer: "Yes, we offer relaxing and scenic cruise packages to enjoy Kerala’s waterways and coastal beauty.",
    keywords: ["cruise packages", "waterways", "coastal beauty", "scenic cruise"]
  },
  {
    question: "What eco-tourism experiences do you offer?",
    answer: "We provide eco-friendly tours focusing on Kerala’s natural landscapes, including wildlife reserves, nature hikes, and more.",
    keywords: ["eco-tourism", "wildlife reserves", "nature hikes", "eco-friendly tours"]
  },
  {
    question: "Do you cater to large groups?",
    answer: "Yes, we cater to groups, families, colleges, and friends, providing tailored itineraries and transportation options.",
    keywords: ["large groups", "group tours", "family-friendly","college", "tailored itineraries"]
  },
  {
    question: "Can I book a massage or beauty treatment during my stay?",
    answer: "Certainly! We offer relaxing massage and beauty treatments to enhance your travel experience.",
    keywords: ["massage", "beauty treatment", "relaxation", "spa services"]
  },
  {
    question: "Are your tours suitable for families?",
    answer: "Yes, we have family-friendly packages with activities suitable for all ages, ensuring a memorable trip for everyone.",
    keywords: ["family-friendly", "suitable for all ages", "family tours", "activities for kids"]
  },
  {
    question: "Do you offer airport pickup and drop-off?",
    answer: "Yes, we provide convenient airport transfer services for a smooth start and end to your journey.",
    keywords: ["airport pickup", "drop-off", "airport transfer", "travel convenience"]
  },
  {
    question: "Can I rent a luxury bus for my group?",
    answer: "Absolutely! We offer luxury bus rentals for groups with comfortable seating, air conditioning, and entertainment options.",
    keywords: ["luxury bus rental", "group transport", "comfortable seating", "bus amenities"]
  },
  {
    question: "Do you cater to international travelers?",
    answer: "Yes, we welcome international guests and provide personalized experiences for a seamless travel experience in Kerala.",
    keywords: ["international travelers", "foreign guests", "personalized experiences", "Kerala travel"]
  },
  {
    question: "Do you offer wildlife tours?",
    answer: "Yes, our wildlife tours take you to some of Kerala’s best nature reserves and parks to experience local flora and fauna.",
    keywords: ["wildlife tours", "nature reserves", "flora and fauna", "wildlife experience"]
  },
  {
    question: "Do your packages include travel insurance?",
    answer: "We can arrange travel insurance upon request to ensure your peace of mind during the trip.",
    keywords: ["travel insurance", "insurance coverage", "peace of mind"]
  },
  {
    question: "Can I book a tour for a special occasion?",
    answer: "Yes, we offer customizable packages for birthdays, anniversaries, and other celebrations.",
    keywords: ["special occasion", "birthdays", "anniversaries", "custom packages"]
  },
  {
    question: "Are your itineraries customizable?",
    answer: "Yes, we can tailor our packages to meet your specific preferences and interests.",
    keywords: ["customizable itineraries", "tailored packages", "personal preferences"]
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit/debit cards, bank transfers, and other convenient payment methods. Just ask!",
    keywords: ["payment methods", "credit card", "bank transfer", "payment options"]
  },
  {
    question: "Do you offer any seasonal tours?",
    answer: "Yes! We have special tours for monsoon, festival seasons, and more to highlight Kerala’s unique charm.",
    keywords: ["seasonal tours", "monsoon", "festival season", "special tours"]
  },
  {
    question: "Do you have packages for honeymooners?",
    answer: "Yes, we offer romantic packages designed to create memorable experiences for couples.",
    keywords: ["honeymoon packages", "romantic trips", "couples travel", "memorable experiences"]
  },
  {
    question: "What safety measures are in place due to COVID-19?",
    answer: "We prioritize your safety with enhanced cleaning, sanitization, and social distancing practices throughout your trip.",
    keywords: ["safety measures", "COVID-19", "sanitization", "social distancing"]
  },
  {
    question: "What are the popular destinations in your packages?",
    answer: "Our packages cover Kerala’s highlights, including Munnar, Alleppey, Kochi, Wayanad, and Kovalam, among others.",
    keywords: ["popular destinations", "Kerala highlights", "Munnar", "Alleppey", "Kochi"]
  },
  {
    question: "How do I book/enquire about a package?",
    answer: "You can book through our website at https://keraladrives.com  or fill out our enquiry form at https://enquiry.keraladrives.com to get started.",
    keywords: ["book package", "enquiry", "booking", "online booking", "keraladrives.com"]
  },
  {
    question: "How can I contact you for more details?",
    answer: "You can reach us at +91 8086407979 or by email at info@keraladrives.com. We’re here to help with any questions!",
    keywords: ["contact us", "customer support", "phone number", "email address"]
  }
];

 const calculateSimilarity = (str1, str2) => {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  const intersection = new Set([...s1].filter(char => s2.includes(char)));
  const union = new Set([...s1, ...s2]);
  return intersection.size / union.size;
};

const extractKeywords = (input) => {
  const stopWords = new Set(['a', 'an', 'the', 'is', 'are', 'do', 'does', 'i', 'you']);
  return [...new Set(input.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => !stopWords.has(word) && word.length > 2))];
};

const parseMessageText = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, index) =>
    urlRegex.test(part) ? (
      <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold">
        {part}
      </a>
    ) : (
      part
    )
  );
};
// components/Message.js
const Message = ({ message }) => (
  <div className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
    <div className={`max-w-3/4 rounded-lg p-3 ${message.isBot ? 'bg-gray-100 text-gray-800' : 'bg-blue-500 text-white'}`}>
      {parseMessageText(message.text)}
    </div>
  </div>
);

const TypingIndicator = () => (
  <div className="flex items-center text-gray-500 mb-4">
    <div className="w-2 h-2 bg-gray-500 rounded-full mr-1 animate-bounce"></div>
    <div className="w-2 h-2 bg-gray-500 rounded-full mr-1 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
  </div>
);

// New FAQ Suggestions component
const FAQSuggestions = ({ onQuestionClick }) => {
  const suggestedQuestions = [
    "What types of tour packages do you offer?",
    "What are the popular destinations in your packages?",
    "Do your packages include food?",
    "What types of accommodations do you provide?",
    "Do you have packages for honeymooners?"
  ];

  return (
    <div className="space-y-2 mb-4">
      <p className="text-gray-600 font-medium mb-2">Frequently Asked Questions:</p>
      {suggestedQuestions.map((question, index) => (
        <button
          key={index}
          onClick={() => onQuestionClick(question)}
          className="w-full text-left p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 text-sm border border-gray-200"
        >
          {question}
        </button>
      ))}
    </div>
  );
};

const ChatBotModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ 
    id: 1, 
    text: "Hello! I'm your Kerala Drives assistant. How can I help you plan your trip? Feel free to ask me anything or choose from the suggestions below.", 
    isBot: true 
  }]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFAQClick = async (question) => {
    setHasInteracted(true);
    setMessages(prev => [...prev, { id: messages.length + 1, text: question, isBot: false }]);
    
    const response = generateResponse(question);
    await simulateTyping(response);
    
    setMessages(prev => [...prev, { id: messages.length + 2, text: response, isBot: true }]);
  };

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
    const greetings = ['hello', 'hi', 'hey'];
    const goodbyes = ['bye', 'goodbye', 'see you'];
    const thanks = ['thank', 'thanks'];

    if (greetings.some(greeting => input.toLowerCase().includes(greeting))) return "Hello! How can I help you plan your trip?";
    if (goodbyes.some(goodbye => input.toLowerCase().includes(goodbye))) return "Goodbye! Feel free to return anytime.";
    if (thanks.some(thank => input.toLowerCase().includes(thank))) return "You're welcome! Need anything else?";

    const match = findBestMatch(input);
    if (match.score > 1.5) return match.faq.answer;
    else if (match.score > 0.8) return `${match.faq.answer} Feel free to ask for more details!`;
    else return "I'm not sure about that. Could you rephrase? You can ask about packages, activities, or destinations.";
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

    setHasInteracted(true);
    setMessages(prev => [...prev, { id: messages.length + 1, text: inputText, isBot: false }]);
    setInputText('');

    const response = generateResponse(inputText);
    await simulateTyping(response);

    setMessages(prev => [...prev, { id: messages.length + 2, text: response, isBot: true }]);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 md:w-14 md:h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        aria-label="Open chat"
      >
        <IoChatbubbleEllipses className="w-6 h-6 md:w-7 md:h-7" />
      </button>

      {isOpen && (
        <div className="fixed bottom-0 md:bottom-24 right-0 w-full sm:w-[400px] h-[100dvh] md:h-[500px] transform transition-transform duration-300 ease-out z-50">
          <div className="absolute inset-0 bg-gray-200 shadow-lg rounded-t-2xl md:rounded-2xl flex flex-col overflow-hidden">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-white hover:text-gray-100 z-10"
              aria-label="Close chat"
            >
              <IoMdClose size={24} />
            </button>

            <div className="bg-blue-600 text-white px-4 py-3 flex items-center">
              <FaRobot className="mr-2 text-xl" />
              <h1 className="text-xl font-semibold">Kerala Drives Assistant</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((message) => (
                <Message key={message.id} message={message} />
              ))}
              {!hasInteracted && <FAQSuggestions onQuestionClick={handleFAQClick} />}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t bg-white p-4">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={isTyping}
                  className="px-4 md:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="hidden md:inline">Send</span>
                  <IoSend />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black transition-opacity duration-300 z-40 sm:hidden opacity-50"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default ChatBotModal;