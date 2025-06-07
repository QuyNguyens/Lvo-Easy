// src/components/Layout.tsx
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
        <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 px-28 pt-10 overflow-auto dark:bg-black-400">
          <Outlet />    
        </main>
      </div>
    </div>
  );
};

export default Layout;
