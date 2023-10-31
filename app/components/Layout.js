"use client";
import { useState } from "react";
import Navbar from "./Navbar";

export default function Layout({ children }) {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className={`grid min-h-screen ${isSidebarOpen ? "grid-cols-[300px_auto]" : "grid-cols-[75px_auto]"}`}>
            <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div>
                {children}
            </div>
        </div>
    )
}