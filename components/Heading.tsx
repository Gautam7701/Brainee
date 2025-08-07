// import { cn } from '@/lib/utils';
// import { LucideIcon } from 'lucide-react';
// import React from 'react'


// interface HeadingProps {  title: string;  description: string; icon:LucideIcon; iconColoer?: string; bgColor?: string; }

// const Heading = ({title,description,icon:Icon,iconColoer,bgColor}:HeadingProps) => {
//   return (
//     <>
//     <div className='px-4 lg:px-8 flex items-center gap-x-3 mb-8'>
//         <div className={cn("p-2 w-fit rounded-md",bgColor)}>
//             <Icon className={cn("w-10 h-10",iconColoer)}/>
//         </div>
//         <div>
//         <h2 className='text-3xl font-bold'>
//             {title}
//         </h2>
//         <p className='text-muted-foreground text-sm'>
//             {description}
//         </p>
//     </div>
//     </div>
    
//     </>
    
//   )
// }

// export default Heading


import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import React from 'react';

interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColoer?: string;
  bgColor?: string;
}

const Heading = ({
  title,
  description,
  icon: Icon,
  iconColoer,
  bgColor,
}: HeadingProps) => {
  return (
    <div className="px-4 lg:px-8 flex items-center gap-x-4 mb-10">
      <div className={cn("p-3 rounded-lg flex items-center justify-center", bgColor)}>
        <Icon className={cn("w-8 h-8 md:w-10 md:h-10", iconColoer)} />
      </div>

      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          {title}
        </h2>
        <p className="text-md text-muted-foreground mt-1 max-w-md">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Heading;
