import { useToast } from "../hooks/useToast";

const Toast = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-lg shadow-lg text-white flex justify-between items-center animate-pulse ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <span>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-4 text-lg font-bold"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;