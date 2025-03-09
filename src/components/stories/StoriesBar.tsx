import React from "react";
import StoryAvatar from "./StoryAvatar";

interface Department {
  id: string;
  name: string;
  imageUrl?: string;
  isActive?: boolean;
}

interface StoriesBarProps {
  departments?: Department[];
  onStoryClick?: (departmentId: string) => void;
}

const StoriesBar = ({
  departments = [
    {
      id: "parks",
      name: "Parks & Rec",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=parks",
      isActive: true,
    },
    {
      id: "finance",
      name: "Finance",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=finance",
    },
    {
      id: "police",
      name: "Police Dept",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=police",
      isActive: true,
    },
    {
      id: "fire",
      name: "Fire Dept",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=fire",
    },
    {
      id: "health",
      name: "Health Services",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=health",
    },
    {
      id: "planning",
      name: "Urban Planning",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=planning",
    },
    {
      id: "transport",
      name: "Transportation",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=transport",
    },
    {
      id: "water",
      name: "Water & Utilities",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=water",
    },
    {
      id: "mayor",
      name: "Mayor's Office",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=mayor",
      isActive: true,
    },
    {
      id: "it",
      name: "IT Department",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=it",
    },
  ],
  onStoryClick = (id) => console.log(`Story clicked: ${id}`),
}: StoriesBarProps) => {
  return (
    <div className="w-full h-[120px] bg-gray-50 border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold text-gray-700">
          Department Stories
        </h2>
        <button className="text-xs text-blue-600 hover:text-blue-800 transition-colors">
          View All
        </button>
      </div>

      <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2">
        {departments.map((department) => (
          <div
            key={department.id}
            onClick={() => onStoryClick(department.id)}
            className="cursor-pointer"
          >
            <StoryAvatar
              departmentName={department.name}
              imageUrl={department.imageUrl}
              isActive={department.isActive}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesBar;
