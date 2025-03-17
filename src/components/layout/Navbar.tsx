import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import Logo from '../ui/logo';
import AuthButton from '../auth/AuthButton';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        mobileMenuOpen
          ? 'bg-white py-3' // White background when menu is open
          : isScrolled
          ? 'bg-white/80 backdrop-blur-md py-3 shadow-subtle :bg-slate-900/80'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center" aria-label="EduAI Home">
          <Logo size="md" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                isActive(link.path)
                  ? 'text-primary'
                  : 'text-foreground/80'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <AuthButton />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white pt-20 px-4">
          <nav className="flex flex-col items-center gap-6 pt-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-lg font-medium transition-colors hover:text-primary',
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-foreground/80'
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-6">
              <AuthButton />
            </div>
            <Button
              variant="outline"
              className="mt-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Close
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;