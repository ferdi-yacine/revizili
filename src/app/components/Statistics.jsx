import Image from 'next/image'
import React from 'react'

const Statistics = () => {
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='w-7/8 max-w-7xl flex flex-col item-center text-center gap-4 mt-16 lg:mt-20'>
                <h3 className='text-secondary-medium-orange text-lg font-semibold'>Trusted by Students and Tutors</h3>
                <h1 className='text-title text-5xl font-semibold'>Impressive Statistics</h1>
                <p className='text-description lg:w-1/2 self-center mt-6'>Our tutoring platform has empowered thousands of students and tutors to achieve their academic and professional goals</p>
                <div className='flex items-start justify-between gap-4 p-4 mt-12'>
                    <div className='w-1/2 flex flex-col items-start gap-4 p-2 border-[0.5] border-solid border-primary-light-gray rounded-sm'>
                        <div className='flex items-center justify-between gap-2 p-4'>
                            <div className='w-1/4 flex items-center justify-center'>
                                <div className='w-24 h-24 p-2 rounded-full bg-gray-200 flex items-center justify-center'>
                                    <Image
                                        src="/student.png"
                                        alt="Student"
                                        width={74}
                                        height={74}
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            <div className='w-3/4 flex flex-col items-start gap-2'>
                                <h3 className='text-title text-lg font-medium'>Apple TV</h3>
                                <p className='text-description text-left'>
                                    Discover the convenience and flexibility of our online tutoring platform. Connect with experienced educators and build the skills you.
                                </p>
                            </div>
                        </div>
                        <div className='flex items-center justify-between gap-2 p-4'>
                            <div className='w-1/4 flex items-center justify-center'>
                                <div className='w-24 h-24 p-2 rounded-full bg-gray-200 flex items-center justify-center'>
                                    <Image
                                        src="/google.png"
                                        alt="Google"
                                        width={74}
                                        height={74}
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            <div className='w-3/4 flex flex-col items-start gap-2'>
                                <h3 className='text-title text-lg font-medium'>Goole</h3>
                                <p className='text-description text-left'>
                                    Elevate your learning journey with our expert tutors. Whether you're seeking support in a specific subject or want to explore new academic horizons.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/2 flex flex-col items-start gap-4 p-2 border-[0.5] border-solid border-primary-light-gray rounded-sm'>
                        <div className='flex items-center justify-between gap-2 p-4'>
                            <div className='w-1/4 flex items-center justify-center'>
                                <div className='w-24 h-24 p-2 rounded-full bg-gray-200 flex items-center justify-center'>
                                    <Image
                                        src="/student.png"
                                        alt="Student"
                                        width={74}
                                        height={74}
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            <div className='w-3/4 flex flex-col items-start gap-2'>
                                <h3 className='text-title text-lg font-medium'>Student</h3>
                                <p className='text-description text-left'>
                                    Experience the transformative power of one-on-one tutoring. Our platform connects you with knowledgeable tutors.
                                </p>
                            </div>
                        </div>
                        <div className='flex items-center justify-between gap-2 p-4 lg:mb-4'>
                            <div className='w-1/4 flex items-center justify-center'>
                                <div className='w-24 h-24 p-2 rounded-full bg-gray-200 flex items-center justify-center'>
                                    <Image
                                        src="/tutor.png"
                                        alt="Tutor"
                                        width={74}
                                        height={74}
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            <div className='w-3/4 flex flex-col items-start gap-2'>
                                <h3 className='text-title text-lg font-medium'>Tutor</h3>
                                <p className='text-description text-left'>
                                    This tutoring platform has been a game-changer for me. The knowledgeable tutors and personalized curriculum have helped me overcome academic obstacles.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Statistics