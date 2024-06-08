"use client"

import { useEffect } from "react"
import {Crisp} from "crisp-sdk-web"

export const CrispChat = () => {
    useEffect(()=>{
Crisp.configure("5f1f9dbc-3996-47b4-af94-3faceeb564f1")
    },[])
  return  null
  
  
}
