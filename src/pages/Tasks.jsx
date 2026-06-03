// import { useState } from "react";
// import Card from "../components/Card";
// // import { useTasks } from "../hooks/useTasks"; (use later when backend ready)

// const CreateTask = () => {
//   // const { createTask } = useTasks(); // when backend ready

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [priority, setPriority] = useState("medium");
//   const [dueDate, setDueDate] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!title.trim()) return;

//     const newTask = {
//       title,
//       description,
//       priority,
//       status: "pending",
//       dueDate: dueDate ? new Date(dueDate) : null,
//     };

//     console.log("Task Created:", newTask);

//     // createTask(newTask); ← use this when backend is ready

//     // reset form
//     setTitle("");
//     setDescription("");
//     setPriority("medium");
//     setDueDate("");
//   };

//   return (
//     <div className="max-w-2xl mx-auto space-y-8">
      
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-semibold text-slate-800">
//           Create New Task
//         </h1>
//         <p className="text-sm text-slate-500 mt-1">
//           Fill in the details below
//         </p>
//       </div>

//       <Card>
//         <form onSubmit={handleSubmit} className="space-y-6">

//           {/* Title */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Task Title
//             </label>
//             <input
//               type="text"
//               placeholder="Enter task title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Description
//             </label>
//             <textarea
//               rows="4"
//               placeholder="Enter task description..."
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>

//           {/* Priority */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Priority
//             </label>

//             <select
//               value={priority}
//               onChange={(e) => setPriority(e.target.value)}
//               className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             >
//               <option value="low">Low</option>
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//             </select>
//           </div>

//           {/* Due Date */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Due Date
//             </label>
//             <input
//               type="date"
//               value={dueDate}
//               onChange={(e) => setDueDate(e.target.value)}
//               className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-medium"
//           >
//             Create Task
//           </button>

//         </form>
//       </Card>
//     </div>
//   );
// };

// export default CreateTask;
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AppLayout from "../layouts/AppLayout.jsx";
import TaskForm from "../components/TaskForm.jsx";
import TaskCard from "../components/TaskCard.jsx";
import TaskSkeletonGrid from "../components/TaskSkeleton.jsx";
import { useTasks } from "../hooks/useTasks.js";

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

  const [editingTask, setEditingTask] = useState(null);

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Show form if filter is 'create'
  if (filter === "create") {
    return (
      <AppLayout>
        <TaskForm
          onSubmit={createTask}
          initialData={null}
        />
      </AppLayout>
    );
  }

  // Show edit form if editing
  if (editingTask) {
    return (
      <AppLayout>
        <TaskForm
          onSubmit={(data) => updateTask(editingTask._id, data)}
          initialData={editingTask}
          onCancel={() => setEditingTask(null)}
          onSuccess={() => setEditingTask(null)}
        />
      </AppLayout>
    );
  }

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
            <p className="text-gray-600">
              {filter === "pending" || filter === "completed"
                ? "Try changing the filter"
                : "Create your first task to get started"}
            </p>
          </div>
        ) : (
          // Task Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={() => setEditingTask(task)}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Tasks;