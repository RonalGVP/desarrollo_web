// components/chatbot/ChatBot.jsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SendHorizontal, Bug, Cloud, Loader2 } from 'lucide-react';
import useChatbot from '../../hooks/useChatbot';  // Asegúrate de que la ruta es correcta

const Message = ({ text, sender }) => {
  const messageRef = useRef(null);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div
      ref={messageRef}
      className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}
    >
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          sender === 'user'
            ? 'bg-green-500 text-white rounded-br-none'
            : 'bg-gray-100 text-gray-800 rounded-bl-none'
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default function Chatbot() {
  const { messages, loading, error, handleSendMessage } = useChatbot();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessageWrapper = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    handleSendMessage(input); // Llamamos al hook para enviar el mensaje
    setInput(''); // Limpiar la entrada
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 transform transition-all hover:shadow-2xl">
          <div className="flex items-center space-x-3 mb-6">
            <Bug className="w-8 h-8 text-green-500" />
            <Cloud className="w-8 h-8 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-800">
              Chatbot de Plagas y Clima
            </h2>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex-1 overflow-y-auto max-h-[60vh] scroll-smooth">
              {messages.map((msg, index) => (
                <Message key={index} text={msg.text} sender={msg.sender} />
              ))}
              {loading && (
                <div className="flex items-center space-x-2 text-gray-500">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Escribiendo...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {error && (
              <div className="text-red-500">{error}</div>
            )}

            <div className="flex space-x-2 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessageWrapper()}
                className="flex-1 p-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
                placeholder="Escribe tu mensaje..."
              />
              <button
                onClick={handleSendMessageWrapper}
                className="p-4 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={input.trim() === '' || loading}
              >
                <SendHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
