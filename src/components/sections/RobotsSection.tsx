'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn, Parallax } from '../animations';
import { FaRobot, FaTrophy, FaCog, FaWeight, FaBolt, FaShieldAlt, FaFilter, FaSearch, FaEye } from 'react-icons/fa';

interface Robot {
  id: string;
  name: string;
  description: string;
  weightClass: string;
  weaponType: string;
  record: string;
  images?: string[];
  buildDate: string;
  status: 'active' | 'retired' | 'development';
}

interface RobotsSectionProps {
  robots: Robot[];
}

const categories = ['All', 'Lightweight', 'Middleweight', 'Heavyweight'];

const RobotCard = ({ robot, index }: { robot: Robot; index: number }) => {
  return (
    <motion.div
      className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      {/* Robot Image */}
       <div className="relative h-48 overflow-hidden">
         {robot.images && robot.images.length > 0 ? (
           <Image
             src={robot.images[0]}
             alt={robot.name}
             fill
             className="object-cover transition-transform duration-500 group-hover:scale-110"
           />
         ) : (
           <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
             <FaRobot className="text-6xl text-gray-400" />
           </div>
         )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
      
      {/* Robot Info */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-gradient-primary transition-all duration-300">
            {robot.name}
          </h3>
          <div className="flex-1 h-px bg-gradient-to-r from-orange-500/50 to-transparent" />
        </div>
        
        <div className="flex items-center gap-4 mb-3">
           <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">
             {robot.weightClass.split(' (')[0]}
           </span>
           <div className="flex items-center gap-1 text-gray-400 text-sm">
             <FaBolt className="text-xs" />
             {robot.weaponType}
           </div>
         </div>
        
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
          {robot.description}
        </p>
        
        {/* Record */}
         <div className="flex items-center gap-2 mt-4">
           <FaTrophy className="text-yellow-500 text-sm" />
           <span className="text-yellow-400 text-xs font-medium">
             Record: {robot.record}
           </span>
         </div>
      </div>
    </motion.div>
  );
};

export default function RobotsSection({ robots }: RobotsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredRobots = robots.filter(robot => {
    const robotWeightClass = robot.weightClass.split(' (')[0]; // Extract weight class name
    const matchesCategory = selectedCategory === 'All' || robotWeightClass === selectedCategory;
    const matchesSearch = robot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         robot.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         robot.weightClass.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         robot.weaponType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  return (
    <section id="robots" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950 to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <Parallax speed={0.2}>
            <motion.div 
              className="absolute top-1/4 left-1/6 w-72 h-72 rounded-full bg-gradient-to-r from-red-500/15 to-orange-500/10 blur-3xl"
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
              className="absolute bottom-1/3 right-1/5 w-96 h-96 rounded-full bg-gradient-to-r from-orange-500/10 to-yellow-500/10 blur-3xl"
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
        <div className="text-center mb-16">
          <FadeIn delay={0.1}>
            <motion.div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-red-900/80 to-orange-900/60 border border-red-800/50 backdrop-blur-sm mb-6">
              <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">Our Arsenal</span>
            </motion.div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-primary" style={{ fontFamily: 'var(--font-family-heading)' }}>
              Combat Robots
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover our collection of championship-winning combat robots, each engineered for maximum destruction and built to dominate the arena.
            </p>
          </FadeIn>
        </div>

        {/* Filters and Search */}
        <FadeIn delay={0.4}>
          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            {/* Search */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search robots..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Results count */}
        <FadeIn delay={0.5}>
          <div className="text-center mb-8">
            <p className="text-gray-400">
              Showing <span className="text-orange-400 font-semibold">{filteredRobots.length}</span> robot{filteredRobots.length !== 1 ? 's' : ''}
              {selectedCategory !== 'All' && (
                <span> in <span className="text-orange-400 font-semibold">{selectedCategory}</span></span>
              )}
            </p>
          </div>
        </FadeIn>

        {/* Robots Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory + searchTerm}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {filteredRobots.map((robot, index) => (
              <RobotCard key={robot.id} robot={robot} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No results */}
        {filteredRobots.length === 0 && (
          <FadeIn delay={0.6}>
            <div className="text-center py-16">
              <FaRobot className="text-6xl text-gray-600 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-400 mb-2">No robots found</h3>
              <p className="text-gray-500">
                Try adjusting your search terms or category filter.
              </p>
            </div>
          </FadeIn>
        )}

        {/* Call to Action */}
        <FadeIn delay={0.8}>
          <div className="text-center mt-16">
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl font-semibold text-lg text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <FaEye className="text-xl" />
                View All Competitions
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}