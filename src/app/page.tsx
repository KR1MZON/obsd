import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import {
  HeroSection,
  AboutSection,
  TeamSection,
  RobotsSection,
  SponsorsSection,
  AchievementsSection
} from '@/components/sections';
import { getAllTeamMembers, getAllRobots, getAllAchievements, getSiteSettings, getAllSponsors, getStatistics } from '@/lib/content';

// Get data from CMS
const teamMembers = getAllTeamMembers();
const robots = getAllRobots();
const achievements = getAllAchievements();
const sponsors = getAllSponsors();
const siteSettings = getSiteSettings();
const statistics = getStatistics();

export const metadata: Metadata = {
  title: `${siteSettings.teamName || 'Robot Fighting Team'} - Engineering Champions of the Arena`,
  description: siteSettings.tagline || 'We design, build, and battle with cutting-edge combat robots in competitive tournaments worldwide.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header siteSettings={siteSettings}/>
      <HeroSection siteSettings={siteSettings} />
      <AboutSection siteSettings={siteSettings} statistics={statistics} />
      <TeamSection teamMembers={teamMembers} statistics={statistics} />
      <RobotsSection robots={robots} siteSettings={siteSettings} />
      <AchievementsSection achievements={achievements} siteSettings={siteSettings} />
      <SponsorsSection sponsors={sponsors} />
      <Footer siteSettings={siteSettings}/>
    </main>
  );
}
