import { PropsWithChildren } from 'react'

export const ErrorMessage: React.FC<PropsWithChildren> = ({ children }) => {
  return children ? (
    <span className="w-full text-[#fd5e59] bg-[#fdf0ee] rounded px-2 py-1 text-xs font-medium">
      {children}
    </span>
  ) : null
}
