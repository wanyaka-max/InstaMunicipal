import React from "react";
import GovernmentLoginForm from "@/components/admin/GovernmentLoginForm";
import { Shield } from "lucide-react";

const GovernmentLoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Government Portal
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Secure access for official municipal accounts
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <GovernmentLoginForm />
      </div>
    </div>
  );
};

export default GovernmentLoginPage;
