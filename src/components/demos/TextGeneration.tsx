import { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Lightbulb, RotateCw, Copy, Check } from 'lucide-react';
import { useToast } from '../ui/use-toast';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import useAuth from '../auth/useAuth';

const TextGeneration = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { token } = useAuth();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({ title: 'Error', description: 'Please enter a prompt', variant: 'destructive', className: 'bg-white' });
      return;
    }
    setIsGenerating(true);
    try {
      const result = await axios.post(
        'http://localhost:5000/api/gemini',
        {
          prompt,
          agentType: 'roadmapPlanner', // Adjust if needed
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Full API Response:', result.data);
      setResponse(result.data.choices[0].message.content || '');
      if (!result.data.choices[0].message.content) {
        toast({ title: 'Warning', description: 'No text received from backend', className: 'bg-white' });
      }
    } catch (error: unknown) {
      if (error.response && error.response.status === 401) {
        toast({
          title: 'Caution',
          description: 'Please sign in to use this feature!',
          variant: 'default', 
          className: 'bg-blue-100 border-blue-800 text-black', 
        });
      } else {
        
        toast({ title: 'Error', description: 'Failed to generate text', variant: 'destructive', className: 'bg-white' });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: 'Copied', description: 'Response copied to clipboard', className:"bg-white" });
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
            <CardDescription className="mt-2">
              Hey, <b>I'm Mikhail</b>, Let's crush this!
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
            <div className="relative mt-6 rounded-xl bg-secondary/50 p-4 min-h-[100px] overflow-auto">
              <div className="absolute top-4 right-4">
                <Button variant="ghost" size="icon" onClick={handleCopy} className="h-8 w-8">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <div className="pb-2">
                <Badge variant="outline" className="mb-2">AI Response</Badge>
              </div>
              <div className="whitespace-pre-wrap pb-2">
                <ReactMarkdown
                  components={{
                    h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-5 mb-3" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-4 mb-2" {...props} />,
                    p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4" {...props} />,
                  }}
                >
                  {response}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="transition-all bg-purple-400 border border-black"
        >
          {isGenerating ? (
            <>
              <RotateCw className="mr-2 h-4 w-4 animate-spin" /> Generating...
            </>
          ) : (
            'Generate Response'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TextGeneration;