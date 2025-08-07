'use client';

import { cn } from '@/lib/utils';
import {
  FileText,
  ImageIcon,
  LayoutDashboard,
  Lightbulb,
  MessageSquare,
  Mic,
  Settings,
} from 'lucide-react';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-red-500',
  },
  {
    label: 'Talk With AI',
    href: '/conversation',
    icon: MessageSquare,
  },
  {
    label: ' Image Mind',
    href: '/image',
    icon: ImageIcon,
  },
  {
    label: 'Voice Decode',
    href: '/speech-to-text',
    icon: Mic,
  },
  {
    label: 'Text Summarizer',
    href: '/text-summarizer',
    icon: FileText,
  },
  {
    label: 'Code Assistant',
    href: '/code',
    icon: Lightbulb,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-[#111111]/90 backdrop-blur-lg border-r border-[#1f1f1f] shadow-md">
      <div className="px-6 py-4 flex items-center gap-x-3">
        <div className="relative h-9 w-9">
          <Image fill alt="Logo" src="/logo.png" className="rounded-lg" />
        </div>
        <h1 className={cn('text-xl font-bold text-[#2563eb] tracking-wide', montserrat.className)}>
          Brainee
        </h1>
      </div>

      <nav className="flex flex-col gap-y-1 px-4 mt-6">
        {routes.map((route) => {
          const isActive = pathname === route.href;
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'flex items-center gap-x-3 py-2 px-3 rounded-lg transition-all duration-200 group font-medium text-sm',
                isActive
                  ? 'bg-[#2563EB]/20 text-[#2563EB] font-semibold shadow-inner'
                  : 'text-gray-300 hover:bg-[#1d1f24] hover:text-[#2563EB]'
              )}
            >
              <route.icon
                className={cn(
                  'w-5 h-5 transition-all duration-200',
                  isActive ? 'text-[#2563EB]' : 'text-gray-400 group-hover:text-[#2563EB]'
                )}
              />
              <span className="text-sm">{route.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
    
  );
};

export default Sidebar;
