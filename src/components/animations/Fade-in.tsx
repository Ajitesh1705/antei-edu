import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  from?: 'bottom' | 'top' | 'left' | 'right' | 'none';
  distance?: number;
  style?: React.CSSProperties;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  className,
  delay = 0,
  duration = 500,
  from = 'bottom',
  distance = 20,
  style = {},
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const getTransform = () => {
    switch (from) {
      case 'bottom':
        return `translateY(${distance}px)`;
      case 'top':
        return `translateY(-${distance}px)`;
      case 'left':
        return `translateX(-${distance}px)`;
      case 'right':
        return `translateX(${distance}px)`;
      default:
        return 'none';
    }
  };

  const styles: React.CSSProperties = {
    opacity: 0,
    transform: getTransform(),
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
    transitionDelay: `${delay}ms`,
    ...style,
  };

  if (isVisible) {
    styles.opacity = 1;
    styles.transform = 'none';
  }

  return (
    <div ref={ref} className={cn(className)} style={styles}>
      {children}
    </div>
  );
};

export default FadeIn;
