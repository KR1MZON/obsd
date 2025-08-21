'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn, Parallax } from '../animations';
import { FaPlay, FaArrowDown, FaRocket, FaCog, FaTrophy } from 'react-icons/fa';

interface HeroSectionProps {
  siteSettings: {
    teamName: string;
    tagline: string;
    heroBackground?: string;
  };
}

const stats = [
  { icon: FaRocket, value: '50+', label: 'Robots Built' },
  { icon: FaTrophy, value: '25+', label: 'Championships' },
  { icon: FaCog, value: '100+', label: 'Competitions' },
];

const floatingElements = [
  { id: 1, size: 'w-2 h-2', delay: 0, duration: 8 },
  { id: 2, size: 'w-1 h-1', delay: 2, duration: 6 },
  { id: 3, size: 'w-3 h-3', delay: 4, duration: 10 },
  { id: 4, size: 'w-1.5 h-1.5', delay: 1, duration: 7 },
  { id: 5, size: 'w-2.5 h-2.5', delay: 3, duration: 9 },
];

export default function HeroSection({ siteSettings }: HeroSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {siteSettings.heroBackground ? (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${siteSettings.heroBackground})` }}
          />
        ) : null}
        
        {/* Enhanced gradient overlay - Dark Magma Theme */}
         <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-red-950/80 to-black/90" />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {/* Professional artistic gradient overlay */}
             <div 
               className="absolute inset-0 opacity-20"
               style={{
                 background: `
                   linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, transparent 60%),
                   linear-gradient(225deg, rgba(249, 115, 22, 0.12) 0%, transparent 50%),
                   linear-gradient(45deg, rgba(153, 27, 27, 0.08) 0%, transparent 40%)
                 `
               }}
             />
          
          {/* Magma Texture Overlay */}
           <div className="absolute inset-0 opacity-15">
             <div className="absolute inset-0" style={{
               backgroundImage: `
                 radial-gradient(circle at 20% 30%, rgba(220, 38, 38, 0.3) 0%, transparent 60%),
                 radial-gradient(circle at 80% 70%, rgba(249, 115, 22, 0.25) 0%, transparent 60%)
               `,
               backgroundSize: '100px 100px'
             }} />
           </div>
          
          {/* Floating magma particles */}
           {floatingElements.map((element) => (
             <motion.div
               key={element.id}
               className={`absolute ${element.size} bg-gradient-to-r from-red-500 to-orange-500 rounded-full opacity-60`}
              style={{
                left: `${20 + (element.id * 15)}%`,
                top: `${30 + (element.id * 10)}%`,
              }}
              animate={{
                y: [-25, 25, -25],
                x: [-10, 10, -10],
                opacity: [0.2, 0.7, 0.2],
                scale: [0.8, 1.3, 0.8],
              }}
              transition={{
                duration: element.duration,
                repeat: Infinity,
                delay: element.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
          
          {/* Interactive magma glow effect */}
           <motion.div
             className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/15 blur-3xl pointer-events-none"
            style={{
              left: mousePosition.x - 192,
              top: mousePosition.y - 192,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        style={{ y, opacity }}
      >
        {/* Main heading */}
        <FadeIn delay={0.2}>
          <motion.h1 
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-family-heading)' }}
          >
            <span className="block text-gradient-primary">
              {siteSettings.teamName}
            </span>
          </motion.h1>
        </FadeIn>

        {/* Tagline */}
        <FadeIn delay={0.4}>
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-family-primary)' }}
          >
            {siteSettings.tagline}
          </motion.p>
        </FadeIn>

        {/* CTA Buttons */}
        <FadeIn delay={0.6}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl font-semibold text-lg text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <FaRocket className="text-xl" />
                Explore Our Robots
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
            
            <motion.button
              className="group flex items-center gap-3 px-8 py-4 border-2 border-gray-600 rounded-xl font-semibold text-lg text-gray-300 hover:border-orange-500 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-300">
                <FaPlay className="ml-1" />
              </div>
              Watch Demo
            </motion.button>
          </div>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={0.8}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="glass-effect rounded-2xl p-6 text-center hover-lift"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                  <stat.icon className="text-2xl text-white" />
                </div>
                <div className="text-3xl font-bold text-gradient-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-3 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <FaArrowDown className="text-gray-400 mt-2 mx-auto" />
      </motion.div>
    </section>
  );
}