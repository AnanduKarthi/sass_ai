"use clint";

import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNT } from "@/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { userProModel } from "@/hooks/use-pro-model";

type freeCountType = {
  apiLimitCount: number;
  isPro:boolean
};

export default function FreeCounter({ apiLimitCount = 0,isPro=false }: freeCountType) {
  const [mounted, setMounted] = useState(false);

  const proModel = userProModel();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  if(isPro){
    return null
  }
  return (
    <div className=" p-3">
      <Card className=" bg-white/10 border-0">
        <CardContent className=" py-6">
          <div className=" text-center text-white text-sm mb-4 space-y-2">
            <p>
              {apiLimitCount}/{MAX_FREE_COUNT} Free generations
            </p>
            <Progress
              className="h-3"
              value={(apiLimitCount / MAX_FREE_COUNT) * 100}
            />
          </div>
          <Button
            onClick={proModel.onOpen}
            className=" w-full"
            variant={"premium"}
          >
            Upgrade
            <Zap className=" w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
