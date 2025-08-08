"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import heroimage from "../public/heroimage.png";
import { motion } from "framer-motion"

const LandingHero = () => {
    return (
        <section className="w-full min-h-screen bg-white px-6 sm:px-10 md:px-20 py-16 flex flex-col-reverse lg:flex-row items-center justify-center gap-16">


            {/* Left content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-7">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-black leading-tight">
                    The Future of Creation is <span className="bg-gradient-to-r from-[#2563eb] to-[#4f46e5] bg-clip-text text-transparent font-extrabold">Here</span>

                </h1>

                <h2 className="text-2xl sm:text-3xl font-semibold text-[#2563eb]">
                    <Typewriter
                        words={[
                            'Chat Bot',
                            'Image Generator',
                            'Text Summarizer',
                            'Code Assistant',
                            'Voice Decoder',
                        ]}
                        loop={true}
                        cursor
                        cursorStyle="|"
                        typeSpeed={60}
                        deleteSpeed={50}
                        delaySpeed={1500}
                    />
                </h2>

                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    Empower your creativity with <strong className="text-[#2563eb] text-2xl">Brainee</strong>. Whether it’s code, content, or imagination — create it all 10x faster using AI.
                </p>


                <div className="flex flex-col items-start gap-2 pt-2">
                    <Link href="/sign-up">
                        <button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-3 text-base rounded-full shadow-lg transition duration-300 flex items-center gap-2">
                            Start Generating for Free
                            <ArrowRight size={18} />
                        </button>
                    </Link>
                    <p className="text-sm text-gray-500">No credit card required</p>
                </div>

            </div>

            <div className="w-full lg:w-1/2 flex justify-center">
             
                <motion.div
                    animate={{ y: [0, -15, 0] }} // bounce up-down
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="max-w-[500px] w-full"
                >
                    <Image
                        src={heroimage}
                        alt="Hero Illustration"
                        layout="responsive"
                        width={800}
                        height={800}
                        priority
                    />
                </motion.div>

            </div>
        </section>
    );
};

export default LandingHero;
