"use client";


import { cn } from '@/utils/cn/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps } from 'react';

interface NavLinkProps extends ComponentProps<typeof Link> {
  isMultiPath?: boolean;
}

const HeaderButton = ({ className, isMultiPath = false, ...props }: NavLinkProps) => {
  const path = usePathname();
  const href = props.href.toString();

  const isActive = isMultiPath
    ? path === href || path.startsWith(href + "/")
    : path === href;

  return (
    <Link
      {...props}
      className={cn(
        "transition-all duration-200 text-cyan-700 rounded-lg",
        isActive
          ? "bg-cyan-500 text-white font-semibold shadow-sm"
          : "hover:bg-cyan-100 hover:text-cyan-800",
        className
      )}
    >
      {props.children}
    </Link>
  );
};

export default HeaderButton;
