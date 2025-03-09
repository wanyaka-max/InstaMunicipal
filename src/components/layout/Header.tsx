import React, { useState } from "react";
import {
  Search,
  Home,
  MessageSquare,
  PlusSquare,
  User,
  Bell,
  Menu,
  LogOut,
  Settings,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  userAvatar?: string;
  userName?: string;
  notificationCount?: number;
  onSearch?: (query: string) => void;
  onToggleSidebar?: () => void;
}

const Header = ({
  userAvatar,
  userName,
  notificationCount = 3,
  onSearch = () => {},
  onToggleSidebar = () => {},
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Set user info from auth context if available
  const displayName =
    userName || user?.user_metadata?.full_name || user?.email || "User";
  const avatarUrl =
    userAvatar ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id || "user"}`;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <header className="w-full h-[70px] bg-white border-b border-gray-200 px-4 md:px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Logo and Mobile Menu */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden p-2 rounded-full hover:bg-gray-100"
          onClick={onToggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="InstaMunicipal Logo" className="h-8 w-8" />
          <h1 className="text-xl font-bold">InstaMunicipal</h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex max-w-md w-full mx-4">
        <form onSubmit={handleSearch} className="w-full relative">
          <input
            type="search"
            placeholder="Search departments, posts, or users..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 border border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        </form>
      </div>

      {/* Navigation Icons */}
      <div className="flex items-center gap-1 md:gap-3">
        <button className="hidden md:flex p-2 rounded-full hover:bg-gray-100">
          <Home className="h-5 w-5" />
        </button>

        <button className="hidden md:flex p-2 rounded-full hover:bg-gray-100">
          <MessageSquare className="h-5 w-5" />
        </button>

        <button className="hidden md:flex p-2 rounded-full hover:bg-gray-100">
          <PlusSquare className="h-5 w-5" />
        </button>

        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell className="h-5 w-5" />
          </button>
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </div>

        <div className="relative">
          <button
            className="p-1 rounded-full hover:bg-gray-100"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="h-8 w-8 rounded-full overflow-hidden border border-gray-200">
              <img
                src={avatarUrl}
                alt={displayName}
                className="h-full w-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`;
                }}
              />
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
              <div className="px-4 py-2 border-b">
                <p className="text-sm font-medium truncate">{displayName}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <a
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <User className="h-4 w-4 mr-2" /> Profile
              </a>
              <a
                href="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <Settings className="h-4 w-4 mr-2" /> Settings
              </a>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
