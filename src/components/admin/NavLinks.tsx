import { BookText, Image, Pencil, User } from 'lucide-react';
import type { LucideIcon } from "lucide-react";
import { auth } from '@/lib/auth'
import Link from 'next/link';

const IconMap = {
  BookText,
  Image,
  Pencil,
} as Record<string, LucideIcon>;

const items = [
  {
    title: '文章',
    href: '/admin/post',
    icon: 'BookText'
  }, {
    title: '图片',
    href: '/admin/images',
    icon: 'Image'
  }, {
    title: '书写',
    href: '/admin/write',
    icon: 'Pencil'
  }]

const NavLinks = async () => {
  const session = await auth()
  let ifRoot = false;
  if (session?.user?.name === 'root') {
    ifRoot = true;
  }

  return (
    <>
      {items.map((item) => {
        const IconComponent = IconMap[item.icon];
        return (
        <Link href={item.href} key={item.title}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 
          rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <IconComponent className="w-6" />
            <div className="hidden md:block" >{item.title}</div>
          </button>
        </Link>
      )}
      )}
      {ifRoot ? (
        <Link href="/admin/user">
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 
          rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <User className="w-6" />
            <div className="hidden md:block" >用户</div>
          </button>
        </Link>
      ) : null}
    </>
  )
}

export default NavLinks