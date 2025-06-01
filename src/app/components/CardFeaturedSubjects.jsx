import { Person } from '@mui/icons-material'
import Image from 'next/image'

const CardFeaturedSubjects = ({ src, title, desc }) => {
    return (
        <div className='flex flex-1 flex-col items-center justify-between gap-4 min-w-[340px] w-full lg:w-1/3 py-8 px-6 border-[0.5] border-primary-light-gray shadow-sm'>
            <div className='flex flex-col items-center justify-center gap-2'>
                <div className="relative border-[0.5] border-solid border-primary-light-gray rounded-full h-40 w-40">
                    <Image src="/profile1.png" alt='profile picture' fill={true} className='object-cover' />
                </div>
                <h3 className='text-title text-xl font-medium flex-grow'>{title}</h3>
            </div>
            <p className='text-description'>{desc}</p>
        </div>
    )
}

export default CardFeaturedSubjects