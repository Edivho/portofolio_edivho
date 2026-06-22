export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'mobile'
  | 'tools'
  | 'engineering';

export interface SkillItem {
  id: string;
  name: string;
  level: 'Advanced' | 'Intermediate';
  percentage: number; // For visualization
  category: SkillCategory;
  description: string;
  isStarred?: boolean; // Highlighted skills
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
  externalUrl?: string;
}

export interface RecruiterReason {
  id: string;
  iconName: string;
  title: string;
  description: string;
  extendedDetail: string;
}
