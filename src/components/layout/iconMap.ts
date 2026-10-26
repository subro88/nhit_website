import React from 'react';
import {
  Award,
  BookOpen,
  Briefcase,
  Building,
  Building2,
  Bus,
  Car,
  CircleDot,
  Clock,
  Coffee,
  Compass,
  Cpu,
  Cog,
  Download,
  FileText,
  FlaskConical,
  GraduationCap,
  Hammer,
  HeartPulse,
  Mail,
  MapPin,
  Navigation,
  PhoneCall,
  Rocket,
  Send,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Users,
  Wifi,
  Wrench,
  Zap,
} from 'lucide-react';

/*
 * CMS pages store icons as plain text names (e.g. "Rocket").
 * This map turns the name back into a lucide icon on the public page.
 * Add more icons here when a page needs them.
 */
export const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Award,
  BookOpen,
  Briefcase,
  Building,
  Building2,
  CircleDot,
  Clock,
  Download,
  FileText,
  Mail,
  MapPin,
  Navigation,
  PhoneCall,
  Send,
  ShieldCheck,
  Bus,
  Car,
  Coffee,
  Compass,
  Cpu,
  Cog,
  FlaskConical,
  GraduationCap,
  Hammer,
  HeartPulse,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Trophy,
  Users,
  Wifi,
  Wrench,
  Zap,
};

export const ICON_NAMES = Object.keys(ICON_MAP);

export function iconFor(name?: string): React.ComponentType<{ className?: string }> {
  return (name && ICON_MAP[name]) || Star;
}
