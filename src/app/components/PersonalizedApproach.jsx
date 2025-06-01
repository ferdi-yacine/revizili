import Image from "next/image"


const PersonalizedApproach = () => {
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='w-7/8 max-w-7xl flex flex-col item-center text-center gap-4 mt-16 lg:mt-20'>
                <h3 className='text-secondary-medium-orange text-lg font-semibold'>Tailored to Your Needs</h3>
                <h1 className='text-title text-5xl font-semibold'>Personalized Approach</h1>
                <div className="flex items-center justify-center gap-8 mt-12">
                    <div className="relative flex-1 h-80">
                        <Image src="/personstudy.jpg" alt="One Person Study" fill={true} className="object-cover rounded-xl" />
                    </div>
                    <div className="flex-1 flex flex-col items-start gap-4">
                        <h3 className="text-title text-lg font-medium flex-grow">Jane Doe</h3>
                        <p className="text-description text-left">As a busy professional, I was struggling to find the time and resources to develop new skills. This tutoring platform has been a game-changer, allowing me to learn at my own pace and on my own schedule</p>
                        <p className="text-description text-left">The personalized curriculum and one-on-one support have been invaluable in helping me achieve my learning goals. I highly recommend this service to anyone looking to unlock their full potential</p>
                    </div>
                    <div className="flex-1 flex flex-col items-start gap-4">
                        <h3 className="text-title text-lg font-medium flex-grow">Emily Smith</h3>
                        <p className="text-description text-left">I was hesitant to try online tutoring, but this platform has exceeded all of my expectations. The tutors are knowledgeable, engaging, and truly dedicated to helping me succeed in my studies</p>
                        <p className="text-description text-left">This tutoring service has been a transformative experience. The personalized approach and expert guidance have helped me overcome academic obstacles and achieve my goals and dreams</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PersonalizedApproach