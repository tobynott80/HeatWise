"use client";
import Link from "next/link";
import MenuIcon from "./icons/Menu";
import GlobeIcon from "./icons/Globe";
import HomeIcon from "./icons/Home";
import PoundIcon from "./icons/Pound";
import GraphDown from "./icons/GraphDown";
import { useState } from "react";

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

export default function NavContainer({ activeLink }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const sidebarWidth = isSidebarOpen ? "w-[300px]" : "w-[75px]";

  return (
    <div
      className={`fixed left-0 h-screen ${sidebarWidth} flex flex-col bg-white dark:bg-gray-800 overflow-y-auto`}
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
          isActive={activeLink === "/"}
        />
        <MenuItem
          title={isSidebarOpen ? "Change in Heat Demand" : ""}
          href="/demand"
          icon={<GlobeIcon />}
          isActive={activeLink === "/demand"}
        />
        <MenuItem
          title={isSidebarOpen ? "Energy Efficieny Costs" : ""}
          href="/costs"
          icon={<PoundIcon />}
          isActive={activeLink === "/costs"}
        />
        <MenuItem
          title={isSidebarOpen ? "Heat Consumption Profile" : ""}
          href="/consumption"
          icon={<GraphDown />}
          isActive={activeLink === "/consumption"}
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
    </div>
  );
}
