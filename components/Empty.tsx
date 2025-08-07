// interface EmptyProps {
//     label: string;
// }
// import Image from 'next/image';
// import React from 'react'

// export const Empty = ({
//     label
// }: EmptyProps) => {
//     return(
//         <div className='h-full p-20 flex flex-col items-center justify-center'>
//             <div className="relative h-72 w-72">
//                 <Image alt="empty" fill src="/Empty.webp"/>
//             </div>
//         </div>
//     )
// }


// Empty.tsx
import React from 'react';
import Image from 'next/image';

interface EmptyProps {
  label: string;
}

const Empty: React.FC<EmptyProps> = ({ label }) => {
  return (
    <div className='h-full p-20 flex flex-col items-center justify-center'>
      <div className="relative h-72 w-72">
        <Image alt="empty" fill src="/Empty.webp" />
      </div>
      <p className="text-muted-foreground text-sm text-center mt-4">{label}</p>
    </div>
  );
};

export default Empty;
