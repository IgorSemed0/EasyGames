export default function AdminFooter() {
    return (
        <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between dark:bg-gray-800 dark:border-gray-600">
            <div className="w-full max-w-screen-xl mx-auto p-1 text-center">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-600">
                    © 2024 <a href="/" className="hover:underline">DarkMamba™</a>. All Rights Reserved.
                </span>
            </div>
        </footer>
    );
}
