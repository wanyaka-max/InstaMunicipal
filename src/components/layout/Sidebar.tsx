import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Building2,
  MessageSquare,
  User,
  Settings,
  Bell,
  LogOut,
  HelpCircle,
  FileText,
  BarChart3,
  Shield,
  Image,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";

interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  activePath?: string;
}

const Sidebar = ({
  className,
  collapsed = false,
  onToggleCollapse = () => {},
  activePath,
}: SidebarProps) => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = activePath || location.pathname;

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const isGovernmentUser = user?.email?.endsWith(".gov");

  const navItems = [
    {
      icon: <Home size={20} />,
      label: "Home",
      path: "/",
    },
    {
      icon: <Image size={20} />,
      label: "Feed",
      path: "/feed",
    },
    {
      icon: <MessageSquare size={20} />,
      label: "Messages",
      path: "/messages",
      badge: 3,
    },
    {
      icon: <Building2 size={20} />,
      label: "Departments",
      path: "/departments",
    },
    {
      icon: <Bell size={20} />,
      label: "Notifications",
      path: "/notifications",
      badge: 5,
    },
  ];

  // Add government-specific items if user is a government account
  if (isGovernmentUser) {
    navItems.push(
      {
        icon: <Shield size={20} />,
        label: "Admin Panel",
        path: "/admin",
      },
      {
        icon: <FileText size={20} />,
        label: "Reports",
        path: "/reports",
      },
      {
        icon: <BarChart3 size={20} />,
        label: "Analytics",
        path: "/analytics",
      },
    );
  }

  const bottomNavItems = [
    {
      icon: <User size={20} />,
      label: "Profile",
      path: "/profile",
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      path: "/settings",
    },
    {
      icon: <HelpCircle size={20} />,
      label: "Help",
      path: "/help",
    },
    {
      icon: <LogOut size={20} />,
      label: "Logout",
      path: "#",
      onClick: handleLogout,
    },
  ];

  const renderNavItem = (item: any, index: number) => {
    const isActive = currentPath === item.path;
    const LinkComponent = item.onClick ? "button" : Link;
    const linkProps = item.onClick
      ? { onClick: item.onClick, type: "button" }
      : { to: item.path };

    return (
      <div key={index}>
        <LinkComponent
          {...linkProps}
          className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
            isActive
              ? "bg-blue-100 text-blue-700"
              : "text-gray-600 hover:bg-gray-100"
          } ${collapsed ? "justify-center" : ""} w-full text-left`}
          title={collapsed ? item.label : ""}
        >
          <div className="relative">
            {item.icon}
            {item.badge && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </div>
          {!collapsed && <span>{item.label}</span>}
        </LinkComponent>
      </div>
    );
  };

  return (
    <div
      className={`h-full flex flex-col justify-between py-4 border-r bg-white transition-all ${
        collapsed ? "w-16" : "w-64"
      } ${className || ""}`}
    >
      <div>
        <div className="px-4 mb-6 flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <img
                src="/logo.svg"
                alt="InstaMunicipal Logo"
                className="h-8 w-8"
              />
              <span className="font-bold text-lg">InstaMunicipal</span>
            </div>
          )}
          {collapsed && (
            <div className="w-full flex justify-center">
              <img
                src="/logo.svg"
                alt="InstaMunicipal Logo"
                className="h-8 w-8"
              />
            </div>
          )}
        </div>

        {user && (
          <div className="px-4 mb-6">
            {!collapsed ? (
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-200">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}
                    alt="User avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden">
                  <p className="font-medium text-sm truncate">
                    {user.user_metadata?.full_name || user.email}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.user_metadata?.department ? (
                      <span className="capitalize">
                        {user.user_metadata.department.replace("-", " ")}
                      </span>
                    ) : (
                      user.email
                    )}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center mb-4">
                <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-200">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}
                    alt="User avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="space-y-1 px-2">
          {navItems.map((item, index) => renderNavItem(item, index))}
        </div>
      </div>

      <div className="space-y-1 px-2">
        {bottomNavItems.map((item, index) => renderNavItem(item, index))}
      </div>
    </div>
  );
};

export default Sidebar;
