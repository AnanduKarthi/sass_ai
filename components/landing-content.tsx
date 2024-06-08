"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const testmonials=[
    {
        name:"Anandu",
        avatar:"A",
        titile:"Software Developer",
        description:"this is the best app i ever used"
    },
    {
        name:"Anandu",
        avatar:"A",
        titile:"Software Developer",
        description:"this is the best app i ever used"
    },
    {
        name:"Anandu",
        avatar:"A",
        titile:"Software Developer",
        description:"this is the best app i ever used"
    },
    {
        name:"Anandu",
        avatar:"A",
        titile:"Software Developer",
        description:"this is the best app i ever used"
    },

]

export const LandingContent = () => {
  return (
    <div className=" px-10 pb-20">
      <h2 className=" text-center text-4xl text-white font-extrabold mb-10">
        TestiMonials
      </h2>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

{testmonials.map(items=>(
    <Card key={items.description} className=" bg-[#192339] border-none text-white">
        <CardHeader>
            <CardTitle className=" flex items-center gap-x-2">
                <div>
                    <p className=" text-lg">{items.name}</p>
                    <p className=" text-sm text-zinc-400">{items.titile}</p>
                    
                </div>
            </CardTitle>
            <CardContent className=" pt-4 px-0">
                {items.description}
            </CardContent>
        </CardHeader>

    </Card>
))}

      </div>

        </div>
  )
}
