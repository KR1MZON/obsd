'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn, Parallax } from '../animations';
import { FaPlay, FaArrowDown, FaRocket, FaCog, FaTrophy } from 'react-icons/fa';

interface HeroSectionProps {
  siteSettings: {
    teamName: string;
    tagline: string;
    heroBackground?: string;
  };
  statistics: {
    core_stats: Record<string, {
      value: string | number;
      use_robot_count?: boolean;
      use_team_count?: boolean;
      display_suffix?: string;
      description?: string;
    }>;
    hero_stats: Array<{
      icon: string;
      stat_key: string;
      label: string;
    }>;
  };
}

// Icon mapping for dynamic icon loading
const iconMap: { [key: string]: any } = {
  FaRocket,
  FaTrophy,
  FaCog
};

const floatingElements = [
  { id: 1, size: 'w-2 h-2', delay: 0, duration: 8 },
  { id: 2, size: 'w-1 h-1', delay: 2, duration: 6 },
  { id: 3, size: 'w-3 h-3', delay: 4, duration: 10 },
  { id: 4, size: 'w-1.5 h-1.5', delay: 1, duration: 7 },
  { id: 5, size: 'w-2.5 h-2.5', delay: 3, duration: 9 },
];

export default function HeroSection({ siteSettings, statistics }: HeroSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Convert statistics data to use proper icons and resolve stat values
  const stats = statistics.hero_stats.map(stat => {
    const statData = statistics.core_stats[stat.stat_key];
    let displayValue = statData?.value || 0;
    
    // Handle dynamic calculations
    if (statData?.use_robot_count) {
      displayValue = 3; // Current robot count from content/robots
    } else if (statData?.use_team_count) {
      displayValue = 5; // Current team member count from content/team-members
    }
    
    return {
      ...stat,
      icon: iconMap[stat.icon] || FaCog,
      value: `${displayValue}${statData?.display_suffix || ''}`,
      description: statData?.description || ''
    };
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
            className="text-6xl md:text-7xl lg:text-8xl mb-6 leading-tight"
            style={{ 
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: '700',
              letterSpacing: '0.05em'
            }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                filter: 'brightness(1.4) contrast(1.3) drop-shadow(0 0 40px rgba(251, 146, 60, 1)) drop-shadow(0 0 80px rgba(249, 115, 22, 0.7))'
              }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/logo_text.png"
                alt={siteSettings.teamName}
                width={800}
                height={200}
                className="object-contain mx-auto filter brightness-125 contrast-125"
                style={{
                  filter: 'brightness(1.3) contrast(1.2) drop-shadow(0 0 30px rgba(251, 146, 60, 0.8)) drop-shadow(0 0 60px rgba(249, 115, 22, 0.5))',
                  maxWidth: '100%',
                  height: 'auto'
                }}
                priority
              />
            </motion.div>
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
          <div className="flex justify-center items-center mb-16">
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl font-semibold text-lg text-white shadow-lg hover:shadow-xl transition-all duration-150 overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              onClick={() => {
                const robotsSection = document.getElementById('robots');
                if (robotsSection) {
                  robotsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <FaRocket className="text-xl" />
                Explore Our Robots
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
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