import { useEffect, useMemo } from "react";
import AppLayout from "../layouts/AppLayout";
import useAuth from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";

const Dashboard = () => {
  const { user } = useAuth();
  const { tasks, loading, fetchTasks } = useTasks();

  // Fetch tasks when dashboard loads
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // ✅ Calculate stats dynamically
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "done").length;
    const pending = tasks.filter((t) => t.status !== "done").length;

    return { total, completed, pending };
  }, [tasks]);

  return (
    <AppLayout>
      <div>
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome, {user?.name}! 👋
          </h2>
          <p className="text-gray-600">
            Here's an overview of your tasks
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-gray-600">Loading dashboard...</div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Tasks */}
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
                <div className="text-4xl font-bold text-indigo-600">
                  {stats.total}
                </div>
                <p className="text-gray-600 mt-2 font-medium">
                  Total Tasks
                </p>
              </div>

              {/* Pending Tasks */}
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
                <div className="text-4xl font-bold text-yellow-500">
                  {stats.pending}
                </div>
                <p className="text-gray-600 mt-2 font-medium">
                  Pending Tasks
                </p>
              </div>

              {/* Completed Tasks */}
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
                <div className="text-4xl font-bold text-green-600">
                  {stats.completed}
                </div>
                <p className="text-gray-600 mt-2 font-medium">
                  Completed Tasks
                </p>
              </div>
            </div>

            {/* Optional Progress Bar */}
            {stats.total > 0 && (
              <div className="mt-10 bg-white p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-4">
                  Completion Progress
                </h3>

                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-500 h-4 rounded-full transition-all duration-500"
                    style={{
                      width: `${(stats.completed / stats.total) * 100}%`,
                    }}
                  />
                </div>

                <p className="text-sm text-gray-600 mt-3">
                  {stats.completed} of {stats.total} tasks completed (
                  {Math.round(
                    (stats.completed / stats.total) * 100
                  )}
                  %)
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default Dashboard;