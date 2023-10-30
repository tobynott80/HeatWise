import Link from "next/link";
import MenuIcon from "./icons/Menu";
import GlobeIcon from "./icons/Globe";
import HomeIcon from "./icons/Home";
import PoundIcon from "./icons/Pound";
import GraphDown from "./icons/GraphDown";

const MenuItem = ({ title, href, icon, isActive }) => {
  const classes = `flex items-center px-6 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white ${
    isActive ? "border-2 rounded-lg border-gray-200 dark:border-gray-700" : ""
  }`;
  return (
    <Link className={classes} href={href}>
      {icon}
      <span className="mx-2 font-medium">{title}</span>
    </Link>
  );
};

export default function NavContainer({ activeLink }) {
  return (
    <div className="fixed left-0 h-screen w-[300px] flex flex-col bg-white dark:bg-gray-800 overflow-y-auto">
      <div className="flex items-center justify-start h-16 px-6 border-b">
        <MenuIcon />
        <span className="ml-2 text-lg font-semibold text-gray-700 dark:text-gray-200">
          HeatWise
        </span>
      </div>
      <nav className="flex flex-col py-4 px-2 flex-grow">
        <MenuItem
          title="Home"
          href="/"
          icon={<HomeIcon />}
          isActive={activeLink === "/"}
        />
        <MenuItem
          title="Change In Heat Demand"
          href="/demand"
          icon={<GlobeIcon />}
          isActive={activeLink === "/demand"}
        />
        <MenuItem
          title="Energy Efficiency Costs"
          href="/costs"
          icon={<PoundIcon />}
          isActive={activeLink === "/costs"}
        />
        <MenuItem
          title="Heat Consumption Profile"
          href="/consumption"
          icon={<GraphDown />}
          isActive={activeLink === "/consumption"}
        />
      </nav>
      <div className="flex items-center justify-center py-4">
        <Link
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          href="/help"
        >
          Help
        </Link>
      </div>
    </div>
  );
}
