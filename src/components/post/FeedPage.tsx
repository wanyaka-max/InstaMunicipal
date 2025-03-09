import React, { useState } from "react";
import PostCard from "./PostCard";
import CreatePostModal from "./CreatePostModal";
import { Plus, Filter, Building2 } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

interface Post {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    id: string;
    name: string;
    avatar: string;
    department?: string;
  };
  department?: {
    id: string;
    name: string;
  } | null;
  visibility: "public" | "department" | "anonymous";
  images?: string[];
  location?: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

const FeedPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "departments" | "people"
  >("all");
  const [posts, setPosts] = useState<Post[]>(generateSamplePosts());
  const { user } = useAuth();

  function generateSamplePosts(): Post[] {
    return [
      {
        id: "post-1",
        content:
          "We're excited to announce that the Main Street renovation project will begin next week. Expect some traffic delays in the downtown area.",
        createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        author: {
          id: "dept-1",
          name: "Public Works Department",
          avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=public-works",
        },
        department: {
          id: "public-works",
          name: "Public Works",
        },
        visibility: "public",
        images: [
          "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=500&q=80",
        ],
        location: "Main Street, Downtown",
        likes: 24,
        comments: 8,
        isLiked: false,
        isBookmarked: false,
      },
      {
        id: "post-2",
        content:
          "Has anyone noticed the potholes on Elm Street? They're getting worse after the recent rain.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        author: {
          id: "user-1",
          name: "Jane Cooper",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
          department: "Public Works",
        },
        visibility: "public",
        location: "Elm Street",
        likes: 15,
        comments: 12,
        isLiked: true,
        isBookmarked: false,
      },
      {
        id: "post-3",
        content:
          "I've noticed some suspicious activity near the park after hours. Can we get more patrols in that area?",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        author: {
          id: "anonymous",
          name: "Anonymous",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anonymous",
        },
        department: {
          id: "safety",
          name: "Public Safety",
        },
        visibility: "anonymous",
        likes: 8,
        comments: 3,
        isLiked: false,
        isBookmarked: true,
      },
      {
        id: "post-4",
        content:
          "Registration for summer youth programs is now open! Sign up your kids for swimming, basketball, arts & crafts, and more.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        author: {
          id: "dept-2",
          name: "Parks & Recreation",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=parks-rec",
        },
        department: {
          id: "parks-rec",
          name: "Parks & Recreation",
        },
        visibility: "public",
        images: [
          "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=500&q=80",
          "https://images.unsplash.com/photo-1551966775-a4ddc8df052b?w=500&q=80",
        ],
        likes: 42,
        comments: 15,
        isLiked: false,
        isBookmarked: false,
      },
    ];
  }

  const handleCreatePost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const handleLike = (postId: string) => {
    // In a real app, this would call an API
    console.log(`Liked post: ${postId}`);
  };

  const handleComment = (postId: string) => {
    // In a real app, this would open a comment modal
    console.log(`Comment on post: ${postId}`);
  };

  const handleShare = (postId: string) => {
    // In a real app, this would open a share modal
    console.log(`Share post: ${postId}`);
  };

  const handleBookmark = (postId: string) => {
    // In a real app, this would call an API
    console.log(`Bookmarked post: ${postId}`);
  };

  const handleViewDepartment = (departmentId: string) => {
    // In a real app, this would navigate to the department page
    console.log(`View department: ${departmentId}`);
  };

  // Filter posts based on active filter
  const filteredPosts = posts.filter((post) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "departments") return post.department !== null;
    if (activeFilter === "people")
      return (
        post.author.id !== "anonymous" && !post.author.id.startsWith("dept-")
      );
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto py-4 px-4">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-full text-sm font-medium ${activeFilter === "all" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setActiveFilter("all")}
          >
            All Posts
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${activeFilter === "departments" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setActiveFilter("departments")}
          >
            <Building2 className="h-3 w-3 mr-1" />
            Departments
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm font-medium ${activeFilter === "people" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setActiveFilter("people")}
          >
            People
          </button>
        </div>
        <button
          className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="bg-white border rounded-lg p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Filter className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium mb-2">No posts found</h3>
          <p className="text-gray-500 mb-4">
            Try changing your filter or create a new post
          </p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => setShowCreateModal(true)}
          >
            Create Post
          </button>
        </div>
      ) : (
        <div>
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              {...post}
              onLike={handleLike}
              onComment={handleComment}
              onShare={handleShare}
              onBookmark={handleBookmark}
              onViewDepartment={handleViewDepartment}
            />
          ))}
        </div>
      )}

      {showCreateModal && (
        <CreatePostModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreatePost={handleCreatePost}
        />
      )}
    </div>
  );
};

export default FeedPage;
