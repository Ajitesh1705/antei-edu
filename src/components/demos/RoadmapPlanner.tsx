import { useState } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Route, RotateCw } from 'lucide-react';
import { useToast } from '../ui/use-toast';
import ReactMarkdown from 'react-markdown';
import useAuth  from "../auth/useAuth"

const RoadmapPlanner = () => {
  const [subject, setSubject] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [roadmap, setRoadmap] = useState('');
  const { toast } = useToast();
  const { token } = useAuth(); 

  const generateRoadmap = async () => {
    if (!subject || !timeframe) return;
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/gemini", 
        {
          prompt,
          agentType: "roadmapPlanner", 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json",
          },
        }
      );

      setRoadmap(response.data.choices[0].message.content.trim());
      toast({ title: 'Roadmap Generated', description: 'Your personalized study plan is ready!', className: "bg-white" });
    } catch (error: unknown) { 
      if (error.response && error.response.status === 401) {
        toast({
          title: 'Caution',
          description: 'Please sign in to use this feature!',
          variant: 'default', 
          className: 'bg-blue-100 border-blue-800 text-black', 
        });
      } else {
        console.error("Error fetching AI response:", axiosError.response ? axiosError.response.data : axiosError.message);
        toast({ title: 'Error', description: 'Failed to generate roadmap', variant: 'destructive' });
      }
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
              <SelectTrigger>
                <SelectValue className="bg-white" placeholder="Available time" />
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
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-8 mb-4 border-b-2 border-gray-300 pb-2" {...props} />, 
                  h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-6 mb-3" {...props} />, 
                  h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-4 mb-2" {...props} />, 
                  p: ({ node, ...props }) => <p className="mb-4" {...props} />, 
                  ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4" {...props} />, 
                  ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4" {...props} />, 
                }}>
                {roadmap}</ReactMarkdown>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={generateRoadmap} disabled={isLoading} className="transition-all bg-purple-400 border border-black">
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
