
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserAvatarProps {
  seed?: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ seed, size = 'md', className }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-16 w-16'
  };

  const avatarUrl = seed ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}` : undefined;

  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      <AvatarImage src={avatarUrl} alt="User avatar" />
      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white">
        {seed ? seed.charAt(0).toUpperCase() : 'U'}
      </AvatarFallback>
    </Avatar>
  );
};
