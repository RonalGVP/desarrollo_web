'use client';

export default function Message({ text, sender }) {
  return (
    <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs p-3 rounded-lg ${
          sender === 'user'
            ? 'bg-green-500 text-white'
            : 'bg-gray-200 text-gray-800'
        }`}
      >
        {text}
      </div>
    </div>
  );
}