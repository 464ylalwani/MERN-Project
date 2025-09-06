import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";

// Simple placeholder component for "/" route
const DashboardPlaceholder = () => <h2>Welcome! You are logged in.</h2>;

// ✅ Navbar with role-based menu
function Navbar() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return null; // no navbar before login

  return (
    <nav style={{ marginBottom: "20px" }}>
      <Link to="/">Home</Link> |{" "}
      {user.role === "admin" && (
        <>
          <Link to="/admin-dashboard">Admin Dashboard</Link> |{" "}
          <Link to="/user-management">User Management</Link> |{" "}
        </>
      )}
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        {/* ✅ Navbar included */}
        <Navbar />

        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected route for general dashboard */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPlaceholder />
              </ProtectedRoute>
            }
          />

          {/* Protected route for Admin Dashboard */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected route for User Management */}
          <Route
            path="/user-management"
            element={
              <ProtectedRoute>
                <UserManagement />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
