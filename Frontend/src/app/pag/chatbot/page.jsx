import Chatbot from '../../components/chatBot/ChatBot';
import Navbar from '../../components/Navbar';
import AuthRedirect from "../../components/users/AuthRedirect"

export default function ChatPage() {
  return (
    <div> 
      <AuthRedirect>
        <Navbar />
       <Chatbot />
      </AuthRedirect> 
    </div>
  );
}
