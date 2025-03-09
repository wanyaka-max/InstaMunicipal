import React from "react";
import RegisterForm from "@/components/auth/RegisterForm";
import { Building2 } from "lucide-react";

const RegisterPage = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center border border-white/50 shadow-lg">
            <img
              src="/logo.svg"
              alt="InstaMunicipal Logo"
              className="h-16 w-16"
            />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          InstaMunicipal
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join your municipal network
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
