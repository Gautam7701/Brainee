// import React from 'react'

// const layout = ({children}:{children:React.ReactNode}) => {
//   return (
//     <main className='h-full  text-white overflow-auto'>
//         <div className="mx-auto max-w-screen-xl h-full w-full">
//             {children}
//         </div>
//     </main>
//   )
// }

// export default layout
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
