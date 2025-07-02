'use client';

import { GlobalData } from '@/config/structure';
import React, { createContext, useContext, ReactNode } from 'react';

// 创建Context
const GlobalContext = createContext<GlobalData | null>(null);

// 提供一个使用Context的Hook
export const useGlobalData = () => {
  const context = useContext(GlobalContext);
  if (context === null) {
    throw new Error('useGlobalData must be used within a GlobalDataProvider');
  }
  return context;
};

// Context Provider组件
export const GlobalDataProvider: React.FC<{
  children: ReactNode;
  value: GlobalData;
}> = ({ children, value }) => {
  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};