
import React from 'react';
import { cn } from '../../lib/utils';
import { Brain } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', withText = true, className }) => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizeMap = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={cn('flex items-center', className)}>
      <div className="relative">
        <Brain className={cn(sizeMap[size], "text-primary")} />
      </div>
      {withText && (
        <span className={cn('ml-2 font-semibold tracking-tight', textSizeMap[size])}>
          EduAI
        </span>
      )}
    </div>
  );
};

export default Logo;
