'use client';

import React from 'react';
import { useGlobalData } from '@/context/GlobalContext';


export default function AboutUs() {

  const globalData = useGlobalData();

  return (
    <div className="">
      <div>{globalData.furnishings.image}</div>
    </div>
  );
}