'use client'

import { ClassValue } from 'clsx'

import { cn } from '@/lib/utils'

type Props = {
  className?: ClassValue
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function NavButton({ className, children, onClick }: Props) {
  return (
    <button
      role="button"
      aria-label="Click to perform an action"
      onClick={onClick}
      className={cn(
        'flex text-text cursor-pointer items-center  border-2 border-border dark:border-darkBorder bg-transparent px-4 py-2 text-sm font-base  ',
        className,
      )}
    >
      {children}
    </button>
  )
}