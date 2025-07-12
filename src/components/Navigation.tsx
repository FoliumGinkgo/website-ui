// ✅ components/Navigation.tsx
import React from 'react';
import Link from 'next/link';
import { MenuItem } from '@/config/structure';
import { getSupportedLocaleCodes } from '@/config/languageConfig';

function safeLang(lang: string): string {
  const supported = getSupportedLocaleCodes();
  return supported.includes(lang) ? lang : 'en';
}

interface NavigationProps {
  items: MenuItem[];
  mobile?: boolean;
  onItemClick?: () => void;
  className?: string;
  lang: string;
}

const Navigation: React.FC<NavigationProps> = ({ items, mobile = false, onItemClick, className = '', lang = 'en' }) => {
  // const currentLang = safeLang(lang);//会导致重复跳转en
  const currentLang = lang;
  const buildHref = (rawHref: string) => {
    const langPattern = getSupportedLocaleCodes().join('|');
    const cleaned = rawHref.replace(new RegExp(`^\/?(${langPattern})(\/|$)`), '/');
    return `/${currentLang}${cleaned}`;
  };

  if (mobile) {
    return (
      <div className={`px-10 pt-2 pb-3 space-y-1 ${className}`}>
        {items.map((item, index) => (
          <Link
            key={index}
            href={buildHref(item.href)}
            className="block px-3 py-2.5 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 transform hover:translate-x-1 text-center"
            onClick={onItemClick}
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
          href={buildHref(item.href)}
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
