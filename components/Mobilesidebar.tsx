'use client'
import React from 'react'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import Sidebar from './Sidebar'
import { useState } from 'react'
import { useEffect } from 'react'

const Mobilesidebar = () => {

  const [isMounted, setIsMounted] = useState(false);
  useEffect(()=>{
    setIsMounted(true);
  },[]);

  if (!isMounted) return null;
  
  return (
   <Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon" className='md:hidden'>
      <Menu className='h-5 w-5' />
    </Button>
  </SheetTrigger>
  <SheetContent side='left' className='p-0'>
    <Sidebar />
  </SheetContent>
</Sheet>

  )
}

export default Mobilesidebar

