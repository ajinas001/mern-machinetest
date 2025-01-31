"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { logout } from "../Util/auth";
import ThemeToggle from "@/components/Themtoggle";
import DashboardContent from "./Dashboardcontent";
import AgentsContent from "./Agentcontent";
import UploadContent from "./Uploadcontent";
import DistributedContent from "./DistributedContent";


export default function Dashboard() {
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardContent />;
      case "agents":
        return <AgentsContent />;
      case "upload":
        return <UploadContent />;
      case "distributed":
        return <DistributedContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-200">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-800/50 md:hidden z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-30 w-72 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-200 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}
      >
        <div className="flex items-center justify-between p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
            Admin Panel
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="px-4 py-2">
          <div className="space-y-1">
            <button 
              onClick={() => (setCurrentPage("dashboard"),setSidebarOpen(false))}
              className={`w-full flex items-center px-4 py-3 rounded-lg font-medium transition-colors duration-150 ${
                currentPage === "dashboard"
                ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Dashboard
            </button>
            <button 
              onClick={() => (setCurrentPage("agents"),setSidebarOpen(false))}
              className={`w-full flex items-center px-4 py-3 rounded-lg font-medium transition-colors duration-150 ${
                currentPage === "agents"
                ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Agents
            </button>
            <button 
              onClick={() => (setCurrentPage("upload"),setSidebarOpen(false))}
              className={`w-full flex items-center px-4 py-3 rounded-lg font-medium transition-colors duration-150 ${
                currentPage === "upload"
                ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload CSV
            </button>
            {/* New Distributed List Button */}
            <button 
              onClick={() => (setCurrentPage("distributed"),setSidebarOpen(false))}
              className={`w-full flex items-center px-4 py-3 rounded-lg font-medium transition-colors duration-150 ${
                currentPage === "distributed"
                ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Distributed List
            </button>
          </div>
        </nav>

        <div className="absolute bottom-0 w-72 p-4 border-t border-gray-200 dark:border-gray-700">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-150"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="mr-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Manage your {currentPage} here
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>

          {renderContent()}
        </div>
      </main>
    </div>
  );
}