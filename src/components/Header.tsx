'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  HiOutlineSearch,
  HiOutlineMenu,
  HiChevronDown,
  HiCheck,
  HiX
} from 'react-icons/hi';
import { getImageUrl } from '@/utils/imageUtils';
import Navigation from '@/components/Navigation';
import { BASE_TEXT } from '@/config/constants';
import { Language } from '@/config/structure';
import { useGlobalData } from '@/context/GlobalContext';

// 本地存储键名
const LANGUAGE_STORAGE_KEY = 'preferred_language';

const Header: React.FC<{ languages: Language[] }> = ({ languages }) => {
  const [currentLang, setCurrentLang] = useState<string>('en');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMobileLanguageOpen, setIsMobileLanguageOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { textConfig } = useGlobalData();
  const baseInfo = textConfig || BASE_TEXT;

  // 添加这个useEffect来初始化组件和从本地存储加载语言设置
  useEffect(() => {
    // 从本地存储获取保存的语言
    if (typeof window !== 'undefined') {
      try {
        const savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (savedLang) {
          // 检查保存的语言是否在当前支持的语言列表中
          const isValidLang = languages.some(lang => lang.lang === savedLang);
          if (isValidLang) {
            setCurrentLang(savedLang);
          }
        }
      } catch (error) {
        console.error('无法从本地存储读取语言设置:', error);
      }
    }
    
    // 组件挂载后，将loading设置为false
    setLoading(false);
  }, [languages]);
  
  // DOM引用
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const mobileLanguageRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const desktopSearchOverlayRef = useRef<HTMLDivElement>(null);
  const mobileSearchOverlayRef = useRef<HTMLDivElement>(null);

  // 获取当前语言对象
  const currentLanguage = languages.find(lang => lang.lang === currentLang) || languages[0];


  // 处理点击外部区域关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // 关闭移动端菜单
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target) &&
        mobileMenuButtonRef.current && !mobileMenuButtonRef.current.contains(target)) {
        setIsMobileMenuOpen(false);
      }

      // 关闭语言下拉菜单
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(target)) {
        setIsLanguageDropdownOpen(false);
      }
      if (mobileLanguageRef.current && !mobileLanguageRef.current.contains(target)) {
        setIsMobileLanguageOpen(false);
      }

      // 关闭搜索框
      if (desktopSearchOverlayRef.current && !desktopSearchOverlayRef.current.contains(target) &&
        searchRef.current && !searchRef.current.contains(target)) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
      if (mobileSearchOverlayRef.current && !mobileSearchOverlayRef.current.contains(target) &&
        mobileSearchRef.current && !mobileSearchRef.current.contains(target)) {
        setIsMobileSearchOpen(false);
        setSearchQuery('');
      }
    };

    if (isMobileMenuOpen || isLanguageDropdownOpen || isMobileLanguageOpen || isSearchOpen || isMobileSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobileMenuOpen, isLanguageDropdownOpen, isMobileLanguageOpen, isSearchOpen, isMobileSearchOpen]);

  // 搜索处理
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Search:', searchQuery);
      // TODO: Implement search logic
    }
  };

  // 语言切换处理
  const handleLanguageChange = (langFlag: string) => {
    // 保存语言选择到本地存储
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, langFlag);
      }
    } catch (error) {
      console.error('无法保存语言设置到本地存储:', error);
    }
    
    setCurrentLang(langFlag);
    setIsLanguageDropdownOpen(false);
    setIsMobileLanguageOpen(false);
    
    // 获取当前路径
    const pathname = window.location.pathname;
    
    // 提取当前路径中的语言代码和路径部分
    const pathParts = pathname.split('/');
    if (pathParts.length > 1) {
      // 检查第一个路径段是否是语言代码
      const currentLangInPath = languages.some(lang => lang.lang === pathParts[1]);
      
      if (currentLangInPath) {
        // 替换路径中的语言代码
        pathParts[1] = langFlag;
        const newPath = pathParts.join('/');
        
        // 导航到新路径
        window.location.href = newPath + window.location.search;
      } else {
        // 如果当前路径中没有语言代码，添加新的语言代码
        // 修复：确保路径格式正确
        const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('lang_refresh', Date.now().toString());
        window.location.href = `/${langFlag}${cleanPath === '/' ? '' : cleanPath}` + '?' + searchParams.toString();
      }
    } else {
      // 处理极端情况：路径为空或只有根路径
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('lang_refresh', Date.now().toString());
      window.location.href = `/${langFlag}` + '?' + searchParams.toString();
    }
  };

  // 搜索框切换
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) setSearchQuery('');
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    if (isMobileSearchOpen) setSearchQuery('');
  };

  // 移动端菜单切换
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (loading) {
    return (
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-300 h-8 w-8"></div>
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo区域 */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center group outline-none">
                <div className="h-16 w-16 relative transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt={baseInfo.baseInfo.companyName}
                    fill
                    sizes="64px"
                    className="object-contain w-full h-auto"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* 中间导航区域 */}
            <div className="hidden md:flex items-center space-x-6">
              <Navigation items={baseInfo.navigationList} lang={currentLang} />
            </div>

            {/* 右侧功能区域 */}
            <div className="flex items-center space-x-2">
              {/* 桌面端搜索 */}
              <div className="hidden md:block relative" ref={searchRef}>
                <button
                  onClick={toggleSearch}
                  className="flex items-center space-x-2 py-2.5 px-5 text-gray-600 hover:text-blue-600 transition-all duration-200 rounded-lg hover:bg-blue-50 group"
                >
                  <HiOutlineSearch className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                </button>
              </div>

              {/* 移动端搜索按钮 */}
              <div className="md:hidden relative" ref={mobileSearchRef}>
                <button
                  onClick={toggleMobileSearch}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-all duration-200 rounded-lg hover:bg-gray-100"
                >
                  <HiOutlineSearch className="w-5 h-5" />
                </button>
              </div>

              {/* 移动端语言按钮 */}
              <div className="md:hidden relative" ref={mobileLanguageRef}>
                <button
                  onClick={() => setIsMobileLanguageOpen(!isMobileLanguageOpen)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-all duration-200 rounded-lg hover:bg-gray-100 flex items-center space-x-1"
                  aria-label={baseInfo.baseInfo.language}
                >
                  {currentLanguage && (
                    <Image
                      src={currentLanguage.id === -1? currentLanguage.logo :getImageUrl(currentLanguage.logo)}
                      alt={currentLanguage.name}
                      width={16}
                      height={16}
                      sizes='16px'
                      className="object-contain w-[16px] h-auto"
                    />
                  )}
                  <span className="text-xs">{currentLanguage?.name}</span>
                  <HiChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileLanguageOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* 移动端语言下拉菜单 */}
                {isMobileLanguageOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border border-gray-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                    {languages.map((language) => (
                      <button
                        key={language.id}
                        onClick={() => handleLanguageChange(language.lang)}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-100 transition-all duration-200 flex items-center space-x-3 group ${currentLang === language.lang ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                          }`}
                      >
                        <Image
                          src={currentLanguage.id === -1? currentLanguage.logo :getImageUrl(language.logo)}
                          alt={language.name}
                          width={20}
                          sizes='20px'
                          className="object-contain h-auto transition-transform duration-200 group-hover:scale-110"
                        />
                        <span className="flex-1">{language.name}</span>
                        {currentLang === language.lang && (
                          <HiCheck className="w-4 h-4 text-blue-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 桌面端语言切换器 */}
              <div className="hidden md:block relative" ref={languageDropdownRef}>
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 group"
                >
                  {currentLanguage && (
                    <Image
                      src={currentLanguage.id === -1? currentLanguage.logo :getImageUrl(currentLanguage.logo)}
                      alt={currentLanguage.name}
                      width={24}
                      height={24}
                      className="object-contain w-[24px] h-auto"
                    />
                  )}
                  <span>{currentLanguage?.name}</span>
                  <HiChevronDown className={`w-4 h-4 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLanguageDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border border-gray-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                    {languages.map((language) => (
                      <button
                        key={language.id}
                        onClick={() => handleLanguageChange(language.lang)}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-100 transition-all duration-200 flex items-center space-x-3 group ${currentLang === language.lang ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                          }`}
                      >
                        <Image
                          src={currentLanguage.id === -1? currentLanguage.logo :getImageUrl(language.logo)}
                          alt={language.name}
                          width={20}
                          height={20}
                          className="object-contain h-auto transition-transform duration-200 group-hover:scale-110"
                        />
                        <span className="flex-1">{language.name}</span>
                        {currentLang === language.lang && (
                          <HiCheck className="w-4 h-4 text-blue-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 移动端菜单按钮 */}
              <div className="md:hidden relative">
                <button
                  ref={mobileMenuButtonRef}
                  onClick={toggleMobileMenu}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-all duration-200 rounded-lg hover:bg-gray-100 group relative"
                  aria-label="Menu"
                >
                  <HiOutlineMenu className={`w-6 h-6 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
                  <HiX className={`w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* 移动端导航菜单 */}
          <div className={`md:hidden border-t border-gray-200 bg-white transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`} ref={mobileMenuRef}>
            <Navigation items={baseInfo.navigationList} lang={currentLang} mobile={true} onItemClick={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      </header>

      {/* 桌面端搜索下拉框 */}
      {isSearchOpen && (
        <div ref={desktopSearchOverlayRef} className="hidden md:block fixed top-20 left-0 right-0 bg-white shadow-lg border-b border-gray-200 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={baseInfo.baseInfo.searchPlaceholder}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none transition-all duration-300 text-lg"
                  autoFocus
                />
                <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 移动端搜索下拉框 */}
      {isMobileSearchOpen && (
        <div ref={mobileSearchOverlayRef} className="md:hidden fixed top-20 left-0 right-0 bg-white shadow-lg z-40">
          <div className="p-4">
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={baseInfo.baseInfo.searchPlaceholder}
                  className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none transition-all duration-300 text-base"
                  autoFocus
                />
                <HiOutlineSearch className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;