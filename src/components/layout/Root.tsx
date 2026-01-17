import type { ReactNode } from "react";

interface RootProps {
  children: ReactNode;
}

export const Root = ({ children }: RootProps) => {
  return (
    <div className="ygi:relative ygi:max-w-root-layout ygi:w-full ygi:mx-auto ygi:min-h-screen-dynamic">
      {children}
    </div>
  );
};