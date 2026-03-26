import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PhotoPreviewProps {
  src?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const PhotoPreview: React.FC<PhotoPreviewProps> = ({ src, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-20 h-16',
  };

  if (src) {
    return (
      <div className={cn('rounded-lg overflow-hidden border border-gray-200 shadow-sm', sizeClasses[size])}>
        <img
          src={src}
          alt="Profile preview"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={cn('rounded-lg bg-[#2EB67D] flex items-center justify-center relative overflow-hidden', sizeClasses[size])}>
      {/* Head circle */}
      <div className="absolute w-3 h-3 rounded-full bg-white/90 top-2" />
      {/* Body shape */}
      <div className="absolute w-6 h-6 rounded-full bg-white/90 bottom-1" />
    </div>
  );
};
