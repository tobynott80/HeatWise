import Link from "next/link";
import MenuIcon from "./icons/Menu";
import GlobeIcon from "./icons/Globe";
import HomeIcon from "./icons/Home";
import PoundIcon from "./icons/Pound";
import GraphDown from "./icons/GraphDown";

export default function NavContainer() {
  return (
    <div className="fixed left-0 h-screen w-[300px] flex flex-col bg-white dark:bg-gray-800 overflow-y-auto">
      <div className="flex items-center justify-start h-16 px-6 border-b">
        <MenuIcon />
        <span className="ml-2 text-lg font-semibold text-gray-700 dark:text-gray-200">
          Menu
        </span>
      </div>
      <nav className="flex flex-col py-4">
        <Link
          className="flex items-center px-6 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          href="/"
        >
          <HomeIcon />
          <span className="mx-4 font-medium">Home</span>
        </Link>
        <Link
          className="flex items-center px-6 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          href="/demand"
        >
          <GlobeIcon />
          <span className="mx-4 font-medium">Change in Heat Demand</span>
        </Link>
        <Link
          className="flex items-center px-6 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          href="/costs"
        >
          <PoundIcon />
          <span className="mx-4 font-medium">Energy Efficieny Costs</span>
        </Link>
        <Link
          className="flex items-center px-6 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          href="/consumption"
        >
          <GraphDown />
          <span className="mx-4 font-medium">Heat Consumption Profile</span>
        </Link>
      </nav>
    </div>
  );
}
