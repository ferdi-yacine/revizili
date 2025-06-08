import { auth } from "@/auth"
import Sidebar from "../components/Sidebar"
import { TopNav } from "../components/TopNav"


const DashboardLayout = async ({ children }) => {
    const { user } = await auth()
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar userType={user?.role} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopNav userType={user?.role} userName="John Doe" />
                <main className="flex-1 overflow-auto">{children}</main>
            </div>
        </div>
    )
}

export default DashboardLayout
