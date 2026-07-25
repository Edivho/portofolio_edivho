export interface SkillItem {
  id: string;
  name: string;
  level: string;
  percentage: number;
  category: 'frontend' | 'backend' | 'mobile' | 'tools' | 'engineering';
  description: string;
  isStarred?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  category: string;
  features: string[];
  businessValue: string;
  mockupBg: string;
  externalUrl: string;
  image?: string; // <-- Tambahkan baris ini
}

export interface RecruiterReason {
  id: string;
  iconName: string;
  title: string;
  description: string;
  extendedDetail: string;
}