import AdminSettingsPage from '@/app/components/SettingsAdmin'
import StudentSettingsPage from '@/app/components/SettingsStudent'
import TutorSettingsPage from '@/app/components/SettingsTutor'


const SettingsPage = () => {
    const user = "tutor"
    if (user === "student") {

        return (
            <StudentSettingsPage />
        )
    } else if (user === "tutor") {
        return (
            <TutorSettingsPage />
        )
    } else if (user === "admin") {
        return (
            <AdminSettingsPage />
        )
    } else {
        return (
            <div>
                No user role found
            </div>
        )
    }
}

export default SettingsPage