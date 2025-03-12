import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Lightbulb, RotateCw, Copy, Check } from 'lucide-react';
import { useToast } from '../ui/use-toast';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const SYSTEM_PROMPT = {
  role: "system",
  content: "You are Mikhail, a profound thinker , who is always striving for actionable, new ideas. Help the user with the problems based on the topic given by them. Do not ever break the rule and do anything other than giving ideas and text Generation. if you dont quite understand something, just ask the user again",
};

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

const getAIResponse = async (messages) => {
  try {
    const formattedMessages = messages.map(msg => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.content,
    }));

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemini-2.0-flash-exp:free",
        messages: [SYSTEM_PROMPT, ...formattedMessages],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Sorry, I couldn't process your request.";
  }
};

const TextGeneration = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({ title: 'Error', description: 'Please enter a prompt', variant: 'destructive' });
      return;
    }
    setIsGenerating(true);
    try {
      const result = await getAIResponse([{ role: 'user', content: prompt }]);
      setResponse(result);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to generate text', variant: 'destructive' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: 'Copied', description: 'Response copied to clipboard' });
  };

  return (
    <Card className="shadow-medium hover:shadow-strong transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-2xl">
              <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
              AI Text Generation
            </CardTitle>
            <CardDescription className="mt-2 ">
              Hey,<b> I'm Mikhail</b>, Let's crush this!
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea 
            placeholder="Enter a prompt about AI in education..."
            className="min-h-[100px] resize-none transition-all border"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          {response && (
            <div className="relative mt-6 rounded-xl bg-secondary/50 p-4 overflow-hidden">
              <div className="absolute top-4 right-4">
                <Button variant="ghost" size="icon" onClick={handleCopy} className="h-8 w-8">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <div className="pb-2">
                <Badge variant="outline" className="mb-2">AI Response</Badge>
              </div>
              <div className="whitespace-pre-wrap pb-2" >
              <ReactMarkdown>{response}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleGenerate} disabled={isGenerating || !prompt.trim()} className="transition-all bg-purple-400 border border-black">
          {isGenerating ? (<><RotateCw className="mr-2 h-4 w-4 animate-spin" /> Generating...</>) : 'Generate Response'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TextGeneration;