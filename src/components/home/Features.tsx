
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import FadeIn from '../animations/Fade-in';
import { cn } from '../../lib/utils';
import { Brain, Lightbulb, GraduationCap, BarChart, Users, Sparkles } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, delay }) => {
  return (
    <FadeIn delay={delay} className="w-full">
      <Card className="h-full hover:shadow-medium transition-all duration-300 overflow-hidden group">
        <div className="absolute h-1 w-0 bg-primary top-0 left-0 transition-all duration-500 group-hover:w-full"></div>
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="p-2 rounded-md bg-primary/10 text-primary">
            {icon}
          </div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardContent>
      </Card>
    </FadeIn>
  );
};

interface FeaturesProps {
  className?: string;
}

const Features: React.FC<FeaturesProps> = ({ className }) => {
  const features = [
    {
      title: 'Intelligent Tutoring',
      description: 'AI-powered tutoring systems that adapt to each student\'s learning pace and style, providing personalized guidance.',
      icon: <Brain className="h-6 w-6" />,
    },
    {
      title: 'Content Generation',
      description: 'Create educational materials, quizzes, and exercises tailored to specific curriculum needs and learning objectives.',
      icon: <Lightbulb className="h-6 w-6" />,
    },
    {
      title: 'Roadmap Guidance',
      description: 'Gain insights and come up with strategies, tailored for you specifically.',
      icon: <BarChart className="h-6 w-6" />,
    },
    {
      title: 'Accessibility Tools',
      description: 'Make education more accessible with tools for language translation, text-to-speech, and content adaptation.',
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: 'Skill Assessment',
      description: 'Automatically evaluate student skills and knowledge gaps to provide targeted learning recommendations.',
      icon: <GraduationCap className="h-6 w-6" />,
    },
    {
      title: 'Creative Learning',
      description: 'Foster creativity through AI-assisted projects, interactive simulations, and collaborative learning experiences.',
      icon: <Sparkles className="h-6 w-6" />,
    },
  ];

  return (
    <div id="features" className={cn('py-16 md:py-24', className)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Transforming Education with AI
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover how artificial intelligence is revolutionizing teaching and learning experiences through these innovative applications.
            </p>
          </FadeIn>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={100 + index * 50}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
