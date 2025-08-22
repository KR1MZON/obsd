'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FadeIn, StaggeredList, TextReveal, Parallax } from '../animations';
import { FaTrophy, FaMedal, FaAward, FaCertificate } from 'react-icons/fa';

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  competition: string;
  image?: string;
  awardType: string;
}

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export default function AchievementsSection({ achievements }: AchievementsSectionProps) {
  const mockAchievements: Achievement[] = [
    {
      id: '1',
      title: 'National Championship Winner',
      description: 'First place in the National Robot Combat Championship 2023',
      date: '2023-11-15',
      competition: 'National Robot Combat Championship',
      awardType: 'gold'
    },
    {
      id: '2',
      title: 'Innovation Award',
      description: 'Best Innovation in Robot Design and Engineering',
      date: '2023-09-20',
      competition: 'Tech Innovation Summit',
      awardType: 'innovation'
    },
    {
      id: '3',
      title: 'Regional Tournament Victory',
      description: 'Champions of the Regional Robot Fighting Tournament',
      date: '2023-07-10',
      competition: 'Regional Robot Fighting Tournament',
      awardType: 'silver'
    }
  ];

  const displayAchievements = achievements?.length > 0 ? achievements : mockAchievements;

  return (
    <section id="achievements" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0000] via-[#120303] to-black z-0"></div>
      
      {/* Magma cracks overlay */}
      <div className="absolute inset-0 opacity-15 z-0" 
        style={{
          backgroundImage: `url('/images/magma-texture.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'overlay'
        }}>
      </div>
      
      {/* Animated magma glow effects */}
      <Parallax offset={50}>
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full filter blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(255,69,0,0.15) 0%, rgba(255,69,0,0) 70%)' }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </Parallax>
      
      <Parallax offset={-30}>
        <motion.div 
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full filter blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(255,140,0,0.1) 0%, rgba(255,140,0,0) 70%)' }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </Parallax>

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <motion.div className="text-center mb-16">
            <motion.h2 
              className="text-5xl md:text-6xl font-bold mb-6"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              <motion.span 
                className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Achievements
              </motion.span>
            </motion.h2>
            <motion.p 
              className="text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              A track record of excellence in robot combat competitions and engineering innovation.
            </motion.p>
          </motion.div>
        </FadeIn>

        <div className="relative">
          {/* Timeline line */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 hidden md:block"
            style={{ 
              background: 'linear-gradient(to bottom, rgba(255,69,0,0.1), rgba(255,69,0,0.5), rgba(255,69,0,0.1))' 
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <StaggeredList>
            {displayAchievements.map((achievement, index) => (
              <AchievementCard 
                key={achievement.id} 
                achievement={achievement} 
                isEven={index % 2 === 0}
              />
            ))}
          </StaggeredList>
        </div>
      </div>
    </section>
  );
}

function AchievementCard({ achievement, isEven }: { achievement: Achievement; isEven: boolean }) {
  const getAwardIcon = (type: string) => {
    switch (type) {
      case 'gold':
        return <FaTrophy className="text-yellow-400" />;
      case 'silver':
        return <FaMedal className="text-gray-300" />;
      case 'innovation':
        return <FaAward className="text-blue-400" />;
      default:
        return <FaCertificate className="text-orange-400" />;
    }
  };

  return (
    <motion.div 
      className={`flex items-center mb-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Timeline dot */}
      <motion.div 
        className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-orange-500 bg-black z-10"
        whileHover={{ scale: 1.2 }}
        animate={{
          boxShadow: [
            '0 0 0 0 rgba(255, 69, 0, 0.4)',
            '0 0 0 10px rgba(255, 69, 0, 0)',
            '0 0 0 0 rgba(255, 69, 0, 0)'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Achievement card */}
      <motion.div 
        className={`w-full md:w-5/12 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/20 rounded-lg p-6 shadow-2xl hover:shadow-orange-500/10 transition-all duration-150">
          <div className="flex items-center mb-4">
            <div className="text-2xl mr-3">
              {getAwardIcon(achievement.awardType)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{achievement.title}</h3>
              <p className="text-orange-400 text-sm">{achievement.competition}</p>
            </div>
          </div>
          
          <p className="text-gray-300 mb-4">{achievement.description}</p>
          
          <div className="flex justify-between items-center">
            <span className="text-orange-500 font-semibold">
              {new Date(achievement.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            
            <motion.div
              className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full"
              whileHover={{ backgroundColor: 'rgba(255, 69, 0, 0.2)' }}
            >
              <span className="text-orange-400 text-xs font-medium uppercase tracking-wide">
                {achievement.awardType}
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Spacer for the other side */}
      <div className="hidden md:block w-5/12" />
    </motion.div>
  );
}