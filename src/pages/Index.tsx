
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import FadeIn from '../components/animations/Fade-in';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        
        <Hero />
        <Features />
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Ready to explore AI in education?
              </h2>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Head to our interactive dashboard to try out AI-powered educational tools and see how they can transform learning experiences.
              </p>
            </FadeIn>
            <FadeIn delay={200}>
              <Button asChild size="lg" className="mt-8 px-8 h-12 text-white font-medium bg-blue-500">
                <Link to="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
