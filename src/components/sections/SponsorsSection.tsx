'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FadeIn, StaggeredList, HoverEffect } from '../animations';

interface Sponsor {
  id: string;
  title: string;
  description: string;
  image?: string;
  website?: string;
  tier?: 'platinum' | 'gold' | 'silver' | 'bronze';
}

interface SponsorsSectionProps {
  sponsors: Sponsor[];
}

function AutoScrollContainer({ sponsors }: { sponsors: Sponsor[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [translateX, setTranslateX] = useState(0);

  // Duplicate sponsors for seamless loop
  const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors];
  const cardWidth = 208; // w-48 + padding = 208px
  const gap = 24; // gap-6 = 24px
  const totalWidth = sponsors.length * (cardWidth + gap);

  useEffect(() => {
    if (isHovered || sponsors.length === 0) return;

    const interval = setInterval(() => {
      setTranslateX(prev => {
        const newTranslateX = prev - 1; // Move left by 1px
        // Reset when we've scrolled through one full set
        if (Math.abs(newTranslateX) >= totalWidth) {
          return 0;
        }
        return newTranslateX;
      });
    }, 20); // Smooth 50fps animation

    return () => clearInterval(interval);
  }, [isHovered, sponsors.length, totalWidth]);

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={containerRef}
        className="flex gap-6 transition-transform duration-150"
        style={{
          transform: `translateX(${translateX}px)`,
          width: `${duplicatedSponsors.length * (cardWidth + gap)}px`
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {duplicatedSponsors.map((sponsor, index) => (
          <div key={`${sponsor.id}-${index}`} className="flex-shrink-0">
            <SponsorCard sponsor={sponsor} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const CardContent = (
    <div className="group relative p-2">
      <HoverEffect className="h-full">
        <div className="relative h-40 w-48 bg-black/40 backdrop-blur-sm rounded-xl p-4 transition-all duration-150 group-hover:bg-black/60 group-hover:scale-105">
          {/* Standardized Logo */}
          <div className="w-full h-full flex items-center justify-center">
            <img 
              src={sponsor.image || `/uploads/SPONSORS/${sponsor.id}.jpg`}
              alt={sponsor.title}
              className="max-w-full max-h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden text-gray-400 text-2xl font-bold">
              {sponsor.title.charAt(0)}
            </div>
          </div>
        </div>
      </HoverEffect>
    </div>
  );

  // If website exists, wrap in link
  if (sponsor.website) {
    return (
      <a 
        href={sponsor.website} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block cursor-pointer"
      >
        {CardContent}
      </a>
    );
  }

  return CardContent;
}

export default function SponsorsSection({ sponsors }: SponsorsSectionProps) {
  // Use sponsors from CMS, fallback to empty array if none provided
  const displaySponsors = sponsors || [];

  return (
    <section id="sponsors" className="py-24 bg-black relative overflow-hidden">
      {/* Enhanced magma/lava background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-red-950"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-orange-950/40 via-red-900/20 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-900/10 to-transparent"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our <span className="text-orange-500">Sponsors</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Proud partners who fuel our innovation and support our journey to championship victories.
            </p>
          </div>
        </FadeIn>
      </div>
      
      {/* Full-width scrolling container */}
      <div className="relative z-10 w-screen overflow-hidden" style={{ marginLeft: 'calc(-50vw + 50%)' }}>
        <AutoScrollContainer sponsors={displaySponsors} />
      </div>
    </section>
  );
}