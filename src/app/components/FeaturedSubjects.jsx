import React from 'react'
import CardFeaturedSubjects from './CardFeaturedSubjects'

const FeaturedSubjects = () => {
  return (
    <div className='w-full flex items-center justify-center'>
        <div className='w-7/8 max-w-7xl flex flex-col item-center text-center gap-4 mt-16 lg:mt-20'>
            <h3 className='text-secondary-medium-orange text-lg font-semibold'>Unleash Your Learning Potential</h3>
            <h1 className='text-title text-5xl font-semibold'>Featured Subjects</h1>
            <p className='text-description lg:w-1/2 self-center mt-6'>Explore a Diverse Curriculum Taught by Passionate Educators. From Core Academics to Specialized Courses, We Offer Personalized Guidance to Help You Succeed</p>
            <div className='flex flex-wrap items-stretch gap-4 mt-10'>
                <CardFeaturedSubjects src="/profile1.png" title="Jane Doe" desc="As a student, I was struggling with math until I found my perfect tutor on this platform. They helped me develop a deeper understanding and build the confidence." />
                <CardFeaturedSubjects src="/profile2.jpg" title="Emily Smith" desc="The tutors on this platform are truly exceptional. They tailored their approach to my learning style and provided the support I needed to conquer challenging subjects." />
                <CardFeaturedSubjects src="/profile3.jpg" title="Michael Johnson" desc="This tutoring platform has been a game-changer for me. The knowledgeable tutors and personalized curriculum have helped me overcome academic." />
            </div>
        </div>
    </div>
  )
}

export default FeaturedSubjects