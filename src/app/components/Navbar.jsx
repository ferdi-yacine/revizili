import { CallMade } from "@mui/icons-material"
import Link from "next/link"


const Navbar = () => {
    return (
        <div className="flex items-center justify-center bg-primary-dark-gray w-full relative">
            <div className="w-full max-w-7xl h-22 flex items-center justify-between py-8 px-16">
                <div className="">
                    <h1 className="text-2xl font-bold text-white">Revizili</h1>
                </div>
                <div className="flex items-center gap-8 relative">
                    <div className="hidden lg:flex items-center gap-8 text-primary-light-gray">
                        <Link className="text-lg text-secondary-dark-orange hover:text-secondary-dark-orange" href="/">
                            Home
                        </Link>
                        <Link className="text-lg hover:text-secondary-dark-orange" href="/store">
                            Store
                        </Link>
                        <Link className="text-lg hover:text-secondary-dark-orange" href="/a-propos">
                            A propos
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