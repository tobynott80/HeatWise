import Link from "next/link";
import MenuIcon from "./icons/Menu";
import GlobeIcon from "./icons/Globe";
import HomeIcon from "./icons/Home";
import PoundIcon from "./icons/Pound";
import GraphDown from "./icons/GraphDown";
import { usePathname } from "next/navigation";

const MenuItem = ({ title, href, icon, isActive }) => {
  const classes = `flex items-center py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white ${
    isActive ? "border-2 rounded-lg border-gray-200 dark:border-gray-700" : ""
  }`;
  return (
    <Link className={classes} href={href}>
      <div className="ml-3">{icon}</div>
      <span className="mx-4 font-medium">{title}</span>
    </Link>
  );
};

export default function NavContainer({ isSidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const sidebarWidth = isSidebarOpen ? "w-[300px]" : "w-[75px]";

  return (
    <nav
      className={`static translate-x-0 z-20 left-0 h-screen ${sidebarWidth} flex flex-col bg-white dark:bg-gray-800 overflow-y-auto transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between h-16 px-6 border-b">
        <button className="ml-2" onClick={toggleSidebar}>
          <MenuIcon />
        </button>
        {isSidebarOpen && (
          <span className="ml-2 text-lg font-semibold text-gray-700 dark:text-gray-200">
            HeatWise
          </span>
        )}
      </div>
      <nav
        className={`flex flex-col py-4 px-4 ${
          isSidebarOpen ? "flex-grow" : ""
        }`}
      >
        <MenuItem
          title={isSidebarOpen ? "Home" : ""}
          href="/"
          icon={<HomeIcon />}
          isActive={pathname == "/"}
        />
        <MenuItem
          title={isSidebarOpen ? "Change in Heat Demand" : ""}
          href="/demand"
          icon={<GlobeIcon />}
          isActive={pathname == "/demand"}
        />
        <MenuItem
          title={isSidebarOpen ? "Energy Efficieny Costs" : ""}
          href="/costs"
          icon={<PoundIcon />}
          isActive={pathname == "/costs"}
        />
        <MenuItem
          title={isSidebarOpen ? "Heat Consumption Profile" : ""}
          href="/consumption"
          icon={<GraphDown />}
          isActive={pathname == "/consumption"}
        />
      </nav>
      {isSidebarOpen && (
        <div className="flex items-center justify-center py-4">
          <Link
            href="/help"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            Help
          </Link>
        </div>
      )}
    </nav>
  );
}