// import { createContext, useContext, useState } from "react";

// const TaskContext = createContext();

// export const TaskProvider = ({ children }) => {
//   const [tasks, setTasks] = useState([]);

//   const addTask = (task) => {
//     setTasks((prev) => [
//       ...prev,
//       {
//         id: Date.now(),
//         status: "pending",
//         createdAt: new Date(),
//         ...task,
//       },
//     ]);
//   };

//   const updateTask = (id, updates) => {
//     setTasks((prev) =>
//       prev.map((task) =>
//         task.id === id ? { ...task, ...updates } : task
//       )
//     );
//   };

//   return (
//     <TaskContext.Provider
//       value={{ tasks, addTask, updateTask }}
//     >
//       {children}
//     </TaskContext.Provider>
//   );
// };

// export const useTasks = () => useContext(TaskContext);

import { createContext, useState, useCallback } from "react";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success", duration = 3000) => {
    const id = Date.now();
    const toast = { id, message, type };

    setToasts((prev) => [...prev, toast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};