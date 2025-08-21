'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn, Parallax } from '../animations';
import { 
  FaRobot, 
  FaTools, 
  FaChalkboardTeacher, 
  FaTrophy, 
  FaWrench, 
  FaCode,
  FaCog,
  FaLightbulb,
  FaShieldAlt,
  FaArrowRight,
  FaCheck,
  FaStar
} from 'react-icons/fa';
import { IconType } from 'react-icons';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  color: string;
  features: string[];
  price?: string;
  popular?: boolean;
  detailedDescription?: string;
}

interface ServicesSectionProps {
  services?: {
    id: string;
    title: string;
    description: string;
    iconType?: string;
    color?: string;
    detailedDescription?: string;
    image?: string;
  }[];
}

const defaultServices: Service[] = [
  {
    id: 'robot-design',
    title: 'Robot Design & Engineering',
    description: 'Complete robot design from concept to CAD models, optimized for combat performance.',
    icon: FaRobot,
    color: 'from-blue-500 to-cyan-500',
    features: ['3D CAD Modeling', 'Structural Analysis', 'Weight Optimization', 'Weapon Integration'],
    price: 'From $2,500',
    popular: true
  },
  {
    id: 'fabrication',
    title: 'Precision Fabrication',
    description: 'Professional manufacturing services using state-of-the-art CNC and 3D printing.',
    icon: FaTools,
    color: 'from-orange-500 to-red-500',
    features: ['CNC Machining', '3D Printing', 'Welding Services', 'Assembly'],
    price: 'From $1,800'
  },
  {
    id: 'training',
    title: 'Combat Training',
    description: 'Comprehensive training programs for drivers and builders of all skill levels.',
    icon: FaChalkboardTeacher,
    color: 'from-green-500 to-emerald-500',
    features: ['Driver Training', 'Strategy Development', 'Safety Protocols', 'Competition Prep'],
    price: 'From $500'
  },
  {
    id: 'competition',
    title: 'Competition Support',
    description: 'Full event support including pit crew, repairs, and strategic guidance.',
    icon: FaTrophy,
    color: 'from-yellow-500 to-orange-500',
    features: ['Pit Crew Service', 'Live Repairs', 'Strategy Consulting', 'Equipment Rental'],
    price: 'From $1,200'
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Upgrades',
    description: 'Keep your robot in peak condition with regular maintenance and performance upgrades.',
    icon: FaWrench,
    color: 'from-purple-500 to-pink-500',
    features: ['Regular Maintenance', 'Performance Upgrades', 'Damage Repair', 'Parts Replacement'],
    price: 'From $300'
  },
  {
    id: 'software',
    title: 'Control Systems',
    description: 'Advanced control software and electronics for precise robot operation.',
    icon: FaCode,
    color: 'from-indigo-500 to-purple-500',
    features: ['Custom Software', 'Electronics Design', 'Sensor Integration', 'Remote Control'],
    price: 'From $800'
  }
];

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="group relative h-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Popular badge */}
      {service.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
            <FaStar className="text-xs" />
            Most Popular
          </div>
        </div>
      )}
      
      <div className="relative h-full glass-effect rounded-2xl overflow-hidden border border-gray-700/50 group-hover:border-orange-500/50 transition-all duration-500">
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
        
        {/* Content */}
        <div className="relative p-8 h-full flex flex-col">
          {/* Icon */}
          <div className="mb-6">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
              <service.icon className="text-white text-2xl" />
            </div>
          </div>
          
          {/* Title and Description */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gradient-primary transition-all duration-300">
              {service.title}
            </h3>
            <p className="text-gray-400 leading-relaxed">
              {service.description}
            </p>
          </div>
          
          {/* Features */}
          <div className="mb-6 flex-1">
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <FaCheck className="text-green-500 text-sm" />
              What's Included
            </h4>
            <ul className="space-y-2">
              {service.features.map((feature, idx) => (
                <motion.li 
                  key={idx}
                  className="text-gray-400 text-sm flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index * 0.1) + (idx * 0.05) }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Price */}
          {service.price && (
            <div className="mb-6">
              <div className="text-2xl font-bold text-gradient-primary">
                {service.price}
              </div>
            </div>
          )}
          
          {/* CTA Button */}
          <motion.button
            className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 relative overflow-hidden ${
              service.popular 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 shadow-lg' 
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Get Started
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaArrowRight className="text-sm" />
              </motion.div>
            </span>
            {!service.popular && (
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default function ServicesSection({ services: customServices }: ServicesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Process custom services or use defaults
  const processedServices: Service[] = customServices && customServices.length > 0 
    ? customServices.map((customService, index) => {
        let icon: IconType = FaRobot;
        let color = 'from-orange-500 to-red-500';
        
        // Map iconType to appropriate icon
        switch (customService.iconType) {
          case 'design':
            icon = FaRobot;
            color = 'from-blue-500 to-cyan-500';
            break;
          case 'fabrication':
            icon = FaTools;
            color = 'from-orange-500 to-red-500';
            break;
          case 'training':
            icon = FaChalkboardTeacher;
            color = 'from-green-500 to-emerald-500';
            break;
          case 'competition':
            icon = FaTrophy;
            color = 'from-yellow-500 to-orange-500';
            break;
          case 'maintenance':
            icon = FaWrench;
            color = 'from-purple-500 to-pink-500';
            break;
          case 'software':
            icon = FaCode;
            color = 'from-indigo-500 to-purple-500';
            break;
        }
        
        return {
          id: customService.id || `service-${index}`,
          title: customService.title,
          description: customService.description,
          icon,
          color,
          features: ['Professional Service', 'Expert Support', 'Quality Guarantee', 'Fast Delivery'],
          detailedDescription: customService.detailedDescription
        };
      })
    : defaultServices;
  
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950 to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {/* Professional artistic gradient overlay */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            background: `
              linear-gradient(140deg, rgba(220, 38, 38, 0.15) 0%, transparent 52%),
              linear-gradient(220deg, rgba(249, 115, 22, 0.12) 0%, transparent 42%),
              linear-gradient(50deg, rgba(153, 27, 27, 0.08) 0%, transparent 32%)
            `
          }}
        />
          
          {/* Floating magma particles */}
          <Parallax speed={0.3}>
            <motion.div 
              className="absolute top-1/5 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-red-500/15 to-orange-500/10 blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </Parallax>
          
          <Parallax speed={-0.2}>
            <motion.div 
              className="absolute bottom-1/4 right-1/6 w-80 h-80 rounded-full bg-gradient-to-r from-red-500/15 to-orange-500/10 blur-3xl"
              animate={{
                scale: [1.2, 0.8, 1.2],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 3,
              }}
            />
          </Parallax>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <FadeIn delay={0.1}>
            <motion.div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 mb-6">
              <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Our Services</span>
            </motion.div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-primary" style={{ fontFamily: 'var(--font-family-heading)' }}>
              Professional Solutions
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              From concept to competition, we provide comprehensive services to help you build, maintain, and dominate with your combat robot.
            </p>
          </FadeIn>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {processedServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA Section */}
        <FadeIn delay={0.8}>
          <div className="text-center">
            <div className="glass-effect rounded-2xl p-8 border border-gray-700/50">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Need a Custom Solution?
                </h3>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Every robot is unique. Let's discuss your specific requirements and create a tailored service package that fits your needs and budget.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl font-semibold text-lg text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <FaLightbulb className="text-xl" />
                    Get Custom Quote
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
                
                <motion.button
                  className="group px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold text-lg text-white border border-gray-600 hover:border-orange-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-3">
                    <FaShieldAlt className="text-xl" />
                    View Portfolio
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}