
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="h-full text-white overflow-auto">
      <div className="mx-auto max-w-screen-xl h-full w-full">
        {children}
      </div>
    </main>
  );
};

export default Layout;
