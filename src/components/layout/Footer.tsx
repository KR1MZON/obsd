'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FadeIn } from '../animations';
import { useState } from 'react';

interface FooterProps {
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

export default function Footer({ siteSettings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  // Static molten particles - using fixed positions and timings (similar to HeroSection)
  const moltenParticles = [
    { id: 1, x: '10%', delay: 0, size: 4, opacity: 0.8, duration: 8 },
    { id: 2, x: '25%', delay: 1, size: 6, opacity: 0.6, duration: 10 },
    { id: 3, x: '40%', delay: 2, size: 3, opacity: 0.9, duration: 7 },
    { id: 4, x: '55%', delay: 0.5, size: 5, opacity: 0.7, duration: 9 },
    { id: 5, x: '70%', delay: 1.5, size: 4, opacity: 0.8, duration: 8 },
    { id: 6, x: '85%', delay: 2.5, size: 7, opacity: 0.5, duration: 11 },
    { id: 7, x: '15%', delay: 3, size: 3, opacity: 0.9, duration: 6 },
    { id: 8, x: '32%', delay: 1.8, size: 5, opacity: 0.6, duration: 9 },
  ];

  return (
    <footer className="text-white py-16 border-t border-accent/20 relative overflow-hidden">
      {/* Enhanced magma/lava background with metallic tones (matching hero) */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-red-950 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-orange-950/40 via-red-900/20 to-transparent z-5"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-900/10 to-transparent z-5"></div>
      
      {/* Blur overlay on top of background */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-8"></div>
      
      {/* Metallic overlay with subtle shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/5 via-transparent to-zinc-700/10 z-10"></div>
      
      {/* Enhanced molten particle effect with metallic sparks */}
      <div className="absolute inset-0 z-16">
        {moltenParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bottom-0 rounded-full"
            style={{
              left: particle.x,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `radial-gradient(circle, rgba(255, 140, 0, ${particle.opacity}) 0%, rgba(255, 69, 0, ${particle.opacity * 0.9}) 30%, rgba(139, 0, 0, ${particle.opacity * 0.7}) 70%, rgba(75, 0, 0, ${particle.opacity * 0.5}) 100%)`,
              boxShadow: `0 0 ${particle.size * 3}px rgba(255, 69, 0, ${particle.opacity}), 0 0 ${particle.size * 6}px rgba(255, 140, 0, ${particle.opacity * 0.6}), 0 0 ${particle.size * 2}px rgba(212, 175, 55, ${particle.opacity * 0.3})`
            }}
            animate={{
              y: [0, typeof window !== 'undefined' ? -window.innerHeight - 100 : -800],
              opacity: [0, particle.opacity, particle.opacity * 0.9, 0],
              scale: [0.3, 1, 1.4, 0.6],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 2 + 1,
              ease: "easeOut"
            }}
          />
        ))}
        
        {/* Metallic sparks */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`spark-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-yellow-400 to-amber-300 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              bottom: '0px',
              boxShadow: '0 0 4px rgba(255, 215, 0, 0.8), 0 0 8px rgba(255, 215, 0, 0.4)'
            }}
            animate={{
              y: [0, typeof window !== 'undefined' ? -window.innerHeight * 0.6 : -480],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, 0.8, 0.6, 0],
              scale: [0.5, 1, 0.3]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              delay: i * 0.8,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Brand Section */}
          <FadeIn direction="up" delay={0.1}>
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <motion.div 
                  className="w-12 h-12 relative"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Image
                    src="/logo.png"
                    alt="Obsidians Logo"
                    width={60}
                    height={60}
                    className="object-contain drop-shadow-lg"
                  />
                </motion.div>
                <h3 className="text-xl font-bold">
                  {siteSettings?.teamName ? (
                    <motion.span 
                      className="text-accent hover:text-lava transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      {siteSettings.teamName}
                    </motion.span>
                  ) : (
                    <motion.span 
                      className="text-accent hover:text-lava transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      OBSIDIANS
                    </motion.span>
                  )}
                </h3>
              </div>
              
              <p className="text-gray-400 mb-8 leading-relaxed text-sm">
                {siteSettings?.tagline || "Forged in the fires of innovation, tempered in the crucible of competition. Where engineering meets artistry in combat robotics."}
              </p>
              
              {/* Social Media Icons with enhanced styling */}
              <div className="flex space-x-6">
                {siteSettings?.socialMedia?.facebook && (
                  <motion.a 
                    href={siteSettings.socialMedia.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="relative overflow-hidden group"
                    aria-label="Facebook"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600/80 to-red-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 p-2">
                      <svg className="w-6 h-6 text-white group-hover:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <motion.div 
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                      style={{ boxShadow: '0 0 15px rgba(255, 69, 0, 0.7), 0 0 30px rgba(255, 69, 0, 0.4)' }}
                      animate={{ opacity: [0, 0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.a>
                )}
                {siteSettings?.socialMedia?.twitter && (
                  <motion.a 
                    href={siteSettings.socialMedia.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="relative overflow-hidden group"
                    aria-label="Twitter"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600/80 to-red-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 p-2">
                      <svg className="w-6 h-6 text-white group-hover:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </div>
                    <motion.div 
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                      style={{ boxShadow: '0 0 15px rgba(255, 69, 0, 0.7), 0 0 30px rgba(255, 69, 0, 0.4)' }}
                      animate={{ opacity: [0, 0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.a>
                )}
                {siteSettings?.socialMedia?.instagram && (
                  <motion.a 
                    href={siteSettings.socialMedia.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="relative overflow-hidden group"
                    aria-label="Instagram"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600/80 to-red-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 p-2">
                      <svg className="w-6 h-6 text-white group-hover:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <motion.div 
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                      style={{ boxShadow: '0 0 15px rgba(255, 69, 0, 0.7), 0 0 30px rgba(255, 69, 0, 0.4)' }}
                      animate={{ opacity: [0, 0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.a>
                )}
                {siteSettings?.socialMedia?.youtube && (
                  <motion.a 
                    href={siteSettings.socialMedia.youtube} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="relative overflow-hidden group"
                    aria-label="YouTube"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600/80 to-red-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 p-2">
                      <svg className="w-6 h-6 text-white group-hover:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <motion.div 
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                      style={{ boxShadow: '0 0 15px rgba(255, 69, 0, 0.7), 0 0 30px rgba(255, 69, 0, 0.4)' }}
                      animate={{ opacity: [0, 0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.a>
                )}
              </div>
            </div>
          </FadeIn>

          {/* Quick Links */}
          <FadeIn direction="up" delay={0.2}>
            <div>
              <motion.h3 
                className="text-xl font-bold mb-6 inline-block text-white"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 69, 0, 0.9) 0%, rgba(139, 0, 0, 0.8) 50%, rgba(75, 0, 0, 0.9) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
                }}
                whileHover={{ scale: 1.05 }}
              >
                Quick Links
              </motion.h3>
              <ul className="space-y-3">
                {[
                  { name: 'Home', href: '#home' },
                  { name: 'About', href: '#about' },
                  { name: 'Team', href: '#team' },
                  { name: 'Robots', href: '#robots' },
                  { name: 'Achievements', href: '#achievements' },
                  { name: 'Contact', href: '#contact' }
                ].map((link) => (
                  <li key={link.name}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Link 
                        href={link.href} 
                        className="text-gray-300 hover:text-white relative group flex items-center"
                      >
                        <span className="absolute left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-500 group-hover:w-full transition-all duration-300"></span>
                        <span className="group-hover:translate-x-2 transition-transform duration-300">{link.name}</span>
                        <motion.span 
                          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          →
                        </motion.span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn direction="up" delay={0.3}>
            <div>
              <motion.h3 
                className="text-xl font-bold mb-4 inline-block text-white"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 69, 0, 0.9) 0%, rgba(139, 0, 0, 0.8) 50%, rgba(75, 0, 0, 0.9) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
                }}
                whileHover={{ scale: 1.05 }}
              >
                Get In Touch
              </motion.h3>
              
              <motion.form 
                onSubmit={handleSubmit}
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <motion.input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="px-3 py-2 bg-black/30 border border-red-900/20 rounded-md text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/30 transition-all duration-300 text-sm"
                    whileFocus={{ scale: 1.01 }}
                    required
                  />
                  <motion.input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="px-3 py-2 bg-black/30 border border-red-900/20 rounded-md text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/30 transition-all duration-300 text-sm"
                    whileFocus={{ scale: 1.01 }}
                    required
                  />
                </div>
                
                <motion.textarea
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 bg-black/30 border border-red-900/20 rounded-md text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/30 transition-all duration-300 resize-none text-sm"
                  whileFocus={{ scale: 1.01 }}
                  required
                />
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 bg-gradient-to-r from-red-600/80 to-orange-600/80 text-white font-medium rounded-md hover:from-red-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group text-sm"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-1">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-3 h-3 border border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Message
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </motion.form>
            </div>
          </FadeIn>
        </div>

        {/* Contact Info Row */}
        <FadeIn direction="up" delay={0.4}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-black/20 rounded-2xl border border-red-900/20">
            <motion.div 
              className="flex items-center group"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div 
                className="mr-3 flex-shrink-0 p-2 rounded-full bg-gradient-to-br from-red-600/30 to-red-900/30"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </motion.div>
              <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm">
                {siteSettings?.address || 'The Forge, Innovation District'}
              </span>
            </motion.div>
            
            <motion.div 
              className="flex items-center group"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div 
                className="mr-3 flex-shrink-0 p-2 rounded-full bg-gradient-to-br from-red-600/30 to-red-900/30"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </motion.div>
              <a 
                href={`mailto:${siteSettings?.contactEmail || 'forge@obsidians.com'}`} 
                className="text-gray-300 hover:text-white relative group-hover:text-white transition-all duration-300 text-sm"
              >
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-500 group-hover:w-full transition-all duration-300"></span>
                {siteSettings?.contactEmail || 'forge@obsidians.com'}
              </a>
            </motion.div>
            
            <motion.div 
              className="flex items-center group"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div 
                className="mr-3 flex-shrink-0 p-2 rounded-full bg-gradient-to-br from-red-600/30 to-red-900/30"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </motion.div>
              <a 
                href={`tel:${(siteSettings?.phone || '').replace(/[^0-9+]/g, '')}`} 
                className="text-gray-300 hover:text-white relative group-hover:text-white transition-all duration-300 text-sm"
              >
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-500 group-hover:w-full transition-all duration-300"></span>
                {siteSettings?.phone || '(555) FORGE-01'}
              </a>
            </motion.div>
          </div>
        </FadeIn>

        {/* Bottom Section */}
        <FadeIn direction="up" delay={0.5}>
          <div className="border-t border-red-900/30 mt-12 pt-8 text-center">
            <motion.p 
              className="text-gray-400 text-sm"
              whileHover={{ scale: 1.02 }}
            >
              &copy; {currentYear}{' '}
              <motion.span 
                className="font-semibold transition-colors duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 69, 0, 0.9) 0%, rgba(139, 0, 0, 0.8) 50%, rgba(75, 0, 0, 0.9) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
                whileHover={{ scale: 1.1 }}
              >
                {siteSettings?.teamName || 'OBSIDIANS'}
              </motion.span>
              . Forged in innovation, tempered in competition.
            </motion.p>
            <div className="mt-3 flex justify-center">
              <motion.div 
                className="w-24 h-1 rounded-full opacity-80"
                style={{
                  background: 'linear-gradient(90deg, rgba(75, 0, 0, 0.5) 0%, rgba(255, 69, 0, 0.8) 50%, rgba(75, 0, 0, 0.5) 100%)'
                }}
                animate={{
                  boxShadow: [
                    '0 0 5px rgba(255, 69, 0, 0.3), 0 0 10px rgba(255, 69, 0, 0.2)',
                    '0 0 10px rgba(255, 69, 0, 0.5), 0 0 20px rgba(255, 69, 0, 0.3)',
                    '0 0 5px rgba(255, 69, 0, 0.3), 0 0 10px rgba(255, 69, 0, 0.2)'
                  ]
                }}
                transition={{
                  boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}