import React, { useState } from "react";
import {
  X,
  Image,
  MapPin,
  Users,
  Building2,
  Lock,
  Globe,
  Send,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePost: (post: any) => void;
  departments?: { id: string; name: string }[];
}

const CreatePostModal = ({
  isOpen,
  onClose,
  onCreatePost,
  departments = [
    { id: "public-works", name: "Public Works" },
    { id: "parks-rec", name: "Parks & Recreation" },
    { id: "planning", name: "Planning & Development" },
    { id: "finance", name: "Finance & Budget" },
    { id: "admin", name: "Administration" },
    { id: "health", name: "Health Services" },
    { id: "education", name: "Education" },
    { id: "safety", name: "Public Safety" },
  ],
}: CreatePostModalProps) => {
  const [content, setContent] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [visibility, setVisibility] = useState<
    "public" | "department" | "anonymous"
  >("public");
  const [images, setImages] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const { user } = useAuth();

  const handleSubmit = () => {
    if (!content.trim()) return;

    const post = {
      id: `post-${Date.now()}`,
      content,
      createdAt: new Date(),
      author:
        visibility === "anonymous"
          ? {
              id: "anonymous",
              name: "Anonymous",
              avatar:
                "https://api.dicebear.com/7.x/avataaars/svg?seed=anonymous",
            }
          : {
              id: user?.id || "user",
              name: user?.user_metadata?.full_name || "User",
              avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id || "user"}`,
              department: user?.user_metadata?.department,
            },
      department: selectedDepartment
        ? departments.find((d) => d.id === selectedDepartment)
        : null,
      visibility,
      images,
      location,
      likes: 0,
      comments: 0,
      isLiked: false,
      isBookmarked: false,
    };

    onCreatePost(post);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setContent("");
    setSelectedDepartment("");
    setVisibility("public");
    setImages([]);
    setLocation("");
  };

  const handleAddImage = () => {
    // In a real app, this would open a file picker
    // For demo purposes, we'll add a random placeholder image
    const imageIds = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const randomId = imageIds[Math.floor(Math.random() * imageIds.length)];
    const newImage = `https://images.unsplash.com/photo-${randomId}?w=500&q=80`;
    setImages([...images, newImage]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Create Post</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center mb-4">
            <img
              src={
                visibility === "anonymous"
                  ? "https://api.dicebear.com/7.x/avataaars/svg?seed=anonymous"
                  : `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id || "user"}`
              }
              alt="User avatar"
              className="h-10 w-10 rounded-full mr-3"
            />
            <div>
              <p className="font-medium">
                {visibility === "anonymous"
                  ? "Anonymous"
                  : user?.user_metadata?.full_name || "User"}
              </p>
              <div className="flex items-center text-sm text-gray-500">
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

          <textarea
            placeholder="What's happening in your municipality?"
            className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {images.length > 0 && (
            <div className="mb-4 grid grid-cols-2 gap-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative rounded-lg overflow-hidden h-40"
                >
                  <img
                    src={image}
                    alt="Post attachment"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Post to Department
            </label>
            <select
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">Select a department (optional)</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Visibility
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                className={`flex items-center px-3 py-2 rounded-md ${visibility === "public" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}
                onClick={() => setVisibility("public")}
              >
                <Globe className="h-4 w-4 mr-2" />
                Public
              </button>
              <button
                type="button"
                className={`flex items-center px-3 py-2 rounded-md ${visibility === "department" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}
                onClick={() => setVisibility("department")}
              >
                <Building2 className="h-4 w-4 mr-2" />
                Department Only
              </button>
              <button
                type="button"
                className={`flex items-center px-3 py-2 rounded-md ${visibility === "anonymous" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}
                onClick={() => setVisibility("anonymous")}
              >
                <Lock className="h-4 w-4 mr-2" />
                Anonymous
              </button>
            </div>
          </div>

          <div className="border-t pt-4 flex justify-between items-center">
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={handleAddImage}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Image className="h-5 w-5 text-gray-600" />
              </button>
              <button
                type="button"
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={() => setLocation("Municipal Building, City Center")}
              >
                <MapPin className="h-5 w-5 text-gray-600" />
              </button>
              <button
                type="button"
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Users className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!content.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <Send className="h-4 w-4 mr-2" />
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
