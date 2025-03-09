import React, { useState } from "react";
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  MoreHorizontal,
  MapPin,
  Building2,
  Lock,
  Globe,
} from "lucide-react";

interface Author {
  id: string;
  name: string;
  avatar: string;
  department?: string;
}

interface Department {
  id: string;
  name: string;
}

interface PostCardProps {
  id: string;
  author: Author;
  content: string;
  createdAt: Date;
  images?: string[];
  likes: number;
  comments: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  department?: Department | null;
  location?: string;
  visibility: "public" | "department" | "anonymous";
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
  onShare?: (id: string) => void;
  onBookmark?: (id: string) => void;
  onViewDepartment?: (departmentId: string) => void;
}

const PostCard = ({
  id,
  author,
  content,
  createdAt,
  images = [],
  likes = 0,
  comments = 0,
  isLiked = false,
  isBookmarked = false,
  department = null,
  location = "",
  visibility = "public",
  onLike = () => {},
  onComment = () => {},
  onShare = () => {},
  onBookmark = () => {},
  onViewDepartment = () => {},
}: PostCardProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    onLike(id);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    onBookmark(id);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;

    if (diff < minute) {
      return "Just now";
    } else if (diff < hour) {
      const minutes = Math.floor(diff / minute);
      return `${minutes}m ago`;
    } else if (diff < day) {
      const hours = Math.floor(diff / hour);
      return `${hours}h ago`;
    } else if (diff < day * 7) {
      const days = Math.floor(diff / day);
      return `${days}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="bg-white border rounded-lg overflow-hidden mb-4">
      <div className="p-4">
        <div className="flex justify-between">
          <div className="flex items-start">
            <img
              src={author.avatar}
              alt={author.name}
              className="h-10 w-10 rounded-full mr-3"
            />
            <div>
              <div className="flex items-center">
                <h3 className="font-medium">{author.name}</h3>
                {author.department && (
                  <span className="text-xs text-gray-500 ml-2">
                    {author.department}
                  </span>
                )}
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <span>{formatDate(createdAt)}</span>
                <span className="mx-1">•</span>
                {visibility === "public" && <Globe className="h-3 w-3 mr-1" />}
                {visibility === "department" && (
                  <Building2 className="h-3 w-3 mr-1" />
                )}
                {visibility === "anonymous" && (
                  <Lock className="h-3 w-3 mr-1" />
                )}
                <span>
                  {visibility === "public" && "Public"}
                  {visibility === "department" && "Department Only"}
                  {visibility === "anonymous" && "Anonymous"}
                </span>
              </div>
            </div>
          </div>
          <button className="p-1 rounded-full hover:bg-gray-100">
            <MoreHorizontal className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {department && (
          <div
            className="mt-2 inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-sm cursor-pointer"
            onClick={() => onViewDepartment(department.id)}
          >
            <Building2 className="h-3 w-3 mr-1" />
            {department.name}
          </div>
        )}

        <div className="mt-3">
          <p className="whitespace-pre-line">{content}</p>
        </div>

        {location && (
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            {location}
          </div>
        )}

        {images.length > 0 && (
          <div
            className={`mt-3 grid ${images.length === 1 ? "grid-cols-1" : "grid-cols-2"} gap-2`}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className={`rounded-lg overflow-hidden ${images.length === 1 ? "h-80" : "h-40"}`}
              >
                <img
                  src={image}
                  alt="Post attachment"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-6">
            <button
              className={`flex items-center ${liked ? "text-red-500" : "text-gray-500"} hover:text-red-500`}
              onClick={handleLike}
            >
              <Heart
                className={`h-5 w-5 ${liked ? "fill-current" : ""} mr-1`}
              />
              <span>{likeCount}</span>
            </button>
            <button
              className="flex items-center text-gray-500 hover:text-blue-500"
              onClick={() => onComment(id)}
            >
              <MessageSquare className="h-5 w-5 mr-1" />
              <span>{comments}</span>
            </button>
            <button
              className="flex items-center text-gray-500 hover:text-green-500"
              onClick={() => onShare(id)}
            >
              <Share2 className="h-5 w-5 mr-1" />
            </button>
          </div>
          <button
            className={`${bookmarked ? "text-yellow-500" : "text-gray-500"} hover:text-yellow-500`}
            onClick={handleBookmark}
          >
            <Bookmark
              className={`h-5 w-5 ${bookmarked ? "fill-current" : ""}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
