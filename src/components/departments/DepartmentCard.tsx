import React from "react";
import {
  Building2,
  Users,
  Clock,
  ArrowUpRight,
  MessageSquare,
} from "lucide-react";

interface DepartmentCardProps {
  id?: string;
  name?: string;
  description?: string;
  icon?: React.ReactNode;
  memberCount?: number;
  recentActivity?: {
    time: string;
    count: number;
  };
  isActive?: boolean;
  unreadCount?: number;
}

const DepartmentCard = ({
  id = "dept-1",
  name = "Public Works",
  description = "Responsible for maintaining public infrastructure including roads, bridges, and municipal buildings.",
  icon = <Building2 className="h-8 w-8" />,
  memberCount = 42,
  recentActivity = {
    time: "2 hours ago",
    count: 5,
  },
  isActive = true,
  unreadCount = 0,
}: DepartmentCardProps) => {
  // Generate a consistent color based on the department id
  const getIconBgColor = (id: string) => {
    const colors = [
      "bg-blue-100 text-blue-600",
      "bg-green-100 text-green-600",
      "bg-purple-100 text-purple-600",
      "bg-amber-100 text-amber-600",
      "bg-rose-100 text-rose-600",
      "bg-cyan-100 text-cyan-600",
      "bg-indigo-100 text-indigo-600",
      "bg-emerald-100 text-emerald-600",
    ];

    // Simple hash function to get a consistent index
    const hash = id
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const iconColorClass = getIconBgColor(id);

  return (
    <div className="w-full h-[200px] overflow-hidden transition-all duration-300 hover:shadow-lg bg-white rounded-lg border hover:border-blue-300">
      <div className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${iconColorClass}`}>{icon}</div>
            <div>
              <h3 className="text-lg font-semibold">{name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center text-gray-500 text-xs">
                  <Users className="h-3 w-3 mr-1" />
                  <span>{memberCount} members</span>
                </div>
                {isActive ? (
                  <span className="text-xs py-0.5 px-2 bg-green-100 text-green-800 rounded-full">
                    Active
                  </span>
                ) : (
                  <span className="text-xs py-0.5 px-2 bg-gray-100 text-gray-800 rounded-full">
                    Inactive
                  </span>
                )}
              </div>
            </div>
          </div>
          <ArrowUpRight className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="px-4">
        <p className="line-clamp-2 text-sm text-gray-500">{description}</p>
      </div>
      <div className="px-4 pt-3 mt-3 border-t flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-gray-500" />
            <span className="text-xs text-gray-500">{recentActivity.time}</span>
          </div>
          {unreadCount > 0 && (
            <div className="flex items-center gap-1 bg-red-50 text-red-600 px-1.5 py-0.5 rounded-full text-xs">
              <MessageSquare className="h-3 w-3" />
              <span>{unreadCount} new</span>
            </div>
          )}
        </div>
        <div className="flex -space-x-2">
          {[...Array(Math.min(3, recentActivity.count))].map((_, i) => (
            <div
              key={i}
              className="h-6 w-6 rounded-full border-2 border-white overflow-hidden"
            >
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${id}-${i}`}
                alt="User avatar"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
          {recentActivity.count > 3 && (
            <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs border-2 border-white">
              +{recentActivity.count - 3}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
