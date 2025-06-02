import Sidebar from "../components/Sidebar"
import { TopNav } from "../components/TopNav"


export default function StudentLayout({ children }) {
    const user = "tutor"
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar userType={user} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopNav userType="student" userName="John Doe" />
                <main className="flex-1 overflow-auto">{children}</main>
            </div>
        </div>
    )
}
