import React from "react";
import {
  Bell,
  X,
  Check,
  Clock,
  User,
  MessageSquare,
  Heart,
} from "lucide-react";

interface NotificationProps {
  id: string;
  type: "like" | "comment" | "mention" | "system" | "message";
  content: string;
  time: string;
  read: boolean;
  sender?: {
    name: string;
    avatar: string;
    department?: string;
  };
}

interface NotificationPanelProps {
  notifications?: NotificationProps[];
  onMarkAllRead?: () => void;
  onDismiss?: (id: string) => void;
  onClearAll?: () => void;
  isOpen?: boolean;
}

const NotificationPanel = ({
  notifications = [
    {
      id: "1",
      type: "like",
      content: "liked your post about road maintenance",
      time: "2 minutes ago",
      read: false,
      sender: {
        name: "Jane Cooper",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
        department: "Public Works",
      },
    },
    {
      id: "2",
      type: "comment",
      content: "commented on your post about the new park development",
      time: "1 hour ago",
      read: false,
      sender: {
        name: "Robert Fox",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
        department: "Parks & Rec",
      },
    },
    {
      id: "3",
      type: "message",
      content: "sent you a direct message",
      time: "3 hours ago",
      read: true,
      sender: {
        name: "Leslie Knope",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=leslie",
        department: "City Council",
      },
    },
    {
      id: "4",
      type: "system",
      content: "Your post has been approved by the moderator",
      time: "Yesterday",
      read: true,
    },
    {
      id: "5",
      type: "mention",
      content: "mentioned you in a comment on the budget proposal",
      time: "2 days ago",
      read: true,
      sender: {
        name: "Ben Wyatt",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ben",
        department: "Finance",
      },
    },
  ],
  onMarkAllRead = () => {},
  onDismiss = () => {},
  onClearAll = () => {},
  isOpen = true,
}: NotificationPanelProps) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />;
      case "comment":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "mention":
        return <User className="h-4 w-4 text-purple-500" />;
      case "message":
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="w-[350px] h-[400px] bg-white shadow-lg rounded-lg border overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 text-xs bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </h3>
          <div className="flex gap-1">
            <button
              onClick={onMarkAllRead}
              className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
            >
              <Check className="h-4 w-4 mx-auto" />
              <span className="sr-only">Mark all as read</span>
            </button>
            <button
              onClick={onClearAll}
              className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
            >
              <X className="h-4 w-4 mx-auto" />
              <span className="sr-only">Clear all</span>
            </button>
          </div>
        </div>
      </div>
      <div className="h-[300px] overflow-auto">
        <div className="p-0">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[300px] text-center p-4">
              <Bell className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">No notifications yet</p>
            </div>
          ) : (
            <ul className="divide-y">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? "bg-blue-50/50" : ""}`}
                >
                  <div className="flex gap-3">
                    {notification.sender ? (
                      <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                        <img
                          src={notification.sender.avatar}
                          alt={notification.sender.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium">
                          {notification.sender?.name && (
                            <span className="font-semibold">
                              {notification.sender.name}{" "}
                            </span>
                          )}
                          <span className="text-gray-700">
                            {notification.content}
                          </span>
                        </p>
                        <button
                          onClick={() => onDismiss(notification.id)}
                          className="h-6 w-6 p-0 ml-2 -mt-1 opacity-0 group-hover:opacity-100 rounded-full hover:bg-gray-100"
                        >
                          <X className="h-3 w-3 mx-auto" />
                          <span className="sr-only">Dismiss</span>
                        </button>
                      </div>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {notification.time}
                        {notification.sender?.department && (
                          <>
                            <span className="mx-1">•</span>
                            <span>{notification.sender.department}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="p-3 border-t bg-gray-50">
        <button className="w-full text-xs py-1 px-3 border rounded-md hover:bg-gray-100">
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationPanel;
