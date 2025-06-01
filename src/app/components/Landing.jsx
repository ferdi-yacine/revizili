"use client"

import { CallMade } from "@mui/icons-material"
import Image from "next/image"
import Link from "next/link"
import Blob from "./Blob"

const Landing = () => {

    return (
        <div className="relative w-full bg-primary-dark-gray">
            <div className="flex items-center justify-center lg:h-screen w-full h-full">
                <div className="max-w-7xl w-7/8 h-full flex items-center justify-items-start">
                    <div className="relaive flex flex-col items-start gap-6 w-full lg:w-1/2">
                        <h1 className="relative text-3xl lg:text-6xl font-semibold text-primary-white">
                            Unlock Your Potential with <span className="text-secondary-dark-orange font-bold">Revizili</span>
                            <Image src="/graduation.png" height={100} width={100} className="absolute -top-[28%] -left-[9%] -rotate-10" />
                        </h1>
                        <p className="text-primary-light-gray font-semibold">
                            Discover the Power of One-on-One Tutoring: Unlock Your Academic Potential and Achieve Your Goals with Our Comprehensive Tutoring Solutions
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="/login">
                                <button className="flex bg-secondary-dark-orange text-white hover:-translate-y-1 hover:bg-secondary-medium-orange ease-in duration-200 px-6 py-4 rounded-xl cursor-pointer items-center justify-center gap-2">
                                    <span className="font-medium">Find a Tutor</span>
                                    <CallMade fontSize="small" />
                                </button>
                            </Link>
                            <Link href="/login">
                                <button className="flex text-primary-white hover:-translate-y-1 border-[0.5] border-solid border-primary-light-gray ease-in duration-200 px-6 py-4 rounded-xl cursor-pointer items-center justify-center gap-2">
                                    <span className="font-medium">Become a Tutor</span>
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="w-1/2 relative flex items-center justify-center h-screen">
                        <Blob />
                        <img
                            src="/hero.png"
                            alt="Tutor"
                            className="relative z-10 w-[500px] h-[500px] object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing
