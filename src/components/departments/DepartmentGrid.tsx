import React, { useState, useEffect } from "react";
import {
  Grid,
  Building,
  Building2,
  Users2,
  FileText,
  Briefcase,
  HeartPulse,
  GraduationCap,
  ShieldCheck,
  Search,
  Plus,
  Filter,
  SlidersHorizontal,
  X,
  ChevronDown,
} from "lucide-react";
import DepartmentCard from "./DepartmentCard";

interface Department {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  memberCount: number;
  recentActivity: {
    time: string;
    count: number;
  };
  isActive: boolean;
  unreadCount?: number;
}

interface DepartmentGridProps {
  departments?: Department[];
  onDepartmentClick?: (id: string) => void;
  onCreateDepartment?: () => void;
  className?: string;
}

const DEFAULT_DEPARTMENTS: Department[] = [
  {
    id: "public-works",
    name: "Public Works",
    description:
      "Responsible for maintaining public infrastructure including roads, bridges, and municipal buildings.",
    icon: <Building2 className="h-8 w-8" />,
    memberCount: 42,
    recentActivity: {
      time: "2 hours ago",
      count: 5,
    },
    isActive: true,
    unreadCount: 3,
  },
  {
    id: "parks-rec",
    name: "Parks & Recreation",
    description:
      "Manages and maintains public parks, recreational facilities, and community programs for residents.",
    icon: <Users2 className="h-8 w-8" />,
    memberCount: 28,
    recentActivity: {
      time: "30 minutes ago",
      count: 12,
    },
    isActive: true,
    unreadCount: 8,
  },
  {
    id: "planning",
    name: "Planning & Development",
    description:
      "Oversees urban planning, zoning regulations, and building permits for sustainable city growth.",
    icon: <Building className="h-8 w-8" />,
    memberCount: 19,
    recentActivity: {
      time: "1 day ago",
      count: 3,
    },
    isActive: true,
    unreadCount: 0,
  },
  {
    id: "finance",
    name: "Finance & Budget",
    description:
      "Manages municipal finances, budget planning, tax collection, and financial reporting.",
    icon: <FileText className="h-8 w-8" />,
    memberCount: 15,
    recentActivity: {
      time: "4 hours ago",
      count: 7,
    },
    isActive: true,
    unreadCount: 2,
  },
  {
    id: "admin",
    name: "Administration",
    description:
      "Coordinates interdepartmental activities, manages human resources, and implements city policies.",
    icon: <Briefcase className="h-8 w-8" />,
    memberCount: 23,
    recentActivity: {
      time: "3 hours ago",
      count: 9,
    },
    isActive: true,
    unreadCount: 0,
  },
  {
    id: "health",
    name: "Health Services",
    description:
      "Provides public health programs, inspections, and community health initiatives.",
    icon: <HeartPulse className="h-8 w-8" />,
    memberCount: 31,
    recentActivity: {
      time: "5 hours ago",
      count: 4,
    },
    isActive: false,
    unreadCount: 0,
  },
  {
    id: "education",
    name: "Education",
    description:
      "Oversees public schools, educational programs, and learning resources for the community.",
    icon: <GraduationCap className="h-8 w-8" />,
    memberCount: 47,
    recentActivity: {
      time: "1 hour ago",
      count: 15,
    },
    isActive: true,
    unreadCount: 5,
  },
  {
    id: "safety",
    name: "Public Safety",
    description:
      "Coordinates emergency services, disaster preparedness, and community safety programs.",
    icon: <ShieldCheck className="h-8 w-8" />,
    memberCount: 38,
    recentActivity: {
      time: "45 minutes ago",
      count: 8,
    },
    isActive: true,
    unreadCount: 1,
  },
];

const DepartmentGrid = ({
  departments = DEFAULT_DEPARTMENTS,
  onDepartmentClick = (id) => console.log(`Department clicked: ${id}`),
  onCreateDepartment = () => console.log("Create department clicked"),
  className = "",
}: DepartmentGridProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDepartments, setFilteredDepartments] = useState(departments);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [sortBy, setSortBy] = useState<"name" | "recent" | "members">("name");

  useEffect(() => {
    let filtered = [...departments];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (dept) =>
          dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dept.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply active/inactive filter
    if (activeFilter === "active") {
      filtered = filtered.filter((dept) => dept.isActive);
    } else if (activeFilter === "inactive") {
      filtered = filtered.filter((dept) => !dept.isActive);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "recent") {
        // Sort by most recent activity (this is simplified)
        return a.recentActivity.time.localeCompare(b.recentActivity.time);
      } else if (sortBy === "members") {
        return b.memberCount - a.memberCount;
      }
      return 0;
    });

    setFilteredDepartments(filtered);
  }, [departments, searchQuery, activeFilter, sortBy]);

  const totalUnread = departments.reduce(
    (sum, dept) => sum + (dept.unreadCount || 0),
    0,
  );

  return (
    <div className={`w-full bg-white rounded-lg border shadow-sm ${className}`}>
      <div className="border-b p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            Department Pigeonholes
            {totalUnread > 0 && (
              <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                {totalUnread} unread
              </span>
            )}
          </h2>
          <button
            onClick={onCreateDepartment}
            className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            New Department
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search departments..."
              className="w-full pl-9 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-3 py-2 rounded-md border flex items-center gap-1 ${showFilters ? "bg-gray-100 border-gray-300" : "border-gray-200 hover:bg-gray-50"}`}
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {showFilters && (
          <div className="mt-3 p-3 bg-gray-50 rounded-md border border-gray-200 flex flex-wrap gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">
                Status
              </label>
              <div className="flex gap-1">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`px-2 py-1 text-xs rounded ${activeFilter === "all" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveFilter("active")}
                  className={`px-2 py-1 text-xs rounded ${activeFilter === "active" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  Active
                </button>
                <button
                  onClick={() => setActiveFilter("inactive")}
                  className={`px-2 py-1 text-xs rounded ${activeFilter === "inactive" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  Inactive
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">
                Sort By
              </label>
              <div className="flex gap-1">
                <button
                  onClick={() => setSortBy("name")}
                  className={`px-2 py-1 text-xs rounded ${sortBy === "name" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  Name
                </button>
                <button
                  onClick={() => setSortBy("recent")}
                  className={`px-2 py-1 text-xs rounded ${sortBy === "recent" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  Recent Activity
                </button>
                <button
                  onClick={() => setSortBy("members")}
                  className={`px-2 py-1 text-xs rounded ${sortBy === "members" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  Member Count
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {filteredDepartments.length === 0 ? (
        <div className="p-8 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <Building2 className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No departments found
          </h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search or filters
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveFilter("all");
              setSortBy("name");
            }}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDepartments.map((department) => (
            <div
              key={department.id}
              onClick={() => onDepartmentClick(department.id)}
              className="cursor-pointer relative"
            >
              {department.unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 z-10 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {department.unreadCount}
                </span>
              )}
              <DepartmentCard
                id={department.id}
                name={department.name}
                description={department.description}
                icon={department.icon}
                memberCount={department.memberCount}
                recentActivity={department.recentActivity}
                isActive={department.isActive}
              />
            </div>
          ))}
        </div>
      )}

      <div className="border-t p-3 bg-gray-50 flex justify-between items-center text-sm text-gray-500">
        <span>{filteredDepartments.length} departments</span>
        <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
          <Grid className="h-4 w-4" />
          View All
        </button>
      </div>
    </div>
  );
};

export default DepartmentGrid;
