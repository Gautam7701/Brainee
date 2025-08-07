"use client"

import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("8776a6eb-4c47-4961-a746-dd6054f344d6");
    }, []);
    
    return null; // This component does not render anything
    }