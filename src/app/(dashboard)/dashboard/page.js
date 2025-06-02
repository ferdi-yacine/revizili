import DashboardAdmin from '@/app/components/DashboardAdmin'
import DashboardStudent from '@/app/components/DashboardStudent'
import DashboardTutor from '@/app/components/DashboardTutor'


const DashboadPage = () => {
    const user = "tutor"
    if (user === "student") {

        return (
            <DashboardStudent />
        )
    } else if (user === "tutor") {
        return (
            <DashboardTutor />
        )
    } else if (user === "admin") {
        return (
            <DashboardAdmin />
        )
    } else {
        return (
            <div>
                No user role found
            </div>
        )
    }
}

export default DashboadPage