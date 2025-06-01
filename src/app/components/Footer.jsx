import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className='w-full flex items-center justify-center border-t-[0.5] border-solid border-primary-light-gray mt-16 mb-10 lg:mt-26 lg:mb-14'>
            <div className='w-7/8 max-w-7xl flex item-center justify-between gap-4 mt-10'>
                <div className='flex-1 flex flex-col gap-4 items-start'>
                    <h1 className='text-title text-3xl font-semibold'>Revizili</h1>
                    <div>
                        <p>© 2025 Revizili, Inc.</p>
                        <p>All rights reserved</p>
                    </div>
                </div>
                <div className='flex-1 flex flex-col gap-4 items-start'>
                    <h3 className='text-title text-lg font-medium'>Quick Links</h3>
                    <Link href="" className="text-description">
                        Home
                    </Link>
                    <Link href="" className="text-description">
                        Subjects
                    </Link>
                    <Link href="" className="text-description">
                        About
                    </Link>
                    <Link href="" className="text-description">
                        Contact
                    </Link>
                </div>
                <div className='flex-1 flex flex-col gap-4 items-start'>
                    <h3 className='text-title text-lg font-medium'>Ressources</h3>
                    <Link href="" className="text-description">
                        FAQs
                    </Link>
                    <Link href="" className="text-description">
                        Blog
                    </Link>
                    <Link href="" className="text-description">
                        Careers
                    </Link>
                    <Link href="" className="text-description">
                        Privacy Policy
                    </Link>
                </div>
                <div className='flex-1 flex flex-col gap-4 items-start'>
                    <h3 className='text-title text-lg font-medium'>Connect with US</h3>
                    <Link href="" className="text-description">
                        Facebook
                    </Link>
                    <Link href="" className="text-description">
                        Twitter
                    </Link>
                    <Link href="" className="text-description">
                        Instagram
                    </Link>
                    <Link href="" className="text-description">
                        Linkedin
                    </Link>
                </div>
            </div>
        </div >
    )
}

export default Footer