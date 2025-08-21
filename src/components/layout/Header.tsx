'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '../animations';

interface HeaderProps {
  siteSettings?: {
    teamName?: string;
    tagline?: string;
    about?: string;
    contactEmail?: string;
    phone?: string;
    address?: string;
    socialMedia?: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      youtube?: string;
    };
  };
}

export default function Header({ siteSettings }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Team', href: '#team' },
    { name: 'Robots', href: '#robots' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-4 shadow-2xl border-b' 
          : 'bg-transparent py-6'
      }`}
      style={{
        background: isScrolled 
          ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(26, 5, 0, 0.9) 50%, rgba(139, 0, 0, 0.85) 100%)'
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        boxShadow: isScrolled 
          ? '0 8px 32px rgba(255, 69, 0, 0.3), 0 0 0 1px rgba(255, 140, 0, 0.2), inset 0 1px 0 rgba(255, 215, 0, 0.1)'
          : 'none',
        borderColor: isScrolled ? 'rgba(255, 140, 0, 0.3)' : 'transparent'
      }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <FadeIn direction="down" duration={0.5}>
          <Link href="#home" className="flex items-center space-x-3 group">
            {/* Enhanced Logo with glow effect */}
            <motion.div 
              className="w-16 h-16 relative overflow-hidden rounded-full"
              whileHover={{ scale: 1.1 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255, 69, 0, 0.3), 0 0 40px rgba(255, 69, 0, 0.1)',
                  '0 0 30px rgba(255, 69, 0, 0.5), 0 0 60px rgba(255, 69, 0, 0.2)',
                  '0 0 20px rgba(255, 69, 0, 0.3), 0 0 40px rgba(255, 69, 0, 0.1)'
                ]
              }}
              transition={{
                boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{
                background: 'radial-gradient(circle, rgba(255, 69, 0, 0.1) 0%, transparent 70%)',
                border: '2px solid rgba(255, 140, 0, 0.3)'
              }}
            >
              <Image
                src="/logo.png"
                alt="Obsidians Logo"
                width={64}
                height={64}
                className="object-contain filter brightness-125 contrast-125 group-hover:brightness-150 transition-all duration-300"
              />
              {/* Rotating glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, rgba(255, 140, 0, 0.4), transparent)',
                  mask: 'radial-gradient(circle, transparent 60%, black 70%, black 80%, transparent 90%)'
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </Link>
        </FadeIn>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <FadeIn key={link.name} direction="down" delay={0.1 * index} duration={0.5}>
              <Link
                href={link.href}
                className="text-white hover:text-accent transition-colors duration-300 font-medium relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </FadeIn>
          ))}
          <FadeIn direction="down" delay={0.6} duration={0.5}>
            <Link
              href="#contact"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-primary text-white px-6 py-2 rounded-full transition-all duration-300 font-medium shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transform hover:scale-105"
            >
              Join Our Team
            </Link>
          </FadeIn>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none hover:text-accent transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-t border-orange-500/20"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link
                      href={link.href}
                      className="text-white hover:text-accent transition-colors duration-300 block py-2 font-medium border-b border-gray-800 hover:border-accent"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    href="#contact"
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-primary text-white px-6 py-2 rounded-full transition-all duration-300 inline-block mt-2 font-medium shadow-lg shadow-orange-500/25"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Join Our Team
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}