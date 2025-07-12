// app/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomeRedirect() {
  const router = useRouter()

  useEffect(() => {
    const storedLang = localStorage.getItem('preferred_language') || 'en'
    router.replace(`/${storedLang}`)
  }, [])

  return null
}
