import Image from "next/image"


function CardModules({ src, title, desc }) {
    return (
        <div className='flex flex-1 flex-col items-center justify-between gap-4 min-w-[340px] w-full lg:w-1/3 py-8 px-6 border-[0.5] border-primary-light-gray shadow-sm'>
            <div className='flex items-center justify-center gap-2'>
                <div className="border-[0.5] border-solid border-primary-light-gray rounded-full">
                    <Image src="/profile1.png" alt='profile picture' height={40} width={40} />
                </div>
                <h3 className='text-title text-lg font-medium'>{title}</h3>
            </div>
            <p className='text-description'>{desc}</p>
        </div>
    )
}

export default CardModules