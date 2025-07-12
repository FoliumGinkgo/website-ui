// app/page.tsx
import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('/en') // 默认跳转英文首页
}
