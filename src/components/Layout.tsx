// src/components/Layout.tsx
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
        <Header />
      <div className="flex flex-1 pb-5 md:pb-0 dark:bg-black-400">
       <div className="sticky top-[70px] left-0 hidden md:block z-20">
          <Sidebar />
        </div>
        <main className="flex-1 px-4 md:px-28 pt-10 overflow-auto dark:bg-black-400">
          <Outlet />    
        </main>
      </div>
      <div className="w-full block md:hidden sticky bottom-0 z-10 bg-white">
        <Sidebar />
      </div>

    </div>
  );
};

export default Layout;
