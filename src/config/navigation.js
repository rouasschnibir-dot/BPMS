import {
  LayoutDashboard,
  GitBranch,
  Play,
  Settings,
  Users,
  Bell,
  BarChart3,
  FileText,
  Sparkles,
  Building2,
  Shield,
  User,
  Clock,
  Target,
  Palmtree,
  File,
  Banknote,
  Briefcase,
} from 'lucide-react';

/**
 * Main navigation items for the sidebar.
 * `section` groups items visually. `roles` can be used later for RBAC filtering.
 */
export const navigationItems = [
  {
    section: 'Overview',
    items: [
      { id: 'dashboard',   label: 'Dashboard',       icon: LayoutDashboard, path: '/',               roles: ['all'] },
    ],
  },
  {
    section: 'HR & People',
    items: [
      { id: 'enterprise',  label: 'Enterprise',      icon: Building2,       path: '/enterprise',     roles: ['admin'] },
      { id: 'users',       label: 'User Management', icon: Users,           path: '/users',          roles: ['admin'] },
      { id: 'profile',     label: 'Employee Profile',icon: User,            path: '/profile',        roles: ['all'] },
      { id: 'attendance',  label: 'Attendance',       icon: Clock,           path: '/attendance',     roles: ['all'] },
      { id: 'recruitment', label: 'Recruitment',      icon: Briefcase,       path: '/recruitment',    roles: ['admin', 'hr'] },
    ],
  },
  {
    section: 'Workflows',
    items: [
      { id: 'tasks',       label: 'Task & Performance', icon: Target,       path: '/tasks',          roles: ['all'] },
      { id: 'vacation',    label: 'Vacation Request',   icon: Palmtree,     path: '/vacation',       roles: ['all'] },
      { id: 'documents',   label: 'Document Request',   icon: File,         path: '/documents',      roles: ['all'] },
      { id: 'payroll',     label: 'Payroll',             icon: Banknote,    path: '/payroll',        roles: ['admin', 'hr'] },
    ],
  },
  {
    section: 'Process Management',
    items: [
      { id: 'processes',   label: 'Process Designer', icon: GitBranch,       path: '/processes',      roles: ['admin', 'manager'] },
      { id: 'instances',   label: 'Active Instances', icon: Play,            path: '/instances',      roles: ['all'] },
      { id: 'rules',       label: 'Rules Engine',     icon: FileText,        path: '/rules',          roles: ['admin', 'manager'] },
    ],
  },
  {
    section: 'Intelligence',
    items: [
      { id: 'analytics',    label: 'Analytics',       icon: BarChart3,       path: '/analytics',      roles: ['admin', 'manager'] },
      { id: 'ai-assistant', label: 'AI Assistant',    icon: Sparkles,        path: '/ai-assistant',   roles: ['all'] },
      { id: 'notifications', label: 'Notifications',  icon: Bell,            path: '/notifications',  roles: ['all'] },
    ],
  },
  {
    section: 'System',
    items: [
      { id: 'permissions',  label: 'Permissions',     icon: Shield,          path: '/permissions',    roles: ['admin'] },
      { id: 'settings',     label: 'Settings',        icon: Settings,        path: '/settings',       roles: ['admin'] },
    ],
  },
];
