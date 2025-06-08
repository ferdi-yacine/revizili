import DashboardAdmin from '@/app/components/DashboardAdmin'
import DashboardStudent from '@/app/components/DashboardStudent'
import DashboardTutor from '@/app/components/DashboardTutor'
import { auth } from '@/auth'


const DashboadPage = async () => {
    const { user } = await auth()
    if (user?.role === "student") {
        return (
            <DashboardStudent />
        )
    } else if (user?.role === "tutor") {
        return (
            <DashboardTutor />
        )
    } else if (user?.role === "admin") {
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