import { useState } from "react";
import { FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col p-5">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <nav className="mt-6 flex-1">
          <ul>
            <li>
              <button
                onClick={() => setActiveTab("Dashboard")}
                className={`flex items-center gap-2 p-3 w-full rounded-lg transition ${
                  activeTab === "Dashboard" ? "bg-blue-700" : ""
                }`}
              >
                <FiHome /> Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("Users")}
                className={`flex items-center gap-2 p-3 w-full rounded-lg transition ${
                  activeTab === "Users" ? "bg-blue-700" : ""
                }`}
              >
                <FiUser /> Users
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("Settings")}
                className={`flex items-center gap-2 p-3 w-full rounded-lg transition ${
                  activeTab === "Settings" ? "bg-blue-700" : ""
                }`}
              >
                <FiSettings /> Settings
              </button>
            </li>
          </ul>
        </nav>
        <button className="flex items-center gap-2 p-3 rounded-lg bg-red-600 hover:bg-red-700 transition">
          <FiLogOut /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-3xl font-semibold">{activeTab}</h2>
        <p className="mt-4 text-gray-700">
          Welcome to the {activeTab} section of the admin panel.
        </p>
      </main>
    </div>
  );
};

export default Admin;
