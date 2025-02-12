'use client';

import { useState } from 'react';
import { sendMessage } from '../../services/ChabotServices';
import Message from './Message';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const response = await sendMessage(input);
    const botMessage = { text: response, sender: 'bot' };
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    setInput('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Chatbot de Plagas y Clima
          </h2>

          <div className="flex flex-col space-y-4">
            <div className="flex-1 overflow-y-auto max-h-96">
              {messages.map((msg, index) => (
                <Message key={index} text={msg.text} sender={msg.sender} />
              ))}
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Escribe tu mensaje..."
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}