// import { Link, useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

// const Sidebar = ({
//   collapsed,
//   setCollapsed,
//   mobileOpen,
//   setMobileOpen,
// }) => {
//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {mobileOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
//           onClick={() => setMobileOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed md:static
//           top-0 left-0
//           h-screen
//           bg-white shadow-lg
//           transition-all duration-300
//           z-40
//           ${collapsed ? "w-20" : "w-64"}
//           ${mobileOpen ? "block" : "hidden md:block"}
//         `}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b border-gray-200">
//           {!collapsed && (
//             <h2 className="text-lg font-bold text-indigo-600">
//               Menu
//             </h2>
//           )}
//           <button
//             onClick={() => setCollapsed(!collapsed)}
//             className="p-1 hover:bg-gray-100 rounded text-gray-600"
//             title={collapsed ? "Expand" : "Collapse"}
//           >
//             {collapsed ? "→" : "←"}
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav className="p-4 space-y-3">
//           <Link
//             to="/dashboard"
//             onClick={() => setMobileOpen(false)}
//             className="flex items-center px-3 py-2 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition"
//           >
//             <span className="text-xl">📊</span>
//             {!collapsed && <span className="ml-3">Dashboard</span>}
//           </Link>

//           <Link
//             to="/tasks?filter=all"
//             onClick={() => setMobileOpen(false)}
//             className="flex items-center px-3 py-2 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition"
//           >
//             <span className="text-xl">➕</span>
//             {!collapsed && <span className="ml-3">Create Task</span>}
//           </Link>

//           <Link
//             to="/tasks?filter=pending"
//             onClick={() => setMobileOpen(false)}
//             className="flex items-center px-3 py-2 rounded-lg hover:bg-yellow-50 text-gray-700 hover:text-yellow-600 transition"
//           >
//             <span className="text-xl">⏳</span>
//             {!collapsed && <span className="ml-3">Pending Tasks</span>}
//           </Link>

//           <Link
//             to="/tasks?filter=completed"
//             onClick={() => setMobileOpen(false)}
//             className="flex items-center px-3 py-2 rounded-lg hover:bg-green-50 text-gray-700 hover:text-green-600 transition"
//           >
//             <span className="text-xl">✅</span>
//             {!collapsed && <span className="ml-3">Completed Tasks</span>}
//           </Link>

//           <hr className="my-4" />

//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center px-3 py-2 rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-600 transition"
//           >
//             <span className="text-xl">🚪</span>
//             {!collapsed && <span className="ml-3">Logout</span>}
//           </button>
//         </nav>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;

import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const { logout } = useAuth();

  return (
    <>
      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
        fixed md:static z-40
        bg-white shadow-lg h-full
        transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
        ${mobileOpen ? "left-0" : "-left-full"}
        md:left-0
      `}
      >
        <div className="flex justify-between items-center p-4 border-b">
          {!collapsed && (
            <h2 className="text-lg font-bold text-indigo-600">
              Task Manager
            </h2>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-600"
          >
            ☰
          </button>
        </div>

        <nav className="p-4 space-y-3">
          <Link
            to="/dashboard"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded hover:bg-gray-100"
          >
            {collapsed ? "📊" : "Dashboard"}
          </Link>

          {/* ✅ CHANGE THIS LINK */}
          <Link
            to="/tasks?filter=create"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded hover:bg-gray-100 text-indigo-600 font-semibold"
          >
            {collapsed ? "➕" : "➕ Create Task"}
          </Link>

          <Link
            to="/tasks?filter=pending"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded hover:bg-gray-100"
          >
            {collapsed ? "⏳" : "⏳ Pending Tasks"}
          </Link>

          <Link
            to="/tasks?filter=completed"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded hover:bg-gray-100"
          >
            {collapsed ? "✅" : "✅ Completed Tasks"}
          </Link>
          <Link
            to="/tasks?filter=all"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded hover:bg-gray-100"
          >
            {collapsed ? "🧘" : "🧘 All Tasks"}
          </Link>

          <button
            onClick={logout}
            className="w-full text-left px-3 py-2 rounded text-red-500 hover:bg-red-50"
          >
            {collapsed ? "⏻" : "Logout ➜]"}
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;