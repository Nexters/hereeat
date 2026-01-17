import type { ReactNode } from "react";

interface ContentProps {
  children: ReactNode;
}

export const Content = ({ children }: ContentProps) => {
  return (
    <main className="ygi:relative ygi:pt-layout-header-height ygi:pb-layout-footer-height ygi:h-full">
      {children}
    </main>
  );
};