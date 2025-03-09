import React from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Pages
import Home from "./components/home";
import FeedPage from "./pages/FeedPage";
import MessagesPage from "./pages/MessagesPage";
import PublicLoginPage from "./pages/PublicLoginPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import GovernmentRegisterPage from "./pages/GovernmentRegisterPage";
import GovernmentLoginPage from "./pages/GovernmentLoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

// Import tempo routes
import routes from "tempo-routes";

function App() {
  return (
    <AuthProvider>
      {/* Tempo routes for storyboards */}
      {import.meta.env.VITE_TEMPO && useRoutes(routes)}

      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<PublicLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/government/login" element={<LoginPage />} />
        <Route
          path="/government/register"
          element={<GovernmentRegisterPage />}
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <FeedPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <MessagesPage />
            </ProtectedRoute>
          }
        />

        {/* Add route for tempo storyboards */}
        {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
      </Routes>
    </AuthProvider>
  );
}

export default App;
