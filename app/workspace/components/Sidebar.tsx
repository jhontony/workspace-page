import { Chrome as Home, MessageSquare, Bell, File, MoveHorizontal as MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, isActive = false }) => {
  return (
    <button
      className={cn(
        'flex flex-col items-center justify-center w-full gap-1 py-3 px-2 rounded-lg transition-all duration-200',
        'text-gray-400 hover:text-white hover:bg-white/10',
        isActive && 'text-white bg-white/15'
      )}
      aria-label={label}
    >
      {icon}
      <span className="text-xs font-medium leading-tight text-center">{label}</span>
    </button>
  );
};

export const Sidebar: React.FC = () => {
  return (
    <div className="w-16 bg-gradient-to-b from-[#4A154B] to-[#3d1140] flex flex-col items-center py-3 border-r border-white/5">
      {/* Logo */}
      <div className="w-10 h-10 bg-white text-[#4A154B] rounded-lg flex items-center justify-center font-bold text-lg mb-4 shadow-lg hover:shadow-xl transition-shadow">
        S
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 w-full px-2 flex-1">
        <SidebarItem icon={<Home size={24} />} label="Home" isActive />
        <SidebarItem icon={<MessageSquare size={24} />} label="DMs" />
        <SidebarItem icon={<Bell size={24} />} label="Activity" />
        <SidebarItem icon={<File size={24} />} label="Files" />
        <SidebarItem icon={<MoreHorizontal size={24} />} label="More" />
      </nav>

      {/* User Avatar */}
      <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-500 rounded-lg flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-white/30 transition-all duration-200 shadow-md" />
    </div>
  );
};
