"use client"
import { KeyboardDoubleArrowUp } from "@mui/icons-material";
import { useEffect, useState } from "react";

const ButtonUp = () => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        const isActive = () => {
            if (typeof window !== 'undefined') {
                window.scrollY > 0 ? setActive(true) : setActive(false);
            }
        };

        window.addEventListener("scroll", isActive);

        return () => {
            window.removeEventListener("scroll", isActive);
        }
    }, []);

    const handleScrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    if (active) return (
        <div className='h-14 w-14 flex items-center justify-center fixed bottom-4 right-8 z-50 cursor-pointer rounded-full bg-secondary-dark-orange hover:bg-secondary-dark-orange/80 transition-all hover:-translate-y-1 ease-in duration-200 shadow-md' onClick={handleScrollToTop}>
            <KeyboardDoubleArrowUp sx={{ color: "white", fontSize: 25 }} />
        </div>
    );

    return null; 
}

export default ButtonUp;
