'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FadeIn, Parallax, Counter } from '../animations';
import { FaRocket, FaTrophy, FaCog, FaUsers, FaLightbulb, FaShieldAlt } from 'react-icons/fa';

interface AboutSectionProps {
  siteSettings: {
    teamName: string;
    tagline: string;
    about: string;
    contactEmail?: string;
    phone?: string;
    address?: string;
    yearsExperience: number;
    robotsBuilt: number;
    championshipsWon: number;
    aboutSection?: {
      sectionTitle: string;
      sectionDescription: string;
      missionTitle: string;
      missionDescription: string;
      features: Array<{
        icon: string;
        title: string;
        description: string;
      }>;
    };
    socialMedia?: {
      platform: string;
      url: string;
    }[];
  };
  statistics: {
    about_achievements: Array<{
      icon: string;
      value: number;
      suffix: string;
      label: string;
      description: string;
    }>;
  };
}

// Icon mapping for dynamic icon loading
const iconMap: { [key: string]: any } = {
  FaRocket,
  FaTrophy,
  FaCog,
  FaUsers,
  FaLightbulb,
  FaShieldAlt
};

// Features will be loaded from CMS data

export default function AboutSection({ siteSettings, statistics }: AboutSectionProps) {
  // Convert statistics data to use proper icons
  const achievements = statistics.about_achievements.map(achievement => ({
    ...achievement,
    icon: iconMap[achievement.icon] || FaCog
  }));
  
  // Get features from CMS or use fallback
  const features = siteSettings.aboutSection?.features?.map(feature => ({
    ...feature,
    icon: iconMap[feature.icon] || FaCog
  })) || [];
  
  // Get section content from CMS with fallbacks
  const sectionTitle = siteSettings.aboutSection?.sectionTitle || 'Engineering Excellence';
  const sectionDescription = siteSettings.aboutSection?.sectionDescription || 'We are a team of passionate engineers and builders dedicated to pushing the boundaries of combat robotics through innovation, precision, and relentless pursuit of excellence.';
  const missionTitle = siteSettings.aboutSection?.missionTitle || 'Our Mission';
  const missionDescription = siteSettings.aboutSection?.missionDescription || 'Every robot we create is a testament to our commitment to precision engineering, innovative design, and the relentless pursuit of victory. We don\'t just build robots – we craft legends.';
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950 to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {/* Professional artistic gradient overlay */}
        <div 
          className="absolute inset-0 opacity-16"
          style={{
            background: `
              linear-gradient(150deg, rgba(220, 38, 38, 0.13) 0%, transparent 50%),
              linear-gradient(210deg, rgba(249, 115, 22, 0.10) 0%, transparent 40%),
              linear-gradient(30deg, rgba(153, 27, 27, 0.06) 0%, transparent 30%)
            `
          }}
        />
          
          {/* Animated magma glow */}
          <Parallax speed={0.2}>
            <motion.div 
              className="absolute top-1/4 left-1/6 w-80 h-80 rounded-full bg-gradient-to-r from-red-500/15 to-orange-500/10 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </Parallax>
          
          <Parallax speed={-0.1}>
            <motion.div 
              className="absolute bottom-1/4 right-1/6 w-80 h-80 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl"
              animate={{
                scale: [1.1, 0.9, 1.1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
            />
          </Parallax>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <FadeIn delay={0.1}>
            <motion.div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 mb-6">
              <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">About Us</span>
            </motion.div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-primary" style={{ fontFamily: 'var(--font-family-heading)' }}>
              {sectionTitle}
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {sectionDescription}
            </p>
          </FadeIn>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <div className="space-y-8">
            <FadeIn delay={0.4}>
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-family-heading)' }}>
                  {missionTitle}
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {siteSettings.about || "We design, build, and compete with cutting-edge combat robots that showcase the pinnacle of engineering excellence. Our team combines years of experience with innovative thinking to create machines that dominate the competition arena."}
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {missionDescription}
                </p>
              </div>
            </FadeIn>

            {/* Features */}
            <FadeIn delay={0.5}>
              <div className="space-y-6">
                {features && features.length > 0 && features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl glass-effect hover-lift"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="text-xl text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">{feature.title}</h4>
                      <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <FadeIn delay={0.6}>
              <div className="relative">
                {/* Main image container */}
                <div className="relative w-full h-96 rounded-2xl overflow-hidden glass-effect">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <FaCog className="text-6xl text-orange-400 mb-4 mx-auto animate-spin" style={{ animationDuration: '8s' }} />
                      <h4 className="text-2xl font-bold text-white mb-2">Innovation in Motion</h4>
                      <p className="text-gray-300">Precision engineering meets creative design</p>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <FaLightbulb className="text-2xl text-white" />
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <FaShieldAlt className="text-xl text-white" />
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Achievements Grid */}
        <FadeIn delay={0.7}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-2xl glass-effect hover-lift"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                  <achievement.icon className="text-2xl text-white" />
                </div>
                <div className="text-3xl font-bold text-gradient-primary mb-2">
                  <Counter end={achievement.value} duration={2} />
                  {achievement.suffix}
                </div>
                <div className="text-lg font-semibold text-white mb-1">
                  {achievement.label}
                </div>
                <div className="text-sm text-gray-400">
                  {achievement.description}
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Call to Action */}
        <FadeIn delay={0.9}>
          <div className="text-center mt-16">
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl font-semibold text-lg text-white shadow-lg hover:shadow-xl transition-all duration-150 overflow-hidden"
              whileHover={{ scale: 1.02, y: -8 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <FaRocket className="text-xl" />
                Discover Our Robots
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}