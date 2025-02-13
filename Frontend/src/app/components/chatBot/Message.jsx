'use client';

import { UserCircle, Bot } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Message({ text, sender }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      className={`
        flex items-start gap-2 mb-4 
        ${sender === 'user' ? 'justify-end' : 'justify-start'}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        transition-all duration-300
      `}
    >
      {sender === 'bot' && (
        <Bot className="w-8 h-8 text-green-600 mt-1" />
      )}
      
      <div
        className={`
          max-w-xs lg:max-w-md p-4 rounded-2xl shadow-sm
          ${sender === 'user'
            ? 'bg-green-500 text-white rounded-br-none'
            : 'bg-gray-100 text-gray-800 rounded-bl-none'
          }
          transform transition-all duration-200 hover:shadow-md
          ${sender === 'user' ? 'hover:-translate-x-1' : 'hover:translate-x-1'}
        `}
      >
        <p className="text-sm lg:text-base leading-relaxed break-words">
          {text}
        </p>
      </div>

      {sender === 'user' && (
        <UserCircle className="w-8 h-8 text-green-600 mt-1" />
      )}
    </div>
  );
}