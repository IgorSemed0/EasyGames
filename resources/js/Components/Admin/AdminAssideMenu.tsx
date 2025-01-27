import { useState } from "react";
import { Link } from "@inertiajs/react";
import {
  HiOutlineViewGrid,
  HiOutlineShoppingBag,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineCog,
  HiOutlineLogout,
} from "react-icons/hi";
import { BsCoin } from "react-icons/bs";

const menuItems = [
  {
    name: "Dashboard",
    icon: <HiOutlineViewGrid className="w-5 h-5" />, 
    link: "/admin/dashboard",
  },
  {
    name: "Products",
    icon: <HiOutlineShoppingBag className="w-5 h-5" />, 
    link: "/admin/products",
    subItems: [
      { name: "Categories", link: "/admin/products/categories" },
      { name: "Stock", link: "/admin/products/stock" },
      { name: "Sales", link: "/admin/products/sales" },
    ],
  },
  {
    name: "Users",
    icon: <HiOutlineUsers className="w-5 h-5" />, 
    link: "/admin/users",
    subItems: [
      { name: "Admins", link: "/admin/users/admins" },
      { name: "Customers", link: "/admin/users/customers" },
      { name: "Vendors", link: "/admin/users/vendors" },
    ],
  },
  {
    name: "E-Coin",
    icon: <BsCoin className="w-5 h-5" />,
    link: "/admin/ecoin",
    subItems: [
      { name: "Transactions", link: "/admin/ecoin/transactions" },
      { name: "Wallets", link: "/admin/ecoin/wallets" },
      { name: "Exchanges", link: "/admin/ecoin/exchanges" },
    ],
  },
];

export default function AdminAsideMenu() {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.subItems ? (
                <>
                  <button
                    type="button"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    onClick={() => toggleMenu(index)}
                  >
                    {item.icon}
                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                      {item.name}
                    </span>
                    <svg className={`w-3 h-3 transform ${openMenu === index ? "rotate-180" : "rotate-0"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l4 4 4-4" />
                    </svg>
                  </button>
                  <ul className={`${openMenu === index ? "block" : "hidden"} py-2 space-y-2`}>
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link href={subItem.link} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  href={item.link}
                  method={item.method || "get"}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  {item.icon}
                  <span className="ms-3">{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
