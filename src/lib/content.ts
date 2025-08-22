import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import yaml from 'js-yaml';

const contentDirectory = path.join(process.cwd(), 'content');

// Helper function to read YAML files
export function getYamlData(filePath: string) {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return yaml.load(fileContents) as Record<string, any>;
  } catch (error) {
    console.error(`Error reading YAML file: ${filePath}`, error);
    return {};
  }
}

// Get site settings
export function getSiteSettings() {
  const filePath = path.join(contentDirectory, 'settings', 'general.yml');
  return getYamlData(filePath);
}

// Get statistics data
export function getStatistics() {
  const filePath = path.join(contentDirectory, 'settings', 'statistics.yml');
  return getYamlData(filePath);
}

// Get all team members
export function getAllTeamMembers() {
  const teamMembersDirectory = path.join(contentDirectory, 'team-members');
  
  if (!fs.existsSync(teamMembersDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(teamMembersDirectory);
  
  return fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(teamMembersDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    
    // Transform socialLinks object to socialMedia array
    let socialMedia = [];
    if (data.socialLinks) {
      socialMedia = Object.entries(data.socialLinks).map(([platform, url]) => ({
        platform,
        url: url as string
      }));
    }
    
    return {
      id,
      ...data,
      socialMedia,
    };
  }).sort((a: any, b: any) => {
    // Sort by join date (newest first)
    return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
  });
}

// Get all robots
export function getAllRobots() {
  const robotsDirectory = path.join(contentDirectory, 'robots');
  
  if (!fs.existsSync(robotsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(robotsDirectory);
  
  return fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(robotsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      id,
      ...data,
    };
  }).sort((a: any, b: any) => {
    // Sort by build date (newest first)
    return new Date(b.buildDate).getTime() - new Date(a.buildDate).getTime();
  });
}

// Get all achievements
export function getAllAchievements() {
  const achievementsDirectory = path.join(contentDirectory, 'achievements');
  
  if (!fs.existsSync(achievementsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(achievementsDirectory);
  
  return fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(achievementsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      id,
      ...data,
    };
  }).sort((a: any, b: any) => {
    // Sort by date (newest first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// Get all sponsors
export function getAllSponsors() {
  const sponsorsDirectory = path.join(contentDirectory, 'sponsors');
  
  if (!fs.existsSync(sponsorsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(sponsorsDirectory);
  
  return fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(sponsorsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      id,
      ...data,
    };
  }).sort((a: any, b: any) => {
    // Sort by date (newest first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// Get all services
export function getAllServices() {
  const servicesDirectory = path.join(contentDirectory, 'services');
  
  if (!fs.existsSync(servicesDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(servicesDirectory);
  
  return fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(servicesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      id,
      ...data,
    };
  }).sort((a: any, b: any) => {
    // Sort by order field (ascending)
    return (a.order || 0) - (b.order || 0);
  });
}