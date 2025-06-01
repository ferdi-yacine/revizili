import { CallMade } from '@mui/icons-material'
import Image from 'next/image'


const Benefits = () => {
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='w-7/8 max-w-7xl flex item-center text-center gap-4 mt-16 lg:mt-20'>
                <div className='flex-1 flex flex-col items-start gap-6 p-6'>
                    <div className='flex flex-col items-start justify-center gap-2'>
                        <h3 className='text-secondary-medium-orange text-md font-semibold'>Empower Your Learning</h3>
                        <h1 className='text-title text-4xl font-semibold'>Proven Benefits</h1>
                    </div>
                    <p className='text-description text-left w-7/8'>Discover the transformative power of personalized tutoring. Our platform connects you with experienced educators who can help you unlock your full potential, whether you're a student seeking support in a specific subject or an adult looking to expand your knowledge. With a wide range of courses and flexible scheduling, we're dedicated to empowering you to reach new heights in your academic.</p>
                    <button className="hidden md:flex bg-secondary-dark-orange text-white hover:-translate-y-1 hover:bg-secondary-medium-orange ease-in duration-200 px-6 py-4 rounded-xl cursor-pointer items-center justify-center gap-2">
                        <span className="font-medium">Get Started</span>
                    </button>
                </div>
                <div className='relative flex-1'>
                    <Image src="/personsstudies.jpg" alt="Two Persons Studies" fill={true} className='object-cover rounded-sm' />
                </div>
            </div>
        </div>
    )
}

export default Benefits