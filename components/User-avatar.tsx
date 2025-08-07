"'use client'"
import React from 'react'
import { useUser } from '@clerk/nextjs';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const Useravatar = () => {
    const {user} = useUser();
  return (
      <Avatar className="h-8 w-8">
      <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
      <AvatarFallback>
        {user?.firstName?.[0]}
        {user?.lastName?.[0]}
      </AvatarFallback>
    </Avatar>
  )
}

export default Useravatar
