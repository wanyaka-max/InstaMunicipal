import React from "react";

interface StoryAvatarProps {
  departmentName?: string;
  imageUrl?: string;
  isActive?: boolean;
}

const StoryAvatar = ({
  departmentName = "Parks & Rec",
  imageUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=parks",
  isActive = false,
}: StoryAvatarProps) => {
  // Extract first letter for fallback
  const firstLetter = departmentName.charAt(0);

  return (
    <div className="flex flex-col items-center justify-center w-20 h-25 bg-white p-1">
      <div
        className={`relative ${isActive ? "ring-2 ring-offset-2 ring-blue-500" : ""}`}
      >
        <div className="w-16 h-16 rounded-full border-2 border-gray-200 cursor-pointer hover:opacity-90 transition-opacity overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={departmentName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              {firstLetter}
            </div>
          )}
        </div>
        {isActive && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
        )}
      </div>
      <span className="mt-2 text-xs text-center font-medium truncate w-full">
        {departmentName}
      </span>
    </div>
  );
};

export default StoryAvatar;
