'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FadeIn, Parallax } from '../animations';
import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope, FaCog, FaRocket, FaUsers, FaLightbulb, FaTrophy } from 'react-icons/fa';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
  socialMedia?: {
    platform: string;
    url: string;
  }[];
}

interface TeamSectionProps {
  teamMembers: TeamMember[];
  statistics: {
    team_stats: Array<{
      icon: string;
      value: number | string;
      suffix?: string;
      label: string;
      description: string;
      use_team_count?: boolean;
    }>;
  };
}

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'linkedin':
      return FaLinkedin;
    case 'twitter':
      return FaTwitter;
    case 'github':
      return FaGithub;
    case 'email':
      return FaEnvelope;
    default:
      return FaEnvelope;
  }
};

const getRoleIcon = (role: string) => {
  const lowerRole = role.toLowerCase();
  if (lowerRole.includes('engineer') || lowerRole.includes('technical')) return FaCog;
  if (lowerRole.includes('lead') || lowerRole.includes('captain')) return FaRocket;
  if (lowerRole.includes('design') || lowerRole.includes('creative')) return FaLightbulb;
  return FaUsers;
};

// Icon mapping for dynamic icon loading
const iconMap: { [key: string]: any } = {
  FaUsers,
  FaCog,
  FaRocket,
  FaLightbulb,
  FaTrophy,
  FaEnvelope
};

const TeamMemberCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const RoleIcon = getRoleIcon(member.role);
  // Generate image path from member name
  const imagePath = `/uploads/teammates/${member.name.toUpperCase()}.png`;
  
  return (
    <motion.div
      className="group relative flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -12 }}
    >
      {/* Larger Artistic Card Container */}
      <motion.div 
        className="relative w-80 h-96 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-slate-700/60 hover:border-orange-500/50 transition-all duration-300 group-hover:shadow-orange-500/30 overflow-hidden"
        whileHover={{ scale: 1.05, rotateY: 3, rotateX: 2 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Artistic background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Profile Image - Larger */}
        <div className="relative w-40 h-40 mx-auto mb-6">
          <motion.div
            className="w-full h-full rounded-full overflow-hidden relative ring-4 ring-slate-600/60 group-hover:ring-orange-500/70 transition-all duration-300"
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Image
              src={imagePath}
              alt={member.name}
              width={160}
              height={160}
              className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/team-member-placeholder.jpeg';
              }}
            />
            
            {/* Artistic overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-orange-500/10 opacity-60 group-hover:opacity-20 transition-opacity duration-300" />
          </motion.div>
          
          {/* Enhanced Role Badge */}
          <motion.div
            className="absolute -bottom-3 -right-3 w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-xl border-3 border-slate-800 group-hover:border-orange-400/50"
            whileHover={{ scale: 1.2, rotate: 15, y: -3 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <RoleIcon className="text-white text-lg" />
          </motion.div>
        </div>
        
        {/* Member Info - Enhanced */}
        <div className="text-center space-y-3 mb-6">
          <motion.h3 
            className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors duration-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {member.name}
          </motion.h3>
          
          <motion.p 
            className="text-slate-400 font-medium text-base tracking-wide group-hover:text-orange-300 transition-colors duration-0"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {member.role}
          </motion.p>
        </div>
        
        {/* Always Visible Social Media Icons */}
        <motion.div 
          className="flex justify-center gap-4 mt-auto"
          initial={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {member.socialMedia && member.socialMedia.length > 0 ? (
            member.socialMedia.map((social, socialIndex) => {
              const SocialIcon = getSocialIcon(social.platform);
              return (
                <motion.a
                  key={socialIndex}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-gradient-to-r from-slate-700/80 to-slate-600/80 backdrop-blur-sm flex items-center justify-center text-slate-300 hover:from-orange-500 hover:to-red-500 hover:text-white transition-all duration-0 shadow-lg border border-slate-600/40 hover:border-orange-400/60 hover:shadow-orange-500/30"
                  whileHover={{ scale: 1.15, rotate: 8, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <SocialIcon className="text-base" />
                </motion.a>
              );
            })
          ) : (
            // Default social icons if none provided
            <>
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-r from-slate-700/60 to-slate-600/60 backdrop-blur-sm flex items-center justify-center text-slate-500 shadow-lg border border-slate-600/30"
                whileHover={{ scale: 1.1 }}
              >
                <FaLinkedin className="text-base" />
              </motion.div>
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-r from-slate-700/60 to-slate-600/60 backdrop-blur-sm flex items-center justify-center text-slate-500 shadow-lg border border-slate-600/30"
                whileHover={{ scale: 1.1 }}
              >
                <FaGithub className="text-base" />
              </motion.div>
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-r from-slate-700/60 to-slate-600/60 backdrop-blur-sm flex items-center justify-center text-slate-500 shadow-lg border border-slate-600/30"
                whileHover={{ scale: 1.1 }}
              >
                <FaEnvelope className="text-base" />
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default function TeamSection({ teamMembers, statistics }: TeamSectionProps) {
  // Convert statistics data to use proper icons and handle dynamic values
  const teamStats = statistics.team_stats.map(stat => {
    let displayValue = stat.value;
    
    // Handle dynamic team member count
    if (stat.use_team_count) {
      displayValue = teamMembers.length;
    }
    
    return {
      ...stat,
      icon: iconMap[stat.icon] || FaUsers,
      displayValue: `${displayValue}${stat.suffix || ''}`
    };
  });
  return (
    <section id="team" className="py-24 relative overflow-hidden">
      {/* Background - Dark Magma Theme */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950 to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {/* Professional artistic gradient overlay */}
        <div 
          className="absolute inset-0 opacity-18"
          style={{
            background: `
              linear-gradient(120deg, rgba(220, 38, 38, 0.14) 0%, transparent 55%),
              linear-gradient(240deg, rgba(249, 115, 22, 0.11) 0%, transparent 45%),
              linear-gradient(60deg, rgba(153, 27, 27, 0.07) 0%, transparent 35%)
            `
          }}
        />
          
          {/* Magma texture overlay */}
           <div className="absolute inset-0 opacity-15">
             <div className="absolute inset-0" style={{
               backgroundImage: `
                 radial-gradient(circle at 25% 25%, rgba(220, 38, 38, 0.3) 0%, transparent 50%),
                 radial-gradient(circle at 75% 75%, rgba(249, 115, 22, 0.2) 0%, transparent 50%)
               `,
               backgroundSize: '80px 80px'
             }} />
           </div>
          
          {/* Floating magma particles */}
          <Parallax speed={0.3}>
            <motion.div 
              className="absolute top-1/6 left-1/12 w-2 h-2 rounded-full bg-red-500/40"
              animate={{
                y: [-10, 10, -10],
                opacity: [0.2, 0.6, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </Parallax>
          
          <Parallax speed={-0.2}>
            <motion.div 
              className="absolute bottom-1/4 right-1/8 w-3 h-3 rounded-full bg-orange-500/30"
              animate={{
                x: [-5, 5, -5],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />
          </Parallax>
          
          {/* Magma glow effects */}
          <Parallax speed={0.1}>
            <motion.div 
              className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-red-500/15 to-orange-500/10 blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </Parallax>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <FadeIn delay={0.1}>
            <motion.div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-red-900/80 to-orange-900/60 border border-red-800/50 mb-6">
              <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Our Team</span>
            </motion.div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-primary" style={{ fontFamily: 'var(--font-family-heading)' }}>
              Meet the Engineers
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our diverse team of engineers, designers, and strategists brings together decades of experience in robotics, mechanical engineering, and competitive combat sports.
            </p>
          </FadeIn>
        </div>

        {/* Team Grid - Adjusted for larger cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16 max-w-7xl mx-auto justify-items-center">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} />
          ))}
        </div>

        {/* Team Stats */}
        <FadeIn delay={0.8}>
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {teamStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center p-6 rounded-2xl glass-effect"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + (index * 0.1) }}
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
                    <IconComponent className="text-xl text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gradient-primary mb-1">
                    {stat.displayValue}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </FadeIn>

        {/* Call to Action */}
        <FadeIn delay={1.2}>
          <div className="text-center mt-16">
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-red-800 to-orange-900 rounded-xl font-semibold text-lg text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <FaEnvelope className="text-xl" />
                Join Our Team
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}