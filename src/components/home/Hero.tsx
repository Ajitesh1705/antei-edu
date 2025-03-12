
import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import FadeIn from '../animations/Fade-in';
import { cn } from '../../lib/utils';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <div className={cn('relative overflow-hidden', className)}>
    
    <div className="absolute inset-0 bg-gradient-to-br from-[#3498db]/5 to-[blue]/15 -z-10" />
      
      
      <div className="absolute top-20 left-1/3 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-red-300-300/10 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4 pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn from="bottom" delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Transforming Education with <span className="text-primary text-blue-700"> <br></br>Artificial Intelligence</span>
            </h1>
          </FadeIn>
          
          <FadeIn from="bottom" delay={200}>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore cutting-edge AI technologies designed to enhance teaching and learning experiences. 
              Discover practical applications that are shaping the future of education.
            </p>
          </FadeIn>
          
          <FadeIn from="bottom" delay={300}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="px-8 h-12 text-base bg-blue-500 text-cyan-50 border border-black font-medium ">
                <Link to="/dashboard">
                  Try AI Demos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 h-12 text-base font-medium">
                <a href="#features">
                  Learn More
                </a>
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default Hero;
