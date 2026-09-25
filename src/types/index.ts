export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  bio?: string;
  company?: string;
  createdAt: string;
  lastLogin?: string;
}

export type Language = 'ar' | 'en';

export type Page = 'home' | 'login' | 'register' | 'dashboard';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface Feature {
  id: string;
  iconName: string;
  titleKey: string;
  descKey: string;
  tagKey: string;
}
