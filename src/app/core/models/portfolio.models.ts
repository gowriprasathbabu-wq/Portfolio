// ============================================================
// PORTFOLIO DOMAIN MODELS
// ============================================================

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  experience: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  summary: string;
  avatar?: string;
  resumeUrl?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: number; // 0–100
  icon?: string;
  years?: number;
}

export interface CoreSkill {
  label: string;
  percentage: number;
  color?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  tech: string[];
  features: string[];
  image?: string;
  link?: string;
  github?: string;
  featured?: boolean;
  year?: string;
  status: 'live' | 'completed' | 'in-progress';
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  current?: boolean;
  logo?: string;
}

export interface Achievement {
  id: string;
  value: string;
  label: string;
  description?: string;
  icon?: string;
}

export interface ArchNode {
  id: string;
  label: string;
  tech: string;
  icon: string;
  color: string;
  description: string;
  connector?: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  badge?: string;
  url?: string;
  status: 'earned' | 'in-progress' | 'planned';
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NavItem {
  label: string;
  anchor: string;
  icon?: string;
}

export type Theme = 'dark' | 'light';
