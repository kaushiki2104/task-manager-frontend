import { useState, useCallback } from "react";
import api from "../services/api";
import { useToast } from "./useToast";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addToast } = useToast();

  // Fetch all tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/tasks");
      setTasks(res.data.data || []);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to fetch tasks";
      setError(errorMsg);
      addToast(errorMsg, "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  // Create task
  const createTask = useCallback(
    async (taskData) => {
      try {
        setError(null);
        const res = await api.post("/tasks", taskData);
        setTasks((prev) => [res.data.data, ...prev]);
        addToast("Task created successfully", "success");
        return res.data.data;
      } catch (err) {
        const errorMsg = err.response?.data?.message || "Failed to create task";
        setError(errorMsg);
        addToast(errorMsg, "error");
        throw err;
      }
    },
    [addToast]
  );

  // Update task
  const updateTask = useCallback(
    async (taskId, taskData) => {
      try {
        setError(null);
        const res = await api.patch(`/tasks/${taskId}`, taskData);
        setTasks((prev) =>
          prev.map((task) => (task._id === taskId ? res.data.data : task))
        );
        addToast("Task updated successfully", "success");
        
        return res.data.data;
      } catch (err) {
        const errorMsg = err.response?.data?.message || "Failed to update task";
        setError(errorMsg);
        addToast(errorMsg, "error");
        throw err;
      }
    },
    [addToast]
  );

  // Delete task
  const deleteTask = useCallback(
    async (taskId) => {
      try {
        setError(null);
        await api.delete(`/tasks/${taskId}`);
        setTasks((prev) => prev.filter((task) => task._id !== taskId));
        addToast("Task deleted successfully", "success");
      } catch (err) {
        const errorMsg = err.response?.data?.message || "Failed to delete task";
        setError(errorMsg);
        addToast(errorMsg, "error");
        throw err;
      }
    },
    [addToast]
  );

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};