import Image from "next/image"


function CardModules({ key, title, icon, sign }) {
    return (
        <div key={key} className='flex flex-1 flex-col items-start justify-between gap-4 min-w-[240px] lg:max-w-1/4 w-full lg:w-1/4 py-4 px-6 rounded-sm border-[0.5] border-primary-light-gray shadow-sm hover:-translate-y-1 transform transition-all ease-in duration-200 cursor-pointer'>
            <div className='flex items-center justify-center gap-4'>
                <div className="border-[0.5] border-solid border-primary-light-gray rounded-full flex items-center justify-center p-2 text-2xl">
                     {icon}
                </div>
                <h3 className='text-title text-lg font-medium text-start'>{title}</h3>
            </div>
        </div>
    )
}

export default CardModules