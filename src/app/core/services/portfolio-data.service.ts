import { Injectable } from '@angular/core';
import {
  PersonalInfo, SkillCategory, CoreSkill, Project,
  Experience, Achievement, ArchNode, Certification, NavItem
} from '../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {

  readonly personalInfo: PersonalInfo = {
    name: 'Gowri Prasath Babu',
    title: 'Senior Full Stack Software Engineer',
    location: 'Coimbatore, Tamil Nadu, India',
    experience: '5+ Years',
    email: 'gowriprasathbabu@gmail.com',
    phone: '+91 9486740455',
    github: 'https://github.com/gowriprasath',
    linkedin: 'www.linkedin.com/in/gowriprasathbabu-software-developer-fullstack',
    summary: `Dedicated Full Stack Software Engineer with 5+ years of extensive experience designing and developing enterprise-grade applications. Specializing in Angular, ASP.NET Core, React, and AWS cloud solutions. Proven track record of leading cross-functional teams, architecting scalable systems, and delivering high-quality software across global deployments.`,
    resumeUrl: '/assets/resume/Gowri Prasath Babu - Software Developer.pdf',
  };

  readonly rotatingTitles = [
    'Angular Expert',
    '.NET Core Developer',
    'Cloud Engineer',
    'React Developer',
    'Ionic Developer',
    'Solution Architect',
  ];

  readonly navItems: NavItem[] = [
    { label: 'About',        anchor: 'about' },
    { label: 'Skills',       anchor: 'skills' },
    { label: 'Experience',   anchor: 'experience' },
    { label: 'Projects',     anchor: 'projects' },
    { label: 'Architecture', anchor: 'architecture' },
    { label: 'Contact',      anchor: 'contact' },
  ];

  readonly coreSkills: CoreSkill[] = [
    { label: 'Angular',      percentage: 95 },
    { label: '.NET Core',    percentage: 95 },
    { label: 'TypeScript',   percentage: 92 },
    { label: 'React',        percentage: 85 },
    { label: 'AWS',          percentage: 80 },
    { label: 'SQL Server',   percentage: 90 },
    { label: 'DevOps',       percentage: 75 },
  ];

  readonly skillCategories: SkillCategory[] = [
    {
      id: 'frontend',
      label: 'Frontend',
      icon: '⚡',
      color: '#FF6B00',
      skills: [
        { name: 'Angular 20', level: 95, icon: '🅰️' },
        { name: 'TypeScript', level: 92, icon: '📘' },
        { name: 'JavaScript', level: 90, icon: '🟨' },
        { name: 'React',      level: 85, icon: '⚛️' },
        { name: 'Ionic',      level: 82, icon: '📱' },
        { name: 'HTML5',      level: 95, icon: '🌐' },
        { name: 'SCSS/CSS3',  level: 88, icon: '🎨' },
        { name: 'RxJS',       level: 85, icon: '🔄' },
      ],
    },
    {
      id: 'backend',
      label: 'Backend',
      icon: '⚙️',
      color: '#3B82F6',
      skills: [
        { name: 'ASP.NET Core', level: 95, icon: '🔷' },
        { name: 'C#',           level: 92, icon: '💠' },
        { name: 'Entity Framework', level: 88, icon: '🗄️' },
        { name: 'REST APIs',    level: 95, icon: '🔌' },
        { name: 'SignalR',      level: 75, icon: '📡' },
      ],
    },
    {
      id: 'database',
      label: 'Database',
      icon: '🗃️',
      color: '#22C55E',
      skills: [
        { name: 'MSSQL',     level: 90, icon: '🗄️' },
        { name: 'SQL Server', level: 90, icon: '💽' },
        { name: 'T-SQL',     level: 85, icon: '📊' },
        { name: 'Stored Procedures', level: 82, icon: '📋' },
      ],
    },
    {
      id: 'cloud',
      label: 'Cloud & DevOps',
      icon: '☁️',
      color: '#F59E0B',
      skills: [
        { name: 'AWS EC2',         level: 82, icon: '☁️' },
        { name: 'AWS ECS/EKS',     level: 78, icon: '🐋' },
        { name: 'Docker',          level: 80, icon: '🐳' },
        { name: 'GitHub Actions',  level: 78, icon: '🔧' },
        { name: 'AWS IAM',         level: 80, icon: '🔐' },
        { name: 'AWS ELB',         level: 75, icon: '⚖️' },
      ],
    },
    {
      id: 'security',
      label: 'Security',
      icon: '🔒',
      color: '#A855F7',
      skills: [
        { name: 'Keycloak',      level: 85, icon: '🔑' },
        { name: 'OAuth2 / JWT',  level: 88, icon: '🛡️' },
        { name: 'Authentication', level: 90, icon: '🔐' },
        { name: 'Authorization', level: 88, icon: '✅' },
      ],
    },
    {
      id: 'quality',
      label: 'Quality',
      icon: '✨',
      color: '#EC4899',
      skills: [
        { name: 'SonarQube',    level: 82, icon: '🔍' },
        { name: 'Unit Testing', level: 80, icon: '🧪' },
        { name: 'Code Review',  level: 92, icon: '👁️' },
        { name: 'Agile/SCRUM',  level: 90, icon: '🔄' },
      ],
    },
  ];

  readonly projects: Project[] = [
    {
      id: 'procon',
      title: 'PROCON',
      subtitle: 'Global Process Evaluation Platform',
      description: 'Multi-Level Process Flow Evaluation and Awarding System deployed across 10+ countries. Built for enterprise procurement evaluation with advanced workflow management.',
      longDescription: 'Enterprise-grade platform for multi-level approval workflows, enabling organizations to evaluate and award processes across global operations.',
      tech: ['Angular', 'ASP.NET Core', 'MSSQL', 'SMTP', 'AWS EC2', 'AWS ELB', 'Docker'],
      features: [
        'Multi-level approval workflows',
        'Email notification system',
        'Real-time dashboard analytics',
        'Multi-country deployment (10+ nations)',
        'Role-based access control',
        'Nigeria onsite deployment',
      ],
      featured: true,
      year: '2022',
      status: 'live',
    },
    {
      id: 'vfix',
      title: 'V-Fix',
      subtitle: 'Enterprise Support Management Portal',
      description: 'Centralized Support Ticket Management Portal with full lifecycle management, SLA tracking, and seamless Keycloak authentication integration.',
      tech: ['Angular', 'ASP.NET Core', 'MSSQL', 'Keycloak', 'SignalR'],
      features: [
        'End-to-end ticket lifecycle management',
        'SLA tracking & breach alerts',
        'Background service automation',
        'HMR implementation',
        'Keycloak SSO integration',
        'Real-time notifications',
      ],
      featured: true,
      year: '2023',
      status: 'live',
    },
    {
      id: 'procuresprint',
      title: 'ProcureSprint Agentic',
      subtitle: 'AI-Powered Procurement Platform',
      description: 'Cutting-edge AI-powered procurement workflow platform leveraging Microsoft Copilot for intelligent automation, agentic workflows, and smart procurement decisions.',
      tech: ['React', 'Vite', 'TypeScript', 'Copilot Integration', 'Web Components'],
      features: [
        'Agentic AI automation',
        'Microsoft Copilot integration',
        'Intelligent procurement suggestions',
        'Web Components architecture',
        'Real-time AI recommendations',
        'Procurement analytics dashboard',
      ],
      featured: true,
      year: '2024',
      status: 'in-progress',
    },
    {
      id: 'invoice-mgmt',
      title: 'Supplier Invoice Management',
      subtitle: 'Invoice Automation System',
      description: 'End-to-end supplier invoice automation and management system with intelligent workflow processing, reporting, and multi-vendor support.',
      tech: ['Angular', 'ASP.NET Core', 'MSSQL', 'AWS S3'],
      features: [
        'Automated invoice processing',
        'Multi-vendor workflow',
        'Comprehensive reporting suite',
        'Approval chain management',
        'Document management',
        'Audit trail logging',
      ],
      year: '2022',
      status: 'completed',
    },
    {
      id: 'einvoice',
      title: 'E-Invoice & E-Way Bill',
      subtitle: 'GST Compliance Automation',
      description: 'Automated GST-compliant e-invoice and e-way bill generation platform with direct integration to government APIs and real-time validation.',
      tech: ['Angular', 'ASP.NET Core', 'MSSQL', 'Government APIs', 'SMTP'],
      features: [
        'GST compliance automation',
        'Real-time government API integration',
        'E-way bill generation',
        'Bulk invoice processing',
        'Compliance reporting',
        'Multi-format exports',
      ],
      year: '2021',
      status: 'completed',
    },
  ];

  readonly experiences: Experience[] = [
    {
      id: 'exalca',
      company: 'Exalca Technologies',
      role: 'Senior Full Stack Software Engineer',
      period: '2021 – Present',
      location: 'Coimbatore, Tamil Nadu',
      description: 'Leading enterprise product development for global clients across procurement, support management, and compliance domains.',
      responsibilities: [
        'Architecting and developing enterprise Angular applications using latest features including Signals API, standalone components, and SSR',
        'Building scalable ASP.NET Core REST APIs with clean architecture and SOLID principles',
        'Managing AWS infrastructure including EC2, ECS, EKS, ELB, S3, and IAM',
        'Integrating Keycloak for enterprise SSO with OAuth2/JWT authentication flows',
        'Leading SonarQube quality gates and conducting comprehensive code reviews',
        'Mentoring junior developers and driving SDLC best practices in Agile environment',
        'Onsite deployment and client engagement in Nigeria for PROCON global rollout',
        'Deploying products across 10+ countries with multi-tenant architecture',
      ],
      technologies: [
        'Angular 20', 'TypeScript', 'ASP.NET Core', 'C#', 'MSSQL',
        'AWS', 'Docker', 'Keycloak', 'SonarQube', 'React', 'Ionic',
      ],
      current: true,
    },
  ];

  readonly achievements: Achievement[] = [
    { id: 'countries', value: '10+', label: 'Countries Served', description: 'Global product deployments', icon: '🌍' },
    { id: 'projects',  value: '20+', label: 'Projects Delivered', description: 'Enterprise solutions shipped', icon: '🚀' },
    { id: 'years',     value: '5+',  label: 'Years Experience', description: 'Full stack engineering', icon: '⚡' },
    { id: 'users',     value: '1K+', label: 'Enterprise Users', description: 'Active platform users', icon: '👥' },
  ];

  readonly archNodes: ArchNode[] = [
    {
      id: 'frontend',
      label: 'Frontend Layer',
      tech: 'Angular 20',
      icon: '⚡',
      color: '#FF6B00',
      description: 'Signals API · SSR · Lazy Loading',
      connector: false,
    },
    {
      id: 'api',
      label: 'API Gateway',
      tech: 'ASP.NET Core',
      icon: '🔌',
      color: '#3B82F6',
      description: 'REST APIs · Clean Architecture',
      connector: true,
    },
    {
      id: 'database',
      label: 'Data Layer',
      tech: 'MSSQL',
      icon: '🗄️',
      color: '#22C55E',
      description: 'Entity Framework · Stored Procs',
      connector: true,
    },
    {
      id: 'cloud',
      label: 'Cloud Infrastructure',
      tech: 'AWS',
      icon: '☁️',
      color: '#F59E0B',
      description: 'EC2 · ECS · EKS · ELB · S3',
      connector: true,
    },
    {
      id: 'security',
      label: 'Security Layer',
      tech: 'Keycloak',
      icon: '🔒',
      color: '#A855F7',
      description: 'OAuth2 · JWT · SSO',
      connector: false,
    },
  ];

  readonly certifications: Certification[] = [
    {
      id: 'aws-dev',
      name: 'AWS Certified Developer – Associate',
      issuer: 'Amazon Web Services',
      status: 'planned',
      badge: '☁️',
    },
    {
      id: 'az-204',
      name: 'Azure Developer Associate (AZ-204)',
      issuer: 'Microsoft',
      status: 'planned',
      badge: '🔷',
    },
    {
      id: 'ckad',
      name: 'Certified Kubernetes Application Developer',
      issuer: 'CNCF',
      status: 'planned',
      badge: '🐋',
    },
    {
      id: 'angular-cert',
      name: 'Angular Professional Certification',
      issuer: 'Angular Team',
      status: 'in-progress',
      badge: '🅰️',
    },
  ];
}
