import Banner from "../components/Banner";
import Benefits from "../components/Benefits";
import ButtonUp from "../components/ButtonUp";
import FeaturedSubjects from "../components/FeaturedSubjects";
import Footer from "../components/Footer";
import GetInTouch from "../components/GetInTouch";
import Landing from "../components/Landing";
import Modules from "../components/Modules";
import Navbar from "../components/Navbar";
import PersonalizedApproach from "../components/PersonalizedApproach";
import Statistics from "../components/Statistics";
import Testimonials from "../components/Testimonials";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center overflow-x-hidden">
            <Banner />
            <Navbar />
            <Landing />
            <FeaturedSubjects />
            <Modules />
            <Benefits />
            <PersonalizedApproach />
            <Testimonials />
            <Statistics />
            <GetInTouch />
            <Footer />
            <ButtonUp />
        </div>
    );
}

