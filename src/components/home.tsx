import React, { useEffect } from "react";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import DepartmentGrid from "./departments/DepartmentGrid";
import StoriesBar from "./stories/StoriesBar";
import FloatingActionButton from "./layout/FloatingActionButton";
import { useAuth } from "./auth/AuthContext";

function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [activePath, setActivePath] = React.useState("/");
  const [showMobileSidebar, setShowMobileSidebar] = React.useState(false);
  const { user } = useAuth();

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showMobileSidebar && !target.closest(".sidebar-container")) {
        setShowMobileSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMobileSidebar]);

  // Get user department name
  const getDepartmentName = (departmentId: string) => {
    const departments: Record<string, string> = {
      "public-works": "Public Works",
      "parks-rec": "Parks & Recreation",
      planning: "Planning & Development",
      finance: "Finance & Budget",
      admin: "Administration",
      health: "Health Services",
      education: "Education",
      safety: "Public Safety",
    };
    return departments[departmentId] || departmentId;
  };

  // Get user department for AI context
  const userDepartment = user?.user_metadata?.department
    ? getDepartmentName(user.user_metadata.department)
    : undefined;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile sidebar overlay */}
      {showMobileSidebar && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" />
      )}

      {/* Sidebar - hidden on mobile unless toggled */}
      <div
        className={`sidebar-container md:relative fixed inset-y-0 left-0 z-50 md:z-auto transform ${showMobileSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"} transition-transform duration-300 ease-in-out`}
      >
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          activePath={activePath}
        />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onToggleSidebar={() => setShowMobileSidebar(!showMobileSidebar)}
          userName={user?.user_metadata?.full_name}
        />

        <div className="flex-1 overflow-auto">
          {/* Welcome message */}
          <div className="px-4 md:px-6 pt-4">
            <div className="bg-white rounded-lg border p-4 mb-4">
              <h2 className="text-xl font-bold mb-1">
                Welcome,{" "}
                {user?.user_metadata?.full_name || "Municipal Employee"}!
              </h2>
              {user?.user_metadata?.department && (
                <p className="text-gray-600">
                  Department: {getDepartmentName(user.user_metadata.department)}
                </p>
              )}
            </div>
          </div>

          <StoriesBar className="mb-4" />

          <div className="px-4 md:px-6 py-4">
            <DepartmentGrid className="mb-6" />
          </div>
        </div>
      </div>

      {/* AI Assistant Floating Button */}
      <FloatingActionButton departmentContext={userDepartment} />
    </div>
  );
}

export default Home;
