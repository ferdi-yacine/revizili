import Image from "next/image"
import Link from "next/link"


const Navbar = () => {
    return (
        <div className="flex items-center justify-center bg-primary-dark-gray w-full relative">
            <div className="w-full max-w-7xl h-22 flex items-center justify-between py-8 px-7 lg:px-20">
                <div className="relative h-30 w-40">
                    <Image src="/logo.png" alt="Revizili Logo" fill={true} className="object-center object-cover" />
                </div>
                <div className="flex items-center gap-8 relative">
                    <div className="hidden lg:flex items-center gap-8 text-primary-light-gray">
                        <Link className="text-lg text-secondary-dark-orange hover:text-secondary-dark-orange" href="/">
                            Home
                        </Link>
                        <Link className="text-lg hover:text-secondary-dark-orange" href="/store">
                            Modules
                        </Link>
                        <Link className="text-lg hover:text-secondary-dark-orange" href="/a-propos">
                            About us
                        </Link>
                        <Link className="text-lg hover:text-secondary-dark-orange" href="/contact">
                            Contact
                        </Link>
                        <Link href="/login">
                            <button className="hidden lg:flex bg-secondary-dark-orange text-primary-white hover:-translate-y-1 hover:bg-secondary-medium-orange ease-in duration-200 px-5 py-3 rounded-xl cursor-pointer items-center justify-center gap-2">
                                <span className="font-medium">Start Now</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar