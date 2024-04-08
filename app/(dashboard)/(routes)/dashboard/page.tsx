"use client";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
} from "lucide-react";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bdColor: "bg-violet-500/10",
    hrf: "/conversation",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bdColor: "bg-pink-700/10",
    hrf: "/image",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bdColor: "bg-orange-700/10",
    hrf: "/video",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    bdColor: "bg-emerald-500/10",
    hrf: "/music",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bdColor: "bg-green-700/10",
    hrf: "/code",
  },
];
export default function Dashboard() {
  const router = useRouter();
  return (
    <>
      <div>
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center">
            Explore the power of AI
          </h2>
          <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
            chat with smartest AI feel the power of AI
          </p>
        </div>
        <div className="px-4 md:px-10 lg:px-32">
          {tools.map((tool) => (
            <Card
              onClick={() => router.push(tool.hrf)}
              key={tool.hrf}
              className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center gap-x-4">
                <div className={cn("p-4 w-fit rounded-md", tool.bdColor)}>
                  <tool.icon className={cn("w-8 h-8", tool.color)} />
                </div>
                <div className="font-semibold">{tool.label}</div>
              </div>
              <ArrowRight className="w-5 h-5" />
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
