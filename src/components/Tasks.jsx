import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import TaskModal from "../components/TaskModal";
import TaskCard from "../components/TaskCard";
import TaskSkeletonGrid from "../components/TaskSkeleton";
import { useTasks } from "../hooks/useTasks";

const Tasks = () => {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "all";

  const {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Filter tasks based on status
  const getFilteredTasks = () => {
    if (filter === "pending") {
      return tasks.filter((t) => t.status !== "done");
    }
    if (filter === "completed") {
      return tasks.filter((t) => t.status === "done");
    }
    return tasks; // all
  };

  const filteredTasks = getFilteredTasks();

  // Handle create/update
  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      if (editingTask) {
        await updateTask(editingTask._id, formData);
      } else {
        await createTask(formData);
      }
      setEditingTask(null);
      setIsModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle edit
  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Handle status change
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Handle delete
  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(taskId);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // Handle create button click
  const handleCreateClick = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  return (
    <AppLayout>
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Tasks
            </h2>
            <p className="text-gray-600">
              {filter === "pending"
                ? "Pending Tasks"
                : filter === "completed"
                ? "Completed Tasks"
                : "All Tasks"}{" "}
              ({filteredTasks.length})
            </p>
          </div>

          <button
            onClick={handleCreateClick}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
          >
            + Create Task
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <TaskSkeletonGrid count={6} />
        ) : filteredTasks.length === 0 ? (
          // Empty State
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {filter === "pending"
                ? "No pending tasks"
                : filter === "completed"
                ? "No completed tasks"
                : "No tasks yet"}
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === "pending" || filter === "completed"
                ? "Try changing the filter"
                : "Create your first task to get started"}
            </p>
            {filter === "all" && (
              <button
                onClick={handleCreateClick}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Create Task
              </button>
            )}
          </div>
        ) : (
          // Task Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
                onPriorityChange={(taskId, priority) =>
                  updateTask(taskId, { priority })
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        initialData={editingTask}
        loading={isSubmitting}
      />
    </AppLayout>
  );
};

export default Tasks;