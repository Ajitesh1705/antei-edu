import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { cn } from '../../lib/utils';
import { Brain, Send, User, Bot, Trash, RotateCw } from 'lucide-react';
import { useToast } from '../ui/use-toast';
import axios from 'axios';
import useAuth from "../auth/useAuth";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const getAssistantResponse = async (messages: Message[], token: string | null): Promise<string> => {
  try {
    if (!token) throw new Error("Unauthorized: Please sign in to use this feature!");

    const response = await axios.post(
      "http://localhost:5000/api/gemini",
      { prompt: messages[messages.length - 1].content, agentType: "learning_assistant" },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("AI API Response:", response.data);

    if (!response.data || !response.data.choices || !response.data.choices[0]) {
      throw new Error("Unexpected API response structure");
    }

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw error; // Re-throw to handle in handleSendMessage
  }
};

const LearningAssistant: React.FC = () => {
  const { user, token } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! **I'm Andrey, your learning companion.**\n\nHow can I help with your educational journey today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    if (!token) {
      toast({
        title: 'Caution',
        description: 'Please sign in to use this feature!',
        variant: 'default',
        className: 'bg-blue-100 border-blue-800 text-black',
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getAssistantResponse([...messages, userMessage], token);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const axiosError = error;
      if (axiosError.message === "Unauthorized: Please sign in to use this feature!" || 
          (axiosError.response && axiosError.response.status === 401)) {
        toast({
          title: 'Caution',
          description: 'Please sign in to use this feature!',
          variant: 'default',
          className: 'bg-blue-100 border-blue-800 text-black',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to get a response',
          variant: 'destructive',
          className: 'bg-white',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Hello! **I'm Andrey, your learning companion.**\n\nHow can I help with your educational journey today?",
        timestamp: new Date(),
      },
    ]);
    toast({
      title: 'Chat cleared',
      description: 'All previous messages have been removed',
      className: "bg-white",
    });
  };

  return (
    <Card className="shadow-medium hover:shadow-strong transition-shadow duration-300 flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-2xl">
              <Brain className="mr-2 h-5 w-5 text-primary" />
              Learning Assistant
            </CardTitle>
            <CardDescription className="mt-2">
              Your AI tutor for personalized educational support
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={clearChat} className="h-8 w-8 bg-white" aria-label="Clear chat">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="space-y-4 max-h-[400px] overflow-y-auto pb-2">
          {messages.map((message) => (
            <div key={message.id} className={cn("flex w-full", message.role === 'user' ? "justify-end" : "justify-start")}>
              <div className={cn("flex max-w-[80%] rounded-lg px-4 py-2", message.role === 'user' ? "text-primary-foreground border border-black-300" : "bg-secondary border border-black-300 bg-cyan-100")}>
                <div className="mr-2 mt-0.5">
                  {message.role === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                </div>
                <div>
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSendMessage} className="w-full flex gap-2">
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask me about any educational topic..." disabled={isLoading} className="flex-1" />
          <Button className='bg-purple-400 border border-black' type="submit" size="icon" disabled={isLoading || !input.trim()}>
            {isLoading ? <RotateCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default LearningAssistant;