import { Psychology, SupportAgent } from '@mui/icons-material'
import Image from 'next/image'
import React from 'react'

const Testimonials = () => {
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='w-7/8 max-w-7xl flex flex-col item-center text-center gap-4 mt-16 lg:mt-20'>
                <h1 className='text-title text-5xl font-semibold'>Testimonials</h1>
                <p className='text-description lg:w-1/2 self-center'>Hear from Our Satisfied Students and Tutors</p>
                <div className='flex items-center justify-between gap-8 mt-12'>
                    <div className='w-1/2 flex items-center justify-between'>
                        <div className='w-1/2 flex flex-col items-start gap-4'>
                            <Psychology sx={{ fontSize: 50 }} className='text-secondary-medium-orange ml-4' />
                            <p className='text-description'>&ldquo;The tutors on this platform are truly exceptional. They tailored their approach to my learning style and provided the support I needed to.</p>
                        </div>
                        <div className="w-48 h-48 relative rounded-full overflow-hidden flex items-center justify-center">
                            <Image
                                src="/testimonial1.jpg"
                                alt="profile picture"
                                width={192}
                                height={192}
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>

                    </div>
                    <div className='w-1/2 flex items-center justify-between'>
                        <div className='w-1/2 flex flex-col items-start gap-4'>
                            <SupportAgent sx={{ fontSize: 50 }} className='text-secondary-medium-orange ml-4' />
                            <p className='text-description'>&ldquo;The tutors on this platform are truly exceptional. They tailored their approach to my learning style and provided the support I needed to.</p>
                        </div>
                        <div className="w-48 h-48 relative rounded-full overflow-hidden flex items-center justify-center">
                            <Image
                                src="/testimonial2.jpg"
                                alt="profile picture"
                                width={192}
                                height={192}
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials