'use client';

import { useState } from 'react';
import { FadeIn } from '../animations';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaCheck, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Parallax } from '../animations';

interface ContactSectionProps {
  siteSettings: {
    teamName: string;
    tagline: string;
    about?: string;
    contactEmail?: string;
    phone?: string;
    address?: string;
    socialMedia?: {
      platform: string;
      url: string;
    }[];
  };
}

export default function ContactSection({ siteSettings }: ContactSectionProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // Simulate form submission
    try {
      // In a real application, you would send the form data to your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      setError('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0505] to-[#0a0000] z-0"></div>
      <div className="absolute inset-0 bg-magma-texture bg-cover bg-center opacity-20 z-0"></div>
      <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] bg-center opacity-5 z-0"></div>
      
      {/* Animated magma glow effects */}
      <Parallax className="absolute -bottom-40 -left-40 z-0" speed={-0.2}>
        <motion.div 
          className="w-[30rem] h-[30rem] rounded-full bg-gradient-to-r from-red-600/20 via-orange-500/10 to-yellow-400/5 blur-3xl"
          animate={{
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </Parallax>
      
      <Parallax className="absolute -top-20 -right-20 z-0" speed={0.1}>
        <motion.div 
          className="w-[25rem] h-[25rem] rounded-full bg-gradient-to-r from-red-700/20 via-orange-600/10 to-amber-500/5 blur-3xl"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
      </Parallax>
      
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn direction="up">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 inline-block"
              style={{
                background: "linear-gradient(to right, #ff4d4d, #ff9500, #ffcb52)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% auto"
              }}
              whileHover={{
                scale: 1.03,
                backgroundPosition: "right center",
                transition: { duration: 0.3 }
              }}
            >
              Get in Touch
            </motion.h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Ready to connect? Send us a quick message below.
            </p>
          </div>
        </FadeIn>

        {/* Compact Contact Form */}
        <FadeIn direction="up">
          <motion.div 
            className="bg-gray-900/40 backdrop-blur-md p-6 rounded-lg border border-gray-800/50 shadow-xl max-w-4xl mx-auto mb-12"
            whileHover={{
              boxShadow: "0 0 25px 5px rgba(255, 100, 50, 0.15)",
              borderColor: "rgba(255, 100, 50, 0.3)",
              transition: { duration: 0.3 }
            }}
          >
            {isSubmitted ? (
              <div className="flex items-center justify-center py-6">
                <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mr-4">
                  <FaCheck className="text-green-500 text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Message Sent!</h4>
                  <p className="text-gray-400 text-sm">We'll get back to you soon.</p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="ml-6 text-red-500 hover:text-red-400 font-medium text-sm"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <motion.input
                      whileFocus={{ boxShadow: "0 0 0 2px rgba(255, 100, 50, 0.5)" }}
                      whileHover={{ borderColor: "rgba(255, 100, 50, 0.5)" }}
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Your Name *"
                      required
                      className="w-full bg-gray-800/80 border border-gray-700/80 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gradient-to-r from-red-500 to-orange-400 focus:border-transparent transition-all duration-300 text-sm"
                    />
                  </div>
                  <div>
                    <motion.input
                      whileFocus={{ boxShadow: "0 0 0 2px rgba(255, 100, 50, 0.5)" }}
                      whileHover={{ borderColor: "rgba(255, 100, 50, 0.5)" }}
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="Your Email *"
                      required
                      className="w-full bg-gray-800/80 border border-gray-700/80 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gradient-to-r from-red-500 to-orange-400 focus:border-transparent transition-all duration-300 text-sm"
                    />
                  </div>
                  <div>
                    <motion.select
                      whileFocus={{ boxShadow: "0 0 0 2px rgba(255, 100, 50, 0.5)" }}
                      whileHover={{ borderColor: "rgba(255, 100, 50, 0.5)" }}
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800/80 border border-gray-700/80 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gradient-to-r from-red-500 to-orange-400 focus:border-transparent transition-all duration-300 text-sm"
                    >
                      <option value="" disabled>Subject *</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Join the Team">Join the Team</option>
                      <option value="Services">Services</option>
                      <option value="Other">Other</option>
                    </motion.select>
                  </div>
                  <div>
                    <motion.button
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 0 15px 2px rgba(255, 100, 50, 0.3)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 text-sm ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                      style={{
                        background: "linear-gradient(to right, #ff4d4d, #ff9500)",
                        backgroundSize: "200% auto"
                      }}
                    >
                      {isSubmitting ? 'Sending...' : 'Send'}
                    </motion.button>
                  </div>
                </div>
                
                <div className="mb-4">
                  <motion.textarea
                    whileFocus={{ boxShadow: "0 0 0 2px rgba(255, 100, 50, 0.5)" }}
                    whileHover={{ borderColor: "rgba(255, 100, 50, 0.5)" }}
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Your message *"
                    required
                    rows={3}
                    className="w-full bg-gray-800/80 border border-gray-700/80 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gradient-to-r from-red-500 to-orange-400 focus:border-transparent transition-all duration-300 text-sm"
                  ></motion.textarea>
                </div>
                
                {error && (
                  <div className="mb-4 p-3 bg-red-900/50 border border-red-800 rounded-lg text-red-200 text-sm">
                    {error}
                  </div>
                )}
              </form>
            )}
          </motion.div>
        </FadeIn>

        {/* Contact Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <FadeIn direction="left">
            <motion.div 
              className="bg-gray-900/40 backdrop-blur-md p-6 rounded-lg border border-gray-800/50 shadow-xl text-center"
              whileHover={{
                boxShadow: "0 0 25px 5px rgba(255, 100, 50, 0.15)",
                borderColor: "rgba(255, 100, 50, 0.3)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="text-red-500 text-xl" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Address</h4>
              <p className="text-gray-400 text-sm">
                {siteSettings.address || '123 Tech Street, Innovation City, IC 12345'}
              </p>
            </motion.div>
          </FadeIn>

          <FadeIn direction="up">
            <motion.div 
              className="bg-gray-900/40 backdrop-blur-md p-6 rounded-lg border border-gray-800/50 shadow-xl text-center"
              whileHover={{
                boxShadow: "0 0 25px 5px rgba(255, 100, 50, 0.15)",
                borderColor: "rgba(255, 100, 50, 0.3)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="w-12 h-12 bg-orange-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPhone className="text-orange-500 text-xl" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Phone</h4>
              <p className="text-gray-400 text-sm">
                {siteSettings.phone || '+1 (555) 123-4567'}
              </p>
            </motion.div>
          </FadeIn>

          <FadeIn direction="right">
            <motion.div 
              className="bg-gray-900/40 backdrop-blur-md p-6 rounded-lg border border-gray-800/50 shadow-xl text-center"
              whileHover={{
                boxShadow: "0 0 25px 5px rgba(255, 100, 50, 0.15)",
                borderColor: "rgba(255, 100, 50, 0.3)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="w-12 h-12 bg-yellow-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="text-yellow-500 text-xl" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Email</h4>
              <p className="text-gray-400 text-sm">
                {siteSettings.contactEmail || 'contact@robotwarriors.com'}
              </p>
            </motion.div>
          </FadeIn>
        </div>

        {/* Business Hours & Social Media */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <FadeIn direction="right">
            <motion.div 
              className="bg-gray-900/40 backdrop-blur-md p-6 rounded-lg border border-gray-800/50 shadow-xl"
              whileHover={{
                boxShadow: "0 0 25px 5px rgba(255, 100, 50, 0.15)",
                borderColor: "rgba(255, 100, 50, 0.3)",
                transition: { duration: 0.3 }
              }}
            >
              <motion.h3 
                className="text-xl font-bold mb-4 inline-block"
                style={{
                  background: "linear-gradient(to right, #ff4d4d, #ff9500)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "200% auto"
                }}
              >
                Business Hours
              </motion.h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Monday - Friday:</span>
                  <span className="text-white">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Saturday:</span>
                  <span className="text-white">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sunday:</span>
                  <span className="text-white">Closed</span>
                </div>
              </div>
            </motion.div>
          </FadeIn>

          <FadeIn direction="left">
            <motion.div 
              className="bg-gray-900/40 backdrop-blur-md p-6 rounded-lg border border-gray-800/50 shadow-xl"
              whileHover={{
                boxShadow: "0 0 25px 5px rgba(255, 100, 50, 0.15)",
                borderColor: "rgba(255, 100, 50, 0.3)",
                transition: { duration: 0.3 }
              }}
            >
              <motion.h3 
                className="text-xl font-bold mb-4 inline-block"
                style={{
                  background: "linear-gradient(to right, #ff4d4d, #ff9500)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "200% auto"
                }}
              >
                Follow Us
              </motion.h3>
              
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.1, color: "#3b82f6" }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="w-10 h-10 bg-gray-800/80 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-500 transition-colors duration-300"
                >
                  <FaFacebook className="text-lg" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, color: "#1da1f2" }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="w-10 h-10 bg-gray-800/80 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-400 transition-colors duration-300"
                >
                  <FaTwitter className="text-lg" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, color: "#e4405f" }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="w-10 h-10 bg-gray-800/80 rounded-full flex items-center justify-center text-gray-400 hover:text-pink-500 transition-colors duration-300"
                >
                  <FaInstagram className="text-lg" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, color: "#0077b5" }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="w-10 h-10 bg-gray-800/80 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-600 transition-colors duration-300"
                >
                  <FaLinkedin className="text-lg" />
                </motion.a>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}