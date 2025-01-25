import { PropsWithChildren } from 'react';
import AdminNavBar from '@/Components/Admin/AdminNavBar';
import AdminAssideMenu from '@/Components/Admin/AdminAssideMenu';
import AdminFooter from '@/Components/Admin/AdminFooter';

export default function AdminDashboardLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <AdminNavBar />
            <AdminAssideMenu />
            
            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14">
                    {/* Main Content */}
                    {children}
                </div>
            </div>
            
            <AdminFooter />
        </div>
    );
}