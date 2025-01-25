import { Link } from '@inertiajs/react';
import { DiVim } from "react-icons/di";
import { 
    HiOutlineViewGrid,
    HiOutlineShoppingBag,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiOutlineCog,
    HiOutlineLogout
} from "react-icons/hi";

export default function AdminAssideMenu() {
    return (
        <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link
                            href="/admin/dashboard"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <HiOutlineViewGrid className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="ms-3">Dashboard</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/admin/products"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <HiOutlineShoppingBag className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/admin/users"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <HiOutlineUsers className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/admin/orders"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <HiOutlineDocumentText className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="flex-1 ms-3 whitespace-nowrap">Orders</span>
                            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                3
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/admin/settings"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <HiOutlineCog className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="flex-1 ms-3 whitespace-nowrap">Settings</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full"
                        >
                            <HiOutlineLogout className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="flex-1 ms-3 whitespace-nowrap text-left">Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
}