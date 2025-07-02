import React from 'react';
import Link from 'next/link';
import {MenuItem} from '@/config/structure';

interface NavigationProps {
  items: MenuItem[];
  mobile?: boolean;
  onItemClick?: () => void;
  className?: string;
  lang: string;
}

const Navigation: React.FC<NavigationProps> = ({ 
  items, 
  mobile = false, 
  onItemClick,
  className = '',
  lang = 'en'
}) => {
  if (mobile) {
    return (
      <div className={`px-2 pt-2 pb-3 space-y-1 ${className}`}>
        {items.map((item, index) => (
          <Link
            key={index}
            href={`/${lang}${item.href}`}
            className="block px-3 py-2.5 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 transform hover:translate-x-1 text-center"
            onClick={onItemClick}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {item.name}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <nav className={`flex space-x-1 ${className}`}>
      {items.map((item, index) => (
        <Link
          key={index}
          href={`/${lang}${item.href}`}
          className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-all duration-200 relative group rounded-lg hover:bg-blue-50"
        >
          {item.name}
          <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-6 rounded-full"></span>
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;