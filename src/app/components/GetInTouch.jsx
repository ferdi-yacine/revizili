import React from 'react'

const GetInTouch = () => {
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='w-7/8 max-w-7xl flex flex-col item-center text-center gap-4 mt-16 lg:mt-20'>
                <h1 className='text-title text-5xl font-semibold'>Get in Touch</h1>
                <p className='text-description lg:w-1/2 self-center mt-6'>Connect with Our Team: Explore Our Tutoring Services, Inquire About Becoming a Tutor, or Simply Learn More About How We Can Help You Reach Your Academic Goals</p>
                <div className='flex items-center justify-center gap-4 mt-12'>
                    <button className="text-description hover:-translate-y-1 border-[0.5] border-solid border-primary-light-gray ease-in duration-200 px-8 py-4 rounded-xl cursor-pointer items-center justify-center gap-2">
                        <span className="font-medium">Contact Us</span>
                    </button>
                    <button className="bg-secondary-dark-orange text-white hover:-translate-y-1 hover:bg-secondary-medium-orange ease-in duration-200 px-8 py-4 rounded-xl cursor-pointer items-center justify-center gap-2">
                        <span className="font-medium">Apply Now</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GetInTouch