import  { useState } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Route, RotateCw,} from 'lucide-react';
import { useToast } from '../ui/use-toast';
import ReactMarkdown from 'react-markdown';

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

const RoadmapPlanner = () => {
  const [subject, setSubject] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<string>('');
  const { toast } = useToast();

  const generateRoadmap = async () => {
    if (!subject || !timeframe) return;
    setIsLoading(true);
    
    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "google/gemini-2.0-flash-exp:free",
          messages: [
            {
              role: "system",
              content: "You are MJ, a career expert that generates structured learning roadmaps. Format responses using Markdown for clarity and include weekly topics and resources. Use a line , between each week and a bigger space between each month",
            },
            {
              role: "user",
              content: `Create a personalized study roadmap for learning ${subject} in ${timeframe}. Include weekly breakdowns, key topics, and useful resources, make it your priority, the responses should be well spaced and thorough. Its okay to ask again if you dont understand something.`
            }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      setRoadmap(response.data.choices[0].message.content.trim());
      toast({ title: 'Roadmap Generated', description: 'Your personalized study plan is ready!', className:"bg-white"});
    } catch (error) {
      console.error("Error fetching AI response:", error);
      toast({ title: 'Error', description: 'Failed to generate roadmap', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-medium hover:shadow-strong transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-2xl">
              <Route className="mr-2 h-5 w-5 text-primary" />
              Study Roadmap Planner
            </CardTitle>
            <CardDescription className="mt-2">
              Don't know where to start? <b>MJ</b> has your back!
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="What do you want to learn? (e.g., Machine Learning)"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger >
                <SelectValue  className="bg-white"placeholder="Available time" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="1 month">1 Month</SelectItem>
                <SelectItem value="3 months">3 Months</SelectItem>
                <SelectItem value="6 months">6 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {roadmap && (
            <div className="mt-6 p-4 rounded-lg border bg-secondary/50">
              <ReactMarkdown>{roadmap}</ReactMarkdown>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={generateRoadmap} disabled={isLoading} className="transition-all  bg-purple-400 border border-black">
          {isLoading ? (
            <>
              <RotateCw className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Roadmap'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoadmapPlanner;
