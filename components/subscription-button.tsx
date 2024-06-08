"use client"

import axios from "axios"
import { useState } from "react"


import { Zap } from "lucide-react"
import { Button } from "./ui/button"
import toast from "react-hot-toast"


type SubscriptionButtonProps={
    ispro:boolean
}
const SubscriptionButton = ({ispro=false}:SubscriptionButtonProps) => {
    const[loading,setLoading]=useState(false)

    const onClick=async()=>{
        try {
            setLoading(true)
            const response=await axios.get("/api/stripe")
            window.location.href=response.data.url
        } catch (error) {
            console.log("BILLING ERROR",error)
            toast.error("Somthing went wrong")
            setLoading(false)
            
        }

    }
  return (
    <Button 
    disabled={loading}
    variant={ispro?"default":"premium"}
    onClick={onClick}
    >
        {ispro?"Manage Subscription":"Upgrade"}
    {!ispro &&<Zap className=" w-4 h-4 fill-white"/>}
    </Button>
  )
}

export default SubscriptionButton