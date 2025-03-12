
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import TextGeneration from '../components/demos/TextGeneration';
import LearningAssistant from '../components/demos/LearningAssistant';
import FadeIn from '../components/animations/Fade-in';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Brain, Lightbulb, AlignVerticalJustifyEnd} from 'lucide-react';
import RoadmapPlanner from '../components/demos/RoadmapPlanner';



const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                AI Education Dashboard
              </h1>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="text-lg text-muted-foreground mb-8">
                Explore interactive AI demos and tools for educational applications
              </p>
            </FadeIn>
            
            <div className="mt-8">
              <Tabs defaultValue="all" className="w-full ">
                <TabsList className="grid w-full max-w-3xl grid-cols-5">
                  <TabsTrigger value="all">All Demos</TabsTrigger>
                  <TabsTrigger value="text" className="flex items-center ">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Text AI
                  </TabsTrigger>
                  <TabsTrigger value="assistant" className="flex items-center">
                    <Brain className="mr-2 h-4 w-4" />
                    Assistant
                  </TabsTrigger>
                <TabsTrigger value="roadmap" className="flex items-center">
                    <AlignVerticalJustifyEnd className="mr-2 h-4 w-4" />
                    Roadmap
                  </TabsTrigger>
                 
                </TabsList>
                
                <TabsContent value="all" className="mt-6 space-y-8">
                  <FadeIn delay={200}>
                    <TextGeneration />
                  </FadeIn>
                  <FadeIn delay={300}>
                    <LearningAssistant />
                  </FadeIn>
                  <FadeIn delay={300}>
                    <RoadmapPlanner />
                  </FadeIn>
                
                </TabsContent>
                
                <TabsContent value="text" className="mt-6">
                  <FadeIn>
                    <TextGeneration />
                  </FadeIn>
                </TabsContent>
                
                <TabsContent value="assistant" className="mt-6">
                  <FadeIn>
                    <LearningAssistant />
                  </FadeIn>
                </TabsContent>
                <TabsContent value="roadmap" className="mt-6">
                  <FadeIn>
                    <RoadmapPlanner />
                  </FadeIn>
                </TabsContent>
                
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
