import { Clock, Leaf, Pill, Timer } from 'lucide-react'
import Image from 'next/image'


const Statistics = () => {
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='w-7/8 max-w-7xl flex flex-col item-center text-center gap-4 mt-16 lg:mt-20'>
                <h3 className='text-secondary-medium-orange text-lg font-semibold'>Trusted by Students and Tutors</h3>
                <h1 className='text-title text-5xl font-semibold'>Impressive Statistics</h1>
                <p className='text-description lg:w-1/2 self-center mt-6'>Our tutoring platform has empowered thousands of students and tutors to achieve their academic and professional goals</p>
                <div className='flex items-center justify-center gap-4 p-4 mt-12'>
                    <div className='w-1/2 flex flex-col items-start gap-4 p-2 border-[0.5] border-solid border-primary-light-gray rounded-sm'>
                        <div className='flex flex-col items-center text-center gap-2 p-4 lg:mb-4'>
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
                            <div className='w-3/4 flex flex-col items-center gap-2'>
                                <h3 className='text-title text-lg font-medium'>Focus + Memory Formula</h3>
                                <p className='text-description'>
                                    Enhance your concentration and retenttion during exams with our top-rated natural supplement
                                </p>
                                <div className='flex flex-col items-start gap-2 mt-2'>
                                    <div className='flex items-center gap-2'>
                                        <Pill className='h-4 w-4 text-description'/>
                                        <span className='text-description text-sm'>Supports cognitive function</span>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <Leaf className='h-4 w-4 text-description'/>
                                        <span className='text-description text-sm'>All-natural ingredients</span>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <Clock className='h-4 w-4 text-description'/>
                                        <span className='text-description text-sm'>Reduce mental fatigue</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Statistics