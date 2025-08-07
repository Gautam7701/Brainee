
import {
  Lightbulb,
  MessageSquare,
  Image as ImageIcon,
  FileText,
  Mic,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const features = [
  {
    title: "Code Craft",
    icon: <Lightbulb size={24} className="text-[#2563EB]" />,
    description: "Generate clean, efficient code instantly.",
    href: "/code",
  },
  {
    title: "Talk With AI",
    icon: <MessageSquare size={24} className="text-[#2563EB]" />,
    description: "Have a smart chat with your AI assistant.",
    href: "/conversation",
  },
  {
    title: "Image Mind",
    icon: <ImageIcon size={24} className="text-[#2563EB]" />,
    description: "Bring your imagination to visuals.",
    href: "/image",
  },
  {
    title: "Text Summarizer",
    icon: <FileText size={24} className="text-[#2563EB]" />,
    description: "Summarize lengthy texts into quick insights.",
    href: "/text-summarizer",
  },
  {
    title: "Voice Decode",
    icon: <Mic size={24} className="text-[#2563EB]" />,
    description: "Convert your speech into written words.",
    href: "/speech-to-text",
  },
];

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/"); // Redirect unauthenticated users to landing page
  }

  return (
    <section className="py-8 px-4 md:px-16 bg-[#F9FAFB]">
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 text-center text-[#111111]">
        Explore Features of <span className="text-[#2563EB]">Brainee</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature, index) => (
          <Link href={feature.href} key={index}>
            <Card className="group bg-white border border-gray-200 rounded-xl hover:shadow-md hover:scale-[1.015] transition-all duration-300 cursor-pointer h-[180px]">
              <CardContent className="p-4 flex flex-col justify-between h-full">
                <div className="flex items-center gap-3">
                  <div className="bg-[#DBEAFE] p-2 rounded-full">
                    {feature.icon}
                  </div>
                  <h3 className="text-base font-semibold text-[#111111] group-hover:text-[#2563EB] transition-colors duration-300">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {feature.description}
                </p>
                <div className="mt-3 flex items-center text-[#2563EB] font-medium opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <span className="mr-1 text-sm">Explore</span>
                  <span className="text-lg">→</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
