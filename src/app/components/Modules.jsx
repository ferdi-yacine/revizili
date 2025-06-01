import CardModules from "./CardModules"


const Modules = () => {
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='w-7/8 max-w-7xl flex flex-col item-center text-center gap-4 mt-16 lg:mt-20'>
                <h3 className='text-secondary-medium-orange text-lg font-semibold'>Explore Our Diverse Course Offerings</h3>
                <h1 className='text-title text-5xl font-semibold'>Courses Benefits</h1>
                <p className='text-description lg:w-1/2 self-center mt-6'>Dive into a Wide Range of Subjects and Modules, Catering to Your Unique Interests and Learning Needs</p>
                <div className='flex flex-wrap items-stretch gap-4 mt-10'>
                    <CardModules title="Facebook" desc="Unleash Your Potential with Our Expert-led Tutoring in the Latest Social Media Trends and Strategies" />
                    <CardModules title="Music Festival" desc="Unlock Your Creative Potential with Our Specialized Tutoring in Music Production, Songwriting" />
                    <CardModules title="New Music Festival" desc="Elevate Your Skills in the Dynamic World of Music with Our Tailored Tutoring Sessions & Practising" />
                </div>
            </div>
        </div>
    )
}

export default Modules