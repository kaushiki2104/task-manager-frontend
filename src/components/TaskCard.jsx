import { useState } from "react";

const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
  onPriorityChange,
}) => {
  const [showActions, setShowActions] = useState(false);

  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  const statusColors = {
    todo: "bg-gray-100",
    "in-progress": "bg-blue-100",
    done: "bg-green-100",
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      className={`p-4 rounded-lg shadow hover:shadow-md transition ${
        statusColors[task.status]
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3
            className={`text-lg font-semibold ${
              task.status === "done" ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </h3>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>

        <button
          onClick={() => setShowActions(!showActions)}
          className="text-gray-500 hover:text-gray-700 text-xl ml-2"
        >
          ⋮
        </button>
      </div>

      {/* Badges */}
      <div className="flex gap-2 flex-wrap mb-3">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>

        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
          className="text-xs px-2 py-1 border border-gray-300 rounded-lg focus:outline-none"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* Due Date */}
      <p className="text-xs text-gray-500 mb-3">
        📅 {formatDate(task.dueDate)}
      </p>

      {/* Actions */}
      {showActions && (
        <div className="flex gap-2 mt-3 pt-3 border-t border-gray-300">
          <button
            onClick={() => {
              onEdit(task);
              setShowActions(false);
            }}
            className="flex-1 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Edit
          </button>
          <button
            onClick={() => {
              onDelete(task._id);
              setShowActions(false);
            }}
            className="flex-1 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskCard;