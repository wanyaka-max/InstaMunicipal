import React, { useState, useEffect } from "react";
import { X, Search, Users, Building2 } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  avatar: string;
  department?: string;
  isDepartment?: boolean;
}

interface NewMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectContact: (contact: Contact) => void;
}

const NewMessageModal = ({
  isOpen,
  onClose,
  onSelectContact,
}: NewMessageModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"people" | "departments">(
    "people",
  );
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Mock contacts data
  const peopleContacts: Contact[] = [
    {
      id: "user-1",
      name: "Jane Cooper",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      department: "Public Works",
    },
    {
      id: "user-2",
      name: "Robert Fox",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
      department: "Parks & Recreation",
    },
    {
      id: "user-3",
      name: "Leslie Knope",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=leslie",
      department: "City Council",
    },
    {
      id: "user-4",
      name: "Ben Wyatt",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ben",
      department: "Finance",
    },
    {
      id: "user-5",
      name: "April Ludgate",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=april",
      department: "Parks & Recreation",
    },
    {
      id: "user-6",
      name: "Tom Haverford",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tom",
      department: "Parks & Recreation",
    },
    {
      id: "user-7",
      name: "Ron Swanson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ron",
      department: "Parks & Recreation",
    },
    {
      id: "user-8",
      name: "Ann Perkins",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ann",
      department: "Health Services",
    },
  ];

  const departmentContacts: Contact[] = [
    {
      id: "dept-1",
      name: "Public Works",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=public-works",
      isDepartment: true,
    },
    {
      id: "dept-2",
      name: "Parks & Recreation",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=parks-rec",
      isDepartment: true,
    },
    {
      id: "dept-3",
      name: "Planning & Development",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=planning",
      isDepartment: true,
    },
    {
      id: "dept-4",
      name: "Finance & Budget",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=finance",
      isDepartment: true,
    },
    {
      id: "dept-5",
      name: "Administration",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
      isDepartment: true,
    },
    {
      id: "dept-6",
      name: "Health Services",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=health",
      isDepartment: true,
    },
    {
      id: "dept-7",
      name: "Education",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=education",
      isDepartment: true,
    },
    {
      id: "dept-8",
      name: "Public Safety",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=safety",
      isDepartment: true,
    },
  ];

  useEffect(() => {
    // Set initial contacts based on active tab
    setContacts(activeTab === "people" ? peopleContacts : departmentContacts);
  }, [activeTab]);

  // Filter contacts based on search query
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.department &&
        contact.department.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">New Message</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search people or departments..."
              className="w-full pl-9 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="border-b">
          <div className="flex">
            <button
              className={`flex-1 py-2 text-center font-medium ${activeTab === "people" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("people")}
            >
              <div className="flex items-center justify-center gap-1">
                <Users className="h-4 w-4" />
                <span>People</span>
              </div>
            </button>
            <button
              className={`flex-1 py-2 text-center font-medium ${activeTab === "departments" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("departments")}
            >
              <div className="flex items-center justify-center gap-1">
                <Building2 className="h-4 w-4" />
                <span>Departments</span>
              </div>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredContacts.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <p>No contacts found</p>
            </div>
          ) : (
            <ul className="divide-y">
              {filteredContacts.map((contact) => (
                <li
                  key={contact.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    onSelectContact(contact);
                    onClose();
                  }}
                >
                  <div className="flex items-center p-3">
                    <div className="relative mr-3">
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      {contact.isDepartment && (
                        <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center">
                          <span className="text-white text-[8px]">D</span>
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">{contact.name}</h3>
                      {contact.department && (
                        <p className="text-xs text-gray-500">
                          {contact.department}
                        </p>
                      )}
                      {contact.isDepartment && (
                        <p className="text-xs text-blue-600">
                          Department Channel
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewMessageModal;
